import React from 'react'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import styled from 'styled-components'
import InputText from 'components/Form/InputText/InputText'
import { FormStyles } from 'types/models'
import { useAccount } from 'hooks/account'
import { GovDepositTrx } from 'lib/protocol'
import { getMinimalAmount } from 'utils/currency'
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

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const DepositModal: React.FunctionComponent<Props> = ({ open, setOpen }) => {
  const { signingClient, address } = useAccount()

  const handleDeposit = async (amount: number, proposalId: string): Promise<void> => {
    await GovDepositTrx(signingClient, {
      address,
      proposalId: Long.fromString(proposalId),
      amount: [
        {
          amount: getMinimalAmount(amount),
          denom: 'uixo',
        },
      ],
    })
  }
  const handleSubmit = (event: any) => {
    event.preventDefault()

    const amount = event.target.elements['amount'].value
    const proposalId = event.target.elements['proposalId'].value

    if (amount && proposalId) {
      handleDeposit(amount, proposalId)
    }
  }

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Deposit',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <Container>
        <form onSubmit={handleSubmit}>
          <InputText type='number' formStyle={FormStyles.modal} text='Amount' id='amount' step='0.000001' />
          <InputText type='text' id='proposalId' formStyle={FormStyles.modal} text='Proposal Id' />
          <ButtonContainer>
            <button type='submit'>Deposit</button>
          </ButtonContainer>
        </form>
      </Container>
    </ModalWrapper>
  )
}

export default DepositModal
