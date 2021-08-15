import React from 'react'
import GovernanceTable from './components/GovernanceTable'
import {
  Container,
  SectionTitleContainer,
  SectionTitle,
} from '../EntityEconomy.styles'
import GovernanceProposal from './components/GovernanceProposal'

const EconomyGovernance: React.FunctionComponent = () => {
  return (
    <Container>
      <SectionTitleContainer>
        <SectionTitle>Current Governance Proposals</SectionTitle>
      </SectionTitleContainer>

      <GovernanceProposal />
      <GovernanceProposal />

      <SectionTitleContainer>
        <SectionTitle>Past Governance Proposals</SectionTitle>
      </SectionTitleContainer>
      <GovernanceTable />
    </Container>
  )
}

export default EconomyGovernance
