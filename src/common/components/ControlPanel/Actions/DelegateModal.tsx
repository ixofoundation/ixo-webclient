import React from 'react'
import styled from 'styled-components'
import InputText from 'common/components/Form/InputText/InputText'
import Select from 'common/components/Form/Select/Select'
import { FormStyles } from 'types/models'

const Container = styled.div`
  padding: 1rem 1rem;
  min-width: 32rem;
`

const SelectWrapper = styled.div`
  select {
    background: transparent;
    color: white;
    border-color: #00D2FF;
    option {
      color: ${(props) => props.theme.ixoBlue}};
    }

    &:after {
      border-color: ${(props) => props.theme.bg.blue}};
    }
  }
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
  handleDelegate: (
    amount: number,
    validatorAddress: string,
    network: string,
  ) => void
}

const DelegateModal: React.FunctionComponent<Props> = ({ handleDelegate }) => {
  const handleSubmit = (event) => {
    event.preventDefault()

    const amount = event.target.elements['amount'].value
    const validatorAddress = event.target.elements['validatorAddress'].value
    const network = event.target.elements['network'].value

    if (amount && validatorAddress && network !== 'default') {
      handleDelegate(amount, validatorAddress, network)
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
          id="validatorAddress"
          formStyle={FormStyles.modal}
          text="Validator Address"
        />
        <SelectWrapper>
          <Select
            id="network"
            options={[
              {
                value: 'pandora-4',
                label: 'Testnet',
              },
              {
                value: 'impacthub-2',
                label: 'Mainnet',
              },
            ]}
            text="Network"
            onChange={(event) => console.log('fffffffff', event)}
          />
        </SelectWrapper>
        <ButtonContainer>
          <button type="submit">Delegate</button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default DelegateModal
