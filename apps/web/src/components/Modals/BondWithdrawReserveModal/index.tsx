import React, { useEffect, useMemo, useState } from 'react'
import Lottie from 'react-lottie'
import styled from 'styled-components'
import TokenSelector from 'components/TokenSelector/TokenSelector'
import { StepsTransactions } from 'components/StepsTransactions/StepsTransactions'
import AmountInput from 'components/AmountInput/AmountInput'
import OverlayButtonIcon from 'assets/images/modal/overlaybutton-down.svg'
import { ReactComponent as QRCodeIcon } from 'assets/images/icon-qrcode.svg'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import EyeIcon from 'assets/images/icon-eye.svg'
import CheckIcon from 'assets/images/icon-check.svg'
import { formatCurrency } from 'redux/account/account.utils'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import errorAnimation from 'assets/animations/transaction/fail.json'
import { thousandSeparator } from 'utils/formatters'
import { Container, NextStep, CheckWrapper, TXStatusBoard, Divider, OverlayWrapper, PrevStep } from '../styles'
import BigNumber from 'bignumber.js'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { ModalInput, TXStatus } from '../common'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { useGetBondDid } from 'graphql/bonds'
import { FlexBox } from 'components/App/App.styles'
import { WithdrawReserve } from 'lib/protocol'
import { useAccount } from 'hooks/account'
import { cosmos } from '@ixo/impactxclient-sdk'
import { useIxoConfigs } from 'hooks/configs'

const AmountInputLabel = styled.div<{ error: boolean }>`
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 22px;
  color: ${(props): any => (props.error ? '#CD1C33' : '#83d9f2')};
  strong {
    font-weight: bold;
  }
`

interface Props {
  open: boolean
  bondDid: string
  setOpen: (open: boolean) => void
}

const BondWithdrawReserveModal: React.FC<Props> = ({ open, bondDid, setOpen }) => {
  const steps = ['Reserve', 'Amount', 'Order', 'Sign']
  const [asset, setAsset] = useState<Coin | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [amount, setAmount] = useState<number | null>(null)
  const [signTXStatus, setSignTXStatus] = useState<TXStatus>(TXStatus.PENDING)
  const [signTXhash, setSignTXhash] = useState<string | null>(null)

  const { convertToMinimalDenom } = useIxoConfigs()
  const { address: accountAddress, did, signingClient } = useAccount()
  const { data: bondDetail } = useGetBondDid(bondDid)
  const availableReserve = useMemo(() => bondDetail?.availableReserve ?? [], [bondDetail])

  // TODO:
  const validAmount: boolean = useMemo(() => {
    return !!amount && amount > 0
  }, [amount])

  useEffect(() => {
    if (availableReserve.length > 0) {
      setAsset(formatCurrency(availableReserve[0]))
    }
  }, [availableReserve])

  const handleTokenChange = (token: Coin): void => {
    setAsset(token)
  }

  const handleAmountChange = (event: any): void => {
    setAmount(event.target.value)
  }

  const handleViewTransaction = (): void => {
    window.open(`${process.env.REACT_APP_BLOCK_SCAN_URL}/transactions/${signTXhash}`, '_blank')!.focus()
  }

  const showNext = useMemo(() => {
    switch (currentStep) {
      case 0:
        return !!asset && !!accountAddress
      case 1:
        return !!amount && amount > 0 && !!validAmount
      case 2:
        return true
      case 3:
      default:
        return false
    }
  }, [accountAddress, amount, asset, currentStep, validAmount])

  const showPrev = useMemo(() => {
    switch (currentStep) {
      case 0:
        return false
      case 1:
        return true
      case 2:
        return true
      case 3:
      default:
        return false
    }
  }, [currentStep])

  const chooseAnimation = (txStatus: any): any => {
    switch (txStatus) {
      case TXStatus.PENDING:
        return pendingAnimation
      case TXStatus.SUCCESS:
        return successAnimation
      case TXStatus.ERROR:
        return errorAnimation
      default:
        return ''
    }
  }

  const generateTXMessage = (txStatus: TXStatus): string => {
    switch (txStatus) {
      case TXStatus.PENDING:
        return 'Sign the Transaction'
      case TXStatus.SUCCESS:
        return 'Your transaction was successful!'
      case TXStatus.ERROR:
        return `Something went wrong!\nPlease try again`
      default:
        return ''
    }
  }

  const handleSubmit = async () => {
    try {
      const microAmount = convertToMinimalDenom(
        cosmos.base.v1beta1.Coin.fromPartial({ denom: asset?.denom, amount: String(amount) }),
      )
      const res = await WithdrawReserve(signingClient, {
        did,
        address: accountAddress,
        bondDid,
        amount: microAmount!,
      })
      if (res.code === 0) {
        setSignTXStatus(TXStatus.SUCCESS)
        setSignTXhash(res.transactionHash)
      } else {
        setSignTXStatus(TXStatus.ERROR)
        setSignTXhash(null)
      }
    } catch (e) {
      console.error('handleSubmit', e)
      setSignTXStatus(TXStatus.ERROR)
      setSignTXhash(null)
    }
  }

  useEffect(() => {
    if (currentStep < 3) {
      setSignTXStatus(TXStatus.PENDING)
      setSignTXhash(null)
    } else if (currentStep === 3) {
      handleSubmit()
    }
    // eslint-disable-next-line
  }, [currentStep])

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Withdraw',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <Container>
        <div className='px-4 pb-4'>
          <StepsTransactions steps={steps} currentStepNo={currentStep} />
        </div>

        {currentStep < 3 && (
          <FlexBox direction='column' width='100%' position='relative'>
            <CheckWrapper>
              <TokenSelector
                selectedToken={asset!}
                tokens={availableReserve.map((token: any) => formatCurrency(token))}
                label={
                  (asset && `${thousandSeparator(new BigNumber(asset!.amount!).toNumber(), ',')} Available`) ||
                  undefined
                }
                handleChange={handleTokenChange}
                disable={currentStep !== 0}
              />
              {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
            </CheckWrapper>
            <CheckWrapper>
              <div className='mt-3' />
              <ModalInput disabled={true} preIcon={<QRCodeIcon />} placeholder={accountAddress} value={''} />
              {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
            </CheckWrapper>
            <OverlayWrapper>
              <img src={OverlayButtonIcon} alt='down' />
            </OverlayWrapper>
          </FlexBox>
        )}

        {currentStep >= 1 && currentStep <= 2 && (
          <>
            <Divider className='mt-3 mb-4' />
            <CheckWrapper>
              <AmountInput
                amount={amount!}
                handleAmountChange={handleAmountChange}
                disable={currentStep !== 1}
                error={!validAmount}
                suffix={asset!.denom!.toUpperCase()}
                placeholder='Reserve Amount'
              />
              {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
            </CheckWrapper>
            <AmountInputLabel className='mt-2' error={!validAmount}>
              {validAmount ? (
                <>
                  Network fees: <strong>0.005 IXO</strong>
                </>
              ) : (
                <>Insufficient Reserve for the requested Withdrawal Amount</>
              )}
            </AmountInputLabel>
          </>
        )}
        {currentStep === 3 && (
          <TXStatusBoard className='mx-4 d-flex align-items-center flex-column'>
            <Lottie
              height={120}
              width={120}
              options={{
                loop: true,
                autoplay: true,
                animationData: chooseAnimation(signTXStatus),
              }}
            />
            <span className='status'>{signTXStatus}</span>
            <span className='message'>{generateTXMessage(signTXStatus)}</span>
            {signTXStatus === TXStatus.SUCCESS && (
              <div className='transaction mt-3' onClick={handleViewTransaction}>
                <img src={EyeIcon} alt='view transactions' />
              </div>
            )}
          </TXStatusBoard>
        )}

        <NextStep show={showNext} onClick={() => setCurrentStep(currentStep + 1)}>
          <img src={NextStepIcon} alt='next-step' />
        </NextStep>
        <PrevStep show={showPrev} onClick={() => setCurrentStep(currentStep - 1)}>
          <img src={NextStepIcon} alt='prev-step' />
        </PrevStep>
      </Container>
    </ModalWrapper>
  )
}

export default BondWithdrawReserveModal
