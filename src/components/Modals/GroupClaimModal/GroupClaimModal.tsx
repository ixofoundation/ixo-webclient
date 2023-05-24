import React, { useEffect, useState } from 'react'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { Box, FlexBox, HTMLFlexBoxProps, SvgBox, theme } from 'components/App/App.styles'
import { SignStep, TXStatus } from '../common'
import { DaoGroup } from 'redux/currentEntity/dao/currentDao.types'
import { Typography } from 'components/Typography'
import NextStepImage from 'assets/images/modal/nextstep.svg'
import { useCurrentDaoGroup } from 'hooks/currentDao'
import { contracts } from '@ixo/impactxclient-sdk'
import { useAccount } from 'hooks/account'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { ReactComponent as ArrowDownIcon } from 'assets/images/icon-arrow-down.svg'
import { useCurrentEntityProfile } from 'hooks/currentEntity'
import { TokenInfoResponse } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'
import { fee } from 'lib/protocol'
import { claimAvailable } from 'utils/claims'
import { plus } from 'utils/currency'

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
  onSuccess?: (txHash: string) => void
}

const GroupClaimModal: React.FunctionComponent<Props> = ({ daoGroup, open, setOpen, onSuccess }) => {
  const { cwClient, cosmWasmClient, address } = useAccount()
  const { name: daoName } = useCurrentEntityProfile()
  const { votingModuleAddress, depositInfo } = useCurrentDaoGroup(daoGroup?.coreAddress)
  const [tokenInfo, setTokenInfo] = useState<TokenInfoResponse | undefined>(undefined)
  const [claimableBalance, setClaimableBalance] = useState('0')
  const daoGroupName = daoGroup?.config.name

  const [txStatus, setTXStatus] = useState<TXStatus>(TXStatus.UNDEFINED)
  const [txHash, setTXHash] = useState<string>('')

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
      const { claims } = await cw20StakeClient.claims({ address })
      const microClaimableValue = claims
        .filter((claim) => claimAvailable(claim, 0)) //  TODO: TBD blockHeight
        .reduce((acc, cur) => plus(acc, cur.amount), '0')

      const tokenContract = await daoVotingCw20StakedClient.tokenContract()
      const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract)
      const tokenInfo = await cw20BaseClient.tokenInfo()
      const claimableValue = convertMicroDenomToDenomWithDecimals(microClaimableValue, tokenInfo.decimals).toString()

      setTokenInfo(tokenInfo)
      setClaimableBalance(claimableValue)
    })()
  }, [votingModuleAddress, address, cwClient])

  useEffect(() => {
    if (txStatus === TXStatus.SUCCESS && txHash) {
      onSuccess && onSuccess(txHash)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txStatus, txHash])

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
      const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeClient(cosmWasmClient, address, stakingContract)

      const { transactionHash } = await cw20StakeClient.claim(fee, undefined, depositInfo ? [depositInfo] : undefined)

      if (transactionHash) {
        setTXStatus(TXStatus.SUCCESS)
        setTXHash(transactionHash)
      } else {
        throw new Error('Error at signing')
      }
    } catch (e) {
      setTXStatus(TXStatus.ERROR)
    }
  }

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Claim',
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
                {/* DAO name & Group Name */}
                <Card gap={2}>
                  <Typography color={'dark-blue'} weight='medium'>
                    {daoName}
                  </Typography>
                  <Typography color={'white'} weight='medium'>
                    {daoGroupName}
                  </Typography>
                </Card>
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
                {/* Amount of tokens claimable */}
                <Card>
                  <Typography color={'white'} weight='medium'>
                    {new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(Number(claimableBalance))}{' '}
                    {tokenInfo?.symbol.toUpperCase()} claimable
                  </Typography>
                </Card>
              </FlexBox>
              {/* Unstaking Period & next button */}
              <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
                <Typography>Claim now?</Typography>
                <Box cursor='pointer' width='30px' height='30px' onClick={handleSigning}>
                  <img src={NextStepImage} alt='' />
                </Box>
              </FlexBox>
            </FlexBox>
          )}
          {txStatus !== TXStatus.UNDEFINED && (
            <SignStep
              status={txStatus}
              hash={txHash}
              message={{
                [TXStatus.SUCCESS]: `Successfully claimed ${new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                }).format(Number(claimableBalance))} ${tokenInfo?.symbol.toUpperCase()}.`,
              }}
            />
          )}
        </FlexBox>
      </FlexBox>
    </ModalWrapper>
  )
}

export default GroupClaimModal
