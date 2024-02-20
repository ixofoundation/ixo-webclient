import React, { useEffect, useMemo, useState } from 'react'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { Box, FlexBox, HTMLFlexBoxProps, SvgBox } from 'components/App/App.styles'
import { SignStep, TXStatus } from '../common'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import { convertDenomToMicroDenomWithDecimals, depositInfoToCoin } from 'utils/conversions'
import { ReactComponent as ArrowDownIcon } from 'assets/images/icon-arrow-down.svg'
import { useCurrentEntityProfile } from 'hooks/currentEntity'
import { Dropdown, Input } from 'pages/CreateEntity/Components'
import CurrencyFormat from 'react-currency-format'
import { BankSendTrx, fee } from 'lib/protocol'
import styled, { useTheme } from 'styled-components'
import { Avatar } from 'pages/CurrentEntity/Components'
import { errorToast, successToast } from 'utils/toast'
import { NATIVE_DENOM, NATIVE_MICRODENOM } from 'constants/chains'
import { isContractAddress } from 'utils/validation'
import { useAppSelector } from 'redux/hooks'
import { isGreaterThanOrEqualTo } from 'utils/currency'
import { selectGroupByCoreAddress } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { ReactComponent as NextStepImage } from 'assets/images/modal/nextstep.svg'
import { contracts } from '@ixo/impactxclient-sdk'
import { useWallet } from '@ixo-webclient/wallet-connector'
import { Cw20BaseClient } from '@ixo-webclient/cosmwasm-clients'

const StyledInput = styled(Input)`
  color: white;
  font-weight: 500;
  text-align: center;

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
  open: boolean
  recipient: string
  selectedDenomOrAddr?: string
  setOpen: (open: boolean) => void
  onSuccess?: (txHash: string) => void
}

const DepositModal: React.FunctionComponent<Props> = ({
  open,
  selectedDenomOrAddr = NATIVE_MICRODENOM,
  recipient,
  setOpen,
  onSuccess,
}) => {
  const theme: any = useTheme()
  const { signingClient, signer, nativeTokens, cw20Tokens, cwClient } = useAccount()
  const [tokenOptions, setTokenOptions] = useState<{ text: string; value: string }[]>([
    { value: NATIVE_MICRODENOM, text: NATIVE_DENOM },
  ])
  const [selectedTokenDenom, setSelectedTokenDenom] = useState(selectedDenomOrAddr)
  const selectedToken = useMemo(
    () =>
      isContractAddress(selectedTokenDenom)
        ? cw20Tokens.find((token) => token.denomOrAddress === selectedTokenDenom)
        : nativeTokens.find((token) => token.denomOrAddress === selectedTokenDenom),
    [nativeTokens, cw20Tokens, selectedTokenDenom],
  )
  const balance = useMemo(() => (selectedToken ? selectedToken.balance : '0'), [selectedToken])
  const daoGroup = useAppSelector(selectGroupByCoreAddress(recipient))
  const { name: daoName } = useCurrentEntityProfile()
  const daoGroupName = daoGroup?.config.name

  const [amount, setAmount] = useState<string>('')
  const [txStatus, setTXStatus] = useState<TXStatus>(TXStatus.UNDEFINED)
  const [txHash, setTXHash] = useState<string>('')

  const { execute } = useWallet()

  const validAmount = isGreaterThanOrEqualTo(balance, amount)

  useEffect(() => {
    setAmount('')
    setTXStatus(TXStatus.UNDEFINED)
    setTXHash('')
  }, [open])

  useEffect(() => {
    if (daoGroup) {
      const { token } = daoGroup
      if (token) {
        setTokenOptions((v) => [...v, { value: token.config.token_address, text: token.tokenInfo.symbol }])
      }
    }
    return () => {
      setTokenOptions([{ value: NATIVE_MICRODENOM, text: NATIVE_DENOM }])
    }
  }, [daoGroup])

  const handleSigning = async () => {
    setTXStatus(TXStatus.PENDING)

    if (!selectedTokenDenom || !selectedToken) {
      setTXStatus(TXStatus.ERROR)
      return
    }

    if (isContractAddress(selectedTokenDenom) && daoGroup?.votingModule.votingModuleAddress) {
      // const msg = {
      //   transfer: {
      //     recipient: recipient,
      //     amount: convertDenomToMicroDenomWithDecimals(amount, selectedToken.decimals).toString(),
      //   },
      // }

      // response = await WasmExecuteTrx(signingClient, signer, {
      //   contractAddress: selectedTokenDenom,
      //   msg: JSON.stringify(msg),
      // })

      const depositInfo = daoGroup.proposalModule.preProposeConfig.deposit_info

      const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
        cwClient,
        daoGroup.votingModule.votingModuleAddress,
      )
      const stakingContract = await daoVotingCw20StakedClient.stakingContract()
      const tokenContract = await daoVotingCw20StakedClient.tokenContract()
      const cw20BaseClient = new Cw20BaseClient(execute, signer.address, tokenContract)
      const { transactionHash } = await cw20BaseClient.send(
        {
          amount: convertDenomToMicroDenomWithDecimals(amount, selectedToken.decimals).toString(),
          contract: stakingContract,
          msg: btoa('{"stake": {}}'),
        },
        fee,
        undefined,
        depositInfo ? [depositInfoToCoin(depositInfo)!] : undefined,
      )

      if (transactionHash) {
        setTXStatus(TXStatus.SUCCESS)
        setTXHash(transactionHash)
        successToast('Sending', `Success! ${amount} ${selectedToken.symbol} have been successfully sent.`)
      } else {
        throw new Error()
      }
    } else {
      const response = await BankSendTrx(signingClient, signer.address, recipient, {
        denom: selectedTokenDenom,
        amount: convertDenomToMicroDenomWithDecimals(amount, selectedToken.decimals).toString(),
      })
      if (response) {
        setTXStatus(TXStatus.SUCCESS)
        successToast('Sending', `Success! ${amount} ${selectedToken.symbol} have been successfully sent.`)
      } else {
        setTXStatus(TXStatus.ERROR)
        errorToast('Sending', `Failed to send ${amount} ${selectedToken.symbol}. Please try again.`)
      }
    }
  }

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Deposit',
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
                    <StyledInput
                      inputValue={amount}
                      handleChange={setAmount}
                      height='48px'
                      placeholder='Enter Amount'
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
                  <Card $justifyContent='flex-start' $alignItems='center' $flexBasis='33%' $gap={2} cursor='pointer'>
                    <Avatar size={28} url={selectedToken?.imageUrl} />
                    <Typography color='white' transform='uppercase' style={{ flex: 1 }}>
                      {/* {selectedToken?.symbol} */}
                      <Dropdown
                        options={tokenOptions}
                        value={selectedTokenDenom}
                        onChange={(e) => setSelectedTokenDenom(e.target.value)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'white',
                        }}
                      />
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
                    <ArrowDownIcon />
                  </SvgBox>
                </FlexBox>
                {/* DAO name & Group Name */}
                <Card $gap={2}>
                  <Typography color={'dark-blue'} weight='medium'>
                    {daoName}
                  </Typography>
                  <Typography color={'white'} weight='medium'>
                    {daoGroupName}
                  </Typography>
                </Card>
              </FlexBox>
              {/* Action */}
              <FlexBox width='100%' $justifyContent='flex-end' $alignItems='center'>
                <SvgBox
                  cursor='pointer'
                  onClick={() => validAmount && handleSigning()}
                  color={validAmount ? theme.ixoNewBlue : theme.ixoDarkBlue}
                >
                  <NextStepImage />
                </SvgBox>
              </FlexBox>
            </FlexBox>
          )}
          {txStatus !== TXStatus.UNDEFINED && (
            <SignStep
              status={txStatus}
              hash={txHash}
              message={{
                [TXStatus.SUCCESS]: `You have successfully sent ${new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                }).format(Number(amount))} ${selectedToken?.symbol.toUpperCase()}`,
              }}
            />
          )}
        </FlexBox>
      </FlexBox>
    </ModalWrapper>
  )
}

export default DepositModal
