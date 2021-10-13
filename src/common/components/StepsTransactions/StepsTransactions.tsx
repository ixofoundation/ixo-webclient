import React, { useEffect } from 'react'
import cx from 'classnames'
import { StepsWrapper } from './StepsTransactions.styles'
import ApprovedTick from '../../../assets/icons/ApprovedTick'

interface Props {
  steps: string[]
  currentStepNo: number
  handleStepChange: (index: number) => void
}

export const StepsTransactions: React.FunctionComponent<Props> = ({
  steps,
  currentStepNo,
  handleStepChange,
}) => {
  useEffect(() => {
    const stepNumberDOMs = document.querySelectorAll('.stepNumber')
    // console.log('stepNumberDOMs', stepNumberDOMs)

    stepNumberDOMs.forEach((currentDOM, index, array) => {
      if (index !== stepNumberDOMs.length - 1) {
        const nextDOM = array[index + 1]
        const nextDOMBound = nextDOM.getBoundingClientRect()
        const currentDOMBound = currentDOM.getBoundingClientRect()
        const lineWidth = nextDOMBound.left - currentDOMBound.right
        const lastChild: any = currentDOM.lastElementChild

        lastChild.style.width = lineWidth + 'px'
      }
    })
  }, [steps])

  return (
    <StepsWrapper className="d-flex justify-content-between">
      {steps &&
        steps
          .filter((step) => step !== '')
          .map((step: string, index: number) => (
            <div
              key={index}
              className={cx(
                'stepContainer',
                'd-flex',
                'align-items-center',
                'flex-column',
                {
                  'pe-none': index >= currentStepNo,
                },
              )}
              onClick={(): void => handleStepChange(index)}
            >
              <div
                className={cx('stepNumber', {
                  active: index === currentStepNo,
                  inactive: index > currentStepNo,
                  passed: index < currentStepNo,
                })}
              >
                {index < currentStepNo && (
                  <ApprovedTick width="8px" fill="#fff" />
                )}
                {index >= currentStepNo && index + 1}
                <div className="setpNumberAfter" />
              </div>
              <div
                className={cx('stepText', {
                  active: index === currentStepNo,
                  inactive: index > currentStepNo,
                  passed: index < currentStepNo,
                })}
              >
                {step}
              </div>
            </div>
          ))}
    </StepsWrapper>
  )
}
