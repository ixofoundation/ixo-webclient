import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { useAccount } from 'hooks/account'
import { Button } from 'pages/CreateEntity/Components'
import { Avatar } from 'pages/CurrentEntity/Components'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { selectStakingGroupsByTokenAddress } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { plus } from 'utils/currency'
import { GroupStakingModal, SendModal } from 'components/Modals'
import { TokenType } from 'types/tokens'
import { useTheme } from 'styled-components'
import { TDAOGroupModel } from 'types/entities'

interface Props {
  open: boolean
  token: {
    type: TokenType
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

const Cw20TokenViewModal: React.FC<Props> = ({ open, token, onClose }) => {
  const theme: any = useTheme()
  const stakingGroups: TDAOGroupModel[] = useAppSelector(selectStakingGroupsByTokenAddress(token.coinMinimalDenom))
  const { cw20Tokens } = useAccount()
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
  const [isSending, setIsSending] = useState(false)

  const update = useCallback(() => {
    const cw20Token = cw20Tokens.find((item) => item.denomOrAddress === token.coinMinimalDenom)
    if (cw20Token) {
      setStakedBalances((pre) => ({
        ...pre,
        [cw20Token.denomOrAddress]: {
          ...(pre[cw20Token.denomOrAddress] ?? {}),
          name: stakingGroups.find(({ coreAddress }) => coreAddress === cw20Token.groupContract)?.config.name || '',
          address: cw20Token.denomOrAddress,
          delegation: cw20Token.staked,
          unbonding: cw20Token.unbonding,
        },
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cw20Tokens, token.coinMinimalDenom])

  useEffect(() => {
    update()
  }, [update])

  const handleSend = async () => {
    setIsSending(true)
  }

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
              onClick={handleStake}
              loading={isStaking}
            >
              Stake
            </Button>
          </FlexBox>
        </FlexBox>
      </ModalWrapper>
      <GroupStakingModal open={isStaking} setOpen={setIsStaking} daoGroup={stakingGroups[0]} />
      <SendModal open={isSending} setOpen={setIsSending} selectedDenomOrAddr={token.coinMinimalDenom} />
    </>
  )
}

export default Cw20TokenViewModal
