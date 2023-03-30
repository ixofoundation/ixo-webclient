import React from 'react'
import { Box, FlexBox } from 'components/App/App.styles'
import GovernanceProposal from 'components/Entities/SelectedEntity/EntityEconomy/EconomyGovernance/Components/GovernanceProposal2'
import useCurrentDao from 'hooks/currentDao'
import { depositInfoToCoin, durationToSeconds, expirationAtTimeToSecondsFromNow } from 'utils/conversions'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { Groups } from '../Components'
import { Typography } from 'components/Typography'
import { Button } from 'pages/CreateEntity/Components'
import { useHistory, useParams } from 'react-router-dom'
import { useAccount } from 'hooks/account'

const Proposals: React.FC = () => {
  const { entityId } = useParams<{ entityId: string }>()
  const history = useHistory()
  const { selectedGroups } = useCurrentDao()
  const { address } = useAccount()
  const selectedGroupAddresses: string[] = Object.keys(selectedGroups)
  const numOfSelectedGroups = selectedGroupAddresses.length

  const handleNewProposal = () => {
    if (Object.keys(selectedGroups).length !== 1) {
      return
    }
    const coreAddress = Object.keys(selectedGroups)[0]
    history.push(`/create/entity/deed/${entityId}/${coreAddress}/info`)
  }

  return (
    <FlexBox direction='column' gap={6} width='100%' color='white'>
      <Groups />

      {numOfSelectedGroups >= 1 && (
        <Box>
          <Typography variant='secondary' color='white' size='5xl' transform='capitalize'>
            {numOfSelectedGroups === 1 && `${Object.values(selectedGroups)[0]?.type} group`}
            {numOfSelectedGroups > 1 && `${numOfSelectedGroups} selected groups`}
          </Typography>
        </Box>
      )}

      {numOfSelectedGroups === 1 && (
        <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
          <Typography variant='secondary' size='2xl'>
            Current Governance Proposals
          </Typography>
          <Button
            variant='secondary'
            size='flex'
            height={36}
            textSize='base'
            textTransform='capitalize'
            textWeight='medium'
            onClick={handleNewProposal}
            disabled={
              !selectedGroups[selectedGroupAddresses[0]].votingModule.members.some(({ addr }) => addr === address)
            }
          >
            New Proposal
          </Button>
        </FlexBox>
      )}

      <FlexBox direction='column' gap={4} color='white' width='100%'>
        {Object.values(selectedGroups).map((daoGroup, daoGroupIdx) => {
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
    </FlexBox>
  )
}

export default Proposals
