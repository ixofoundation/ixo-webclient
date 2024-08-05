import { Box } from 'components/App/App.styles'
import React from 'react'
import { useMantineTheme } from '@mantine/core'

interface Props {
  data: {
    key: string
    value: number
    color: string
  }[]
  totalValue: number
  background?: string
  width?: string
  height?: string
}

const ProgressBar: React.FC<Props> = ({ data, totalValue, width = '100%', height = '16px', background }) => {
  const theme = useMantineTheme()
  return (
    <Box
      width={width}
      height={height}
      background={background || theme.ixoDarkBlue}
      $borderRadius='100px'
      overflow='hidden'
    >
      {data.map((item, index) => {
        const itemWidth = (item.value / totalValue) * 100
        return <Box key={index} width={`${itemWidth}%`} height={height} background={item.color} />
      })}
    </Box>
  )
}

export default ProgressBar
