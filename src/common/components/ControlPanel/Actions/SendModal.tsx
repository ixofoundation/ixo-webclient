import React, { useState } from 'react'
import styled from 'styled-components'
import { Currency } from 'types/models'
import TokenSelector from 'common/components/TokenSelector/TokenSelector'
import { StepsTransactions } from 'common/components/StepsTransactions/StepsTransactions'
import ModalInput from 'common/components/ModalInput/ModalInput'
import AmountInput from 'common/components/AmountInput/AmountInput'

import OverlayButtonIcon from 'assets/images/modal/overlaybutton.svg'
import QRCodeIcon from 'assets/images/modal/qrcode.svg'
import NextStepIcon from 'assets/images/modal/nextstep.svg'

import IMG_wallet1 from 'assets/images/exchange/wallet1.svg'
import IMG_wallet2 from 'assets/images/exchange/wallet2.svg'
import IMG_wallet3 from 'assets/images/exchange/wallet3.svg'
import { WalletBox } from 'modules/Entities/SelectedEntity/EntityExchange/Trade/Trade.container.styles'
import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { getBalanceNumber } from 'common/utils/currency.utils'
import { BigNumber } from 'bignumber.js'

const Container = styled.div`
  position: relative;
  padding: 1.5rem 4rem;
  min-width: 34rem;
  min-height: 22rem;
`

const NextStep = styled.div`
  position: absolute;
  right: 10px;
  bottom: 30px;
  cursor: pointer;
`

const OverlayWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 120px;
}
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #235975;
`

const NetworkFee = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 22px;
  color: #83d9f2;

  strong {
    font-weight: bold;
  }
`

interface Props {
  handleSend: (
    wallet: string,
    amount: number,
    receiverAddress: string,
    memo: string,
  ) => void
}

const SendModal: React.FunctionComponent<Props> = ({ handleSend }) => {
  const steps = ['Recipient', 'Amount', 'Order', 'Sign']
  const [asset, setAsset] = useState<Currency>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [address, setAddress] = useState<string>('')
  const [amount, setAmount] = useState<number>(null)
  const [memo, setMemo] = useState<string>('')
  const [memoEdit, setMemoEdit] = useState<boolean>(false)

  const { balances } = useSelector((state: RootState) => state.account)

  const handleAddressChange = (event): void => {
    setAddress(event.target.value)
  }

  const handleTokenChange = (token: Currency): void => {
    setAsset(token)
  }

  const handleAmountChange = (event): void => {
    setAmount(event.target.value)
  }

  const handleMemoChange = (event): void => {
    setMemo(event.target.value)
  }

  const handleWalletClick = (walletType: string): void => {
    handleSend(walletType, amount, address, memo)
  }

  // const handleSubmit = (event): void => {
  //   event.preventDefault()

  //   const amount = event.target.elements['amount'].value
  //   const receiverAddress = event.target.elements['receiverAddress'].value

  //   if (amount && receiverAddress) {
  //     handleSend(amount, receiverAddress)
  //   }
  // }

  const handleNextStep = (): void => {
    setCurrentStep(currentStep + 1)
  }

  const enableNextStep = (): boolean => {
    switch (currentStep) {
      case 0:
        if (asset && address.length > 0) {
          return true
        }
        return false
      case 1:
        if (amount && amount > 0 && !memoEdit) {
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

  return (
    <Container>
      <div className="px-4 pb-4">
        <StepsTransactions steps={steps} currentStepNo={currentStep} />
      </div>

      {currentStep < 3 && (
        <>
          <TokenSelector
            tokens={balances.map((balance) => {
              if (balance.denom === 'uixo') {
                return {
                  denom: 'ixo',
                  amount: getBalanceNumber(new BigNumber(balance.amount)),
                }
              }
              return balance
            })}
            handleChange={handleTokenChange}
            disable={currentStep !== 0}
          />
          <div className="mt-3" />
          <ModalInput
            disable={currentStep !== 0}
            preIcon={QRCodeIcon}
            placeholder="Account Address"
            value={address}
            handleChange={handleAddressChange}
          />
          <OverlayWrapper>
            <img src={OverlayButtonIcon} alt="down" />
          </OverlayWrapper>
        </>
      )}

      {currentStep >= 1 && currentStep <= 2 && (
        <>
          <Divider className="mt-3 mb-4" />
          <AmountInput
            amount={amount}
            memo={memo}
            handleAmountChange={handleAmountChange}
            handleMemoChange={handleMemoChange}
            handleMemoEdit={setMemoEdit}
            disable={currentStep !== 1}
            suffix={asset.denom.toUpperCase()}
          />
          <NetworkFee className="mt-2">
            Network fees: <strong>0.05 {asset.denom.toUpperCase()}</strong>
          </NetworkFee>
        </>
      )}
      {currentStep === 3 && (
        <div className="mx-4">
          <WalletBox onClick={(): void => handleWalletClick('walletconnect')}>
            <img src={IMG_wallet1} alt="wallet1" />
            <span>WalletConnect</span>
          </WalletBox>
          <WalletBox onClick={(): void => handleWalletClick('keplr')}>
            <img src={IMG_wallet2} alt="wallet2" />
            <span>Keplr</span>
          </WalletBox>
          <WalletBox onClick={(): void => handleWalletClick('keysafe')}>
            <img src={IMG_wallet3} alt="wallet3" />
            <span>ixo Keysafe</span>
          </WalletBox>
        </div>
      )}

      {enableNextStep() && (
        <NextStep onClick={handleNextStep}>
          <img src={NextStepIcon} alt="next-step" />
        </NextStep>
      )}

      {/* <form onSubmit={handleSubmit}>
        <InputText
          type="number"
          formStyle={FormStyles.modal}
          text="Amount"
          id="amount"
          step="0.000001"
        />
        <InputText
          type="text"
          id="receiverAddress"
          formStyle={FormStyles.modal}
          text="Receiver Address"
        />
        <ButtonContainer>
          <button type="submit">Send</button>
        </ButtonContainer>
      </form> */}
    </Container>
  )
}

export default SendModal
