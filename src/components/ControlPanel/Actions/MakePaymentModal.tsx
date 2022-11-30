import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import errorAnimation from 'assets/animations/transaction/fail.json'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import SyncIcon from 'assets/icons/Sync'
import EyeIcon from 'assets/images/eye-icon.svg'
import CloseIcon from 'assets/images/icon-close.svg'
import CheckIcon from 'assets/images/icon-check.svg'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import OverlayButtonIcon from 'assets/images/modal/overlaybutton-down.svg'
import QRCodeIcon from 'assets/images/modal/qrcode.svg'
import Axios from 'axios'
import { BigNumber } from 'bignumber.js'
import cx from 'classnames'
import AmountInput from 'components/AmountInput/AmountInput'
import ModalInput from 'components/ModalInput/ModalInput'
import ModalSelector from 'components/ModalSelector/ModalSelector'
import ModalTextArea from 'components/ModalTextArea/ModalTextArea'
import { StepsTransactions } from 'components/StepsTransactions/StepsTransactions'
import TokenSelector from 'components/TokenSelector/TokenSelector'
import { RootState } from 'redux/types'
import { getDisplayAmount } from 'utils/currency'
import { simplifyId, thousandSeparator } from 'utils/formatters'
import { broadCastMessage } from 'lib/keysafe/keysafe'
import { apiCurrencyToCurrency } from 'redux/account/account.utils'
import React, { useEffect, useMemo, useState } from 'react'
import Lottie from 'react-lottie'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  ButtonWrapper,
  CheckWrapper,
  Container,
  NextStep,
  PrevStep,
  TXStatusBoard,
  OverlayWrapper,
  Divider,
} from './Modal.styles'

const NetworkFee = styled.div`
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 22px;
  color: #83d9f2;

  strong {
    font-weight: bold;
  }

  &.error {
    color: #cd1c33;
    text-align: left;
  }
`

enum TXStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

enum MakePaymentMethod {
  TEMPLATE = 'New Template',
  CONTRACT = 'New Contract',
  CANCEL = 'Cancel This Contract',
}
interface Props {
  entityDid?: string
  walletType?: string
  accountAddress?: string
  handleCreateTemplate?: () => void
  handleCreateContract?: () => void
  handleCancelContract?: () => void
  contractId?: string
}

const MakePaymentModal: React.FunctionComponent<Props> = ({
  entityDid,
  walletType = 'keysafe',
  accountAddress,
  handleCreateTemplate,
  handleCreateContract,
  handleCancelContract,
  contractId,
}) => {
  const steps = ['Contract', 'Amount', 'Order', 'Sign']
  const [asset, setAsset] = useState<Coin | null>(null)
  const [contractName, setContractName] = useState<string | undefined>(
    contractId ? simplifyId(contractId, `payment:contract:${entityDid}`) : undefined,
  )
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [amount, setAmount] = useState<number | null>(null)
  const [memo, setMemo] = useState<string>('')
  const [memoStatus, setMemoStatus] = useState<string>('nomemo')
  const [balances, setBalances] = useState<Coin[]>([])
  const [signTXStatus, setSignTXStatus] = useState<TXStatus>(TXStatus.PENDING)
  const [signTXhash, setSignTXhash] = useState<string | null>(null)
  const [availableContracts, setAvailableContracts] = useState<any[]>([])
  const [showMultiRecipients, setShowMultiRecipients] = useState<boolean>(false)

  const {
    userInfo,
    sequence: userSequence,
    accountNumber: userAccountNumber,
  } = useSelector((state: RootState) => state.account)

  const handleTokenChange = (token: Coin): void => {
    setAsset(token)
  }

  const handleAmountChange = (event: any): void => {
    setAmount(event.target.value)
  }

  const handleMemoChange = (event: any): void => {
    const value = event.target.value
    setMemo(value)
    if (value.length > 0) {
      setMemoStatus('memowith')
    } else {
      setMemoStatus('nomemo')
    }
  }

  const handlePrevStep = (): void => {
    setCurrentStep(currentStep - 1)
  }
  const handleNextStep = async (): Promise<void> => {
    setCurrentStep(currentStep + 1)
    if (currentStep === 2) {
      // let formattedAmount: any = asset
      // if (formattedAmount.denom === 'ixo') {
      //   formattedAmount = {
      //     amount: getMinimalAmount(String(amount)),
      //     denom: 'uixo',
      //   }
      // }

      if (walletType === 'keysafe') {
        const msgs = [
          {
            type: 'payments/MsgEffectPayment',
            value: {
              sender_did: userInfo.didDoc.did,
              payment_contract_id: `payment:contract:${entityDid}:${contractName}`,
            },
          },
        ]
        const fee = {
          amount: [{ amount: String(5000), denom: 'uixo' }],
          gas: String(200000),
        }
        broadCastMessage(userInfo, userSequence as any, userAccountNumber as any, msgs, memo, fee, (hash: any) => {
          if (hash) {
            setSignTXStatus(TXStatus.SUCCESS)
            setSignTXhash(hash)
          } else {
            setSignTXStatus(TXStatus.ERROR)
          }
        })
      } else if (walletType === 'keplr') {
        // const [accounts, offlineSigner] = await keplr.connectAccount()
        // const address = accounts[0].address
        // const client = await keplr.initStargateClient(offlineSigner)
        // const payload = {
        //   msgAny: {
        //     typeUrl: '/cosmos.bank.v1beta1.MsgSend',
        //     value: MsgSend.fromPartial({
        //       fromAddress: address,
        //       toAddress: receiverAddress,
        //       amount: [formattedAmount],
        //     }),
        //   },
        //   chain_id: process.env.REACT_APP_CHAIN_ID,
        //   fee: {
        //     amount: [{ amount: String(5000), denom: 'uixo' }],
        //     gas: String(200000),
        //   },
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
  }

  const handleStepChange = (index: number): void => {
    setCurrentStep(index)
  }

  const handleViewTransaction = (): void => {
    window.open(`${process.env.REACT_APP_BLOCK_SCAN_URL}/transactions/${signTXhash}`, '_blank')!.focus()
  }

  const checkValidAmount = (): boolean => {
    // TODO:
    // if (amount >= asset.amount) {
    //   return false
    // }
    return true
  }

  const enableNextStep = (): boolean => {
    if (showMultiRecipients) return false
    switch (currentStep) {
      case 0:
        if (asset && contractName) {
          return true
        }
        return false
      case 1:
        if (amount && amount > 0 && (memoStatus === 'nomemo' || memoStatus === 'memodone') && checkValidAmount()) {
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
    if (showMultiRecipients) return false
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

  const getBalances = async (address: string): Promise<any> => {
    return Axios.get(process.env.REACT_APP_GAIA_URL + '/bank/balances/' + address).then((response) => {
      return {
        balances: response.data.result.map((coin: any) => apiCurrencyToCurrency(coin)),
      }
    })
  }

  const generateTXMessage = (txStatus: TXStatus): string => {
    switch (txStatus) {
      case TXStatus.PENDING:
        return 'Your transaction has been submittted'
      case TXStatus.SUCCESS:
        return 'Your transaction was successful!'
      case TXStatus.ERROR:
        return `Something went wrong!\nPlease try again`
      default:
        return ''
    }
  }

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/ixo/payments/contracts_by_id_prefix/payment:contract:${entityDid}`,
    ).then((response) => {
      setAvailableContracts(
        response.data.payment_contracts.map((item: any) => ({
          ...item,
          id: simplifyId(item.id, `payment:contract:${entityDid}`),
        })),
      )
    })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (contractName && availableContracts.length) {
      const templateId = availableContracts.find((obj) => obj.id === contractName).payment_template_id

      Axios.get(`${process.env.REACT_APP_GAIA_URL}/ixo/payments/templates/${templateId}`).then((response) => {
        setAmount(response.data.payment_template?.payment_amount[0].amount)
      })
    }
    // eslint-disable-next-line
  }, [contractName, availableContracts])

  useEffect(() => {
    if (currentStep === 0) {
      getBalances(accountAddress!).then(({ balances }) => {
        setBalances(
          balances.map((balance: any) => {
            if (balance.denom === 'uixo') {
              setAsset({
                denom: 'ixo',
                amount: getDisplayAmount(new BigNumber(balance.amount)),
              })
              return {
                denom: 'ixo',
                amount: getDisplayAmount(new BigNumber(balance.amount)),
              }
            }
            return balance
          }),
        )
      })
    }
    if (currentStep < 3) {
      setSignTXStatus(TXStatus.PENDING)
      setSignTXhash(null)
    }
    // eslint-disable-next-line
  }, [currentStep])

  const recipients = useMemo(() => {
    if (contractName && availableContracts.length)
      return availableContracts
        .find((obj) => obj.id === contractName)
        .recipients.map((item: any) => `${String(parseFloat(item.percentage)).padStart(2, '0')}% ${item.address}`)
        .join('\n')
  }, [contractName, availableContracts])

  const handleRecipientsClick = (): void => {
    setShowMultiRecipients(true)
  }

  return (
    <Container>
      <div className='px-4 pb-4'>
        <StepsTransactions steps={steps} currentStepNo={currentStep} handleStepChange={handleStepChange} />
      </div>

      {currentStep > 0 && currentStep < 3 && showMultiRecipients && (
        <ModalTextArea value={recipients} rows={7} disabled readOnly />
      )}

      {currentStep < 3 && !showMultiRecipients && (
        <CheckWrapper>
          <TokenSelector
            selectedToken={asset!}
            tokens={balances}
            handleChange={handleTokenChange}
            disable={currentStep !== 0}
            label={(asset && `${thousandSeparator(asset.amount, ',')} Available`) || undefined}
          />
          {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
          <div className='mt-3' />
        </CheckWrapper>
      )}

      {currentStep === 0 && (
        <>
          <ModalSelector
            selectedToken={contractName}
            tokens={availableContracts.map((obj) => obj.id)}
            handleChange={(token: string): void => {
              setContractName(token)
            }}
            icon={<SyncIcon fill='#00D2FF' />}
            placeholder='Select a Payment Contract'
            disable={contractId !== undefined}
          />
          <OverlayWrapper>
            <img src={OverlayButtonIcon} alt='down' />
          </OverlayWrapper>
          <div className='mt-5' />
        </>
      )}

      {currentStep > 0 && currentStep < 3 && !showMultiRecipients && (
        <>
          <CheckWrapper>
            <ModalInput
              disable={false}
              preIcon={QRCodeIcon}
              value='Multiple Receiving Accounts (Click to view)'
              handleClick={handleRecipientsClick}
            />
            {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
            <div className='mt-3' />
          </CheckWrapper>
          <OverlayWrapper>
            <img src={OverlayButtonIcon} alt='down' />
          </OverlayWrapper>
        </>
      )}

      {currentStep === 0 && (
        <div className='mt-4'>
          <ButtonWrapper className='px-4'>
            <button className='inactive' onClick={(): void => handleCreateTemplate!()}>
              {MakePaymentMethod.TEMPLATE}
            </button>
            <button className='inactive' onClick={(): void => handleCreateContract!()}>
              {MakePaymentMethod.CONTRACT}
            </button>
            <button className='inactive' onClick={(): void => handleCancelContract!()}>
              {MakePaymentMethod.CANCEL}
            </button>
          </ButtonWrapper>
        </div>
      )}

      {currentStep > 0 && currentStep < 3 && !showMultiRecipients && (
        <>
          <Divider className='mt-3 mb-4' />
          <CheckWrapper>
            <AmountInput
              amount={amount!}
              memo={memo}
              memoStatus={memoStatus}
              handleAmountChange={handleAmountChange}
              handleMemoChange={handleMemoChange}
              handleMemoStatus={setMemoStatus}
              disable={true}
              error={!checkValidAmount()}
              suffix={asset!.denom!.toUpperCase()}
            />
            {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
          </CheckWrapper>
          <NetworkFee className={cx('mt-2', { error: !checkValidAmount() })}>
            {checkValidAmount() ? (
              <>
                Network fees: <strong>0.05 {asset!.denom!.toUpperCase()}</strong>
              </>
            ) : (
              <>Exceeds your available Account Balance</>
            )}
          </NetworkFee>
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

      {showMultiRecipients && (
        <NextStep onClick={(): void => setShowMultiRecipients(false)}>
          <img src={CloseIcon} alt='close-multiple-recipients' />
        </NextStep>
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

export default MakePaymentModal
