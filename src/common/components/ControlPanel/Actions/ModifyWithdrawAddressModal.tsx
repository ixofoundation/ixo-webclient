import React, { FunctionComponent } from 'react'
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
    background: transparent;
    color: white;
    outline: none;
  }
`

interface Props {
  handleModifyWithdrawAddress: (address: string) => void
}

const ModifyWithdrawAddressModal: FunctionComponent<Props> = ({ handleModifyWithdrawAddress }) => {
  const handleSubmit = (event): void => {
    event.preventDefault()

    const address = event.target.elements['address'].value

    if (address) {
      handleModifyWithdrawAddress(address)
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputText
          type="text"
          formStyle={FormStyles.modal}
          text="Withdraw Address"
          id="address"
        />

        <ButtonContainer>
          <button type="submit">Modify Withdraw Address</button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default ModifyWithdrawAddressModal
