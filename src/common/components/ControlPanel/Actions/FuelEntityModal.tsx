import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InputText from 'common/components/Form/InputText/InputText'
import { FormStyles } from 'types/models'
import Axios from 'axios'

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
  entityDid: string
  handleFuel: (wallet: string, amount: number, accountAddress: string, memo: string) => void
}

const FuelEntityModal: React.FunctionComponent<Props> = ({
  entityDid,
  handleFuel,
}) => {
  const [projectAddress, setProjectAddress] = useState('')
  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/projectAccounts/${entityDid}`,
    ).then((response) => {
      setProjectAddress(response.data.map[entityDid])
    })
  }, [])

  const handleSubmit = (event): void => {
    event.preventDefault()

    const amount = event.target.elements['amount'].value

    if (amount) {
      handleFuel('keysafe', amount, projectAddress, '')
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
        <ButtonContainer>
          <button type="submit" disabled={projectAddress === ''}>
            Fuel
          </button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default FuelEntityModal
