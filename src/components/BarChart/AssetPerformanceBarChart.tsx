import { Flex, Text, Paper, Loader } from '@mantine/core'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { useTheme } from 'styled-components'
import { formatCookingTime, formatFuelUsage } from 'utils/time'
interface CustomTooltipProps extends TooltipProps<any, any> {
  active?: boolean
  payload?: any
  chart?: string
}

const CustomTooltip = ({ active, payload, label, chart }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <Flex bg='#012131' p={10} direction='column'>
        <Text weight='bold'>
          {chart === 'Fuel Usage' ? formatFuelUsage(payload[0].value) : formatCookingTime(payload[0].value)}
        </Text>
        <Text weight='bold'>{label}</Text>
      </Flex>
    )
  }

  return null
}

export const AssetPerformanceBarChart = ({ data, chart }: { data: any[] | null; chart: string }) => {
  const theme = useTheme() as any
  const lightBlue = theme.ixoLightBlue
  const darkBlue = theme.ixoDarkBlue

  if (!data || data.length < 1) {
    return (
      <Paper style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Loader />
      </Paper>
    )
  }

  const interval = chart === 'Fuel Usage' ? 0 : 5

  return (
    <ResponsiveContainer width='100%' height={250}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          bottom: 5,
        }}
        barCategoryGap='10%'
      >
        <defs>
          <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0' stopColor='#023' stopOpacity={1} />
            <stop offset='1' stopColor={darkBlue} stopOpacity={1} />
          </linearGradient>
        </defs>
        <XAxis width={4} dataKey='month' interval={interval} />
        <YAxis domain={[0, 'dataMax + 120']} />
        <Tooltip content={<CustomTooltip chart={chart} />} />
        <Bar
          stackId='a'
          dataKey='duration'
          label={false}
          fill={lightBlue}
          background={{ fill: 'url(#colorUv)' }}
          barSize={6}
        />
        {/* <Bar stackId='a' dataKey='uv' label={false} fill={blue} radius={[10, 10, 0, 0]} barSize={6} /> */}
      </BarChart>
    </ResponsiveContainer>
  )
}
