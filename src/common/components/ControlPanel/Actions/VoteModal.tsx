import React from 'react'
import styled from 'styled-components'
import InputText from 'common/components/Form/InputText/InputText'
import { FormStyles } from 'types/models'
import Select from 'common/components/Form/Select/Select'

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

interface Props {
  specificProposalId?: number
  handleVote: (proposalId: string, answer: number) => void
}

const VoteModal: React.FunctionComponent<Props> = ({ specificProposalId, handleVote }) => {
  const handleSubmit = (event) => {
    event.preventDefault()

    const proposalId = specificProposalId ? specificProposalId : event.target.elements['proposalId'].value
    let answer = event.target.elements['option'].value

    if (!answer) {
      answer = 0
    }

    if (proposalId) {
      handleVote(proposalId, answer)
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {!specificProposalId && (
          <InputText
            type="text"
            id="proposalId"
            formStyle={FormStyles.modal}
            text="Proposal Id"
          />
        )}
        <SelectWrapper>
          <Select
            id="option"
            options={[
              {
                value: 1,
                label: 'Yes',
              },
              {
                value: 3,
                label: 'No',
              },
              {
                value: 4,
                label: 'No with Vote',
              },
              {
                value: 2,
                label: 'Abstain',
              },
            ]}
            text="Options"
            onChange={(event) => console.log('fffffffff', event)}
          />
        </SelectWrapper>
        <ButtonContainer>
          <button type="submit">Vote</button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default VoteModal
