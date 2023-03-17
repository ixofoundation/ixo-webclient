import React from 'react'
import { FlexBox } from 'components/App/App.styles'
import GovernanceProposal from 'components/Entities/SelectedEntity/EntityEconomy/EconomyGovernance/Components/GovernanceProposal2'
import useCurrentDao from 'hooks/currentDao'
import { depositInfoToCoin, durationToSeconds, expirationAtTimeToSecondsFromNow } from 'utils/conversions'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'

const Proposals: React.FC = () => {
  const { daoGroups } = useCurrentDao()

  return (
    <FlexBox direction='column' gap={4} color='white'>
      {Object.values(daoGroups).map((daoGroup, daoGroupIdx) => {
        const { proposalModule, coreAddress } = daoGroup
        const { proposals, proposalConfig, preProposeConfig } = proposalModule
        const { max_voting_period } = proposalConfig
        const { deposit_info } = preProposeConfig

        const depositInfo: Coin | null | undefined = depositInfoToCoin(deposit_info!)

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
              coreAddress={coreAddress}
              proposalId={id}
              title={title}
              proposer={proposer}
              submissionDate={submissionDate.toISOString()}
              closeDate={closeDate.toISOString()}
              totalDeposit={depositInfo}
              status={status}
            />
          )
        })
      })}
    </FlexBox>
  )
}

export default Proposals
