import errorAnimation from 'assets/animations/transaction/fail.json'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import CurrencyIcon from 'assets/icons/Currency'
import SyncIcon from 'assets/icons/Sync'



import DiscountsSelector from 'components/Selector/DiscountsSelector/DiscountsSelector'
import ModalInput from 'components/Modal/ModalInput/ModalInput'
import ModalSelector from 'components/Selector/ModalSelector/ModalSelector'
import MultipleRecipient from 'components/Modals/CreatePaymentContractModal/MultipleRecipient/MultipleRecipient'
import { StepsTransactions } from 'components/Modals/common/StepsTransactions/StepsTransactions'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { thousandSeparator } from 'utils/formatters'
import * as Toast from 'utils/toast'
import { checkValidAddress } from 'redux/account/account.utils'
import React, { useEffect, useMemo, useState } from 'react'
import Lottie from 'react-lottie'
import styled from 'styled-components'
import { CheckWrapper, Container, NextStep, PrevStep, TXStatusBoard } from '../styles'
// import { CreatePaymentContract, GetPaymentTemplate } from 'lib/protocol'
// import { useIxoConfigs } from 'hooks/configs'
import {
  // Discount,
  DistributionShare,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/payments/v1/payments'
// import { useAccount } from 'hooks/account'

const PaymentTemplateBoundaryWrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 0.5rem;
`

enum TXStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

// let selectedTemplate: any

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const CreatePaymentTemplateModal: React.FunctionComponent<Props> = ({ open, setOpen }) => {
  // const { paymentCoins } = useIxoConfigs()
  // const { signingClient, did, address } = useAccount()
  const steps = ['Contract', 'Amounts', 'Confirm', 'Sign']
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [
    paymentCurrency,
    // setPaymentCurrency
  ] = useState<string>('IXO')

  const [
    signTXStatus,
    // setSignTXStatus
  ] = useState<TXStatus>(TXStatus.PENDING)

  const [
    minAmount,
    // setMinAmount
  ] = useState<string>()
  const [
    maxAmount,
    // setMaxAmount
  ] = useState<string>()
  const [discounts, setDiscounts] = useState<string[]>([])

  const [paymentTemplate, setPaymentTemplate] = useState<string>()
  const [availableDiscounts, setAvailableDiscounts] = useState<string[]>([])
  const [contractName, setContractName] = useState<string>()
  const [invalidTemplate, setInvalidTemplate] = useState<boolean>(false)
  const [recipients, setRecipients] = useState<DistributionShare[]>([{ address: undefined!, percentage: undefined! }])

  const showNext: boolean = useMemo(() => {
    switch (currentStep) {
      case 0:
        if (
          paymentTemplate === undefined ||
          !contractName ||
          recipients.some((item) => !checkValidAddress(item.address)) ||
          recipients.reduce((a, b) => a + parseFloat(b.percentage), 0) !== 100
        ) {
          return false
        }
        return true
      case 1:
        return true
      case 2:
        return true
      case 3:
      default:
        return false
    }
  }, [currentStep, paymentTemplate, contractName, recipients])

  const showPrev: boolean = useMemo(() => {
    switch (currentStep) {
      case 0:
        return false
      case 1:
      case 2:
        return true
      default:
        return false
    }
  }, [currentStep])

  // const handleInvalidTemplate = (): void => {
  //   setInvalidTemplate(true)
  // }

  const handleInitialize = async (): Promise<void> => {
    if (!paymentTemplate) {
      return
    }
    // const res = await GetPaymentTemplate({ paymentTemplateId: paymentTemplate })
    // if (res?.paymentTemplate) {
    //   const { paymentAmount, paymentMinimum, paymentMaximum, discounts } = res.paymentTemplate
    //   const denom = paymentAmount[0].denom
    //   setPaymentCurrency(paymentCoins!.find((obj) => obj.coinMinimalDenom === denom)!.coinDenom)
    //   setMinAmount(paymentMinimum[0].amount)
    //   setMaxAmount(paymentMaximum[0].amount)
    //   setAvailableDiscounts(discounts.map((obj: Discount) => obj.percent))
    // } else {
    //   handleInvalidTemplate()
    // }
  }

  const handleSubmit = async (): Promise<void> => {
    // const res = await CreatePaymentContract(signingClient, { did, address, recipients })
    // setSignTXStatus(res ? TXStatus.SUCCESS : TXStatus.ERROR)
  }

  const handlePrevStep = (): void => {
    if (currentStep === 2) {
      // setAvailableDiscounts(selectedTemplate.discounts.map((obj: any) => obj.percent))
    }
    setCurrentStep(currentStep - 1)
  }

  const handleNextStep = async (): Promise<void> => {
    setCurrentStep(currentStep + 1)
  }

  const handleStepChange = (index: number): void => {
    setCurrentStep(index)
  }

  const generateTXMessage = (txStatus: TXStatus): string => {
    switch (txStatus) {
      case TXStatus.PENDING:
        return 'Sign the Transaction'
      case TXStatus.SUCCESS:
        return `Contract ID: ${contractName}`
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

  const updateRecipients = (recipient: any, index: any): void => {
    setRecipients(recipients.map((item, key) => (key === index ? recipient : item)))
  }

  const addRecipient = (): void => {
    setRecipients([...recipients, { address: undefined!, percentage: undefined! }])
  }

  const removeRecipient = (index: any): void => {
    setRecipients(recipients.filter((item, key) => key !== index))
  }

  useEffect(() => {
    if (currentStep === 1) {
      handleInitialize()
    } else if (currentStep === 2) {
      setAvailableDiscounts(discounts)
    } else if (currentStep === 3) {
      handleSubmit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep])

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Create Payment Contract',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <Container>
        <div className='px-4 pb-4'>
          <StepsTransactions steps={steps} currentStepNo={currentStep} handleStepChange={handleStepChange} />
        </div>
        {currentStep === 0 && (
          <>
            {/* <ModalSelector
            selectedToken={paymentTemplate}
            tokens={availableTemplates.map((obj) => obj.id)}
            handleChange={(token: string): void => {
              setPaymentTemplate(token)
            }}
            icon={<CurrencyIcon fill="#00D2FF" />}
            placeholder="Select a Payment Template"
          /> */}
            <ModalInput
              invalid={invalidTemplate || (paymentTemplate !== undefined && paymentTemplate.length === 0)}
              invalidLabel='This is not a valid template id'
              preIcon={<CurrencyIcon fill='#00D2FF' width='38' />}
              placeholder='Enter a Template ID'
              value={paymentTemplate!}
              handleChange={(e): void => {
                setInvalidTemplate(false)
                setPaymentTemplate(e.target.value)
              }}
              hideLabel={!invalidTemplate}
            />
            <div className='mt-2' />
            <ModalInput
              invalid={contractName !== undefined && contractName.length === 0}
              preIcon={<SyncIcon fill='#00D2FF' />}
              placeholder='Enter a Contract Name'
              value={contractName!}
              handleChange={(e): void => {
                setContractName(e.target.value)
              }}
              hideLabel={true}
            />
            <div className='mt-2' />
            {/* <ModalInput
            disable={true}
            invalidLabel={'This is not a valid account address'}
            preIcon={QRCodeIcon}
            placeholder="Payer ID"
            value={`From: ${payerId}`}
            hideLabel={true}
          /> */}
            <MultipleRecipient
              recipients={recipients}
              updateRecipients={updateRecipients}
              addRecipient={addRecipient}
              removeRecipient={removeRecipient}
            ></MultipleRecipient>
            {/* <ModalInput
            preIcon={<SyncIcon fill="#00D2FF" />}
            placeholder="Recipient Account"
            invalid={
              recipientAccount !== undefined &&
              !checkValidAddress(recipientAccount)
            }
            invalidLabel={'This is not a valid account address'}
            value={recipientAccount}
            handleChange={(e): void => {
              setRecipientAccount(e.target.value)
            }}
            hideLabel={true}
          /> */}
          </>
        )}

        {currentStep > 0 && currentStep < 3 && (
          <>
            <CheckWrapper>
              <ModalSelector
                selectedToken={paymentCurrency}
                tokens={[paymentCurrency]}
                disable={true}
                icon={<CurrencyIcon fill='#00D2FF' />}
              />
              {currentStep === 2 && <img className='check-icon' src="/assets/images/icon-check.svg" alt='check-icon' />}
            </CheckWrapper>
            <div className='mt-2' />
            <CheckWrapper>
              <ModalInput
                disable={true}
                preIcon={<SyncIcon fill='#00D2FF' />}
                value={paymentTemplate!}
                hideLabel={true}
              />
              {currentStep === 2 && <img className='check-icon' src="/assets/images/icon-check.svg" alt='check-icon' />}
            </CheckWrapper>
            <div className='mt-2' />
            <CheckWrapper>
              <PaymentTemplateBoundaryWrapper>
                <ModalInput
                  value={currentStep === 2 ? `${thousandSeparator(minAmount!, ',')} min` : minAmount!}
                  hideLabel={true}
                  disable={true}
                />
                <ModalInput
                  disable={true}
                  value={currentStep === 2 ? `${thousandSeparator(maxAmount!, ',')} max` : maxAmount!}
                  hideLabel={true}
                />
              </PaymentTemplateBoundaryWrapper>
              {currentStep === 2 && <img className='check-icon' src="/assets/images/icon-check.svg" alt='check-icon' />}
            </CheckWrapper>
            {availableDiscounts.length > 0 && (
              <>
                <div className='mt-2' />
                <CheckWrapper>
                  <DiscountsSelector
                    availableDiscounts={availableDiscounts}
                    discounts={discounts}
                    handleChange={(newDiscount): void => {
                      if (currentStep === 1) {
                        if (discounts[0] === newDiscount) {
                          setDiscounts([])
                        } else {
                          setDiscounts([newDiscount])
                        }
                      }
                    }}
                    label={currentStep === 1 ? 'Grant a Discount' : 'Granted Discount'}
                    alignClass=''
                  />
                  {currentStep === 2 && <img className='check-icon' src="/assets/images/icon-check.svg" alt='check-icon' />}
                </CheckWrapper>
              </>
            )}
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
                    // `payment:contract:${entityDid}:${contractName}`,
                    contractName!,
                  )
                  Toast.successToast(null, 'Contract ID Copied')
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
