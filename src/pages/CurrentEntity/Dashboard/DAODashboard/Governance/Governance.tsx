import React, { useCallback, useEffect, useMemo } from 'react'
import { Box, FlexBox } from 'components/App/App.styles'
import GovernanceProposal from 'components/Entities/SelectedEntity/EntityEconomy/EconomyGovernance/Components/GovernanceProposal2'
import useCurrentDao, { useCurrentDaoGroup } from 'hooks/currentDao'
import { durationToSeconds, expirationAtTimeToSecondsFromNow } from 'utils/conversions'
import { Groups } from '../Components'
import { Typography } from 'components/Typography'
import { Button } from 'pages/CreateEntity/Components'
import { useHistory, useParams } from 'react-router-dom'
import { useAccount } from 'hooks/account'
import { ProposalResponse } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'

const Governance: React.FC = () => {
  const { entityId } = useParams<{ entityId: string }>()
  const history = useHistory()
  const { selectedGroups, updateDaoGroup } = useCurrentDao()
  const { address } = useAccount()
  const selectedGroupAddresses: string[] = Object.keys(selectedGroups)
  const numOfSelectedGroups = selectedGroupAddresses.length
  const { daoProposalSingleClient } = useCurrentDaoGroup(selectedGroupAddresses[0])
  const selectedGroup = useMemo(
    () => Object.keys(selectedGroups).length === 1 && Object.values(selectedGroups)[0],
    [selectedGroups],
  )

  const handleNewProposal = () => {
    if (Object.keys(selectedGroups).length !== 1) {
      return
    }
    const coreAddress = Object.keys(selectedGroups)[0]
    history.push(`/create/entity/deed/${entityId}/${coreAddress}/info`)
  }

  const reListProposals = useCallback(() => {
    if (daoProposalSingleClient && !!selectedGroup) {
      daoProposalSingleClient.listProposals({}).then(({ proposals }) => {
        updateDaoGroup({ ...selectedGroup, proposalModule: { ...selectedGroup.proposalModule, proposals } })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daoProposalSingleClient, !!selectedGroup])

  useEffect(() => {
    reListProposals()
  }, [reListProposals])

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
          const { proposals, proposalConfig } = proposalModule
          const { max_voting_period } = proposalConfig

          // TODO: blocksPerYear ?
          const votingPeriod = durationToSeconds(100, max_voting_period)

          return proposals
            .sort((a, b) => {
              if (a.id > b.id) {
                return -1
              } else if (a.id < b.id) {
                return 1
              }
              return 0
            })
            .map((item: ProposalResponse, i) => {
              const { id, proposal } = item
              const { title, proposer, status, expiration, description } = proposal
              const secondsFromNow = expirationAtTimeToSecondsFromNow(expiration) ?? 0
              const secondsFromStart = votingPeriod - secondsFromNow
              const submissionDate = new Date(new Date().getTime() - secondsFromStart * 1000)
              const closeDate = new Date(new Date().getTime() + secondsFromNow * 1000)
              const [, deedDid] = description.split('#deed:')

              return (
                <GovernanceProposal
                  key={daoGroupIdx + ':' + i}
                  coreAddress={coreAddress}
                  proposalId={id}
                  title={title}
                  proposer={proposer}
                  submissionDate={submissionDate.toISOString()}
                  closeDate={closeDate.toISOString()}
                  status={status}
                  deedDid={deedDid}
                  onUpdate={reListProposals}
                />
              )
            })
        })}
      </FlexBox>
    </FlexBox>
  )
}

export default Governance
