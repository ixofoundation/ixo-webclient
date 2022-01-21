import errorAnimation from 'assets/animations/transaction/fail.json'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import CurrencyIcon from 'assets/icons/Currency'
import SyncIcon from 'assets/icons/Sync'
import CheckIcon from 'assets/images/modal/check.svg'
import CopyIcon from 'assets/images/modal/copy.svg'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import DiscountsSelector from 'common/components/DiscountsSelector/DiscountsSelector'
import ModalInput from 'common/components/ModalInput/ModalInput'
// import * as keplr from 'common/utils/keplr'
import ModalSelector from 'common/components/ModalSelector/ModalSelector'
import { StepsTransactions } from 'common/components/StepsTransactions/StepsTransactions'
import { RootState } from 'common/redux/types'
import { thousandSeparator } from 'common/utils/formatters'
import { broadCastMessage } from 'common/utils/keysafe'
import { checkValidAddress } from 'modules/Account/Account.utils'
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

const availableTemplates = [
  {
    id: 'payment:template:template1',
    payment_amount: [
      {
        denom: 'uixo',
        amount: '100',
      },
    ],
    payment_minimum: [
      {
        denom: 'uixo',
        amount: '100',
      },
    ],
    payment_maximum: [
      {
        denom: 'uixo',
        amount: '1000',
      },
    ],
    discounts: [
      {
        id: '1',
        percent: '10',
      },
      {
        id: '2',
        percent: '20',
      },
    ],
  },
  {
    id: 'payment:template:template2',
    payment_amount: [
      {
        denom: 'uixo',
        amount: '200',
      },
    ],
    payment_minimum: [
      {
        denom: 'uixo',
        amount: '200',
      },
    ],
    payment_maximum: [
      {
        denom: 'uixo',
        amount: '2000',
      },
    ],
    discounts: [
      {
        id: '1',
        percent: '20',
      },
    ],
  },
]

const CreatePaymentTemplateModal: React.FunctionComponent<Props> = ({
  walletType = 'keysafe',
}) => {
  const steps = ['Template', 'Amounts', 'Confirm', 'Sign']
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
  const [recipientAccount, setRecipientAccount] = useState<string>()
  const [paymentTemplate, setPaymentTemplate] = useState<string>()
  const [availableDiscounts, setAvailableDiscounts] = useState<string[]>([])
  let selectedTemplate

  const generateTXRequestMSG = (): any => {
    const msgs = []
    if (walletType === 'keysafe') {
      msgs.push({
        type: 'payments/MsgCreatePaymentContract',
        value: {
          creator_did: userInfo.didDoc.did,
          payment_template_id: paymentTemplate,
          payment_contract_id: 'payment:contract:contract1',
          payer: payerId,
          recipients: [
            {
              address: recipientAccount,
              percentage: '100',
            },
          ],
          can_deauthorise: 'false',
          discount_id: '1',
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
      selectedTemplate = availableTemplates.find(
        (obj) => obj.id === paymentTemplate,
      )
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
        return 'Your transaction was successful!'
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
          recipientAccount === undefined ||
          !checkValidAddress(recipientAccount) ||
          paymentTemplate === undefined
        ) {
          return false
        }
        return true
      case 1:
        if (discounts.length === 1) {
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
      {currentStep === 0 && (
        <>
          <ModalInput
            disable={true}
            invalidLabel={'This is not a valid account address'}
            preIcon={<SyncIcon fill="#00D2FF" />}
            placeholder="Payer ID"
            value={payerId}
          />
          <ModalInput
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
          />
          <ModalSelector
            selectedToken={paymentTemplate}
            tokens={availableTemplates.map((obj) => obj.id)}
            handleChange={(token: string): void => {
              setPaymentTemplate(token)
            }}
            icon={<CurrencyIcon fill="#00D2FF" />}
            placeholder="Select a Payment Template"
          />
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
          <div className="mt-2" />
          <CheckWrapper>
            <DiscountsSelector
              availableDiscounts={availableDiscounts}
              discounts={discounts}
              handleChange={(newDiscount): void => {
                if (currentStep === 1) {
                  setDiscounts([newDiscount])
                }
              }}
              label={
                currentStep === 1 ? 'Grant a Discount' : 'Granted Discount'
              }
              alignClass=""
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
