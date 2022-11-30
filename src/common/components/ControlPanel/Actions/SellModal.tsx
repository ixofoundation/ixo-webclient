import React, { useEffect, useMemo, useState } from 'react'
import Lottie from 'react-lottie'
import TokenSelector from 'common/components/TokenSelector/TokenSelector'
import { StepsTransactions } from 'common/components/StepsTransactions/StepsTransactions'
import AmountInput from 'common/components/AmountInput/AmountInput'

import OverlayButtonDownIcon from 'assets/images/modal/overlaybutton-down.svg'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import EyeIcon from 'assets/images/eye-icon.svg'
import CheckIcon from 'assets/images/icon-check.svg'
import Vote from 'assets/icons/Vote'

import { useSelector } from 'react-redux'
import { RootState } from 'redux/types'
import { nFormatter } from 'utils/currency'
import { broadCastMessage } from 'lib/keysafe/keysafe'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import errorAnimation from 'assets/animations/transaction/fail.json'
import { thousandSeparator } from 'utils/formatters'

import {
  Container,
  CheckWrapper,
  OverlayWrapper,
  LabelWrapper,
  Label,
  Divider,
  PrevStep,
  NextStep,
  TXStatusBoard,
} from './Modal.styles'
import { minimalDenomToDenom } from 'redux/account/account.utils'
import BigNumber from 'bignumber.js'

enum TXStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

const SellModal: React.FunctionComponent = () => {
  const [steps] = useState(['Bond', 'Amount', 'Order', 'Sign'])

  const [currentStep, setCurrentStep] = useState<number>(0)
  const [bondAmount, setBondAmount] = useState<number | undefined>(undefined)
  const [signTXStatus, setSignTXStatus] = useState<TXStatus>(TXStatus.PENDING)
  const [signTXhash, setSignTXhash] = useState<string | null>(null)

  const {
    userInfo,
    sequence: userSequence,
    accountNumber: userAccountNumber,
    balances,
  } = useSelector((state: RootState) => state.account)

  const {
    symbol: bondDenom,
    myStake: currentSupply,
    maxSupply,
    reserveDenom: reserveTokenDenom,
    bondDid,
  } = useSelector((state: RootState) => state.activeBond)

  const reserveTokenBalance: string = useMemo(() => {
    return balances.find((token) => token.denom === reserveTokenDenom)?.amount ?? '0'
  }, [balances, reserveTokenDenom])

  const amountValidation = useMemo(
    () =>
      !bondAmount ||
      (bondAmount > 0 &&
        bondAmount < new BigNumber(maxSupply.amount!).toNumber() - new BigNumber(currentSupply!.amount!).toNumber()),
    [bondAmount, maxSupply, currentSupply],
  )
  const handleAmountChange = (event: any): void => {
    setBondAmount(event.target.value)
  }

  const generateTXRequestMSG = (): any => {
    const msgs = []
    msgs.push({
      type: 'bonds/MsgSell',
      value: {
        seller_did: userInfo.didDoc.did,
        amount: {
          amount: bondAmount,
          denom: bondDenom,
        },
        bond_did: bondDid,
      },
    })
    return msgs
  }

  const generateTXRequestFee = (): any => {
    const fee = {
      amount: [{ amount: String(5000), denom: 'uixo' }],
      gas: String(200000),
    }
    return fee
  }

  const signingTX = async (): Promise<void> => {
    const msgs = generateTXRequestMSG()
    const fee = generateTXRequestFee()

    if (msgs.length === 0) {
      return
    }
    broadCastMessage(userInfo, userSequence as any, userAccountNumber as any, msgs, '', fee, (hash: any) => {
      if (hash) {
        setSignTXStatus(TXStatus.SUCCESS)
        setSignTXhash(hash)
      } else {
        setSignTXStatus(TXStatus.ERROR)
      }
    })
  }

  const handlePrevStep = (): void => {
    if (currentStep === 0) {
      return
    }
    setCurrentStep(currentStep - 1)
  }
  const handleNextStep = async (): Promise<void> => {
    setCurrentStep(currentStep + 1)
    if (currentStep === 2) {
      await signingTX()
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
        return true
      case 1:
        return amountValidation
      case 2:
        return true
      case 3:
      default:
        return false
    }
  }
  const enablePrevStep = (): boolean => {
    switch (currentStep) {
      case 0:
        return false
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
  }, [currentStep, reserveTokenDenom])

  return (
    <Container>
      <div className='px-4 pb-4'>
        <StepsTransactions steps={steps} currentStepNo={currentStep} handleStepChange={handleStepChange} />
      </div>

      {currentStep < 3 && (
        <>
          <CheckWrapper>
            <TokenSelector
              selectedToken={{
                amount: '0',
                denom: bondDenom,
              }}
              tokens={[
                {
                  amount: '0',
                  denom: bondDenom,
                },
              ]}
              handleChange={(): void => {
                //
              }}
              disable={true}
              icon={<Vote fill='#00D2FF' />}
              label={`MAX Available ${nFormatter(
                new BigNumber(maxSupply.amount!).toNumber() - new BigNumber(currentSupply!.amount!).toNumber(),
                2,
              )} of ${nFormatter(new BigNumber(maxSupply.amount!).toNumber(), 2)}`}
            />
            {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
          </CheckWrapper>
          <div className='mt-3' />
          <CheckWrapper>
            <TokenSelector
              selectedToken={{
                amount: reserveTokenBalance,
                denom: reserveTokenDenom,
              }}
              tokens={balances}
              handleChange={(): void => {
                //
              }}
              disable={true}
              label={`My Balance ${thousandSeparator(
                minimalDenomToDenom(reserveTokenDenom, new BigNumber(reserveTokenBalance).toNumber()).toFixed(0),
                ',',
              )}`}
            />
            {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
          </CheckWrapper>
          <OverlayWrapper>
            <img src={OverlayButtonDownIcon} alt='down' />
          </OverlayWrapper>
        </>
      )}

      {currentStep >= 1 && currentStep <= 2 && (
        <>
          <Divider className='mt-3 mb-4' />
          <CheckWrapper>
            <AmountInput
              amount={bondAmount!}
              placeholder={`${bondDenom.toUpperCase()} Amount`}
              memo={''}
              step={1}
              memoStatus={'nomemo'}
              handleAmountChange={handleAmountChange}
              handleMemoChange={(): void => {
                //
              }}
              handleMemoStatus={(): void => {
                //
              }}
              disable={currentStep !== 1}
              suffix={bondDenom.toUpperCase()}
              error={!amountValidation}
            />
            {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
          </CheckWrapper>
          <LabelWrapper className='mt-2'>
            {amountValidation ? (
              <Label>
                Network fees: <strong>0.005 IXO</strong>
              </Label>
            ) : (
              <Label className='error'>
                Offer amount is greater than the available number of {bondDenom.toUpperCase()}
              </Label>
            )}
          </LabelWrapper>
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

export default SellModal
