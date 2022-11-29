import React, { useEffect, useMemo, useState } from 'react'
import Lottie from 'react-lottie'
import styled from 'styled-components'
import TokenSelector from 'common/components/TokenSelector/TokenSelector'
import { StepsTransactions } from 'common/components/StepsTransactions/StepsTransactions'
import ModalInput from 'common/components/ModalInput/ModalInput'
import AmountInput from 'common/components/AmountInput/AmountInput'

import OverlayButtonIcon from 'assets/images/modal/overlaybutton-down.svg'
import QRCodeIcon from 'assets/images/modal/qrcode.svg'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import EyeIcon from 'assets/images/eye-icon.svg'
import CheckIcon from 'assets/images/icon-check.svg'

import { useSelector } from 'react-redux'
import { RootState } from 'redux/types'
import { denomToMinimalDenom, findMinimalDenomByDenom, formatCurrency } from 'redux/account/account.utils'
import { useKeysafe } from 'common/utils/keysafe'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import errorAnimation from 'assets/animations/transaction/fail.json'
import { thousandSeparator } from 'common/utils/formatters'
import { Container, NextStep, CheckWrapper, TXStatusBoard, Divider, OverlayWrapper, PrevStep } from './Modal.styles'
import BigNumber from 'bignumber.js'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'

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

enum TXStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

const WithdrawReserveModal: React.FunctionComponent = () => {
  const steps = ['Reserve', 'Amount', 'Order', 'Sign']
  const [asset, setAsset] = useState<Coin | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [amount, setAmount] = useState<number | null>(null)
  const [signTXStatus, setSignTXStatus] = useState<TXStatus>(TXStatus.PENDING)
  const [signTXhash, setSignTXhash] = useState<string | null>(null)

  const { sendTransaction } = useKeysafe()

  const { userInfo, address: accountAddress } = useSelector((state: RootState) => state.account)

  const { bondDid, availableReserve } = useSelector((state: RootState) => state.activeBond)

  // TODO:
  const validAmount: boolean = useMemo(() => {
    if (amount && asset) {
      return false
    }
    return true
  }, [amount, asset])

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

  const handlePrevStep = (): void => {
    setCurrentStep(currentStep - 1)
  }
  const handleNextStep = async (): Promise<void> => {
    setCurrentStep(currentStep + 1)
    if (currentStep === 2) {
      const withdrawerDid = userInfo.didDoc.did.replace('did:sov', 'did:ixo')
      const msgs = [
        {
          type: 'bonds/MsgWithdrawReserve',
          value: {
            bond_did: bondDid,
            withdrawer_did: withdrawerDid,
            amount: [
              {
                denom: findMinimalDenomByDenom(asset!.denom!),
                amount: denomToMinimalDenom(asset!.denom!, amount!),
              },
            ],
          },
        },
      ]

      sendTransaction(msgs).then((hash: any): void => {
        if (hash) {
          setSignTXStatus(TXStatus.SUCCESS)
          setSignTXhash(hash)
        } else {
          setSignTXStatus(TXStatus.ERROR)
        }
      })
    }
  }

  const handleStepChange = (index: number): void => {
    setCurrentStep(index)
  }

  const handleViewTransaction = (): void => {
    window.open(`${process.env.REACT_APP_BLOCK_SCAN_URL}/transactions/${signTXhash}`, '_blank')!.focus()
  }

  const enableNextStep = (): boolean => {
    switch (currentStep) {
      case 0:
        if (asset && accountAddress) {
          return true
        }
        return false
      case 1:
        if (amount && amount > 0 && validAmount) {
          return true
        }
        return false
      case 2:
        return true
      case 3:
      default:
        return false
    }
  }
  const enablePrevStep = (): boolean => {
    switch (currentStep) {
      case 1:
      case 2:
        return true
      default:
        return false
    }
  }

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

  useEffect(() => {
    if (currentStep < 3) {
      setSignTXStatus(TXStatus.PENDING)
      setSignTXhash(null)
    }
    // eslint-disable-next-line
  }, [currentStep])

  return (
    <Container>
      <div className='px-4 pb-4'>
        <StepsTransactions steps={steps} currentStepNo={currentStep} handleStepChange={handleStepChange} />
      </div>

      {currentStep < 3 && (
        <>
          <CheckWrapper>
            <TokenSelector
              selectedToken={asset!}
              tokens={availableReserve.map((token: any) => formatCurrency(token))}
              label={
                (asset && `${thousandSeparator(new BigNumber(asset!.amount!).toNumber(), ',')} Available`) || undefined
              }
              handleChange={handleTokenChange}
              disable={currentStep !== 0}
            />
            {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
          </CheckWrapper>
          <CheckWrapper>
            <div className='mt-3' />
            <ModalInput disable={true} preIcon={QRCodeIcon} placeholder={accountAddress} value={''} />
            {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
          </CheckWrapper>
          <OverlayWrapper>
            <img src={OverlayButtonIcon} alt='down' />
          </OverlayWrapper>
        </>
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

      {enableNextStep() && (
        <NextStep onClick={handleNextStep}>
          <img src={NextStepIcon} alt='next-step' />
        </NextStep>
      )}
      {enablePrevStep() && (
        <PrevStep onClick={handlePrevStep}>
          <img src={NextStepIcon} alt='prev-step' />
        </PrevStep>
      )}
    </Container>
  )
}

export default WithdrawReserveModal
