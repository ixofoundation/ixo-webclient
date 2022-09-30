import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

const CircleCheckoutStepWrapper = styled.div`
  display: flex;
  justify-content: center;
`

// const StepContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   max-width: 310px;
// `
// const StepHeaderTitle = styled.h1`
//   color: ${(props): string => props.theme.ixoBlue};
//   font-family: ${(props): string => props.theme.secondaryFontFamily};
//   font-weight: 400;
//   font-size: 25px;
//   line-height: 110%;
//   text-align: center;
//   margin-top: 40px;
//   margin-bottom: 40px;
// `
// const StepHeaderDescription = styled.h1`
//   color: #ffffff;
//   font-family: ${(props): string => props.theme.primaryFontFamily};
//   font-weight: 400;
//   font-size: 16px;
//   line-height: 131%;
//   margin-bottom: 30px;
// `

// const StepRow = styled.div`
//   display: flex;
//   gap: 10px;
// `

interface Props {
  handleFinished: () => void
}
const CircleCheckoutStep: React.FC<Props> = ({
  handleFinished,
}): JSX.Element => {
  const stepComponents = []
  const [stepIdx, setStepIdx] = useState(0)
  const CurrentStepComponent = useMemo(
    () => stepComponents[stepIdx] ?? undefined,
    // eslint-disable-next-line
    [stepIdx],
  )

  useEffect(() => {
    if (stepIdx === stepComponents.length - 1) {
      handleFinished()
    }
    // eslint-disable-next-line
  }, [stepIdx])

  return (
    <CircleCheckoutStepWrapper>
      {CurrentStepComponent && <CurrentStepComponent handleNext={setStepIdx} />}
    </CircleCheckoutStepWrapper>
  )
}

export default CircleCheckoutStep
