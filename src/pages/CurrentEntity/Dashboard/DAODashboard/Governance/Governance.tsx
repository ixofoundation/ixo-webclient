import React from 'react'
import { FlexBox } from 'components/App/App.styles'
import GovernanceProposal from './GovernanceProposal'
import { durationToSeconds, expirationAtTimeToSecondsFromNow } from 'utils/conversions'
import { Groups } from '../Components'
import { Typography } from 'components/Typography'
import { Button } from 'pages/CreateEntity/Components'
import { Link, useHistory, useParams } from 'react-router-dom'
import { ProposalResponse } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { ReactComponent as EmptyIcon } from 'assets/images/icon-empty.svg'
import { useTheme } from 'styled-components'
import useCurrentEntity, { useCurrentEntityDAOGroup } from 'hooks/currentEntity'

const Governance: React.FC = () => {
  const theme: any = useTheme()
  const { entityId } = useParams<{ entityId: string }>()
  const history = useHistory()
  const { selectedDAOGroup, selectDAOGroup, isImpactsDAO, isMemberOfImpactsDAO } = useCurrentEntity()
  const { isParticipating, anyoneCanPropose } = useCurrentEntityDAOGroup(selectedDAOGroup?.coreAddress || '')

  const handleNewProposal = () => {
    history.push(`/create/entity/deed/${entityId}/${selectedDAOGroup?.coreAddress}`)
  }

  const handleNewProposalForJoin = () => {
    history.push(`/create/entity/deed/${entityId}/${selectedDAOGroup?.coreAddress}?join=true`)
  }

  return (
    <FlexBox direction='column' gap={6} width='100%' color='white'>
      <Groups selectedGroup={selectedDAOGroup} selectDaoGroup={(address: string) => selectDAOGroup(address)} />

      {selectedDAOGroup && (
        <Typography variant='secondary' color='white' size='5xl' transform='capitalize'>
          {selectedDAOGroup?.config.name}
        </Typography>
      )}

      {selectedDAOGroup && (
        <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
          <Typography variant='secondary' size='2xl'>
            Current Governance Proposals
          </Typography>

          {isImpactsDAO && !isMemberOfImpactsDAO ? (
            <Button
              variant='secondary'
              size='flex'
              width={170}
              height={40}
              textSize='base'
              textTransform='capitalize'
              textWeight='medium'
              onClick={handleNewProposalForJoin}
              disabled={!isParticipating}
            >
              Join
            </Button>
          ) : (
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
          )}
        </FlexBox>
      )}

      <FlexBox direction='column' gap={4} color='white' width='100%'>
        {selectedDAOGroup &&
          selectedDAOGroup.proposalModule.proposals.length === 0 &&
          (isParticipating || anyoneCanPropose) && (
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
              <Link to={`/create/entity/deed/${entityId}/${selectedDAOGroup.coreAddress}`}>
                <Typography variant='secondary' color='blue' size='2xl'>
                  Submit a Proposal
                </Typography>
              </Link>
            </FlexBox>
          )}
        {selectedDAOGroup &&
          selectedDAOGroup.proposalModule.proposals.length === 0 &&
          !isParticipating &&
          !anyoneCanPropose &&
          selectedDAOGroup.type === 'membership' && (
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
        {selectedDAOGroup &&
          selectedDAOGroup.proposalModule.proposals.length === 0 &&
          !isParticipating &&
          !anyoneCanPropose &&
          selectedDAOGroup.type === 'staking' && (
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
        {selectedDAOGroup &&
          selectedDAOGroup.proposalModule.proposals
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
              const secondsFromStart =
                durationToSeconds(100, selectedDAOGroup.proposalModule.proposalConfig.max_voting_period) -
                secondsFromNow
              const submissionDate = new Date(new Date().getTime() - secondsFromStart * 1000)
              const closeDate = new Date(new Date().getTime() + secondsFromNow * 1000)
              const [, deedDid] = description.split('#deed:')

              return (
                <GovernanceProposal
                  key={i}
                  coreAddress={selectedDAOGroup.coreAddress}
                  proposal={proposal}
                  proposalId={id}
                  title={title}
                  proposer={proposer}
                  submissionDate={submissionDate.toISOString()}
                  closeDate={closeDate.toISOString()}
                  status={status}
                  deedDid={deedDid}
                />
              )
            })}
      </FlexBox>
    </FlexBox>
  )
}

export default Governance
