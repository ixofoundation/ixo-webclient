import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InputText from 'common/components/Form/InputText/InputText'
import { FormStyles } from 'types/models'
import Axios from 'axios'
import { Spinner } from 'common/components/Spinner'

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
  validatorAddress: string
  handleUpdate?: (
    validatorAddress: string,
    moniker: string,
    identity: string,
    website: string,
    details: string,
    minDelegation: string,
    commissionRate: string,
  ) => void
}

const UpdateValidatorModal: React.FunctionComponent<Props> = ({
  validatorAddress,
  handleUpdate,
}) => {
  const [validator, setValidator] = useState({
    moniker: '',
    identity: '',
    website: '',
    details: '',
    minDelegation: 0,
    commissionRate: 0,
    commissionRateStep: '0',
  })

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/staking/validators/${validatorAddress}`,
    ).then((response) => {
      if (response.data) {
        setValidator({
          ...response.data.result.description,
          minDelegation: response.data.result.min_self_delegation,
          commissionRate: response.data.result.commission.commission_rates.rate,
          commissionRateStep:
            response.data.result.commission.commission_rates.max_change_rate,
        })
        return
      }
    })
  }, [])
  const handleSubmit = (event) => {
    event.preventDefault()

    const moniker = event.target.elements['moniker'].value
    const identity = event.target.elements['identity'].value
    const website = event.target.elements['website'].value
    const details = event.target.elements['details'].value
    const minDelegation = event.target.elements['minDelegation'].value
    const commissionRate = event.target.elements['commissionRate'].value

    if (moniker !== '') {
      handleUpdate(
        validatorAddress,
        moniker,
        identity,
        website,
        details,
        minDelegation,
        commissionRate,
      )
    }
  }

  if (validator.moniker === '') {
    return (
      <Container>
        <Spinner info="Loading Details..." />
      </Container>
    )
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputText
          type="text"
          formStyle={FormStyles.modal}
          text="Moniker"
          id="moniker"
          defaultValue={validator.moniker}
        />
        <InputText
          type="text"
          formStyle={FormStyles.modal}
          text="Identity"
          id="identity"
          defaultValue={validator.identity}
        />
        <InputText
          type="text"
          formStyle={FormStyles.modal}
          text="Website"
          id="website"
          defaultValue={validator.website}
        />
        <InputText
          type="text"
          formStyle={FormStyles.modal}
          text="Details"
          id="details"
          defaultValue={validator.details}
        />
        <InputText
          formStyle={FormStyles.modal}
          text="Min Delegation"
          id="minDelegation"
          defaultValue={Number(validator.minDelegation)}
          type="number"
          step="0.000001"
        />
        <InputText
          formStyle={FormStyles.modal}
          text="Commission Rate"
          id="commissionRate"
          defaultValue={Number(validator.commissionRate)}
          type="number"
          step={validator.commissionRateStep}
        />
        <ButtonContainer>
          <button type="submit">Update</button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default UpdateValidatorModal
