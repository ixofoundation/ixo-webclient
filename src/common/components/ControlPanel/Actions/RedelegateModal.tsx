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
  handleRedelegate: (amount: number, validatorSrcAddress: string, validatorDstAddress: string) => void
}

const RedelegateModal: React.FunctionComponent<Props> = ({ handleRedelegate }) => {
  const handleSubmit = (event): void => {
    event.preventDefault()

    const amount = event.target.elements['amount'].value
    const validatorSrcAddress = event.target.elements['validatorSrcAddress'].value
    const validatorDstAddress = event.target.elements['validatorDstAddress'].value

    if (amount && validatorSrcAddress && validatorDstAddress) {
      handleRedelegate(amount, validatorSrcAddress, validatorDstAddress)
    }
  }

  return (
    <Container>
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
          id="validatorSrcAddress"
          formStyle={FormStyles.modal}
          text="Validator Src Address"
        />
        <InputText
          type="text"
          id="validatorDstAddress"
          formStyle={FormStyles.modal}
          text="Validator Dst Address"
        />
        <ButtonContainer>
          <button type="submit">Redelegate</button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default RedelegateModal
