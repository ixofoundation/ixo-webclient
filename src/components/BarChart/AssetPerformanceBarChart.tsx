import React, { PureComponent } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTheme } from 'styled-components'

export const AssetPerformanceBarChart = ({ data }: { data: Record<string, string | number>[] }) => {
  const theme = useTheme() as any

  const lightBlue = theme.ixoLightBlue
  const newBlue = theme.ixoNewBlue
  const blue = theme.ixoBlue
  const lightGrey = theme.ixoGrey300
  const darkBlue = theme.ixoDarkBlue
  const navyBlue = theme.ixoNavyBlue

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
        <XAxis width={4} dataKey='month' interval={10} />
        <YAxis domain={[0, 'dataMax + 5000']} />
        <Tooltip />
        <Bar
          stackId='a'
          dataKey='total'
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
