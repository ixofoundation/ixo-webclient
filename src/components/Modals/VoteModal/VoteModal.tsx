import styled from 'styled-components'
import InputText from 'components/Form/InputText/InputText'
import { FormStyles } from 'types/models'
import Select from 'components/Form/Select/Select'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { useAccount } from 'hooks/account'
import { GovVoteTrx } from 'lib/protocol'
import { VoteOption } from '@ixo/impactxclient-sdk/types/codegen/cosmos/gov/v1/gov'
import Long from 'long'

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
    border-color: ${(props): string => props.theme.ixoNewBlue};
    option {
      color: ${(props): string => props.theme.ixoNewBlue}};
    }
    &:after {
      border-color: ${(props): string => props.theme.ixoDarkestBlue}};
    }
  }
`

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  givenProposalId?: string
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}

const VoteModal: React.FC<Props> = ({ open, setOpen, givenProposalId, onSubmit }): JSX.Element => {
  const { signingClient, address } = useAccount()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const proposalId: string = givenProposalId || (event.target as any).elements.proposalId.value
    const option: VoteOption = (event.target as any).elements.option.value

    if (proposalId && option) {
      const res = await GovVoteTrx(signingClient, {
        address,
        proposalId: Long.fromString(proposalId),
        option: option,
      })
      console.log('GovVoteTrx', res)
    }
  }

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Vote',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <Container>
        <form onSubmit={onSubmit ?? handleSubmit}>
          {!givenProposalId && (
            <InputText type='text' id='proposalId' formStyle={FormStyles.modal} text='Proposal Id' />
          )}
          <SelectWrapper>
            <Select
              id='option'
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
              text='Options'
              onChange={(): void => {
                // Added as select required onChange Props
              }}
            />
          </SelectWrapper>
          <ButtonContainer>
            <button type='submit'>Vote</button>
          </ButtonContainer>
        </form>
      </Container>
    </ModalWrapper>
  )
}

export default VoteModal
