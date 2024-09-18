import React from 'react'
import styled from 'styled-components'

export interface HorizontalLineProps {
  color?: string
  margin?: string
}

const Line = styled.div<HorizontalLineProps>`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.color};
  margin: ${({ margin }) => margin || '10px 0'};
`

export const HorizontalLine: React.FC<HorizontalLineProps> = ({ color = '#ffffff' }) => {
  return <Line color={color} />
}
