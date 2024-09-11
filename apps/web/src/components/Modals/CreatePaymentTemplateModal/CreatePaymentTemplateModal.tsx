import errorAnimation from 'assets/animations/transaction/fail.json'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import CurrencyIcon from 'assets/icons/Currency'
import SyncIcon from 'assets/icons/Sync'




import cx from 'classnames'
import DiscountsSelector from 'components/Selector/DiscountsSelector/DiscountsSelector'
import ModalInput from 'components/Modal/ModalInput/ModalInput'
import { IconWrapper } from 'components/Modal/ModalInput/ModalInput.styles'
import ModalSelector from 'components/Selector/ModalSelector/ModalSelector'
import { StepsTransactions } from 'components/Modals/common/StepsTransactions/StepsTransactions'
import { thousandSeparator } from 'utils/formatters'
import { isFloat, isInteger } from 'utils/validation'
import React, { useEffect, useState, useMemo } from 'react'
import Lottie from 'react-lottie'
import styled from 'styled-components'
import { Container, NextStep, PrevStep, CheckWrapper, TXStatusBoard, ButtonWrapper } from '../styles'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import * as Toast from 'utils/toast'
import { TXStatus } from '../common'
// import { CreatePaymentTemplate } from 'lib/protocol'
// import { useAccount } from 'hooks/account'
// import { Coin } from '@cosmjs/proto-signing'
import { useIxoConfigs } from 'hooks/configs'
import { PaymentCoins } from 'redux/configs/configs.types'

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
interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const CreatePaymentTemplateModal: React.FunctionComponent<Props> = ({ open, setOpen }) => {
  // const { did, address, signingClient } = useAccount()
  const { paymentCoins } = useIxoConfigs()
  const steps = ['Template', 'Amounts', 'Confirm', 'Sign']
  const [currentStep, setCurrentStep] = useState<number>(0)
  const availableCurrencies = paymentCoins!.map((coin: PaymentCoins) => coin.coinDenom)
  const [paymentCurrency, setPaymentCurrency] = useState<string>('IXO')

  const [
    signTXStatus,
    // setSignTXStatus
  ] = useState<TXStatus>(TXStatus.PENDING)

  const [templateName, setTemplateName] = useState<string>()
  const [selectedPaymentTemplateMethod, setSelectedPaymentTemplateMethod] = useState<PaymentTemplateMethod>()
  const [paymentPeriods, setPaymentPeriods] = useState<string>()
  const [minAmount, setMinAmount] = useState<string>()
  const [maxAmount, setMaxAmount] = useState<string>()
  const [discounts, setDiscounts] = useState<string[]>([])
  const [amount, setAmount] = useState<string>()
  const [availableDiscounts, setAvailableDiscounts] = useState<string[]>([
    // '0',
    '5',
    '10',
    '20',
    'other',
  ])

  const showNext: boolean = useMemo(() => {
    switch (currentStep) {
      case 0:
        if (
          selectedPaymentTemplateMethod === undefined ||
          !templateName ||
          (selectedPaymentTemplateMethod === PaymentTemplateMethod.RECURRING && !isInteger(paymentPeriods))
        ) {
          return false
        }
        return true
      case 1:
        if (
          isFloat(minAmount) &&
          isFloat(maxAmount) &&
          parseFloat(maxAmount!) >= parseFloat(minAmount!) &&
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
  }, [selectedPaymentTemplateMethod, templateName, currentStep, paymentPeriods, discounts, maxAmount, minAmount])

  const showPrev: boolean = useMemo(() => {
    switch (currentStep) {
      case 0:
        if (selectedPaymentTemplateMethod === PaymentTemplateMethod.RECURRING) return true
        return false
      case 1:
      case 2:
        return true
      default:
        return false
    }
  }, [currentStep, selectedPaymentTemplateMethod])

  // const generateTXRequestMSG = (): any => {
  //   const msgs = []
  //   const minimalDenom = paymentCoins!.find((currency) => currency.coinDenom === paymentCurrency)!.coinMinimalDenom
  //   switch (selectedPaymentTemplateMethod) {
  //     case PaymentTemplateMethod.FIXED:
  //     case PaymentTemplateMethod.RECURRING:
  //       if (walletType === 'keysafe') {
  //         msgs.push({
  //           type: 'payments/MsgCreatePaymentTemplate',
  //           value: {
  //             creator_did: userInfo.didDoc.did,
  //             payment_template: {
  //               id: `payment:template:${entityDid}:${templateName}`,
  //               payment_amount: [{ amount: amount, denom: minimalDenom }],
  //               payment_minimum: [{ amount: minAmount, denom: minimalDenom }],
  //               payment_maximum: [{ amount: maxAmount, denom: minimalDenom }],
  //               discounts: discounts.map((discount, index) => {
  //                 return {
  //                   id: String(index + 1),
  //                   percent: percentageFormat(discount),
  //                 }
  //               }),
  //             },
  //           },
  //         })
  //       }
  //       break
  //     default:
  //       break
  //   }
  //   return msgs
  // }

  const handleSubmit = async (): Promise<void> => {
    // const minimalDenom = paymentCoins!.find(
    //   (currency: PaymentCoins) => currency.coinDenom === paymentCurrency,
    // )!.coinMinimalDenom
    // const paymentAmount: Coin = { denom: minimalDenom, amount: amount ?? '0' }
    // const paymentMinimum: Coin = { denom: minimalDenom, amount: minAmount ?? '0' }
    // const paymentMaximum: Coin = { denom: minimalDenom, amount: maxAmount ?? '0' }
    // const res = await CreatePaymentTemplate(signingClient, {
    //   did,
    //   address,
    //   paymentAmount,
    //   paymentMinimum,
    //   paymentMaximum,
    // })
    // setSignTXStatus(res ? TXStatus.SUCCESS : TXStatus.ERROR)
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
        return `Template ID: ${templateName}`
      case TXStatus.ERROR:
        return `Something went wrong!\nPlease try again`
      default:
        return ''
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

  useEffect(() => {
    if (currentStep === 3) {
      handleSubmit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep])

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Create Payment Template',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <Container>
        <div className='px-4 pb-4'>
          <StepsTransactions steps={steps} currentStepNo={currentStep} handleStepChange={handleStepChange} />
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
                placeholder='Select a Payment Currency'
                icon={<CurrencyIcon fill='#00D2FF' />}
              />
              {currentStep === 2 && <img className='check-icon' src="/assets/images/icon-check.svg" alt='check-icon' />}
            </CheckWrapper>
            <div className='mt-2' />
            <CheckWrapper>
              <ModalInput
                disable={currentStep === 2}
                invalid={templateName !== undefined && templateName.length === 0}
                // invalidLabel={'This is not a valid template name'}
                preIcon={<SyncIcon fill='#00D2FF' />}
                placeholder='Enter a Template Name'
                value={templateName!}
                handleChange={(e): void => {
                  setTemplateName(e.target.value)
                }}
                hideLabel={true}
              />
              {currentStep === 2 && <img className='check-icon' src="/assets/images/icon-check.svg" alt='check-icon' />}
            </CheckWrapper>
          </>
        )}

        {currentStep === 0 && (
          <div className='mt-4'>
            <ButtonWrapper className='justify-content-end'>
              {selectedPaymentTemplateMethod !== PaymentTemplateMethod.RECURRING && (
                <button
                  className={cx([
                    {
                      inactive: selectedPaymentTemplateMethod !== PaymentTemplateMethod.FIXED,
                    },
                    {
                      active: selectedPaymentTemplateMethod === PaymentTemplateMethod.FIXED,
                    },
                  ])}
                  onClick={(): void => handlePaymentTemplateMethod(PaymentTemplateMethod.FIXED)}
                >
                  {PaymentTemplateMethod.FIXED}
                </button>
              )}
              {selectedPaymentTemplateMethod === PaymentTemplateMethod.RECURRING && (
                <CheckWrapper>
                  <ModalInput
                    invalid={paymentPeriods !== undefined && !isInteger(paymentPeriods)}
                    invalidLabel={'This is not a valid number of periods'}
                    preIcon={CalendarSortIcon}
                    placeholder='Number of Periods'
                    value={paymentPeriods!}
                    handleChange={(e): void => {
                      setPaymentPeriods(e.target.value)
                    }}
                  />
                </CheckWrapper>
              )}
              <button
                className={cx([
                  {
                    inactive: selectedPaymentTemplateMethod !== PaymentTemplateMethod.RECURRING,
                  },
                  {
                    active: selectedPaymentTemplateMethod === PaymentTemplateMethod.RECURRING,
                  },
                ])}
                onClick={(): void => handlePaymentTemplateMethod(PaymentTemplateMethod.RECURRING)}
              >
                {PaymentTemplateMethod.RECURRING}
              </button>
            </ButtonWrapper>
          </div>
        )}
        {currentStep > 0 && currentStep < 3 && (
          <>
            <div className='mt-2' />
            <CheckWrapper>
              <PaymentTemplateBoundaryWrapper>
                <ModalInput
                  invalid={minAmount !== undefined && !isFloat(minAmount)}
                  placeholder='Min Amount'
                  value={currentStep === 2 ? `${thousandSeparator(minAmount!, ',')} min` : minAmount!}
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
                      parseFloat(minAmount!) > parseFloat(amount) ||
                      parseFloat(amount) > parseFloat(maxAmount!))
                  }
                  placeholder='Pay Amount'
                  value={currentStep === 2 ? `${thousandSeparator(amount!, ',')} amount` : amount!}
                  handleChange={(e): void => {
                    setAmount(e.target.value)
                  }}
                  hideLabel={true}
                  disable={currentStep === 2}
                />
                <ModalInput
                  disable={currentStep === 2}
                  invalid={
                    maxAmount !== undefined && (!isFloat(maxAmount) || parseFloat(minAmount!) > parseFloat(maxAmount))
                  }
                  placeholder='Max Amount'
                  value={currentStep === 2 ? `${thousandSeparator(maxAmount!, ',')} max` : maxAmount!}
                  handleChange={(e): void => {
                    setMaxAmount(e.target.value)
                  }}
                  hideLabel={true}
                />
              </PaymentTemplateBoundaryWrapper>
              {currentStep === 2 && <img className='check-icon' src="/assets/images/icon-check.svg" alt='check-icon' />}
            </CheckWrapper>
            <div className='mt-2' />
            <CheckWrapper className='d-flex justify-content-between w-100'>
              {selectedPaymentTemplateMethod === PaymentTemplateMethod.RECURRING && currentStep === 2 && (
                <div className='d-flex justify-content-center align-items-center'>
                  <IconWrapper>
                    <img src="/assets/images/modal/calendar-sort.svg" alt='check-icon' />
                  </IconWrapper>
                  <span className='ml-5 mr-2'>{paymentPeriods}</span>
                </div>
              )}
              <DiscountsSelector
                availableDiscounts={availableDiscounts}
                discounts={discounts}
                handleChange={(newDiscount): void => {
                  if (currentStep === 1) {
                    if (discounts.includes(newDiscount)) {
                      setDiscounts(discounts.filter((item) => item !== newDiscount))
                    } else {
                      setDiscounts([...discounts, newDiscount])
                    }
                  }
                }}
                updateAvailableDiscounts={(newDiscounts: string[]): void => setAvailableDiscounts(newDiscounts)}
                label={
                  selectedPaymentTemplateMethod === PaymentTemplateMethod.RECURRING && currentStep === 2
                    ? 'Discounts'
                    : 'Allowed Discounts'
                }
              />
              {currentStep === 2 && <img className='check-icon' src="/assets/images/icon-check.svg" alt='check-icon' />}
            </CheckWrapper>
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
              <div
                className='transaction mt-2 copy-icon'
                onClick={(): void => {
                  navigator.clipboard.writeText(
                    // TODO use this when backend is ready
                    // `payment:template:${entityDid}:${templateName}`,
                    templateName!,
                  )
                  Toast.successToast(null, 'Template Id Copied')
                }}
              >
                <img src="/assets/images/modal/copy.svg" alt='view transactions' />
              </div>
            )}
          </TXStatusBoard>
        )}

        <NextStep show={showNext} onClick={handleNextStep}>
          <img src="/assets/images/modal/nextstep.svg" alt='next-step' />
        </NextStep>
        <PrevStep show={showPrev} onClick={handlePrevStep}>
          <img src="/assets/images/modal/nextstep.svg" alt='prev-step' />
        </PrevStep>
      </Container>
    </ModalWrapper>
  )
}

export default CreatePaymentTemplateModal
