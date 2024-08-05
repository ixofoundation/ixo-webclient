import { Card } from 'screens/CurrentEntity/Components'
import { ReactComponent as PiePieceIcon } from '/public/assets/images/icon-pie-piece.svg'
import { Flex } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { useGetClaimCollectionsByEntityId, useGetClaimsByEntityId } from 'graphql/claims'
import { useMemo, useState } from 'react'
import ClaimCollectionCategory from '../../../components/ClaimCollectionCategory'
import { BarChart, Bar, YAxis, Tooltip, ResponsiveContainer, XAxis } from 'recharts'
import { Typography } from 'components/Typography'
import moment from 'moment'
import { useMantineTheme } from '@mantine/core'
import { ixo } from '@ixo/impactxclient-sdk'
import { useClaimSetting } from 'hooks/claim'
import { Claim } from '@ixo/impactxclient-sdk/types/codegen/ixo/claims/v1beta1/claims'
import { toTitleCase } from 'utils/formatters'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const contents = payload.map((v: any) => ({ name: v.name, value: v.value }))
    return (
      <Flex direction='column' bg='#012131' px={16} py={12} gap={4} style={{ borderRadius: 4 }}>
        {contents.map((content: any, index: number) => (
          <Typography color='white' size='md' key={index}>
            {toTitleCase(content.name)}: {content.value}
          </Typography>
        ))}
      </Flex>
    )
  }

  return null
}

const PerformanceTimelineCard: React.FC = () => {
  const theme = useMantineTheme()
  const ClaimSetting = useClaimSetting()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { data: claimCollections } = useGetClaimCollectionsByEntityId(entityId)
  const [collectionId, setCollectionId] = useState('')
  const { data: claims } = useGetClaimsByEntityId(entityId)

  const claimsChartData = useMemo(() => {
    const claimsStatData: {
      [date: string]: { approved: number; rejected: number; pending: number }
    } = {}

    claims
      .filter((claim: Claim) => !collectionId || collectionId === claim.collectionId)
      .forEach((claim) => {
        const date = moment(claim.submissionDate).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toISOString()
        const status = claim.evaluationByClaimId?.status
        claimsStatData[date] = {
          approved:
            (claimsStatData[date]?.approved || 0) + Number(status === ixo.claims.v1beta1.EvaluationStatus.APPROVED),
          rejected:
            (claimsStatData[date]?.rejected || 0) + Number(status === ixo.claims.v1beta1.EvaluationStatus.REJECTED),
          pending:
            (claimsStatData[date]?.pending || 0) +
            Number(status === ixo.claims.v1beta1.EvaluationStatus.PENDING || !status),
        }
      })
    return Object.entries(claimsStatData)
      .map(([key, value]) => ({ date: key, ...value }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [claims, collectionId])

  return (
    <Card label='Project performance timeline' icon={<PiePieceIcon />}>
      <Flex w={'100%'} direction={'column'} gap={16}>
        <Flex w={'100%'} gap={8}>
          {claimCollections.map((claimCollection: any) => (
            <ClaimCollectionCategory
              key={claimCollection.id}
              claimCollection={claimCollection}
              selected={claimCollection.id === collectionId}
              onSelect={() => setCollectionId(claimCollection.id === collectionId ? '' : claimCollection.id)}
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
              stroke={theme.colors.blue[5] + 88}
              tickFormatter={(value) => value.toLocaleString()}
              allowDecimals={false}
            />
            <XAxis
              stroke={theme.colors.blue[5] + 88}
              dataKey='date'
              tickFormatter={(value) => moment(value).format('ddd, D MMM, YYYY')}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar
              dataKey='approved'
              fill={ClaimSetting[ixo.claims.v1beta1.EvaluationStatus.APPROVED].color}
              barSize={8}
              background={{ fill: 'url(#background)', radius: 100 }}
              stackId='a'
            />
            <Bar
              dataKey='pending'
              fill={ClaimSetting[ixo.claims.v1beta1.EvaluationStatus.PENDING].color}
              barSize={8}
              stackId='a'
            />
            <Bar
              dataKey='rejected'
              fill={ClaimSetting[ixo.claims.v1beta1.EvaluationStatus.REJECTED].color}
              barSize={8}
              stackId='a'
            />
          </BarChart>
        </ResponsiveContainer>
      </Flex>
    </Card>
  )
}

export default PerformanceTimelineCard
