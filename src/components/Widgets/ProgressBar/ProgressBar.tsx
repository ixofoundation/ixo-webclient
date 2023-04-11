import { Box, theme } from 'components/App/App.styles'
import React from 'react'

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

const ProgressBar: React.FC<Props> = ({
  data,
  totalValue,
  width = '100%',
  height = '16px',
  background = theme.ixoDarkBlue,
}) => {
  return (
    <Box width={width} height={height} background={background} borderRadius='100px' overflow='hidden'>
      {data.map((item, index) => {
        const itemWidth = (item.value / totalValue) * 100
        return <Box key={index} width={`${itemWidth}%`} height={height} background={item.color} />
      })}
    </Box>
  )
}

export default ProgressBar
