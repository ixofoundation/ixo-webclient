import { contracts } from '@ixo/impactxclient-sdk'

import { Box, FlexBox, HTMLFlexBoxProps, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { useAccount } from 'hooks/account'
import React, { useEffect, useState } from 'react'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  durationToSeconds,
  secondsToWdhms,
} from 'utils/conversions'
import { SignStep, TXStatus } from '../common'

import { MarketingInfoResponse, TokenInfoResponse } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'

import { Cw20BaseClient } from 'cosmwasm-clients'
import { fee } from 'lib/protocol'
import CurrencyFormat from 'react-currency-format'
import { useParams } from 'react-router-dom'
import { getEntityById, selectStakingGroupByCoreAddress } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { Avatar } from 'screens/CurrentEntity/Components'
import styled, { useTheme } from 'styled-components'
import { TDAOGroupModel } from 'types/entities'
import { errorToast } from 'utils/toast'
import { useWallet } from 'wallet-connector'

const StyledCurrencyFormat = styled(CurrencyFormat)`
  width: 100%;
  height: 48px;
  background-color: transparent;
  color: white;
  font-weight: 500;
  text-align: center;
  border: 1px solid ${(props) => props.theme.ixoNewBlue};
  border-radius: 8px;

  &::placeholder {
    color: ${(props) => props.theme.ixoDarkBlue};
  }
`

const Card = ({ children, ...rest }: HTMLFlexBoxProps) => {
  const theme: any = useTheme()
  return (
    <FlexBox
      p={2}
      width='100%'
      height='48px'
      $alignItems='center'
      $justifyContent='center'
      border={`1px solid ${theme.ixoNewBlue}`}
      $borderRadius={'8px'}
      {...rest}
    >
      {children}
    </FlexBox>
  )
}

interface Props {
  daoGroup: TDAOGroupModel
  open: boolean
  setOpen: (open: boolean) => void
  onSuccess?: (txHash: string) => void
}

const GroupStakingModal: React.FunctionComponent<Props> = ({ daoGroup, open, setOpen, onSuccess }) => {
  const theme: any = useTheme()
  const { cwClient, address } = useAccount()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { profile } = useAppSelector(getEntityById(entityId))
  const {
    votingModule: { votingModuleAddress },
  } = useAppSelector(selectStakingGroupByCoreAddress(daoGroup?.coreAddress))!
  const [unstakingDuration, setUnstakingDuration] = useState<number>(0)
  const [tokenInfo, setTokenInfo] = useState<TokenInfoResponse | undefined>(undefined)
  const [marketingInfo, setMarketingInfo] = useState<MarketingInfoResponse | undefined>(undefined)
  const [balance, setBalance] = useState('')
  const daoGroupName = daoGroup?.config.name

  const [amount, setAmount] = useState<string>('')
  const [txStatus, setTXStatus] = useState<TXStatus>(TXStatus.UNDEFINED)
  const [txHash, setTXHash] = useState<string>('')
  const { execute, close } = useWallet()

  /**
   * @get
   *  Token Address
   *  Token Balance
   *  Token Info
   *  Unstaking Duration
   */
  useEffect(() => {
    ;(async () => {
      const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
        cwClient,
        votingModuleAddress,
      )
      const stakingContract = await daoVotingCw20StakedClient.stakingContract()
      const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeQueryClient(cwClient, stakingContract)
      const { unstaking_duration } = await cw20StakeClient.getConfig()

      if (unstaking_duration) {
        setUnstakingDuration(durationToSeconds(0, unstaking_duration))
      }

      const tokenContract = await daoVotingCw20StakedClient.tokenContract()
      const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract)
      const tokenInfo = await cw20BaseClient.tokenInfo()
      const marketingInfo = await cw20BaseClient.marketingInfo()

      const { balance: microBalance } = await cw20BaseClient.balance({ address })

      setBalance(convertMicroDenomToDenomWithDecimals(microBalance, tokenInfo.decimals).toString())
      setTokenInfo(tokenInfo)
      setMarketingInfo(marketingInfo)
    })()

    return () => {
      setBalance('')
      setUnstakingDuration(0)
      setTokenInfo(undefined)
      setMarketingInfo(undefined)
    }
  }, [votingModuleAddress, address, cwClient])

  /**
   * signing transaction
   */
  const handleSigning = async () => {
    if (!tokenInfo) {
      return
    }

    setTXStatus(TXStatus.PENDING)
    try {
      const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
        cwClient,
        votingModuleAddress,
      )
      const stakingContract = await daoVotingCw20StakedClient.stakingContract()
      const tokenContract = await daoVotingCw20StakedClient.tokenContract()
      const cw20BaseClient = new Cw20BaseClient(execute, address, tokenContract)
      const { transactionHash } = await cw20BaseClient.send(
        {
          amount: convertDenomToMicroDenomWithDecimals(amount, tokenInfo.decimals).toString(),
          contract: stakingContract,
          msg: btoa('{"stake": {}}'),
          transactionConfig: { sequence: 1 },
        },
        fee,
        undefined,
        undefined,
      )
      if (transactionHash) {
        close()
        setTXStatus(TXStatus.SUCCESS)
        setTXHash(transactionHash)
        onSuccess && onSuccess(transactionHash)
      } else {
        throw new Error()
      }
    } catch (e: any) {
      console.error(e)
      errorToast('Error at signing', typeof e === 'string' ? e : e.message)
      setTXStatus(TXStatus.ERROR)
    }
  }

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Stake',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <FlexBox width='600px'>
        <FlexBox width='400px' $gap={4} py={12} mx={'auto'} $justifyContent='center'>
          {txStatus === TXStatus.UNDEFINED && (
            <FlexBox $direction='column' width='100%' $gap={8}>
              {/* body */}
              <FlexBox $direction='column' width='100%' $alignItems='center' $gap={4}>
                {/* Amount & Denom */}
                <FlexBox width='100%' $gap={2} $alignItems='center'>
                  <Box position='relative' style={{ flex: 1 }}>
                    {/* <StyledInput
                      inputValue={amount}
                      handleChange={setAmount}
                      height='48px'
                      placeholder='Enter Amount'
                    /> */}
                    <StyledCurrencyFormat
                      displayType={'input'}
                      value={amount}
                      thousandSeparator
                      decimalScale={2}
                      placeholder='Enter Amount'
                      onChange={(event) => setAmount(event.target.value)}
                    />
                    {/* my balance */}
                    <FlexBox position='absolute' top='-16px' right='16px' $gap={2}>
                      <Typography size='sm' color='dark-blue'>
                        <CurrencyFormat displayType={'text'} value={balance} thousandSeparator decimalScale={2} />
                      </Typography>
                      <Typography
                        className='cursor-pointer'
                        size='sm'
                        color='blue'
                        transform='uppercase'
                        onClick={() => setAmount(balance)}
                      >
                        Max
                      </Typography>
                    </FlexBox>
                  </Box>
                  <Card $justifyContent='flex-start' $alignItems='center' $flexBasis='33%' $gap={2}>
                    <Avatar size={28} url={marketingInfo?.logo !== 'embedded' ? marketingInfo?.logo?.url : undefined} />
                    <Typography color='white' transform='uppercase'>
                      {tokenInfo?.symbol}
                    </Typography>
                  </Card>
                </FlexBox>
                {/* Arrow Down icon */}
                <FlexBox
                  $alignItems='center'
                  $justifyContent='center'
                  $borderRadius='100%'
                  width='40px'
                  height='40px'
                  border={`1px solid ${theme.ixoDarkBlue}`}
                  $boxShadow={theme.ixoShadow2}
                >
                  <SvgBox color={theme.ixoNewBlue} $svgHeight={8}>
                    <img src="/assets/images/icon-arrow-down.svg"  />
                  </SvgBox>
                </FlexBox>
                {/* DAO name & Group Name */}
                <Card $gap={2}>
                  <Typography color={'dark-blue'} weight='medium'>
                    {profile?.name}
                  </Typography>
                  <Typography color={'white'} weight='medium'>
                    {daoGroupName}
                  </Typography>
                </Card>
              </FlexBox>
              {/* Unstaking Period & next button */}
              <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
                <Typography size='sm' color='dark-blue'>
                  The unstaking period is {secondsToWdhms(unstakingDuration, undefined, true, true)}
                </Typography>
                <Box cursor='pointer' width='30px' height='30px' onClick={handleSigning}>
                  <img src="/assets/images/modal/nextstep.svg" alt='' />
                </Box>
              </FlexBox>
            </FlexBox>
          )}
          {txStatus !== TXStatus.UNDEFINED && (
            <SignStep
              status={txStatus}
              hash={txHash}
              message={{
                [TXStatus.SUCCESS]: `You have successfully staked ${new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                }).format(Number(amount))} ${tokenInfo?.symbol.toUpperCase()}`,
              }}
            />
          )}
        </FlexBox>
      </FlexBox>
    </ModalWrapper>
  )
}

export default GroupStakingModal
