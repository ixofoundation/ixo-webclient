import * as React from 'react'
import styled from 'styled-components'

const Bar = styled.div<{ height: number }>`
  background: ${/* eslint-disable-line */ (props) => props.theme.grey};
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: ${({ height }) => height}px;
  border-radius: 10px;
  position: relative;
`

const Rejected = styled.div`
  && {
    background: ${/* eslint-disable-line */ (props) =>
      props.theme.rejectedGradient};
  }
  border-radius: 0 10px 10px 0;
  position: relative;
  left: -2px;
`

const Successful = styled.div<{ barColor?: string }>`
  && {
    background: ${/* eslint-disable-line */ ({ barColor, theme }) =>
      barColor ? barColor : theme.approvedGradient};
  }
  border-radius: 10px;
  position: relative;
  z-index: 1;
`
const Pending = styled.div`
  && {
    background: ${/* eslint-disable-line */ (props) =>
      props.theme.pendingGradient};
  }
  border-radius: 10px;
  position: relative;
`
const Disputed = styled.div`
  && {
    background: ${/* eslint-disable-line */ (props) =>
      props.theme.disputedGradient};
  }
  border-radius: 10px;
  position: relative;
`
export interface Props {
  total: number
  approved: number
  rejected: number
  pending?: number
  disputed?: number
  height?: number
  activeBarColor?: string
  closedText?: string
}

export const ProgressBar: React.FunctionComponent<Props> = ({
  total,
  approved,
  rejected,
  pending = 0,
  disputed = 0,
  activeBarColor,
  height = 6,
  closedText = '',
}) => {
  const pendingWidth = (pending / total) * 100
  const approvedWidth = (approved / total) * 100
  const rejectedWidth = (rejected / total) * 100
  const disputedWidth = (disputed / total) * 100

  return (
    <Bar height={height}>
      <Successful
        style={{ width: approvedWidth + '%' }}
        barColor={activeBarColor}
      />
      <Pending style={{ width: pendingWidth + '%' }} />
      <Rejected style={{ width: rejectedWidth + '%' }} />
      <Disputed style={{ width: disputedWidth + '%' }} />
      {rejected === 0 && (
        <small className="pl-2 justify-content-start align-items-center d-flex position-absolute w-100 h-100">
          {closedText}
        </small>
      )}
    </Bar>
  )
}
