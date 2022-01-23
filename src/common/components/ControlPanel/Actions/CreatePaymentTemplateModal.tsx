import errorAnimation from 'assets/animations/transaction/fail.json'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import CurrencyIcon from 'assets/icons/Currency'
import SyncIcon from 'assets/icons/Sync'
import CalendarSortIcon from 'assets/images/modal/calendar-sort.svg'
import CheckIcon from 'assets/images/modal/check.svg'
import CopyIcon from 'assets/images/modal/copy.svg'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import cx from 'classnames'
import DiscountsSelector from 'common/components/DiscountsSelector/DiscountsSelector'
import ModalInput from 'common/components/ModalInput/ModalInput'
import { IconWrapper } from 'common/components/ModalInput/ModalInput.styles'
// import * as keplr from 'common/utils/keplr'
import ModalSelector from 'common/components/ModalSelector/ModalSelector'
import { StepsTransactions } from 'common/components/StepsTransactions/StepsTransactions'
import { RootState } from 'common/redux/types'
import { thousandSeparator } from 'common/utils/formatters'
import { broadCastMessage } from 'common/utils/keysafe'
import { isFloat, isInteger } from 'common/utils/validationUtils'
import React, { useState } from 'react'
import Lottie from 'react-lottie'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  Container,
  NextStep,
  PrevStep,
  CheckWrapper,
  TXStatusBoard,
  ButtonWrapper,
} from './Modal.styles'

const PaymentTemplateBoundaryWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  column-gap: 0.5rem;
`

enum PaymentTemplateMethod {
  FIXED = 'Fixed Payment',
  RECURRING = 'Recurring Payment',
}
enum TXStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}
interface Props {
  walletType?: string
}

const paymentCoins = [
  {
    coinDenom: 'IXO',
    coinMinimalDenom: 'uixo',
    coinDecimals: 6,
    coinGeckoId: 'pool:uixo',
    coinImageUrl: "window.location.origin + '/public/assets/tokens/ixo.png'",
    counterpartyChainId: 'impacthub-3',
    sourceChannelId: 'channel-37',
    destChannelId: 'channel-0',
  },
  {
    coinDenom: 'EEUR',
    coinMinimalDenom: 'eeur',
    coinDecimals: 6,
    coinGeckoId: 'e-money-eur',
    coinImageUrl: "window.location.origin + '/public/assets/tokens/ngm.png",
    counterpartyChainId: 'emoney-3',
    sourceChannelId: 'channel-37',
    destChannelId: 'channel-0',
  },
]

const CreatePaymentTemplateModal: React.FunctionComponent<Props> = ({
  walletType = 'keysafe',
}) => {
  const steps = ['Template', 'Amounts', 'Confirm', 'Sign']
  const [currentStep, setCurrentStep] = useState<number>(0)
  const availableCurrencies = paymentCoins.map((coin) => coin.coinDenom)
  const [paymentCurrency, setPaymentCurrency] = useState<string>('IXO')
  const memo = ''

  const [signTXStatus, setSignTXStatus] = useState<TXStatus>(TXStatus.PENDING)
  const {
    userInfo,
    sequence: userSequence,
    accountNumber: userAccountNumber,
  } = useSelector((state: RootState) => state.account)

  const [templateName, setTemplateName] = useState<string>()
  const [
    selectedPaymentTemplateMethod,
    setSelectedPaymentTemplateMethod,
  ] = useState<PaymentTemplateMethod>()
  const [paymentPeriods, setPaymentPeriods] = useState<string>()
  const [minAmount, setMinAmount] = useState<string>()
  const [maxAmount, setMaxAmount] = useState<string>()
  const [discounts, setDiscounts] = useState<string[]>([])
  const [amount, setAmount] = useState<string>()
  const [availableDiscounts, setAvailableDiscounts] = useState<string[]>([
    '5',
    '10',
    '20',
    'other',
  ])

  const generateTXRequestMSG = (): any => {
    const msgs = []
    const minimalDenom = paymentCoins.find(
      (currency) => currency.coinDenom === paymentCurrency,
    ).coinMinimalDenom
    switch (selectedPaymentTemplateMethod) {
      case PaymentTemplateMethod.FIXED:
      case PaymentTemplateMethod.RECURRING:
        if (walletType === 'keysafe') {
          msgs.push({
            type: 'payments/MsgCreatePaymentTemplate',
            value: {
              creator_did: userInfo.didDoc.did,
              payment_template: {
                id: `payment:template:${templateName}`,
                payment_amount: [{ amount: amount, denom: minimalDenom }],
                payment_minimum: [{ amount: minAmount, denom: minimalDenom }],
                payment_maximum: [{ amount: maxAmount, denom: minimalDenom }],
                discounts: discounts.map((discount, index) => {
                  return {
                    id: String(index + 1),
                    percent: String(`${discount}.${'0'.repeat(18)}`),
                  }
                }),
              },
            },
          })
        }
        break
      default:
        break
    }
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

    if (walletType === 'keysafe') {
      broadCastMessage(
        userInfo,
        userSequence,
        userAccountNumber,
        msgs,
        memo,
        fee,
        (hash) => {
          if (hash) {
            setSignTXStatus(TXStatus.SUCCESS)
          } else {
            setSignTXStatus(TXStatus.ERROR)
          }
        },
      )
    } else if (walletType === 'keplr') {
      // const [accounts, offlineSigner] = await keplr.connectAccount()
      // const address = accounts[0].address
      // const client = await keplr.initStargateClient(offlineSigner)
      // const payload = {
      //   msgs,
      //   chain_id: process.env.REACT_APP_CHAIN_ID,
      //   fee,
      //   memo,
      // }
      // try {
      //   const result = await keplr.sendTransaction(client, address, payload)
      //   if (result) {
      //     setSignTXStatus(TXStatus.SUCCESS)
      //     setSignTXhash(result.transactionHash)
      //   } else {
      //     throw 'transaction failed'
      //   }
      // } catch (e) {
      //   setSignTXStatus(TXStatus.ERROR)
      // }
    }
  }

  const handlePrevStep = (): void => {
    if (currentStep === 0) {
      setSelectedPaymentTemplateMethod(undefined)
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

  const handlePaymentTemplateMethod = (label: PaymentTemplateMethod): void => {
    setSelectedPaymentTemplateMethod(label)
  }

  const generateTXMessage = (txStatus: TXStatus): string => {
    switch (txStatus) {
      case TXStatus.PENDING:
        return 'Sign the Transaction'
      case TXStatus.SUCCESS:
        return `Template ID: payment:template:${templateName}`
      case TXStatus.ERROR:
        return `Something went wrong!\nPlease try again`
      default:
        return ''
    }
  }

  const enableNextStep = (): boolean => {
    switch (currentStep) {
      case 0:
        if (
          selectedPaymentTemplateMethod === undefined ||
          !templateName ||
          (selectedPaymentTemplateMethod === PaymentTemplateMethod.RECURRING &&
            !isInteger(paymentPeriods))
        ) {
          return false
        }
        return true
      case 1:
        if (
          isFloat(minAmount) &&
          isFloat(maxAmount) &&
          parseFloat(maxAmount) >= parseFloat(minAmount) &&
          discounts.length
        ) {
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
      case 0:
        if (selectedPaymentTemplateMethod === PaymentTemplateMethod.RECURRING)
          return true
        return false
      case 1:
      case 2:
        return true
      default:
        return false
    }
  }

  const chooseAnimation = (txStatus): any => {
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

  return (
    <Container>
      <div className="px-4 pb-4">
        <StepsTransactions
          steps={steps}
          currentStepNo={currentStep}
          handleStepChange={handleStepChange}
        />
      </div>
      {currentStep < 3 && (
        <>
          <CheckWrapper>
            <ModalSelector
              selectedToken={paymentCurrency}
              tokens={availableCurrencies}
              handleChange={(token: string): void => {
                setPaymentCurrency(token)
              }}
              disable={currentStep === 2}
              placeholder="Select a Payment Currency"
              icon={<CurrencyIcon fill="#00D2FF" />}
            />
            {currentStep === 2 && (
              <img className="check-icon" src={CheckIcon} alt="check-icon" />
            )}
          </CheckWrapper>
          <div className="mt-2" />
          <CheckWrapper>
            <ModalInput
              disable={currentStep === 2}
              invalid={templateName !== undefined && templateName.length === 0}
              // invalidLabel={'This is not a valid template name'}
              preIcon={<SyncIcon fill="#00D2FF" />}
              placeholder="Enter a Template Name"
              value={templateName}
              handleChange={(e): void => {
                setTemplateName(e.target.value)
              }}
              hideLabel={true}
            />
            {currentStep === 2 && (
              <img className="check-icon" src={CheckIcon} alt="check-icon" />
            )}
          </CheckWrapper>
        </>
      )}

      {currentStep === 0 && (
        <div className="mt-4">
          <ButtonWrapper className="justify-content-end">
            {selectedPaymentTemplateMethod !==
              PaymentTemplateMethod.RECURRING && (
              <button
                className={cx([
                  {
                    inactive:
                      selectedPaymentTemplateMethod !==
                      PaymentTemplateMethod.FIXED,
                  },
                  {
                    active:
                      selectedPaymentTemplateMethod ===
                      PaymentTemplateMethod.FIXED,
                  },
                ])}
                onClick={(): void =>
                  handlePaymentTemplateMethod(PaymentTemplateMethod.FIXED)
                }
              >
                {PaymentTemplateMethod.FIXED}
              </button>
            )}
            {selectedPaymentTemplateMethod ===
              PaymentTemplateMethod.RECURRING && (
              <CheckWrapper>
                <ModalInput
                  invalid={
                    paymentPeriods !== undefined && !isInteger(paymentPeriods)
                  }
                  invalidLabel={'This is not a valid number of periods'}
                  preIcon={CalendarSortIcon}
                  placeholder="Number of Periods"
                  value={paymentPeriods}
                  handleChange={(e): void => {
                    setPaymentPeriods(e.target.value)
                  }}
                />
              </CheckWrapper>
            )}
            <button
              className={cx([
                {
                  inactive:
                    selectedPaymentTemplateMethod !==
                    PaymentTemplateMethod.RECURRING,
                },
                {
                  active:
                    selectedPaymentTemplateMethod ===
                    PaymentTemplateMethod.RECURRING,
                },
              ])}
              onClick={(): void =>
                handlePaymentTemplateMethod(PaymentTemplateMethod.RECURRING)
              }
            >
              {PaymentTemplateMethod.RECURRING}
            </button>
          </ButtonWrapper>
        </div>
      )}
      {currentStep > 0 && currentStep < 3 && (
        <>
          <div className="mt-2" />
          <CheckWrapper>
            <PaymentTemplateBoundaryWrapper>
              <ModalInput
                invalid={minAmount !== undefined && !isFloat(minAmount)}
                placeholder="Min Amount"
                value={
                  currentStep === 2
                    ? `${thousandSeparator(minAmount, ',')} min`
                    : minAmount
                }
                handleChange={(e): void => {
                  setMinAmount(e.target.value)
                }}
                hideLabel={true}
                disable={currentStep === 2}
              />
              <ModalInput
                invalid={
                  amount !== undefined &&
                  (!isFloat(amount) ||
                    parseFloat(minAmount) > parseFloat(amount) ||
                    parseFloat(amount) > parseFloat(maxAmount))
                }
                placeholder="Pay Amount"
                value={
                  currentStep === 2
                    ? `${thousandSeparator(amount, ',')} amount`
                    : amount
                }
                handleChange={(e): void => {
                  setAmount(e.target.value)
                }}
                hideLabel={true}
                disable={currentStep === 2}
              />
              <ModalInput
                disable={currentStep === 2}
                invalid={
                  maxAmount !== undefined &&
                  (!isFloat(maxAmount) ||
                    parseFloat(minAmount) > parseFloat(maxAmount))
                }
                placeholder="Max Amount"
                value={
                  currentStep === 2
                    ? `${thousandSeparator(maxAmount, ',')} max`
                    : maxAmount
                }
                handleChange={(e): void => {
                  setMaxAmount(e.target.value)
                }}
                hideLabel={true}
              />
            </PaymentTemplateBoundaryWrapper>
            {currentStep === 2 && (
              <img className="check-icon" src={CheckIcon} alt="check-icon" />
            )}
          </CheckWrapper>
          <div className="mt-2" />
          <CheckWrapper className="d-flex justify-content-between w-100">
            {selectedPaymentTemplateMethod ===
              PaymentTemplateMethod.RECURRING &&
              currentStep === 2 && (
                <div className="d-flex justify-content-center align-items-center">
                  <IconWrapper>
                    <img src={CalendarSortIcon} alt="check-icon" />
                  </IconWrapper>
                  <span className="ml-5 mr-2">{paymentPeriods}</span>
                </div>
              )}
            <DiscountsSelector
              availableDiscounts={availableDiscounts}
              discounts={discounts}
              handleChange={(newDiscount): void => {
                if (currentStep === 1) {
                  if (discounts.includes(newDiscount)) {
                    setDiscounts(
                      discounts.filter((item) => item !== newDiscount),
                    )
                  } else {
                    setDiscounts([...discounts, newDiscount])
                  }
                }
              }}
              updateAvailableDiscounts={(newDiscounts: string[]): void =>
                setAvailableDiscounts(newDiscounts)
              }
              label={
                selectedPaymentTemplateMethod ===
                  PaymentTemplateMethod.RECURRING && currentStep === 2
                  ? 'Discounts'
                  : 'Allowed Discounts'
              }
            />
            {currentStep === 2 && (
              <img className="check-icon" src={CheckIcon} alt="check-icon" />
            )}
          </CheckWrapper>
        </>
      )}

      {currentStep === 3 && (
        <TXStatusBoard className="mx-4 d-flex align-items-center flex-column">
          <Lottie
            height={120}
            width={120}
            options={{
              loop: true,
              autoplay: true,
              animationData: chooseAnimation(signTXStatus),
            }}
          />
          <span className="status">{signTXStatus}</span>
          <span className="message">{generateTXMessage(signTXStatus)}</span>
          {signTXStatus === TXStatus.SUCCESS && (
            <div
              className="transaction mt-2"
              onClick={(): void => {
                navigator.clipboard.writeText('test')
              }}
            >
              <img src={CopyIcon} alt="view transactions" />
            </div>
          )}
        </TXStatusBoard>
      )}

      {enableNextStep() && (
        <NextStep onClick={handleNextStep}>
          <img src={NextStepIcon} alt="next-step" />
        </NextStep>
      )}
      {enablePrevStep() && (
        <PrevStep onClick={handlePrevStep}>
          <img src={NextStepIcon} alt="prev-step" />
        </PrevStep>
      )}
    </Container>
  )
}

export default CreatePaymentTemplateModal
