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
  handleSetWithdrawAddr: (validatorAddress: string) => void
}

const WithdrawAddrModal: React.FunctionComponent<Props> = ({ handleSetWithdrawAddr }) => {
  const handleSubmit = (event) => {
    event.preventDefault()

    const withdrawAddr = event.target.elements['withdrawAddr'].value

    if (withdrawAddr) {
      handleSetWithdrawAddr(withdrawAddr)
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputText
          type="text"
          id="withdrawAddr"
          formStyle={FormStyles.modal}
          text="Withdraw Address"
        />
        <ButtonContainer>
          <button type="submit">Set Withdraw Addr</button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default WithdrawAddrModal
