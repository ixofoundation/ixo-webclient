import React from 'react'
import { FlexBox } from 'components/App/App.styles'
import GovernanceProposal from 'components/Entities/SelectedEntity/EntityEconomy/EconomyGovernance/Components/GovernanceProposal'
import useCurrentDao from 'hooks/currentDao'
import { durationToSeconds, expirationAtTimeToSecondsFromNow } from 'utils/conversions'

const Proposals: React.FC = () => {
  const { daoGroups } = useCurrentDao()

  const handleVote = async (proposalId: string, answer: number): Promise<void> => {
    return
  }

  return (
    <FlexBox direction='column' gap={4} color='white'>
      {Object.values(daoGroups).map((daoGroup, daoGroupIdx) => {
        const { proposalModule } = daoGroup
        const { proposals, proposalConfig, preProposeConfig } = proposalModule
        const { max_voting_period } = proposalConfig
        const { deposit_info } = preProposeConfig

        // TODO: blocksPerYear ?
        const votingPeriod = durationToSeconds(100, max_voting_period)

        return proposals.map((item: any, i) => {
          const { id, proposal } = item
          const { title, proposer, status, expiration } = proposal
          const secondsFromNow = expirationAtTimeToSecondsFromNow(expiration) ?? 0
          const secondsFromStart = votingPeriod - secondsFromNow
          const submissionDate = new Date(new Date().getTime() - secondsFromStart * 1000)
          const closeDate = new Date(new Date().getTime() + secondsFromNow * 1000)

          return (
            <GovernanceProposal
              key={daoGroupIdx + ':' + i}
              proposalId={id}
              type={'ProposalType'}
              announce={title}
              proposedBy={proposer}
              submissionDate={submissionDate.toISOString()}
              closeDate={closeDate.toISOString()}
              tally={{
                yes: 0,
                no: 0,
                noWithVeto: 0,
                abstain: 0,
                available: 0,
              }}
              totalDeposit={{ amount: '100000', denom: 'IXO' }}
              status={status}
              handleVote={handleVote}
            />
          )
        })
      })}
    </FlexBox>
  )
}

export default Proposals
