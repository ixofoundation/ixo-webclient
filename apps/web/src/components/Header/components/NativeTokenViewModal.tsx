import { DeliverTxResponse } from '@cosmjs/stargate'
import { useWallet } from 'wallet-connector'
import { cosmos } from '@ixo/impactxclient-sdk'
import BigNumber from 'bignumber.js'
import { FlexBox } from 'components/App/App.styles'
import { SendModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { useAccount } from 'hooks/account'
import {
  fee,
  GetDelegationTotalRewards,
  GetDelegatorDelegations,
  GetDelegatorUnbondingDelegations,
  GetDelegatorValidators,
} from 'lib/protocol'
import { Button } from 'screens/CreateEntity/Components'
import { Avatar } from 'screens/CurrentEntity/Components'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { useTheme } from 'styled-components'
import { NativeToken } from 'types/tokens'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { convertDecCoinToCoin, plus } from 'utils/currency'
import { errorToast, successToast } from 'utils/toast'

interface Props {
  open: boolean
  token: NativeToken
  onClose: () => void
}

const NativeTokenViewModal: React.FC<Props> = ({ open, token, onClose }) => {
  const theme: any = useTheme()
  const { execute, close } = useWallet()
  const { address, updateBalances } = useAccount()
  const availableBalance = token.balance
  const [stakedBalances, setStakedBalances] = useState<{
    [validatorAddr: string]: {
      name?: string
      address?: string
      delegation?: string
      unbonding?: string
      rewards?: string
    }
  }>({})
  const totalStakedBalance = useMemo(() => {
    return Object.values(stakedBalances)
      .map((balance) => plus(balance.delegation || '0', balance.unbonding || '0'))
      .reduce((pre, cur) => plus(pre, cur), '0')
  }, [stakedBalances])
  const totalBalance = useMemo(() => plus(availableBalance, totalStakedBalance), [availableBalance, totalStakedBalance])
  const [isSending, setIsSending] = useState(false)
  const [isClaimingRewards, setIsClaimingRewards] = useState(false)
  const isClaimable = useMemo(() => Object.keys(stakedBalances).length > 0, [stakedBalances])

  const update = useCallback(() => {
    GetDelegatorValidators(address).then((validators) => {
      validators.forEach((validator) => {
        const { description, operatorAddress } = validator
        if (operatorAddress) {
          setStakedBalances((pre) => ({
            ...pre,
            [operatorAddress]: {
              ...(pre[operatorAddress] ?? {}),
              name: description?.moniker || '',
              address: operatorAddress,
            },
          }))
        }
      })
    })
    GetDelegatorDelegations(address).then((delegationResponses) => {
      delegationResponses.forEach((response) => {
        const { balance, delegation } = response
        if (delegation && balance) {
          const { validatorAddress } = delegation
          if (validatorAddress) {
            setStakedBalances((pre) => ({
              ...pre,
              [validatorAddress]: {
                ...(pre[validatorAddress] ?? {}),
                delegation: convertMicroDenomToDenomWithDecimals(balance.amount, token.decimals).toString(),
              },
            }))
          }
        }
      })
    })
    GetDelegatorUnbondingDelegations(address).then((unbondingResponses) => {
      unbondingResponses.forEach((response) => {
        const { validatorAddress, entries } = response
        const balance = entries.map((entry) => entry.balance).reduce((pre, cur) => plus(pre, cur), '0')
        if (validatorAddress) {
          setStakedBalances((pre) => ({
            ...pre,
            [validatorAddress]: {
              ...(pre[validatorAddress] ?? {}),
              unbonding: convertMicroDenomToDenomWithDecimals(balance, token.decimals).toString(),
            },
          }))
        }
      })
    })
    GetDelegationTotalRewards(address).then((response) => {
      if (response) {
        const { rewards } = response
        rewards.forEach((item) => {
          const { validatorAddress, reward } = item
          const rewardDecCoin = reward.find(({ denom }) => denom === token.denomOrAddress)
          if (rewardDecCoin && validatorAddress) {
            const rewardCoin = convertDecCoinToCoin(rewardDecCoin)
            setStakedBalances((pre) => ({
              ...pre,
              [validatorAddress]: {
                ...(pre[validatorAddress] ?? {}),
                rewards: convertMicroDenomToDenomWithDecimals(rewardCoin.amount, token.decimals).toString(),
              },
            }))
          }
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  useEffect(() => {
    update()
  }, [update])

  const handleSend = async () => {
    setIsSending(true)
  }

  const handleClaimRewards = async () => {
    setIsClaimingRewards(true)

    try {
      const messages = Object.keys(stakedBalances).map((validatorAddress) => ({
        typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
        value: cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward.fromPartial({
          delegatorAddress: address,
          validatorAddress,
        }),
      }))
      const calculatedFee = {
        ...fee,
        gas: new BigNumber(fee.gas).times(messages.length).toString(),
      }
      const response = (await execute({
        data: {
          messages,
          fee: calculatedFee,
          memo: undefined,
        },
        transactionConfig: { sequence: 1 },
      })) as unknown as DeliverTxResponse

      if (response.code !== 0) {
        throw response.rawLog
      }
      successToast('Success', 'Successfully updated status to transferred!')
      close()
    } catch (e) {
      console.error('handleAddVerificationMethods', e)
      errorToast('Error at Signing', typeof e === 'string' && e)
    }

    update()
    updateBalances()
    setIsClaimingRewards(false)
  }

  return (
    <>
      <ModalWrapper
        isModalOpen={open}
        header={{
          title: '',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={onClose}
      >
        <FlexBox $direction='column' width='380px' $gap={6} color={theme.ixoWhite}>
          {/* Marketing Info */}
          <FlexBox width='100%' $direction='column' $alignItems='center' $gap={3}>
            <Avatar size={38} url={token.imageUrl} />
            <Typography size='lg' weight='medium'>
              {token.symbol}
            </Typography>
          </FlexBox>

          {/* Balances */}
          <FlexBox width='100%' $direction='column' $gap={3}>
            <FlexBox width='100%' $justifyContent='space-between'>
              <Typography weight='medium'>Total Balance</Typography>
              <Typography weight='medium'>
                <CurrencyFormat
                  displayType='text'
                  thousandSeparator
                  decimalScale={2}
                  fixedDecimalScale
                  value={totalBalance}
                />
              </Typography>
            </FlexBox>

            <FlexBox width='100%' $justifyContent='space-between'>
              <Typography weight='medium'>Available Balance</Typography>
              <Typography weight='medium'>
                <CurrencyFormat
                  displayType='text'
                  thousandSeparator
                  decimalScale={2}
                  fixedDecimalScale
                  value={availableBalance}
                />
              </Typography>
            </FlexBox>

            {Object.keys(stakedBalances).length > 0 && (
              <FlexBox width='100%' $direction='column' $gap={3}>
                <Typography weight='medium'>Stakes</Typography>
                <FlexBox $direction='column' $gap={3} width='100%'>
                  {Object.values(stakedBalances).map((stakedBalance, index) => (
                    <FlexBox
                      key={index}
                      p={4}
                      $borderRadius='8px'
                      background='#053549'
                      $direction='column'
                      width='100%'
                      $gap={2.5}
                    >
                      <FlexBox>
                        <Typography color='dark-blue' weight='medium'>
                          {stakedBalance.name || ''}
                        </Typography>
                      </FlexBox>
                      <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
                        <Typography weight='medium'>Staked Amount</Typography>
                        <Typography weight='medium'>
                          <CurrencyFormat
                            displayType='text'
                            value={stakedBalance.delegation ?? 0}
                            thousandSeparator
                            decimalScale={2}
                            fixedDecimalScale
                          />
                        </Typography>
                      </FlexBox>
                      <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
                        <Typography weight='medium'>Unbonding</Typography>
                        <Typography weight='medium'>
                          <CurrencyFormat
                            displayType='text'
                            value={stakedBalance.unbonding ?? 0}
                            thousandSeparator
                            decimalScale={2}
                            fixedDecimalScale
                          />
                        </Typography>
                      </FlexBox>
                      <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
                        <Typography weight='medium'>Pending Rewards</Typography>
                        <Typography weight='medium'>
                          <CurrencyFormat
                            displayType='text'
                            value={stakedBalance.rewards ?? 0}
                            thousandSeparator
                            decimalScale={2}
                            fixedDecimalScale
                          />
                        </Typography>
                      </FlexBox>
                    </FlexBox>
                  ))}
                </FlexBox>
              </FlexBox>
            )}
          </FlexBox>

          {/* Actions */}
          <FlexBox width='100%' $gap={4}>
            <Button
              variant='secondary'
              size='full'
              height={40}
              textVariant='secondary'
              textSize='lg'
              textTransform='capitalize'
              style={{ color: 'white' }}
              onClick={handleSend}
              loading={isSending}
            >
              Send
            </Button>
            <Button
              variant='secondary'
              size='full'
              height={40}
              textVariant='secondary'
              textSize='lg'
              textTransform='capitalize'
              style={{ color: 'white' }}
              onClick={handleClaimRewards}
              disabled={!isClaimable}
              loading={isClaimingRewards}
            >
              Claim Rewards
            </Button>
          </FlexBox>
        </FlexBox>
      </ModalWrapper>
      <SendModal open={isSending} setOpen={setIsSending} selectedDenomOrAddr={token.denomOrAddress} />
    </>
  )
}

export default NativeTokenViewModal
