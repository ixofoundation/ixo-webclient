import { contracts } from '@ixo/impactxclient-sdk'
import { FlexBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { useAccount } from 'hooks/account'
import { Button } from 'pages/CreateEntity/Components'
import { Avatar } from 'pages/CurrentEntity/Components'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { selectStakingGroupsByTokenAddress } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { claimAvailable } from 'utils/tokenClaim'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { plus } from 'utils/currency'
import { DaoGroup } from 'redux/currentEntity/dao/currentDao.types'
import { GroupStakingModal } from 'components/Modals'

interface Props {
  open: boolean
  token: {
    type: string
    balance: string
    network: string
    coinDenom: string
    coinMinimalDenom: string
    coinImageUrl: string
    coinDecimals: number
    lastPriceUsd: number
  }
  onClose: () => void
}

const Cw20CoinViewModal: React.FC<Props> = ({ open, token, onClose }) => {
  const stakingGroups: DaoGroup[] = useAppSelector(selectStakingGroupsByTokenAddress(token.coinMinimalDenom))
  const { cwClient, address } = useAccount()
  const availableBalance = token.balance
  const [stakedBalances, setStakedBalances] = useState<{
    [validatorAddr: string]: {
      name?: string
      address?: string
      delegation?: string
      unbonding?: string
    }
  }>({})
  const totalStakedBalance = useMemo(() => {
    return Object.values(stakedBalances)
      .map((balance) => plus(balance.delegation || '0', balance.unbonding || '0'))
      .reduce((pre, cur) => plus(pre, cur), '0')
  }, [stakedBalances])
  const totalBalance = useMemo(() => plus(availableBalance, totalStakedBalance), [availableBalance, totalStakedBalance])
  const [isStaking, setIsStaking] = useState(false)

  const update = useCallback(() => {
    ;(async () => {
      await Promise.all(
        stakingGroups.map(async (stakingGroup) => {
          const votingModuleAddress = stakingGroup?.votingModule.votingModuleAddress
          const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
            cwClient,
            votingModuleAddress,
          )
          const stakingContract = await daoVotingCw20StakedClient.stakingContract()
          const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeQueryClient(cwClient, stakingContract)
          const { value: microStakedValue } = await cw20StakeClient.stakedValue({ address })
          const { claims } = await cw20StakeClient.claims({ address })
          const microUnstakingValue = claims
            .filter((claim) => !claimAvailable(claim, 0)) //  TODO: TBD blockHeight
            .reduce((acc, cur) => plus(acc, cur.amount), '0')

          const stakedValue = convertMicroDenomToDenomWithDecimals(microStakedValue, token.coinDecimals).toString()
          const unstakingValue = convertMicroDenomToDenomWithDecimals(
            microUnstakingValue,
            token.coinDecimals,
          ).toString()

          setStakedBalances((pre) => ({
            ...pre,
            [stakingGroup.coreAddress]: {
              ...(pre[stakingGroup.coreAddress] ?? {}),
              name: stakingGroup.config.name || '',
              address: stakingGroup.coreAddress,
              delegation: stakedValue,
              unbonding: unstakingValue,
            },
          }))
        }),
      )
    })()
  }, [stakingGroups, address, token, cwClient])

  useEffect(() => {
    update()
  }, [update])

  const handleStake = async () => {
    setIsStaking(true)
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
        <FlexBox direction='column' width='380px' gap={6} color={theme.ixoWhite}>
          {/* Marketing Info */}
          <FlexBox width='100%' direction='column' alignItems='center' gap={3}>
            <Avatar size={38} url={token.coinImageUrl} />
            <Typography size='lg' weight='medium'>
              {token.coinDenom}
            </Typography>
          </FlexBox>

          {/* Balances */}
          <FlexBox width='100%' direction='column' gap={3}>
            <FlexBox width='100%' justifyContent='space-between'>
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

            <FlexBox width='100%' justifyContent='space-between'>
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
              <FlexBox width='100%' direction='column' gap={3}>
                <Typography weight='medium'>Stakes</Typography>
                <FlexBox direction='column' gap={3} width='100%'>
                  {Object.values(stakedBalances).map((stakedBalance, index) => (
                    <FlexBox
                      key={index}
                      p={4}
                      borderRadius='8px'
                      background='#053549'
                      direction='column'
                      width='100%'
                      gap={2.5}
                    >
                      <FlexBox>
                        <Typography color='blue' weight='medium'>
                          {stakedBalance.name || ''}
                        </Typography>
                      </FlexBox>
                      <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
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
                      <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
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
                    </FlexBox>
                  ))}
                </FlexBox>
              </FlexBox>
            )}
          </FlexBox>

          {/* Actions */}
          <FlexBox width='100%' gap={4}>
            <Button
              variant='secondary'
              size='full'
              height={40}
              textVariant='secondary'
              textSize='lg'
              textTransform='capitalize'
              style={{ color: 'white' }}
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
              onClick={handleStake}
              loading={isStaking}
            >
              Stake
            </Button>
          </FlexBox>
        </FlexBox>
      </ModalWrapper>
      <GroupStakingModal open={isStaking} setOpen={setIsStaking} daoGroup={stakingGroups[0]} onSuccess={update} />
    </>
  )
}

export default Cw20CoinViewModal
