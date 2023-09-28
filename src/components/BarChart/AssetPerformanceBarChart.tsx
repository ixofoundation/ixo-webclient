import { Flex, Text } from '@mantine/core'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { useTheme } from 'styled-components'
import { formatCookingTime } from 'utils/time'
interface CustomTooltipProps extends TooltipProps<any, any> {
  active?: boolean
  payload?: any
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <Flex bg='#012131' p={10} direction='column'>
        <Text weight='bold'>{formatCookingTime(payload[0].value)}</Text>
        <Text weight='bold'>{label}</Text>
      </Flex>
    )
  }

  return null
}

export const AssetPerformanceBarChart = ({ data }: { data: Record<string, string | number>[] }) => {
  const theme = useTheme() as any
  const lightBlue = theme.ixoLightBlue
  const darkBlue = theme.ixoDarkBlue

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
        <XAxis width={4} dataKey='month' interval={5} />
        <YAxis domain={[0, 'dataMax + 120']} />
        <Tooltip content={<CustomTooltip />} />
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
