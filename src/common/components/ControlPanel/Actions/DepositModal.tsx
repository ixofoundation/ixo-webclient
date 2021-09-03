import React from 'react'
import styled from 'styled-components'
import InputText from 'common/components/Form/InputText/InputText'
import { FormStyles } from 'types/models'

const Container = styled.div`
  padding: 1rem 1rem;
  min-width: 32rem;
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
  handleDeposit: (amount: number, proposalId: string) => void
}

const DepositModal: React.FunctionComponent<Props> = ({ handleDeposit }) => {
  const handleSubmit = (event) => {
    event.preventDefault()

    const amount = event.target.elements['amount'].value
    const proposalId = event.target.elements['proposalId'].value

    if (amount && proposalId) {
      handleDeposit(amount, proposalId)
    }
  }

  return (
    <Container>
      {/* <Title>Delegate Modal</Title> */}
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
          id="proposalId"
          formStyle={FormStyles.modal}
          text="Proposal Id"
        />
        <ButtonContainer>
          <button type="submit">Deposit</button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default DepositModal
