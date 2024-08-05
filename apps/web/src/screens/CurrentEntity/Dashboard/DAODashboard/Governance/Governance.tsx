import React, { useCallback, useMemo, useState } from 'react'
import { Groups } from '../Components'
import { Typography } from 'components/Typography'
import { Button } from 'screens/CreateEntity/Components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProposalResponse } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { ReactComponent as EmptyIcon } from '/public/assets/images/icon-empty.svg'
import { useMantineTheme } from '@mantine/core'
import { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import { TDAOGroupModel } from 'types/entities'
import { Flex, Button as MButton, UnstyledButton } from '@mantine/core'
import ProposalCard from './ProposalCard'
import { useQuery } from 'hooks/window'
import { Status } from '@ixo/impactxclient-sdk/types/codegen/DaoMigrator.types'
import { mantineThemeColors } from 'styles/mantine'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import { isImpactsDAO } from 'utils/application'
import { useWallet } from '@ixo-webclient/wallet-connector'

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
  const theme = useMantineTheme()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const navigate = useNavigate()
  const { getQuery } = useQuery()
  const selectedGroup = getQuery('selectedGroup')
  const { wallet } = useWallet()
  const {
    verificationMethod,
    daoGroups = {},
    owner,
    linkedEntity,
    profile,
    status,
  } = useAppSelector(getEntityById(entityId))
  const isOwner = wallet?.address === owner
  const selectedDAOGroup = daoGroups[selectedGroup]
  const { isParticipating, anyoneCanPropose } = useCurrentEntityDAOGroup(selectedDAOGroup?.coreAddress || '', daoGroups)

  const isMemberOfImpactsDAO = useMemo(
    () =>
      !!isImpactsDAO(entityId) &&
      linkedEntity.some(({ type, id }) => type === 'MemberDAO' && id.includes(wallet?.address ?? '')),
    [wallet?.address, linkedEntity, entityId],
  )

  const daoController: string = useMemo(
    () =>
      Object.values(daoGroups)
        .map((v) => v.coreAddress)
        .find((addr) => verificationMethod.some((v) => v.id.includes(addr))) || '',
    [daoGroups, verificationMethod],
  )

  const hasVerificationKey = useMemo(
    () =>
      selectedDAOGroup?.coreAddress &&
      verificationMethod.some((v) => v.blockchainAccountID === selectedDAOGroup?.coreAddress),
    [verificationMethod, selectedDAOGroup?.coreAddress],
  )
  const [proposalFilterBy, setProposalFilterBy] = useState<Status | 'all'>('open')

  const handleNewProposal = useCallback(() => {
    navigate(`/entity/${entityId}/dashboard/governance/${selectedGroup}`)
  }, [entityId, navigate, selectedGroup])

  const handleNewProposalForJoin = useCallback(() => {
    navigate(`/entity/create/deed/${entityId}/${selectedDAOGroup?.coreAddress}?join=true`)
  }, [navigate, entityId, selectedDAOGroup])

  const handleReEnableKeys = useCallback(() => {
    navigate(`/entity/${entityId}/transfer/review?groupAddress=${selectedDAOGroup?.coreAddress}`)
  }, [navigate, entityId, selectedDAOGroup])

  const sortedProposals = useMemo(() => {
    return (selectedDAOGroup?.proposalModule.proposals ?? [])
      .sort((a, b) => b.id - a.id)
      .filter((v) => proposalFilterBy === 'all' || v.proposal.status === proposalFilterBy)
  }, [proposalFilterBy, selectedDAOGroup])

  return (
    <Flex direction='column' gap={'lg'} w={'100%'} color='white'>
      <Groups entityId={entityId} daoController={daoController} />

      <GovernanceHeader selectedDAOGroup={selectedDAOGroup} />

      <Flex direction={'column'} gap={'lg'} w='100%'>
        {selectedDAOGroup && (
          <Flex w='100%' align='center' justify='space-between'>
            <Typography variant='secondary' size='2xl'>
              Governance Proposals
            </Typography>

            <Flex align='center' gap={'md'}>
              {status === 2 && hasVerificationKey && (
                // <Button
                //   variant='secondary'
                //   size='flex'
                //   height={36}
                //   textSize='base'
                //   textTransform='none'
                //   textWeight='medium'
                //   onClick={handleReEnableKeys}
                //   disabled={!isParticipating && !anyoneCanPropose}
                // >
                //   Re-enable keys for {entityName || 'DAO'}
                // </Button>
                <MButton
                  variant='outline'
                  radius='xs'
                  size='md'
                  onClick={handleReEnableKeys}
                  disabled={!isParticipating && !anyoneCanPropose}
                  style={{
                    width: 'fit-content',
                    color: 'white',
                    pointerEvents: !isParticipating && !anyoneCanPropose ? 'none' : 'auto',
                    opacity: !isParticipating && !anyoneCanPropose ? 0.5 : 1,
                    borderColor: mantineThemeColors['ixo-blue'][6],
                  }}
                >
                  Re-enable keys for {profile?.name || 'DAO'}
                </MButton>
              )}

              {isImpactsDAO(entityId) &&
              daoController === selectedDAOGroup.coreAddress &&
              !isMemberOfImpactsDAO &&
              !isOwner ? (
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
                  style={{
                    color: 'white',
                    pointerEvents: !isParticipating && !anyoneCanPropose ? 'none' : 'auto',
                    opacity: !isParticipating && !anyoneCanPropose ? 0.5 : 1,
                    borderColor: mantineThemeColors['ixo-blue'][6],
                  }}
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
                <Link to={`/entity/create/deed/${entityId}/${selectedDAOGroup.coreAddress}`}>
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
                  <Link to={`/entity/${entityId}/dashboard/my-participation?selectedGroup=${selectedGroup}`}>
                    <Typography variant='secondary' color='blue' size='2xl'>
                      Join by staking
                    </Typography>
                  </Link>
                </Flex>
              </Flex>
            )}

          {selectedDAOGroup && (
            <Flex gap='lg'>
              <UnstyledButton
                c={proposalFilterBy === 'all' ? 'ixo-blue.6' : '#436779'}
                fz={18}
                onClick={() => setProposalFilterBy('all')}
              >
                All
              </UnstyledButton>
              <UnstyledButton
                c={proposalFilterBy === 'open' ? 'ixo-blue.6' : '#436779'}
                fz={18}
                onClick={() => setProposalFilterBy('open')}
              >
                Active
              </UnstyledButton>
              <UnstyledButton
                c={proposalFilterBy === 'passed' ? 'ixo-blue.6' : '#436779'}
                fz={18}
                onClick={() => setProposalFilterBy('passed')}
              >
                Passed
              </UnstyledButton>
              <UnstyledButton
                c={proposalFilterBy === 'rejected' ? 'ixo-blue.6' : '#436779'}
                fz={18}
                onClick={() => setProposalFilterBy('rejected')}
              >
                Rejected
              </UnstyledButton>
              <UnstyledButton
                c={proposalFilterBy === 'executed' ? 'ixo-blue.6' : '#436779'}
                fz={18}
                onClick={() => setProposalFilterBy('executed')}
              >
                Executed
              </UnstyledButton>
            </Flex>
          )}

          {selectedDAOGroup &&
            sortedProposals.map((item: ProposalResponse, i) => {
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
