import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import InputText from 'common/components/Form/InputText/InputText'
import { Currency, FormStyles } from 'types/models'
import TokenSelector from 'common/components/TokenSelector/TokenSelector'

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
  balances: Currency[]
}

const SendModal: FunctionComponent<Props> = ({ balances }) => {
  const handleSubmit = (event): void => {
    event.preventDefault()
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
        <TokenSelector tokens={balances} />
        <ButtonContainer>
          <button type="submit">SELL</button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default SendModal
