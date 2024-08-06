import Image from 'next/image'
import React, { useMemo } from 'react'
import { Typography } from 'components/Typography'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { expirationAtTimeToSecondsFromNow, secondsToWdhms } from 'utils/conversions'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Flex, useMantineTheme } from '@mantine/core'
import useCurrentEntity from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'
import { Card } from 'screens/CurrentEntity/Components'
import { IconGovernance, IconSandclock } from 'components/IconPaths'

const GovernanceCard: React.FC = (): JSX.Element => {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const { entityId } = useParams<{ entityId: string }>()
  const { getQuery } = useQuery()
  const selectedGroup = getQuery('selectedGroup')
  const { daoGroups } = useCurrentEntity()
  const selectedDAOGroup = daoGroups[selectedGroup]
  const proposals = selectedDAOGroup?.proposalModule.proposals ?? []
  const latestProposal = [...proposals].pop()

  const id = latestProposal?.id ?? 0
  const title = latestProposal?.proposal.title
  const description = latestProposal?.proposal.description
  const votingPeriod = (latestProposal?.proposal as any)?.max_voting_period ?? 0

  const [proposalEndString, secondsFromNow] = useMemo(() => {
    if (!latestProposal?.proposal.expiration) {
      return ['', 0]
    }
    if (latestProposal?.proposal.status !== 'open') {
      return ['Completed', 0]
    }

    if ('at_time' in latestProposal.proposal.expiration) {
      const secondsFromNow = expirationAtTimeToSecondsFromNow(latestProposal.proposal.expiration)
      // Type check, but should never happen.
      if (secondsFromNow === undefined) {
        return ['', 0]
      }

      if (secondsFromNow <= 0) {
        return ['Completed', 0]
      } else {
        return [secondsToWdhms(secondsFromNow), secondsFromNow]
      }
    }
    return ['', 0]
    // Not much we can say about proposals that expire at a block
    // height / never.
  }, [latestProposal?.proposal.expiration, latestProposal?.proposal.status])

  return (
    <Card
      icon={IconGovernance}
      label='Governance'
      onAction={() => navigate(`/entity/${entityId}/dashboard/governance`)}
    >
      <Flex w='100%' direction='column' align='center' gap={1}>
        <Typography color='blue' size='5xl'>
          {proposals.length.toLocaleString()}
        </Typography>
        <Typography color='white'>Open Proposals</Typography>
      </Flex>

      {proposals.length > 0 && (
        <Flex direction='column' align='center' w='100%' gap={2}>
          <Flex style={{ borderRadius: '4px' }} bg='#012131' gap={2} p={4} direction='column' w='100%'>
            <Flex align='center' gap={2.5}>
              <Box>
                <Flex bg='#033C50' justify='center' align='center' miw='32px' h='32px' style={{ borderRadius: '4px' }}>
                  <Typography color='blue' size='md'>
                    #{id}
                  </Typography>
                </Flex>
              </Box>
              <Typography color='blue' weight='bold' size='md'>
                {title}
              </Typography>
            </Flex>

            <Box mb={3}>
              <Typography size='sm' color='white'>
                {description}
              </Typography>
            </Box>

            <Flex w='100%' gap={3} align='center'>
              <Image src={IconSandclock} alt='SandClock' width={5} height={5} color={theme.colors.blue[5]} />

              <ProgressBar
                height={8}
                total={votingPeriod}
                approved={secondsFromNow}
                rejected={0}
                activeBarColor={theme.colors.blue[5]}
                barColor={theme.colors.blue[8]}
              />
            </Flex>
          </Flex>
          <Flex>
            <Typography size='sm' color='dark-blue'>
              <Typography size='sm' weight='bold' color='blue'>
                {proposalEndString}
              </Typography>{' '}
              before voting closes
            </Typography>
          </Flex>
        </Flex>
      )}
    </Card>
  )
}

export default GovernanceCard
