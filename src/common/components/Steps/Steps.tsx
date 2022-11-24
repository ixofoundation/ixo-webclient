import { StepsWrapper } from './Steps.styles'
import ApprovedTick from 'assets/icons/ApprovedTick'

interface Props {
  currentStepTitle: string
  currentStepNo: number
  totalSteps: number
  handleGoToStepClick: (stepNo: number) => void
}

export const Steps: React.FunctionComponent<Props> = ({
  currentStepTitle,
  totalSteps,
  currentStepNo,
  handleGoToStepClick,
}) => {
  const questions = new Array(totalSteps).fill(null).map((u, i) => i + 1)

  return (
    <StepsWrapper>
      {questions.map((stepNo) => {
        return stepNo === currentStepNo ? (
          <div key={stepNo} className='step-item active'>
            {stepNo}
            <span className='step-text'>{currentStepTitle}</span>
          </div>
        ) : stepNo < currentStepNo ? (
          <div key={stepNo} className='step-item completed' onClick={(): void => handleGoToStepClick(stepNo)}>
            <ApprovedTick width='8px' fill='#fff' />
          </div>
        ) : (
          <div key={stepNo} className='step-item'>
            {stepNo}
          </div>
        )
      })}
    </StepsWrapper>
  )
}
