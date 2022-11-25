import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Lottie from 'react-lottie'
import styled from 'styled-components'
import * as keplr from 'common/utils/keplr'
import TokenSelector from 'common/components/TokenSelector/TokenSelector'
import { StepsTransactions } from 'common/components/StepsTransactions/StepsTransactions'
import ModalInput from 'common/components/ModalInput/ModalInput'
import AmountInput from 'common/components/AmountInput/AmountInput'

import OverlayButtonIcon from 'assets/images/modal/overlaybutton-down.svg'
import QRCodeIcon from 'assets/images/modal/qrcode.svg'
import QRCodeRedIcon from 'assets/images/modal/qrcode-red.svg'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import EyeIcon from 'assets/images/eye-icon.svg'
import CheckIcon from 'assets/images/icon-check.svg'

import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { getBalanceNumber, getUIXOAmount } from 'common/utils/currency.utils'
import { BigNumber } from 'bignumber.js'
import { apiCurrencyToCurrency, checkValidAddress } from 'modules/Account/Account.utils'
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx'
import { broadCastMessage } from 'common/utils/keysafe'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import errorAnimation from 'assets/animations/transaction/fail.json'
import { thousandSeparator } from 'common/utils/formatters'
import { Container, NextStep, PrevStep, OverlayWrapper, Divider, TXStatusBoard, CheckWrapper } from './Modal.styles'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'

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
`

enum TXStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}
interface Props {
  walletType: string
  accountAddress: string
  handleChangeTitle: (newTitle: string) => void
}

const SendModal: React.FunctionComponent<Props> = ({ walletType, accountAddress, handleChangeTitle }) => {
  const steps = ['Recipient', 'Amount', 'Order', 'Sign']
  const [asset, setAsset] = useState<Coin | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [receiverAddress, setReceiverAddress] = useState<string>('')
  const [amount, setAmount] = useState<number | null>(null)
  const [memo, setMemo] = useState<string>('')
  const [memoStatus, setMemoStatus] = useState<string>('nomemo')
  const [balances, setBalances] = useState<Coin[]>([])
  const [signTXStatus, setSignTXStatus] = useState<TXStatus>(TXStatus.PENDING)
  const [signTXhash, setSignTXhash] = useState<string | null>(null)

  const {
    userInfo,
    sequence: userSequence,
    accountNumber: userAccountNumber,
  } = useSelector((state: RootState) => state.account)

  const handleAddressChange = (event: any): void => {
    setReceiverAddress(event.target.value)
  }

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
      let formattedAmount: any = asset
      if (formattedAmount.denom === 'ixo') {
        formattedAmount = {
          amount: getUIXOAmount(String(amount)),
          denom: 'uixo',
        }
      } else {
        formattedAmount = {
          amount: amount,
          denom: formattedAmount.denom,
        }
      }
      // handleSend(walletType, amount, address, memo)
      if (walletType === 'keysafe') {
        const msg = {
          type: 'cosmos-sdk/MsgSend',
          value: {
            amount: [formattedAmount],
            from_address: accountAddress,
            to_address: receiverAddress,
          },
        }
        const fee = {
          amount: [{ amount: String(5000), denom: 'uixo' }],
          gas: String(200000),
        }
        broadCastMessage(userInfo, userSequence as any, userAccountNumber as any, [msg], memo, fee, (hash: any) => {
          if (hash) {
            setSignTXStatus(TXStatus.SUCCESS)
            setSignTXhash(hash)
          } else {
            setSignTXStatus(TXStatus.ERROR)
          }
        })
      } else if (walletType === 'keplr') {
        const [accounts, offlineSigner] = await keplr.connectAccount()
        const address = accounts[0].address
        const client = await keplr.initStargateClient(offlineSigner)

        const payload = {
          msgs: [
            {
              typeUrl: '/cosmos.bank.v1beta1.MsgSend',
              value: MsgSend.fromPartial({
                fromAddress: address,
                toAddress: receiverAddress,
                amount: [formattedAmount],
              }),
            },
          ],
          chain_id: process.env.REACT_APP_CHAIN_ID,
          fee: {
            amount: [{ amount: String(5000), denom: 'uixo' }],
            gas: String(200000),
          },
          memo,
        }

        try {
          const result = await keplr.sendTransaction(client, address, payload)
          if (result) {
            setSignTXStatus(TXStatus.SUCCESS)
            setSignTXhash(result.transactionHash)
          } else {
            // eslint-disable-next-line
            throw 'transaction failed'
          }
        } catch (e) {
          console.error(111, e)
          setSignTXStatus(TXStatus.ERROR)
        }
      }
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
        if (asset && checkValidAddress(receiverAddress)) {
          return true
        }
        return false
      case 1:
        if (amount && amount > 0 && (memoStatus === 'nomemo' || memoStatus === 'memodone')) {
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
    if (currentStep === 0) {
      getBalances(accountAddress).then(({ balances }) => {
        setBalances(
          balances.map((balance: any) => {
            if (balance.denom === 'uixo') {
              //  default to ixo
              setAsset({
                denom: 'ixo',
                amount: getBalanceNumber(new BigNumber(balance.amount)),
              })
              return {
                denom: 'ixo',
                amount: getBalanceNumber(new BigNumber(balance.amount)),
              }
            }
            return balance
          }),
        )
      })
      handleChangeTitle('Send')
    } else if (currentStep === 2) {
      asset && handleChangeTitle(`Send ${asset!.denom!.toUpperCase()}`)
    }
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
              tokens={balances}
              label={(asset && `${thousandSeparator(asset.amount, ',')} Available`) || undefined}
              handleChange={handleTokenChange}
              disable={currentStep !== 0}
            />
            {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
          </CheckWrapper>
          <CheckWrapper>
            <div className='mt-3' />
            <ModalInput
              invalid={receiverAddress.length > 0 && !checkValidAddress(receiverAddress)}
              invalidLabel={'This is not a valid account address'}
              disable={currentStep !== 0}
              preIcon={receiverAddress.length === 0 || checkValidAddress(receiverAddress) ? QRCodeIcon : QRCodeRedIcon}
              placeholder='Account Address'
              value={receiverAddress}
              handleChange={handleAddressChange}
            />
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
              memo={memo}
              memoStatus={memoStatus}
              handleAmountChange={handleAmountChange}
              handleMemoChange={handleMemoChange}
              handleMemoStatus={setMemoStatus}
              disable={currentStep !== 1}
              suffix={asset!.denom!.toUpperCase()}
            />
            {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
          </CheckWrapper>
          <NetworkFee className='mt-2'>
            Network fees: <strong>0.05 {asset!.denom!.toUpperCase()}</strong>
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

export default SendModal
