import React, { useMemo } from 'react'
import { Box, FlexBox, theme } from 'components/App/App.styles'
import GovernanceProposal from 'components/Entities/SelectedEntity/EntityEconomy/EconomyGovernance/Components/GovernanceProposal2'
import useCurrentDao, { useCurrentDaoGroup } from 'hooks/currentDao'
import { durationToSeconds, expirationAtTimeToSecondsFromNow } from 'utils/conversions'
import { Groups } from '../Components'
import { Typography } from 'components/Typography'
import { Button } from 'pages/CreateEntity/Components'
import { Link, useHistory, useParams } from 'react-router-dom'
import { ProposalResponse } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { ReactComponent as EmptyIcon } from 'assets/images/icon-empty.svg'

const Governance: React.FC = () => {
  const { entityId } = useParams<{ entityId: string }>()
  const history = useHistory()
  const { selectedGroups, selectDaoGroup } = useCurrentDao()
  const selectedGroupAddresses: string[] = Object.keys(selectedGroups)
  const numOfSelectedGroups = selectedGroupAddresses.length
  const { isParticipating, anyoneCanPropose } = useCurrentDaoGroup(selectedGroupAddresses[0])
  const selectedGroup = useMemo(
    () => (Object.keys(selectedGroups).length === 1 ? Object.values(selectedGroups)[0] : undefined),
    [selectedGroups],
  )

  const handleNewProposal = () => {
    history.push(`/create/entity/deed/${entityId}/${selectedGroup?.coreAddress}`)
  }

  return (
    <FlexBox direction='column' gap={6} width='100%' color='white'>
      <Groups selectedGroups={selectedGroups} selectDaoGroup={(address: string) => selectDaoGroup(address)} />

      {numOfSelectedGroups >= 1 && (
        <Box>
          <Typography variant='secondary' color='white' size='5xl' transform='capitalize'>
            {numOfSelectedGroups === 1 && `${Object.values(selectedGroups)[0]?.type} group`}
            {numOfSelectedGroups > 1 && `${numOfSelectedGroups} selected groups`}
          </Typography>
        </Box>
      )}

      {selectedGroup && (
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
            disabled={!isParticipating && !anyoneCanPropose}
          >
            New Proposal
          </Button>
        </FlexBox>
      )}

      <FlexBox direction='column' gap={4} color='white' width='100%'>
        {selectedGroup && selectedGroup.proposalModule.proposals.length === 0 && (isParticipating || anyoneCanPropose) && (
          <FlexBox
            direction='column'
            width='100%'
            height='380px'
            justifyContent='center'
            alignItems='center'
            gap={6}
            background={theme.ixoGradientDark2}
            borderRadius={'4px'}
          >
            <EmptyIcon />
            <Typography variant='secondary' color='dark-blue' size='2xl'>
              There are no active proposals.
            </Typography>
            <Link to={`/create/entity/deed/${entityId}/${selectedGroup.coreAddress}`}>
              <Typography variant='secondary' color='blue' size='2xl'>
                Submit a Proposal
              </Typography>
            </Link>
          </FlexBox>
        )}
        {selectedGroup &&
          selectedGroup.proposalModule.proposals.length === 0 &&
          !isParticipating &&
          !anyoneCanPropose &&
          selectedGroup.type === 'membership' && (
            <FlexBox
              direction='column'
              width='100%'
              height='380px'
              justifyContent='center'
              alignItems='center'
              gap={6}
              background={theme.ixoGradientDark2}
              borderRadius={'4px'}
            >
              <EmptyIcon />
              <Typography variant='secondary' color='dark-blue' size='2xl'>
                There are no active proposals.
              </Typography>
              <Typography variant='secondary' color='dark-blue' size='2xl'>
                Only members can submit proposals.
              </Typography>
            </FlexBox>
          )}
        {selectedGroup &&
          selectedGroup.proposalModule.proposals.length === 0 &&
          !isParticipating &&
          !anyoneCanPropose &&
          selectedGroup.type === 'staking' && (
            <FlexBox
              direction='column'
              width='100%'
              height='380px'
              justifyContent='center'
              alignItems='center'
              gap={6}
              background={theme.ixoGradientDark2}
              borderRadius={'4px'}
            >
              <EmptyIcon />
              <Typography variant='secondary' color='dark-blue' size='2xl'>
                There are no active proposals.
              </Typography>
              <FlexBox direction='column' alignItems='center'>
                <Typography variant='secondary' color='dark-blue' size='2xl'>
                  Only members can submit proposals.
                </Typography>
                <Link to={`/entity/${entityId}/dashboard/my-participation`}>
                  <Typography variant='secondary' color='blue' size='2xl'>
                    Join by staking
                  </Typography>
                </Link>
              </FlexBox>
            </FlexBox>
          )}
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
                />
              )
            })
        })}
      </FlexBox>
    </FlexBox>
  )
}

export default Governance
