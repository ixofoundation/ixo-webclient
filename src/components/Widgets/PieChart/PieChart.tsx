import { Box, theme } from 'components/App/App.styles'
import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface Props {
  data: { name: string; value: number; color?: string }[]
  backgroundColor?: string
  width?: string
  height?: string
  radius?: number
  thickness?: number
  descriptor?: JSX.Element
}

const Component: React.FC<Props> = ({
  data,
  backgroundColor = theme.ixoDarkBlue,
  width = '100%',
  height = '300px',
  radius = 100,
  thickness = 10,
  descriptor,
}) => {
  return (
    <Box position='relative' style={{ width, height }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={[{ value: 100 }]}
            innerRadius={radius - thickness}
            outerRadius={radius}
            cornerRadius={thickness}
            fill={backgroundColor}
            paddingAngle={0}
            dataKey='value'
            stroke='none'
            startAngle={-270}
            isAnimationActive={false}
          />

          <Pie
            data={data}
            innerRadius={radius - thickness}
            outerRadius={radius}
            cornerRadius={thickness}
            paddingAngle={0}
            dataKey='value'
            stroke='none'
            startAngle={-270}
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#FFFFFF'} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {descriptor && (
        <Box position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)'>
          {descriptor}
        </Box>
      )}
    </Box>
  )
}

export default Component
