import React, { useEffect, useMemo, useState } from 'react'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import { StepsTransactions } from 'common/components/StepsTransactions/StepsTransactions'

import OverlayButtonIcon from 'assets/images/modal/overlaybutton-down.svg'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import { ReactComponent as QRCodeIcon } from 'assets/images/modal/qrcode.svg'
import {
  Container,
  NextStep,
  PrevStep,
  OverlayWrapper,
  Divider,
} from '../styles'
import { Coin } from '@cosmjs/proto-signing'
import { useAccount } from 'modules/Account/Account.hooks'
import { ModalInput, SignStep, TokenSelector } from '../common'
import { checkValidAddress } from 'modules/Account/Account.utils'
import { useIxoConfigs } from 'states/configs/configs.hooks'
import BigNumber from 'bignumber.js'
import { TXStatus } from '../common/SignStep'
import { BankSendTrx } from 'common/utils'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const SendModal: React.FunctionComponent<Props> = ({ open, setOpen }) => {
  const { balances, signingClient, address } = useAccount()
  const { getAssetPairs, convertToDenom } = useIxoConfigs()
  const steps = ['Recipient', 'Amount', 'Order', 'Sign']
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [selectedCoin, setSelectedCoin] = useState<Coin>(undefined)
  const [recipientAddress, setRecipientAddress] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [txStatus, setTxStatus] = useState<TXStatus>(TXStatus.PENDING)
  const [txHash, setTxHash] = useState<string>('')

  const validAmount = useMemo(() => {
    if (!selectedCoin || !amount) {
      return false
    }
    const token = convertToDenom(selectedCoin)
    return new BigNumber(amount).isLessThan(new BigNumber(token?.amount))
    // eslint-disable-next-line
  }, [amount, selectedCoin])

  const canNext = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          selectedCoin &&
          recipientAddress &&
          checkValidAddress(recipientAddress)
        )
      case 1:
        return amount && validAmount
      case 2:
        return true
      default:
        return false
    }
  }, [currentStep, recipientAddress, validAmount, selectedCoin, amount])
  const canPrev = useMemo(() => {
    switch (currentStep) {
      case 0:
        return false
      case 1:
        return true
      case 2:
        return true
      default:
        return false
    }
  }, [currentStep])

  const handleSend = async (): Promise<void> => {
    try {
      const pair = getAssetPairs().find(
        (item) => item.base === selectedCoin.denom,
      )
      if (!pair) {
        throw new Error('Not found Asset')
      }
      const minimalAmount = new BigNumber(amount)
        .times(Math.pow(10, pair.exponent))
        .toString()
      const res = await BankSendTrx(signingClient, address, recipientAddress, {
        denom: selectedCoin.denom,
        amount: minimalAmount,
      })
      if (res) {
        const { transactionHash, code } = res
        if (code !== 0) {
          throw new Error('MsgSend failed')
        }
        setTxStatus(TXStatus.SUCCESS)
        setTxHash(transactionHash)
      }
    } catch (e) {
      console.error('handleSend', e)
      setTxStatus(TXStatus.ERROR)
      setTxHash('')
    }
  }

  useEffect(() => {
    if (currentStep === 3) {
      handleSend()
    }
    // eslint-disable-next-line
  }, [currentStep])

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Send',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <Container>
        <div className="px-4 pb-4">
          <StepsTransactions
            steps={steps}
            currentStepNo={currentStep}
            handleStepChange={(i): void => setCurrentStep(i)}
          />
        </div>

        {currentStep < 3 && (
          <div className="d-flex flex-column position-relative">
            <TokenSelector
              selectedToken={selectedCoin}
              tokens={balances}
              handleChange={(coin): void => setSelectedCoin(coin)}
              disabled={currentStep !== 0}
              className="mb-2"
            />
            <ModalInput
              name="recipient_address"
              error={
                recipientAddress &&
                !checkValidAddress(recipientAddress) &&
                'This is not a valid account address'
              }
              disabled={currentStep !== 0}
              preIcon={<QRCodeIcon />}
              placeholder="Account Address"
              value={recipientAddress}
              onChange={(event): void =>
                setRecipientAddress(event.target.value)
              }
            />
            <OverlayWrapper>
              <img src={OverlayButtonIcon} alt="down" />
            </OverlayWrapper>
          </div>
        )}

        {currentStep >= 1 && currentStep <= 2 && (
          <>
            <Divider className="my-4" />
            <ModalInput
              name="send_amount"
              disabled={currentStep !== 1}
              placeholder="Amount"
              value={amount}
              onChange={(e): void => {
                const value = e.target.value
                if (!isNaN(+value)) {
                  setAmount(value)
                }
              }}
              error={amount && !validAmount && 'Insufficient funds'}
              type="text"
            />
          </>
        )}
        {currentStep === 3 && <SignStep status={txStatus} hash={txHash} />}

        <NextStep
          show={canNext}
          onClick={(): void => setCurrentStep(currentStep + 1)}
        >
          <img src={NextStepIcon} alt="next-step" />
        </NextStep>
        <PrevStep
          show={canPrev}
          onClick={(): void => setCurrentStep(currentStep - 1)}
        >
          <img src={NextStepIcon} alt="prev-step" />
        </PrevStep>
      </Container>
    </ModalWrapper>
  )
}

export default SendModal
