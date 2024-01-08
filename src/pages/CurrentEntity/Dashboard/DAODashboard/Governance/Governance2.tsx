import React, { useCallback, useMemo } from 'react'
import { Groups } from '../Components'
import { Typography } from 'components/Typography'
import { Button } from 'pages/CreateEntity/Components'
import { Link, useHistory, useParams } from 'react-router-dom'
import { ProposalResponse } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { ReactComponent as EmptyIcon } from 'assets/images/icon-empty.svg'
import { useTheme } from 'styled-components'
import useCurrentEntity, { useCurrentEntityDAOGroup, useCurrentEntityProfile } from 'hooks/currentEntity'
import { TDAOGroupModel } from 'types/entities'
import { Flex, Button as MButton, UnstyledButton } from '@mantine/core'
import ProposalCard from './ProposalCard'

const GovernanceHeader = React.memo(({ selectedDAOGroup }: { selectedDAOGroup?: TDAOGroupModel }) => (
  <>
    {selectedDAOGroup && (
      <Typography variant='secondary' color='white' size='5xl' transform='capitalize'>
        {selectedDAOGroup?.config.name}
      </Typography>
    )}
  </>
))

const Governance: React.FC = () => {
  const theme: any = useTheme()
  const { entityId } = useParams<{ entityId: string }>()
  const history = useHistory()
  const {
    entityStatus,
    selectedDAOGroup,
    verificationMethod,
    selectDAOGroup,
    isImpactsDAO,
    isMemberOfImpactsDAO,
    isOwner,
    daoController,
  } = useCurrentEntity()
  const { name: entityName } = useCurrentEntityProfile()
  const { isParticipating, anyoneCanPropose } = useCurrentEntityDAOGroup(selectedDAOGroup?.coreAddress || '')

  const hasVerificationKey = useMemo(
    () =>
      selectedDAOGroup?.coreAddress &&
      verificationMethod.some((v) => v.blockchainAccountID === selectedDAOGroup?.coreAddress),
    [verificationMethod, selectedDAOGroup?.coreAddress],
  )

  const handleNewProposal = useCallback(() => {
    history.push(`/create/entity/deed/${entityId}/${selectedDAOGroup?.coreAddress}`)
  }, [history, entityId, selectedDAOGroup])

  const handleNewProposalForJoin = useCallback(() => {
    history.push(`/create/entity/deed/${entityId}/${selectedDAOGroup?.coreAddress}?join=true`)
  }, [history, entityId, selectedDAOGroup])

  const handleReEnableKeys = useCallback(() => {
    history.push(`/transfer/entity/${entityId}/review?groupAddress=${selectedDAOGroup?.coreAddress}`)
  }, [history, entityId, selectedDAOGroup])

  const sortedProposals = useMemo(() => {
    return selectedDAOGroup?.proposalModule.proposals.sort((a, b) => {
      if (a.id > b.id) return -1
      if (a.id < b.id) return 1
      return 0
    })
  }, [selectedDAOGroup])

  return (
    <Flex direction='column' gap={'lg'} w={'100%'} color='white'>
      <Groups selectedGroup={selectedDAOGroup} selectDaoGroup={(address: string) => selectDAOGroup(address)} />

      <GovernanceHeader selectedDAOGroup={selectedDAOGroup} />

      <Flex direction={'column'} gap={'lg'} miw={900} maw={'80%'}>
        {selectedDAOGroup && (
          <Flex w='100%' align='center' justify='space-between'>
            <Typography variant='secondary' size='2xl'>
              Governance Proposals
            </Typography>

            <Flex align='center' gap={'md'}>
              {entityStatus === 2 && hasVerificationKey && (
                <Button
                  variant='secondary'
                  size='flex'
                  height={36}
                  textSize='base'
                  textTransform='none'
                  textWeight='medium'
                  onClick={handleReEnableKeys}
                  disabled={!isParticipating && !anyoneCanPropose}
                >
                  Re-enable keys for {entityName || 'DAO'}
                </Button>
              )}

              {isImpactsDAO && daoController === selectedDAOGroup.coreAddress && !isMemberOfImpactsDAO && !isOwner ? (
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
                // <Button
                //   variant='secondary'
                //   size='flex'
                //   height={36}
                //   textSize='base'
                //   textTransform='capitalize'
                //   textWeight='medium'
                //   onClick={handleNewProposal}
                //   disabled={!isParticipating && !anyoneCanPropose}
                // >
                //   New Proposal
                // </Button>
                <MButton
                  variant='outline'
                  radius='xs'
                  size='md'
                  onClick={handleNewProposal}
                  disabled={!isParticipating && !anyoneCanPropose}
                  style={{ color: 'white' }}
                >
                  New Proposal
                </MButton>
              )}
            </Flex>
          </Flex>
        )}

        <Flex direction='column' gap='lg' color='white' w='100%'>
          {selectedDAOGroup &&
            selectedDAOGroup.proposalModule.proposals.length === 0 &&
            (isParticipating || anyoneCanPropose) && (
              <Flex
                direction='column'
                w='100%'
                h='380px'
                justify='center'
                align='center'
                gap='lg'
                bg={theme.ixoGradientDark2}
                style={{ borderRadius: 4 }}
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
              </Flex>
            )}
          {selectedDAOGroup &&
            selectedDAOGroup.proposalModule.proposals.length === 0 &&
            !isParticipating &&
            !anyoneCanPropose &&
            selectedDAOGroup.type === 'membership' && (
              <Flex
                direction='column'
                w='100%'
                h='380px'
                justify='center'
                align='center'
                gap='lg'
                bg={theme.ixoGradientDark2}
                style={{ borderRadius: 4 }}
              >
                <EmptyIcon />
                <Typography variant='secondary' color='dark-blue' size='2xl'>
                  There are no active proposals.
                </Typography>
                <Typography variant='secondary' color='dark-blue' size='2xl'>
                  Only members can submit proposals.
                </Typography>
              </Flex>
            )}
          {selectedDAOGroup &&
            selectedDAOGroup.proposalModule.proposals.length === 0 &&
            !isParticipating &&
            !anyoneCanPropose &&
            selectedDAOGroup.type === 'staking' && (
              <Flex
                direction='column'
                w='100%'
                h='380px'
                justify='center'
                align='center'
                gap='lg'
                bg={theme.ixoGradientDark2}
                style={{ borderRadius: 4 }}
              >
                <EmptyIcon />
                <Typography variant='secondary' color='dark-blue' size='2xl'>
                  There are no active proposals.
                </Typography>
                <Flex direction='column' align='center'>
                  <Typography variant='secondary' color='dark-blue' size='2xl'>
                    Only members can submit proposals.
                  </Typography>
                  <Link to={`/entity/${entityId}/dashboard/my-participation`}>
                    <Typography variant='secondary' color='blue' size='2xl'>
                      Join by staking
                    </Typography>
                  </Link>
                </Flex>
              </Flex>
            )}

          {selectedDAOGroup && (sortedProposals?.length ?? 0) > 0 && (
            <Flex gap='lg'>
              <UnstyledButton style={{ color: '#0089D7' }}>All</UnstyledButton>
              <UnstyledButton style={{ color: '#213E59' }}>Active</UnstyledButton>
              <UnstyledButton style={{ color: '#213E59' }}>Passed</UnstyledButton>
              <UnstyledButton style={{ color: '#213E59' }}>Rejected</UnstyledButton>
            </Flex>
          )}

          {selectedDAOGroup &&
            sortedProposals?.map((item: ProposalResponse, i) => {
              return (
                <ProposalCard
                  key={i}
                  coreAddress={selectedDAOGroup?.coreAddress}
                  proposalId={item.id}
                  proposal={item.proposal}
                />
              )
            })}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(Governance)
