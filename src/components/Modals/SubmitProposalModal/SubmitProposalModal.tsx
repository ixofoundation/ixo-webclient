import React from 'react'
import styled from 'styled-components'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import InputText from 'components/Form/InputText/InputText'
import { FormStyles } from 'types/models'
import { GovSubmitProposalTrx } from 'lib/protocol'
import { useAccount } from 'redux/account/account.hooks'
import { getMinimalAmount } from 'utils/currency'
import { Coin } from '@cosmjs/proto-signing'

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
  open: boolean
  setOpen: (open: boolean) => void
}

const SubmitProposalModal: React.FunctionComponent<Props> = ({ open, setOpen }) => {
  const { signingClient, address } = useAccount()

  const handleSubmitProposal = async (title: string, description: string, amount: number): Promise<void> => {
    const initialDeposit: Coin[] = [
      {
        denom: 'uixo',
        amount: getMinimalAmount(amount),
      },
    ]
    await GovSubmitProposalTrx(signingClient, {
      address,
      initialDeposit,
      title,
      description,
    })
  }

  const handleSubmit = (event: any): void => {
    event.preventDefault()

    const amount = event.target.elements['amount'].value
    const title = event.target.elements['title'].value
    const description = event.target.elements['description'].value

    if (amount && title && description) {
      handleSubmitProposal(title, description, amount)
    }
  }

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Submit Proposal',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <Container>
        <form onSubmit={handleSubmit}>
          <InputText type='text' id='title' formStyle={FormStyles.modal} text='Title' />
          <InputText type='text' id='description' formStyle={FormStyles.modal} text='Description' />
          <InputText type='number' formStyle={FormStyles.modal} text='Amount' id='amount' step='0.000001' />

          <ButtonContainer>
            <button type='submit'>Submit</button>
          </ButtonContainer>
        </form>
      </Container>
    </ModalWrapper>
  )
}

export default SubmitProposalModal
