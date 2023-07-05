import * as React from 'react'
import styled from 'styled-components'

const Bar = styled.div`
  background: #143f54;
  height: 0.625rem;
  border-radius: 0.75rem;
`

interface StyledProgressProps {
  percent: number
}

const Progress = styled.div<StyledProgressProps>`
  width: ${/* eslint-disable-line */ (props) => props.percent + '%'};
  background: ${(props): string => props.theme.ixoNewBlue};
  border-radius: 0.75rem;
  height: 100%;
`

interface Props {
  total: number
  progress: number
}

const ProgressBar: React.FunctionComponent<Props> = ({ total, progress }) => {
  return (
    <Bar>
      <Progress percent={(progress / total) * 100} />
    </Bar>
  )
}

export default ProgressBar
