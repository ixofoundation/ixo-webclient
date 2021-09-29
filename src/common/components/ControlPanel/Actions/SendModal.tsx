import React, { useState } from 'react'
import styled from 'styled-components'
import InputText from 'common/components/Form/InputText/InputText'
import { FormStyles } from 'types/models'
import TokenSelector from 'common/components/TokenSelector/TokenSelector'
import { StepsTransactions } from 'common/components/StepsTransactions/StepsTransactions'

const Container = styled.div`
  padding: 1.5rem 4rem;
  min-width: 38rem;
`

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 1rem;

  button {
    border: 1px solid #00d2ff;
    border-radius: 0.25rem;
    height: 2.25rem;
    width: 6.5rem;
    background: transparent;
    color: white;
    outline: none;
  }
`

interface Props {
  handleSend: (amount: number, receiverAddress: string) => void
}

const SendModal: React.FunctionComponent<Props> = ({ handleSend }) => {
  const steps = ['Recipient', 'Amount', 'Order', 'Sign']
  const [currentStep, setCurrentStep] = useState<number>(1)

  const handleSubmit = (event) => {
    event.preventDefault()

    const amount = event.target.elements['amount'].value
    const receiverAddress = event.target.elements['receiverAddress'].value

    if (amount && receiverAddress) {
      handleSend(amount, receiverAddress)
    }
  }

  return (
    <Container>
      <div className="px-4 pb-4">
        <StepsTransactions
          steps={steps}
          currentStepNo={currentStep}
        />
      </div>

      <TokenSelector
        tokens={[
          {
            denom: 'ixo',
            amount: 13,
          },
        ]}
      />
      <form onSubmit={handleSubmit}>
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
      </form>
    </Container>
  )
}

export default SendModal
