import { Flex, Text } from '@mantine/core'
import { Bar, BarChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts'
import moment from 'moment'
import { useTheme } from 'styled-components'
import { useMemo } from 'react'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    console.log({payload})
    const timestamp = payload[0].payload?.timestamp
    const claims = payload[0].payload?.claims
    return (
      <Flex direction='column' bg='#012131' style={{ borderRadius: '4px' }} px={4} py={3} gap={1}>
        <Text c='white' size='md' fw='bold'>
          {claims} verified
        </Text>
        <Text c='white' size='md' fw='bold'>
          {moment(timestamp).format('D MMM YYYY')}
        </Text>
      </Flex>
    )
  }

  return null
}
const OracleClaimEvaluation = ({ evaluations }: { evaluations: any[] }) => {
  const theme = useTheme()

  const claimEvaluationData = useMemo(() => {
    const timestampMap = new Map()

    evaluations.forEach((evaluation) => {
      console.log({evaluation})
      const timestamp = moment(evaluation.claim?.submissionDate).format('D MMM YYYY')
      console.log({timestamp})
      if (timestampMap.has(timestamp)) {
        timestampMap.set(timestamp, timestampMap.get(timestamp) + 1)
      } else {
        timestampMap.set(timestamp, 1)
      }
    })

    return Array.from(timestampMap).map(([timestamp, claims]) => ({ timestamp, claims }))
  }, [evaluations])

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart width={500} height={300} data={claimEvaluationData as any[]}>
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
          // domain={[0, 20000]}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
        <Bar
          dataKey='claims'
          fill='url(#color)'
          barSize={8}
          radius={[100, 100, 100, 100]}
          background={{ fill: 'url(#background)', radius: 100 }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default OracleClaimEvaluation