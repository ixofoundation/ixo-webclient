import React from 'react'
import { BarChart, Bar, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import moment from 'moment'
import { Card } from '../../../../Components'
import { ReactComponent as PieIcon } from 'assets/images/icon-pie.svg'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const timestamp = payload[0].payload?.timestamp
    const votes = payload[0].payload?.votes
    return (
      <FlexBox direction='column' background='#012131' borderRadius='4px' px={4} py={3} gap={1}>
        <Typography color='white' size='md' weight='bold'>
          {moment(timestamp).format('ddd, D MMM, YYYY')}
        </Typography>
        <Typography color='white' size='md' weight='bold'>
          {votes} Votes Submitted
        </Typography>
      </FlexBox>
    )
  }

  return null
}

interface Props {
  daoId: string
  groupIds: string[]
}

const GovernanceActivity: React.FC<Props> = ({ daoId, groupIds }): JSX.Element => {
  const theme: any = useTheme()

  return (
    <Card icon={<PieIcon />} label='Governance activity'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart width={500} height={300} data={[] as any[]}>
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
            domain={[0, 20000]}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar
            dataKey='votes'
            fill='url(#color)'
            barSize={8}
            radius={[100, 100, 100, 100]}
            background={{ fill: 'url(#background)', radius: 100 }}
          />
        </BarChart>
      </ResponsiveContainer>
      <FlexBox width='100%' justifyContent='flex-end'>
        <FlexBox mr={2} gap={4}>
          <Typography color='dark-blue' size='md'>
            Day
          </Typography>
          <Typography color='blue' size='md'>
            Week
          </Typography>
          <Typography color='dark-blue' size='md'>
            Month
          </Typography>
          <Typography color='dark-blue' size='md'>
            Year
          </Typography>
          <Typography color='dark-blue' size='md'>
            All
          </Typography>
        </FlexBox>
      </FlexBox>
    </Card>
  )
}

export default GovernanceActivity
