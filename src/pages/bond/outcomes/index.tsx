import React from 'react'
import OutcomeTable from './components/OutcomeTable'
import {
  Container,
  SectionTitleContainer,
  SectionTitle,
} from './index.style'
import OutcomeTarget, { ProposalType } from './components/OutcomeTarget'

export const Outcomes: React.FunctionComponent = () => {
  return (
    <Container>
      <SectionTitleContainer>
        <SectionTitle>Current Governance Proposals</SectionTitle>
      </SectionTitleContainer>

      <OutcomeTarget
        no={999}
        type={ProposalType.Membership}
        announce={'Extend the project end-date to September 2020'}
        remain={412}
        proposedBy={'Shaun Conway'}
        submissionDate={'2020-06-23 16:23'}
        closeDate={'2020-08-24 16:30'}
        votes={230}
        available={280}
        myVote={false}
      />
      <OutcomeTarget
        no={4}
        type={ProposalType.Budget}
        announce={'Issue an Alpha Bond for $100,000'}
        remain={0}
        proposedBy={'Shaun Conway'}
        submissionDate={'2020-04-01 10:00'}
        closeDate={'2020-04-21 10:00'}
        votes={230}
        available={280}
        myVote={true}
      />

      <SectionTitleContainer>
        <SectionTitle>Past Governance Proposals</SectionTitle>
      </SectionTitleContainer>
      <OutcomeTable />
    </Container>
  )
}