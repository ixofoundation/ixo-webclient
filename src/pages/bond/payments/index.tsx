import React from 'react'
import PaymentTable from './components/PaymentTable'
import {
  Container,
  SectionTitleContainer,
  SectionTitle,
  StyledButton,
} from './index.style'

export const Payments: React.FunctionComponent = () => {
  return (
    <Container>
      <SectionTitleContainer>
        <SectionTitle>PAYMENT CONTRACTS</SectionTitle>
        <StyledButton>New Contract</StyledButton>
      </SectionTitleContainer>
      <PaymentTable />
    </Container>
  )
}