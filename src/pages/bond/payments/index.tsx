import React from 'react'
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
  return (
    <Container>
      <SectionContainer>
        <SectionTitleContainer>
          <SectionTitle>CONTRACTS TO PAY</SectionTitle>
          <StyledButton>New Contract</StyledButton>
        </SectionTitleContainer>
        <ContractsPayTable />
      </SectionContainer>
      <SectionContainer>
        <SectionTitleContainer>
          <SectionTitle>CONTRACTS TO RECEIVE PAYMENTS</SectionTitle>
        </SectionTitleContainer>
        <ContractsReceiveTable />
      </SectionContainer>
    </Container>
  )
}
