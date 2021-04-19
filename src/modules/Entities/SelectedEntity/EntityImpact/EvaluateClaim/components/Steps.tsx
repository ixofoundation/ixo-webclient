import React from 'react'
import styled from 'styled-components'
import Step, { Props as StepProp } from './Step'

const Container = styled.div`
  display: flex;
  align-items: center;

  > div {
    margin-right: 3.15rem;
  }
`

interface Props {
  steps: StepProp[]
  onClickStep: (stepNumber: number) => void
}

const Steps: React.FunctionComponent<Props> = ({ steps, onClickStep }) => {
  return (
    <Container>
      {steps.map((step, key) => {
        return <Step key={key} {...step} onClickStep={onClickStep} />
      })}
    </Container>
  )
}

export default Steps
