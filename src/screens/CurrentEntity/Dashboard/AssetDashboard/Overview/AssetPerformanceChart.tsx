import { Flex, Text, Loader } from '@mantine/core'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { mantineThemeColors } from 'styles/mantine'
import { formatCookingSessions, formatFuelUsage, formatCookingTime, formatFuelCosts } from 'utils/time'

interface CustomTooltipProps extends TooltipProps<any, any> {
  active?: boolean
  payload?: any
  chart?: string
}

const CustomTooltip = ({ active, payload, label, chart }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <Flex bg='#012131' p={10} direction='column'>
        <Text fw='bold'>
          {chart === 'Usage' && formatCookingSessions(payload[0].value)}
          {chart === 'Fuel' && formatFuelUsage(payload[0].value)}
          {chart === 'Time' && formatCookingTime(payload[0].value)}
          {chart === 'Costs' && formatFuelCosts(payload[0].value)}
        </Text>
        <Text fw='bold'>{label}</Text>
      </Flex>
    )
  }

  return null
}

export const AssetPerformanceChart = ({ data, chart }: { data: any[] | null; chart: string }) => {
  if (!data || data.length < 1) {
    return (
      <Flex justify={'center'} align={'center'} w='100%' h='100%'>
        <Loader />
      </Flex>
    )
  }

  return (
    <ResponsiveContainer width='100%' height={250}>
      <AreaChart
        data={data}
        margin={{
          top: 5,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id={`asset-performance-color`} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={mantineThemeColors['ixo-blue'][6]} stopOpacity={1}></stop>
            <stop offset='100%' stopColor={mantineThemeColors['ixo-blue'][6]} stopOpacity={0.05}></stop>
          </linearGradient>
        </defs>
        <XAxis width={4} dataKey='date' stroke={'white'} />
        <YAxis
          domain={[0, 'dataMax + 20']}
          stroke={'white'}
          tickFormatter={(number) => Number(number).toLocaleString()}
        />
        <Tooltip content={<CustomTooltip chart={chart} />} />
        <Area
          type='monotone'
          dataKey='duration'
          stroke={mantineThemeColors['ixo-blue'][6]}
          fill={`url(#asset-performance-color)`}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
