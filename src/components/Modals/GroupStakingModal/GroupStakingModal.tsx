import React, { useEffect, useMemo, useState } from 'react'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { Box, FlexBox, HTMLFlexBoxProps, SvgBox, theme } from 'components/App/App.styles'
import { SignStep, TXStatus } from '../common'
import { DaoGroup } from 'redux/currentEntity/dao/currentDao.types'
import { Typography } from 'components/Typography'
import NextStepImage from 'assets/images/modal/nextstep.svg'
import { useCurrentDaoGroup } from 'hooks/currentDao'
import { contracts } from '@ixo/impactxclient-sdk'
import { useAccount } from 'hooks/account'
import { depositInfoToCoin, durationToSeconds, secondsToWdhms } from 'utils/conversions'
import { ReactComponent as ArrowDownIcon } from 'assets/images/icon-arrow-down.svg'
import { useCurrentEntityProfile } from 'hooks/currentEntity'
import { Input } from 'pages/CreateEntity/Components'
import { TokenInfoResponse } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'
import CurrencyFormat from 'react-currency-format'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/DaoPreProposeSingle.types'
import { fee } from 'lib/protocol'

const Card = ({ children, ...rest }: HTMLFlexBoxProps) => (
  <FlexBox
    p={2}
    width='100%'
    height='48px'
    alignItems='center'
    justifyContent='center'
    border={`1px solid ${theme.ixoNewBlue}`}
    borderRadius={'8px'}
    {...rest}
  >
    {children}
  </FlexBox>
)

interface Props {
  daoGroup: DaoGroup
  open: boolean
  setOpen: (open: boolean) => void
}

const GroupStakingModal: React.FunctionComponent<Props> = ({ daoGroup, open, setOpen }) => {
  const { cosmWasmClient, address } = useAccount()
  const { name: daoName } = useCurrentEntityProfile()
  const { daoVotingCw20StakedClient } = useCurrentDaoGroup(daoGroup?.coreAddress)
  const [unstakingDuration, setUnstakingDuration] = useState<number>(0)
  const [tokenInfo, setTokenInfo] = useState<TokenInfoResponse | undefined>(undefined)
  const [balance, setBalance] = useState('')
  const daoGroupName = daoGroup?.config.name
  const depositInfo: Coin | undefined = useMemo(
    () => daoGroup && depositInfoToCoin(daoGroup.proposalModule.preProposeConfig.deposit_info!),
    [daoGroup],
  )

  const [amount, setAmount] = useState<string>('')
  const [txStatus, setTxStatus] = useState<TXStatus>(TXStatus.UNDEFINED)
  const [txHash, setTxHash] = useState<string>('')

  /**
   * @get
   *  Token Address
   *  Token Balance
   *  Token Info
   *  Unstaking Duration
   */
  useEffect(() => {
    if (daoVotingCw20StakedClient) {
      ;(async () => {
        const stakingContract = await daoVotingCw20StakedClient.stakingContract()
        const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeClient(cosmWasmClient, address, stakingContract)
        const { unstaking_duration } = await cw20StakeClient.getConfig()

        if (unstaking_duration) {
          setUnstakingDuration(durationToSeconds(0, unstaking_duration))
        }

        const tokenContract = await daoVotingCw20StakedClient.tokenContract()
        const cw20BaseClient = new contracts.Cw20Base.Cw20BaseClient(cosmWasmClient, address, tokenContract)
        const { balance } = await cw20BaseClient.balance({ address })
        const tokenInfo = await cw20BaseClient.tokenInfo()
        setBalance(balance)
        setTokenInfo(tokenInfo)
      })()
    }
  }, [daoVotingCw20StakedClient, address, cosmWasmClient])

  /**
   * signing transaction
   */
  const handleSigning = async () => {
    //
    const tokenContract = await daoVotingCw20StakedClient.tokenContract()
    const cw20BaseClient = new contracts.Cw20Base.Cw20BaseClient(cosmWasmClient, address, tokenContract)
    await cw20BaseClient.send(
      { amount, contract: tokenContract, msg: '' },
      fee,
      undefined,
      depositInfo ? [depositInfo] : undefined,
    )
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
        <FlexBox width='400px' gap={4} py={12} mx={'auto'} justifyContent='center'>
          {txStatus === TXStatus.UNDEFINED && (
            <FlexBox direction='column' width='100%' gap={8}>
              {/* body */}
              <FlexBox direction='column' width='100%' alignItems='center' gap={4}>
                {/* Amount & Denom */}
                <FlexBox width='100%' gap={2} alignItems='center'>
                  <Box position='relative'>
                    <Input
                      inputValue={amount}
                      handleChange={setAmount}
                      height='48px'
                      style={{ color: 'white', textAlign: 'center' }}
                    />
                    {/* my balance */}
                    <FlexBox position='absolute' top='-16px' right='16px' gap={2}>
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
                  <Card justifyContent='flex-start' flexBasis='33%'>
                    <Typography color='white' transform='uppercase'>
                      {tokenInfo?.symbol}
                    </Typography>
                  </Card>
                </FlexBox>
                {/* Arrow Down icon */}
                <FlexBox
                  alignItems='center'
                  justifyContent='center'
                  borderRadius='100%'
                  width='40px'
                  height='40px'
                  border={`1px solid ${theme.ixoDarkBlue}`}
                  boxShadow={theme.ixoShadow2}
                >
                  <SvgBox color={theme.ixoNewBlue} svgHeight={8}>
                    <ArrowDownIcon />
                  </SvgBox>
                </FlexBox>
                {/* DAO name & Group Name */}
                <Card gap={2}>
                  <Typography color={'dark-blue'} weight='medium'>
                    {daoName}
                  </Typography>
                  <Typography color={'white'} weight='medium'>
                    {daoGroupName}
                  </Typography>
                </Card>
              </FlexBox>
              {/* Unstaking Period & next button */}
              <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
                <Typography size='sm' color='dark-blue'>
                  The unstaking period is {secondsToWdhms(unstakingDuration, undefined, true)}
                </Typography>
                <Box width='30px' height='30px' onClick={handleSigning}>
                  <img src={NextStepImage} alt='' />
                </Box>
              </FlexBox>
            </FlexBox>
          )}
          {txStatus !== TXStatus.UNDEFINED && <SignStep status={txStatus} hash={txHash} />}
        </FlexBox>
      </FlexBox>
    </ModalWrapper>
  )
}

export default GroupStakingModal
