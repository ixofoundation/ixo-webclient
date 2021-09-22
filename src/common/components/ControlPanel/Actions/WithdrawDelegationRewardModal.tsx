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
    width: 14.5rem;
    background: transparent;
    color: white;
    outline: none;
  }
`

interface Props {
  handleWithdrawDelegationReward: (validatorAddress: string) => void
}

const WithdrawDelegationRewardModal: React.FunctionComponent<Props> = ({ handleWithdrawDelegationReward }) => {
  const handleSubmit = (event) => {
    event.preventDefault()

    const validatorAddress = event.target.elements['validatorAddress'].value

    if (validatorAddress) {
      handleWithdrawDelegationReward(validatorAddress)
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputText
          type="text"
          id="validatorAddress"
          formStyle={FormStyles.modal}
          text="Validator Address"
        />
        <ButtonContainer>
          <button type="submit">Withdraw Delegation Reward</button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default WithdrawDelegationRewardModal
