import Image from 'next/image'
import { Card } from 'screens/CurrentEntity/Components'
import React, { useMemo } from 'react'
import { TDAOGroupModel } from 'types/entities'
import { Badge, Button, Flex } from '@mantine/core'
import { Typography } from 'components/Typography'
import { useMantineTheme } from '@mantine/core'

import { expirationAtTimeToSecondsFromNow, formatMinutes } from 'utils/conversions'
import { diffMinsFromNow } from 'utils/time'
import { useNavigate } from 'react-router-dom'
import { useGetDAOByGroupAddress } from 'hooks/dao'
import { IconSandclock, IconAgentCapability } from 'components/IconPaths'

interface Props {
  daoGroup: TDAOGroupModel
}
const ProposalsCard: React.FC<Props> = ({ daoGroup }) => {
  const navigate = useNavigate()
  const theme = useMantineTheme()

  const dao = useGetDAOByGroupAddress(daoGroup.coreAddress)

  const numOfActiveProposals = useMemo(() => {
    return (
      daoGroup.proposalModule.proposals.filter(
        (proposal) => (expirationAtTimeToSecondsFromNow(proposal.proposal.expiration) ?? 0) > 0,
      ).length || 0
    )
  }, [daoGroup])

  const mostRecentProposal =
    daoGroup.proposalModule.proposals.length > 0
      ? daoGroup.proposalModule.proposals[daoGroup.proposalModule.proposals.length - 1]
      : undefined

  const ProposalItem = () => {
    if (!mostRecentProposal) {
      return null
    }
    return (
      <Flex w={'100%'} justify={'space-between'} align={'center'} p={12} gap={12} bg={'#1B344A'}>
        <Flex align={'center'} gap={12}>
          <Badge bg={'#213E59'}>
            <Typography size='sm'>#{mostRecentProposal.id}</Typography>
          </Badge>
          <Typography variant='primary' size='sm'>
            {mostRecentProposal.proposal.title}
          </Typography>
        </Flex>
        <Badge bg={'#213E59'} color={theme.colors.blue[5]}>
          <Flex align={'center'} gap={4}>
            <Image src={IconSandclock} alt='SandClock' width={5} height={5} color={theme.colors.blue[5]} />
            <Typography size='sm'>
              {formatMinutes(Math.floor(diffMinsFromNow(mostRecentProposal.proposal.expiration)))}
            </Typography>
          </Flex>
        </Badge>
      </Flex>
    )
  }
  return (
    <Card label='Proposals' icon={IconAgentCapability}>
      <Flex w='100%' h={'100%'} direction={'column'} justify={'space-between'}>
        <Flex w={'100%'} />

        <Flex w='100%' direction={'column'} gap={12} align={'center'}>
          <Flex w='100%' direction={'column'} align={'center'}>
            <Typography variant='primary' size='5xl' color='blue'>
              {numOfActiveProposals}
            </Typography>
            <Typography variant='secondary'>Active Proposals</Typography>
          </Flex>

          <ProposalItem />
        </Flex>

        <Flex w='100%' gap={16}>
          <Button
            w={'100%'}
            variant='outline'
            style={{ color: 'white' }}
            onClick={() =>
              navigate({
                pathname: `/entity/${dao?.id}/dashboard/governance`,
                search: `?selectedGroup=${daoGroup.coreAddress}`,
              })
            }
          >
            View Proposals
          </Button>
          <Button
            w={'100%'}
            variant='outline'
            style={{ color: 'white' }}
            onClick={() =>
              navigate({
                pathname: `/create/entity/deed/${dao?.id}/${daoGroup.coreAddress}/info`,
              })
            }
          >
            New Proposal
          </Button>
        </Flex>
      </Flex>
    </Card>
  )
}

export default ProposalsCard
