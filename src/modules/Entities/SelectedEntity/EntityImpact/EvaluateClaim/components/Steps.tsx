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
}

const Steps: React.FunctionComponent<Props> = ({ steps }) => {
  return (
    <Container>
    {
      steps.map((step, key) => {
        return (
          <Step
            key={ key }
            { ...step }
          />
        )
      })
    }
    </Container>
  )
}

export default Steps;