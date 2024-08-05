import { FlexBox } from 'components/App/App.styles'
import React from 'react'
import { ResponsiveContainer, AreaChart, Area, YAxis, CartesianGrid, XAxis, Tooltip } from 'recharts'
import { useMantineTheme } from '@mantine/core'

interface Props {
  bondDid: string
}

const BondPrices: React.FC<Props> = ({ bondDid }) => {
  const theme = useMantineTheme()

  const data = [
    {
      name: 'Page A',
      uv: 4000,
    },
    {
      name: 'Page B',
      uv: 3000,
    },
    {
      name: 'Page C',
      uv: 2000,
    },
    {
      name: 'Page D',
      uv: 2780,
    },
    {
      name: 'Page E',
      uv: 1890,
    },
    {
      name: 'Page F',
      uv: 2390,
    },
    {
      name: 'Page G',
      uv: 3490,
    },
  ]

  return (
    <FlexBox
      width='100%'
      height='500px'
      $borderRadius='4px'
      border={`1px solid #0C3549`}
      background='linear-gradient(180deg, #012639 0%, #002D42 97.29%)'
      $boxShadow='0px 2px 10px 0px rgba(0, 0, 0, 0.18)'
      px={4}
      py={8}
    >
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
          width={200}
          height={60}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id='color' x1='0.5' y1='0' x2='0.5' y2='1'>
              <stop offset='0%' stopColor={theme.ixoNewBlue} />
              <stop offset='100%' stopColor={theme.ixoMediumBlue} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id='background' x1='0.5' y1='0' x2='0.5' y2='1'>
              <stop offset='0%' stopColor='#01293C' />
              <stop offset='66%' stopColor='#033C50' />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' stroke={theme.ixoWhite} />
          <YAxis
            stroke={theme.ixoWhite}
            axisLine={false}
            tickLine={false}
            domain={[0, 2000]}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip />
          <Area type='monotone' dataKey='uv' stroke='url(#background)' fill='url(#color)' />
        </AreaChart>
      </ResponsiveContainer>
    </FlexBox>
  )
}

export default BondPrices
