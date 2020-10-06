import * as React from 'react'
import styled from 'styled-components'

const Bar = styled.div`
  background: #143F54;
  height: 1.25rem;
  border-radius: 0.75rem;
  overflow: hidden;
  display: flex;
`

interface StyledProgressProps {
  percent: number;
}

const Progress = styled.div<StyledProgressProps>`
  width: ${/* eslint-disable-line */ (props) => props.percent + '%' };
  background: linear-gradient(270deg, #6FCF97 0%, #52A675 100%);
  height: 100%;
`

const Rejected = styled.div<StyledProgressProps>`
  width: ${/* eslint-disable-line */ (props) => props.percent + '%' };
  background: linear-gradient(270deg, #E2223B 0%, #CD1C33 85.47%);
  height: 100%;
`

interface Props {
  total: number;
  progress: number;
  rejected: number;
}

const TargetProgress: React.FunctionComponent<Props> = ({ total, progress, rejected }) => {
  return (
    <Bar>
      <Progress percent={ (progress/total * 100) } />
      <Rejected percent={ (rejected/total * 100) } />
    </Bar>
  )
}

export default TargetProgress;