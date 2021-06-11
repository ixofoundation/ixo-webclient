import * as React from 'react'
import styled from 'styled-components'

const Bar = styled.div<{ height: number }>`
  background: ${/* eslint-disable-line */ (props) => props.theme.grey};
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: ${({ height }) => height}px;
  border-radius: 10px;
`

const Rejected = styled.div`
  && {
    background-color: ${/* eslint-disable-line */ (props) => props.theme.red};
  }
  border-radius: 0 10px 10px 0;
  position: relative;
  left: -2px;
`

const Successful = styled.div<{ barColor?: string }>`
  && {
    background: ${/* eslint-disable-line */ ({ barColor, theme }) =>
      barColor ? barColor : theme.graphGradient};
  }
  border-radius: 10px;
  position: relative;
  z-index: 1;
`

export interface Props {
  total: number
  approved: number
  rejected: number
  height?: number
  activeBarColor?: string
}

export const ProgressBar: React.FunctionComponent<Props> = ({
  total,
  approved,
  rejected,
  activeBarColor,
  height = 6,
}) => {
  const approvedWidth = (approved / total) * 100
  const rejectedWidth = (rejected / total) * 100

  return (
    <Bar height={height}>
      <Successful
        style={{ width: approvedWidth + '%' }}
        barColor={activeBarColor}
      />
      <Rejected style={{ width: rejectedWidth + '%' }} />
    </Bar>
  )
}
