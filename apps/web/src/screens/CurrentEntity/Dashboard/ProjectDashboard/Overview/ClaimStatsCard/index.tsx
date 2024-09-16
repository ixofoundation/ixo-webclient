import { ixo } from '@ixo/impactxclient-sdk'
import { Box, Flex } from '@mantine/core'

import { SvgBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import PieChart from 'components/Widgets/PieChart'
import { useGetClaimCollectionsByEntityId } from 'graphql/claims'
import { useGetJoiningAgentsByEntityId } from 'graphql/iid'
import { useClaimSetting } from 'hooks/claim'
import { Card } from 'screens/CurrentEntity/Components'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

interface StatCardProps {
  evaluationStatus: keyof typeof statCardLabel
  value: number
}

const statCardLabel = {
  [ixo.claims.v1beta1.EvaluationStatus.APPROVED]: 'Approved',
  [ixo.claims.v1beta1.EvaluationStatus.PENDING]: 'Pending Approval',
  [ixo.claims.v1beta1.EvaluationStatus.REJECTED]: 'Rejected',
  [ixo.claims.v1beta1.EvaluationStatus.UNRECOGNIZED]: 'Remaining',
  [ixo.claims.v1beta1.EvaluationStatus.DISPUTED]: 'Disputed',
} as const

export const StatCard: React.FC<StatCardProps> = ({ evaluationStatus, value }) => {
  const ClaimSetting = useClaimSetting()
  return (
    <Flex gap={16} align={'center'}>
      <Box w={12} h={12} bg={ClaimSetting[evaluationStatus].color} style={{ borderRadius: 12 }} />
      <Typography size='md'>
        <strong>{value}</strong> {statCardLabel[evaluationStatus]}
      </Typography>
    </Flex>
  )
}

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
        disputed: acc.disputed + cur.disputed,
        total: acc.total + cur.quota,
      }),
      { approved: 0, rejected: 0, pending: 0, remaining: 0, total: 0, disputed: 0 },
    )
  }, [claimCollections])
  const { agents, pendingAgents, approvedAgents } = useGetJoiningAgentsByEntityId(entityId)

  return (
    <Card label='Claims' icon={<img src='/assets/images/icon-check-in-circle.svg' />}>
      <Flex w='100%' h='100%' align={'center'} gap={4}>
        <Flex w='100%' direction={'column'} gap={16}>
          <Flex w='100%' direction={'column'} gap={16} ml={32}>
            <StatCard evaluationStatus={ixo.claims.v1beta1.EvaluationStatus.APPROVED} value={claimStats.approved} />
            <StatCard evaluationStatus={ixo.claims.v1beta1.EvaluationStatus.PENDING} value={claimStats.pending} />
            <StatCard evaluationStatus={ixo.claims.v1beta1.EvaluationStatus.REJECTED} value={claimStats.rejected} />
            <StatCard
              evaluationStatus={ixo.claims.v1beta1.EvaluationStatus.UNRECOGNIZED}
              value={claimStats.remaining}
            />
            <StatCard evaluationStatus={ixo.claims.v1beta1.EvaluationStatus.DISPUTED} value={claimStats.disputed} />
          </Flex>
          <Flex w='100%' direction={'column'} gap={16}>
            <Flex gap={8} align={'center'}>
              <SvgBox color='white' $svgWidth={4.5} $svgHeight={4.5}>
                <img src='/assets/images/icon-profile.svg' />
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
