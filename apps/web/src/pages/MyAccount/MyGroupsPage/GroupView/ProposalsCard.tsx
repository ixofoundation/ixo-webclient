import { Card } from 'pages/CurrentEntity/Components'
import React, { useMemo } from 'react'
import { TDAOGroupModel } from 'types/entities'
import { Badge, Button, Flex } from '@mantine/core'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'
import { SvgBox } from 'components/App/App.styles'

import { ReactComponent as AgentIcon } from 'assets/img/sidebar/agents.svg'
import { ReactComponent as SandClockIcon } from 'assets/images/icon-sandclock.svg'
import { expirationAtTimeToSecondsFromNow, formatMinutes } from 'utils/conversions'
import { diffMinsFromNow } from 'utils/time'
import { useNavigate } from 'react-router-dom'
import { useGetDAOByGroupAddress } from 'hooks/dao'

interface Props {
  daoGroup: TDAOGroupModel
}
const ProposalsCard: React.FC<Props> = ({ daoGroup }) => {
  const navigate = useNavigate()
  const theme: any = useTheme()

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

  console.log({ mostRecentProposal })

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
        <Badge bg={'#213E59'} color={theme.ixoNewBlue}>
          <Flex align={'center'} gap={4}>
            <SvgBox svgWidth={4} svgHeight={4}>
              <SandClockIcon />
            </SvgBox>
            <Typography size='sm'>
              {formatMinutes(Math.floor(diffMinsFromNow(mostRecentProposal.proposal.expiration)))}
            </Typography>
          </Flex>
        </Badge>
      </Flex>
    )
  }
  return (
    <Card label='Proposals' icon={<AgentIcon />}>
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
