import CreatePaymentContractModal from 'common/components/ControlPanel/Actions/CreatePaymentContractModal'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import { selectUserDid } from 'modules/Account/Account.selectors'
import {
  selectEntityCreator,
  selectEntityDid,
} from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { selectPaymentCoins } from 'modules/relayer/relayer.selectors'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ContractsPayTable from './components/ContractsPayTable'
import ContractsReceiveTable from './components/ContractsReceiveTable'
import {
  Container,
  SectionTitleContainer,
  SectionTitle,
  StyledButton,
  SectionContainer,
} from './index.style'

export const Payments: React.FunctionComponent = () => {
  const paymentCoins = useSelector(selectPaymentCoins)
  const creatorDid = useSelector(selectEntityCreator)
  const userDid = useSelector(selectUserDid)
  const entityDid = useSelector(selectEntityDid)
  const [newContract, setNewContract] = useState<boolean>(false)

  return (
    <Container>
      <SectionContainer>
        <SectionTitleContainer>
          <SectionTitle>CONTRACTS TO PAY</SectionTitle>
          {creatorDid === userDid && (
            <StyledButton onClick={() => setNewContract(true)}>
              New Contract
            </StyledButton>
          )}
        </SectionTitleContainer>
        <ContractsPayTable />
      </SectionContainer>
      <SectionContainer>
        <SectionTitleContainer>
          <SectionTitle>CONTRACTS TO RECEIVE PAYMENTS</SectionTitle>
        </SectionTitleContainer>
        <ContractsReceiveTable />
      </SectionContainer>
      <ModalWrapper
        isModalOpen={newContract}
        header={{
          title: 'Create a Payment Contract',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setNewContract(false)}
      >
        <CreatePaymentContractModal
          entityDid={entityDid}
          paymentCoins={paymentCoins}
        />
      </ModalWrapper>
    </Container>
  )
}
