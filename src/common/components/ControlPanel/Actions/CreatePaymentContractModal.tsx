import errorAnimation from 'assets/animations/transaction/fail.json'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import CurrencyIcon from 'assets/icons/Currency'
import SyncIcon from 'assets/icons/Sync'
import CheckIcon from 'assets/images/modal/check.svg'
import CopyIcon from 'assets/images/modal/copy.svg'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import Axios from 'axios'
import DiscountsSelector from 'common/components/DiscountsSelector/DiscountsSelector'
import ModalInput from 'common/components/ModalInput/ModalInput'
// import * as keplr from 'common/utils/keplr'
import ModalSelector from 'common/components/ModalSelector/ModalSelector'
import MultipleRecipient from 'common/components/MultipleRecipient/MultipleRecipient'
import { Recipient } from 'common/components/MultipleRecipient/types'
import { StepsTransactions } from 'common/components/StepsTransactions/StepsTransactions'
import { RootState } from 'common/redux/types'
import { percentageFormat, thousandSeparator } from 'common/utils/formatters'
import { broadCastMessage } from 'common/utils/keysafe'
import * as Toast from 'common/utils/Toast'
import { checkValidAddress } from 'modules/Account/Account.utils'
import { PaymentCoins } from 'modules/relayer/types'
import React, { useState } from 'react'
import Lottie from 'react-lottie'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  CheckWrapper,
  Container,
  NextStep,
  PrevStep,
  TXStatusBoard,
} from './Modal.styles'

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

let selectedTemplate

interface Props {
  walletType?: string
  entityDid?: string
  paymentCoins?: PaymentCoins[]
}

const CreatePaymentTemplateModal: React.FunctionComponent<Props> = ({
  entityDid,
  walletType = 'keysafe',
  paymentCoins,
}) => {
  const steps = ['Contract', 'Amounts', 'Confirm', 'Sign']
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [paymentCurrency, setPaymentCurrency] = useState<string>('IXO')

  const memo = ''

  const [signTXStatus, setSignTXStatus] = useState<TXStatus>(TXStatus.PENDING)

  const {
    userInfo,
    sequence: userSequence,
    accountNumber: userAccountNumber,
    address: payerId,
  } = useSelector((state: RootState) => state.account)

  const [minAmount, setMinAmount] = useState<string>()
  const [maxAmount, setMaxAmount] = useState<string>()
  const [discounts, setDiscounts] = useState<string[]>([])

  const [paymentTemplate, setPaymentTemplate] = useState<string>()
  const [availableDiscounts, setAvailableDiscounts] = useState<string[]>([])
  const [contractName, setContractName] = useState<string>()
  const [invalidTemplate, setInvalidTemplate] = useState<boolean>(false)
  const [recipients, setRecipients] = useState<Recipient[]>([
    { address: undefined, percentage: undefined },
  ])

  const generateTXRequestMSG = (): any => {
    const msgs = []
    if (walletType === 'keysafe') {
      msgs.push({
        type: 'payments/MsgCreatePaymentContract',
        value: {
          creator_did: userInfo.didDoc.did,
          payment_template_id: `payment:template:${entityDid}:${paymentTemplate}`,
          payment_contract_id: `payment:contract:${entityDid}:${contractName}`,
          payer: payerId,
          recipients: recipients.map((recipient) => ({
            ...recipient,
            percentage: percentageFormat(recipient.percentage),
          })),
          // can_deauthorise: 'false',
          discount_id: String(
            selectedTemplate.discounts.find(
              (discount) => discount.percent === discounts[0],
            )?.id ?? 0,
          ),
        },
      })
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

  const handleInvalidTemplate = (): void => {
    setInvalidTemplate(true)
  }

  const handlePrevStep = (): void => {
    if (currentStep === 2) {
      setAvailableDiscounts(
        selectedTemplate.discounts.map((obj) => obj.percent),
      )
    }
    setCurrentStep(currentStep - 1)
  }

  const handleNextStep = async (): Promise<void> => {
    if (currentStep === 0) {
      let response
      try {
        response = await Axios.get(
          `${process.env.REACT_APP_GAIA_URL}/ixo/payments/templates/payment:template:${entityDid}:${paymentTemplate}`,
        )
      } catch (err) {
        handleInvalidTemplate()
        return
      }

      if (response.data.payment_template) {
        selectedTemplate = {
          ...response.data.payment_template,
          discounts: response.data.payment_template.discounts.map(
            (discount) => ({
              ...discount,
              percent: String(parseFloat(discount.percent)),
            }),
          ),
        }
        setPaymentCurrency(
          paymentCoins.find(
            (obj) =>
              obj.coinMinimalDenom === selectedTemplate.payment_amount[0].denom,
          ).coinDenom,
        )
        setMinAmount(selectedTemplate.payment_minimum[0].amount)
        setMaxAmount(selectedTemplate.payment_maximum[0].amount)
        setAvailableDiscounts(
          selectedTemplate.discounts.map((obj) => obj.percent),
        )
      } else {
        handleInvalidTemplate()
        return
      }
    } else if (currentStep === 1) {
      setAvailableDiscounts(discounts)
    } else if (currentStep === 2) {
      await signingTX()
    }
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

  const enableNextStep = (): boolean => {
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

  const updateRecipients = (recipient, index): void => {
    setRecipients(
      recipients.map((item, key) => (key === index ? recipient : item)),
    )
  }

  const addRecipient = (): void => {
    setRecipients([
      ...recipients,
      { address: undefined, percentage: undefined },
    ])
  }

  const removeRecipient = (index): void => {
    setRecipients(recipients.filter((item, key) => key !== index))
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
            invalid={
              invalidTemplate ||
              (paymentTemplate !== undefined && paymentTemplate.length === 0)
            }
            invalidLabel="This is not a valid template id"
            preIcon={<CurrencyIcon fill="#00D2FF" width="38" />}
            placeholder="Enter a Template ID"
            value={paymentTemplate}
            handleChange={(e): void => {
              setInvalidTemplate(false)
              setPaymentTemplate(e.target.value)
            }}
            hideLabel={!invalidTemplate}
          />
          <div className="mt-2" />
          <ModalInput
            invalid={contractName !== undefined && contractName.length === 0}
            preIcon={<SyncIcon fill="#00D2FF" />}
            placeholder="Enter a Contract Name"
            value={contractName}
            handleChange={(e): void => {
              setContractName(e.target.value)
            }}
            hideLabel={true}
          />
          <div className="mt-2" />
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
              icon={<CurrencyIcon fill="#00D2FF" />}
            />
            {currentStep === 2 && (
              <img className="check-icon" src={CheckIcon} alt="check-icon" />
            )}
          </CheckWrapper>
          <div className="mt-2" />
          <CheckWrapper>
            <ModalInput
              disable={true}
              preIcon={<SyncIcon fill="#00D2FF" />}
              value={paymentTemplate}
              hideLabel={true}
            />
            {currentStep === 2 && (
              <img className="check-icon" src={CheckIcon} alt="check-icon" />
            )}
          </CheckWrapper>
          <div className="mt-2" />
          <CheckWrapper>
            <PaymentTemplateBoundaryWrapper>
              <ModalInput
                value={
                  currentStep === 2
                    ? `${thousandSeparator(minAmount, ',')} min`
                    : minAmount
                }
                hideLabel={true}
                disable={true}
              />
              <ModalInput
                disable={true}
                value={
                  currentStep === 2
                    ? `${thousandSeparator(maxAmount, ',')} max`
                    : maxAmount
                }
                hideLabel={true}
              />
            </PaymentTemplateBoundaryWrapper>
            {currentStep === 2 && (
              <img className="check-icon" src={CheckIcon} alt="check-icon" />
            )}
          </CheckWrapper>
          {availableDiscounts.length > 0 && (
            <>
              <div className="mt-2" />
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
                  label={
                    currentStep === 1 ? 'Grant a Discount' : 'Granted Discount'
                  }
                  alignClass=""
                />
                {currentStep === 2 && (
                  <img
                    className="check-icon"
                    src={CheckIcon}
                    alt="check-icon"
                  />
                )}
              </CheckWrapper>
            </>
          )}
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
              className="transaction mt-2 copy-icon"
              onClick={(): void => {
                navigator.clipboard.writeText(
                  // TODO use this when backend is ready
                  // `payment:contract:${entityDid}:${contractName}`,
                  contractName,
                )
                Toast.successToast('Contract Id Copied')
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
