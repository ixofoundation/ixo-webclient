import { SvgBox } from 'components/App/App.styles'
import { Card } from 'pages/CurrentEntity/Components'
import { Box, Flex } from '@mantine/core'
import { Typography } from 'components/Typography'
import { ReactComponent as CheckInCircleIcon } from 'assets/images/icon-check-in-circle.svg'
import { ReactComponent as ProfileIcon } from 'assets/images/icon-profile.svg'
import { useGetClaimCollectionsByEntityId } from 'graphql/claims'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { useGetJoiningAgentsByEntityId } from 'graphql/iid'
import PieChart from 'components/Widgets/PieChart'
import { useClaimSetting } from 'hooks/claim'
import { ixo } from '@ixo/impactxclient-sdk'

const ClaimStatsCard: React.FC = () => {
  const ClaimSetting = useClaimSetting()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { data: claimCollections } = useGetClaimCollectionsByEntityId(entityId)
  const claimStats = useMemo(() => {
    return claimCollections.reduce(
      (acc, cur) => ({
        approved: acc.approved + cur.approved,
        rejected: acc.rejected + cur.rejected,
        pending: acc.pending + (cur.count - cur.approved - cur.rejected),
        remaining: acc.remaining + (cur.quota - cur.count),
        total: acc.total + cur.quota,
      }),
      { approved: 0, rejected: 0, pending: 0, remaining: 0, total: 0 },
    )
  }, [claimCollections])
  const { agents, pendingAgents, approvedAgents } = useGetJoiningAgentsByEntityId(entityId)

  return (
    <Card label='Claims' icon={<CheckInCircleIcon />}>
      <Flex w='100%' h='100%' align={'center'} gap={4}>
        <Flex w='100%' direction={'column'} gap={16}>
          <Flex w='100%' direction={'column'} gap={16} ml={32}>
            <Flex gap={16} align={'center'}>
              <Box
                w={12}
                h={12}
                bg={ClaimSetting[ixo.claims.v1beta1.EvaluationStatus.APPROVED].color}
                style={{ borderRadius: 12 }}
              />
              <Typography size='md'>
                <strong>{claimStats.approved}</strong> Approved
              </Typography>
            </Flex>
            <Flex gap={16} align={'center'}>
              <Box
                w={12}
                h={12}
                bg={ClaimSetting[ixo.claims.v1beta1.EvaluationStatus.PENDING].color}
                style={{ borderRadius: 12 }}
              />
              <Typography size='md'>
                <strong>{claimStats.pending}</strong> Pending Approval
              </Typography>
            </Flex>
            <Flex gap={16} align={'center'}>
              <Box
                w={12}
                h={12}
                bg={ClaimSetting[ixo.claims.v1beta1.EvaluationStatus.REJECTED].color}
                style={{ borderRadius: 12 }}
              />
              <Typography size='md'>
                <strong>{claimStats.rejected}</strong> Rejected
              </Typography>
            </Flex>
            <Flex gap={16} align={'center'}>
              <Box
                w={12}
                h={12}
                bg={ClaimSetting[ixo.claims.v1beta1.EvaluationStatus.UNRECOGNIZED].color}
                style={{ borderRadius: 12 }}
              />
              <Typography size='md'>
                <strong>{claimStats.remaining}</strong> Remaining
              </Typography>
            </Flex>
          </Flex>
          <Flex w='100%' direction={'column'} gap={16}>
            <Flex gap={8} align={'center'}>
              <SvgBox color='white' $svgWidth={4.5} $svgHeight={4.5}>
                <ProfileIcon />
              </SvgBox>
              <Typography variant='secondary' color='white' size='lg'>
                Agents
              </Typography>
            </Flex>
            <Flex direction={'column'} gap={16} ml={60}>
              <Flex gap={8} align={'center'}>
                <Typography size='md'>
                  <strong>{approvedAgents.length}</strong> Authorized
                </Typography>
              </Flex>
              <Flex gap={8} align={'center'}>
                <Typography size='md'>
                  <strong>{pendingAgents.length}</strong> Pending
                </Typography>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex w='100%' h='100%' justify={'center'} align={'center'}>
          <PieChart
            data={[
              {
                name: 'Approved',
                value: claimStats.approved,
                color: ClaimSetting[ixo.claims.v1beta1.EvaluationStatus.APPROVED].color,
              },
              {
                name: 'Pending',
                value: claimStats.pending,
                color: ClaimSetting[ixo.claims.v1beta1.EvaluationStatus.PENDING].color,
              },
              {
                name: 'Rejected',
                value: claimStats.rejected,
                color: ClaimSetting[ixo.claims.v1beta1.EvaluationStatus.REJECTED].color,
              },
              {
                name: 'Remaining',
                value: claimStats.remaining,
                color: ClaimSetting[ixo.claims.v1beta1.EvaluationStatus.UNRECOGNIZED].color,
              },
            ]}
            descriptor={
              <Flex direction='column' align='center'>
                <Typography variant='secondary' size='3xl' weight='bold'>
                  <strong>{claimStats.approved}</strong> / {claimStats.total}
                </Typography>
                <Typography size='sm'>
                  {approvedAgents.length} of {agents.length} <strong>Agents Authorized</strong>
                </Typography>
              </Flex>
            }
            height='300px'
            radius={140}
          />
        </Flex>
      </Flex>
    </Card>
  )
}

export default ClaimStatsCard
