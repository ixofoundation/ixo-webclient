import { Card } from 'pages/CurrentEntity/Components'
import { ReactComponent as PiePieceIcon } from 'assets/images/icon-pie-piece.svg'
import { Flex } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { useGetClaimCollectionsByEntityId, useGetClaimsByEntityId } from 'graphql/claims'
import { useMemo, useState } from 'react'
import ClaimCollectionCategory from '../../../components/ClaimCollectionCategory'
import { BarChart, Bar, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Typography } from 'components/Typography'
import moment from 'moment'
import { useTheme } from 'styled-components'
import { ixo } from '@ixo/impactxclient-sdk'
import { useClaimSetting } from 'hooks/claim'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const timestamp = payload[0].payload?.date
    const contents = payload.map((v: any) => ({ name: v.name, value: v.value }))
    return (
      <Flex direction='column' bg='#012131' px={16} py={12} gap={4} style={{ borderRadius: 4 }}>
        <Typography color='white' weight='bold'>
          {moment(timestamp).format('ddd, D MMM, YYYY')}
        </Typography>
        {contents.map((content: any, index: number) => (
          <Typography color='white' size='md' key={index}>
            {content.name}: {content.value}
          </Typography>
        ))}
      </Flex>
    )
  }

  return null
}

const PerformanceTimelineCard: React.FC = () => {
  const theme: any = useTheme()
  const ClaimSetting = useClaimSetting()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { data: claimCollections } = useGetClaimCollectionsByEntityId(entityId)
  const [collectionId, setCollectionId] = useState('')
  const { data: claims } = useGetClaimsByEntityId(entityId)

  const claimsChartData = useMemo(() => {
    const claimsStatData: {
      [date: string]: { approved: number; rejected: number; disputed: number; pending: number }
    } = {}

    claims.forEach((claim) => {
      const date = moment(claim.submissionDate).set({ second: 0, millisecond: 0 }).toISOString()
      const status = claim.evaluationByClaimId?.status
      claimsStatData[date] = {
        approved:
          (claimsStatData[date]?.approved || 0) + Number(status === ixo.claims.v1beta1.EvaluationStatus.APPROVED),
        rejected:
          (claimsStatData[date]?.rejected || 0) + Number(status === ixo.claims.v1beta1.EvaluationStatus.REJECTED),
        disputed:
          (claimsStatData[date]?.disputed || 0) + Number(status === ixo.claims.v1beta1.EvaluationStatus.DISPUTED),
        pending: (claimsStatData[date]?.pending || 0) + Number(status === ixo.claims.v1beta1.EvaluationStatus.PENDING),
      }
    })
    return Object.entries(claimsStatData).map(([key, value]) => ({ date: key, ...value }))
  }, [claims])

  return (
    <Card label='Project performance timeline' icon={<PiePieceIcon />}>
      <Flex w={'100%'} direction={'column'} gap={16}>
        <Flex w={'100%'} gap={8}>
          {claimCollections.map((claimCollection: any) => (
            <ClaimCollectionCategory
              key={claimCollection.id}
              claimCollection={claimCollection}
              selected={claimCollection.id === collectionId}
              onSelect={() => setCollectionId(claimCollection.id)}
            />
          ))}
        </Flex>

        <ResponsiveContainer width='100%' height={300}>
          <BarChart width={500} height={300} data={claimsChartData}>
            <defs>
              <linearGradient id='color' x1='0.5' y1='0' x2='0.5' y2='1'>
                <stop offset='0%' stopColor='#03d0fb' />
                <stop offset='100%' stopColor='#016480' />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id='background' x1='0.5' y1='0' x2='0.5' y2='1'>
                <stop offset='0%' stopColor='#01293C' />
                <stop offset='66%' stopColor='#033C50' />
              </linearGradient>
            </defs>
            <YAxis
              stroke={theme.ixoNewBlue + 88}
              axisLine={false}
              tickLine={false}
              domain={[0, 200]}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar
              dataKey='approved'
              fill={ClaimSetting[ixo.claims.v1beta1.EvaluationStatus.APPROVED].color}
              barSize={8}
              radius={[100, 100, 100, 100]}
              background={{ fill: 'url(#background)', radius: 100 }}
            />
            <Bar
              dataKey='pending'
              fill={ClaimSetting[ixo.claims.v1beta1.EvaluationStatus.PENDING].color}
              barSize={8}
              radius={[100, 100, 100, 100]}
            />
            <Bar
              dataKey='rejected'
              fill={ClaimSetting[ixo.claims.v1beta1.EvaluationStatus.REJECTED].color}
              barSize={8}
              radius={[100, 100, 100, 100]}
            />
            <Bar
              dataKey='disputed'
              fill={ClaimSetting[ixo.claims.v1beta1.EvaluationStatus.DISPUTED].color}
              barSize={8}
              radius={[100, 100, 100, 100]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Flex>
    </Card>
  )
}

export default PerformanceTimelineCard
