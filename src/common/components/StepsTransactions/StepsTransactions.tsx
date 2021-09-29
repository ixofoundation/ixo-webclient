import React, { useEffect } from 'react'
import cx from 'classnames'
import { StepsWrapper } from './StepsTransactions.styles'
import ApprovedTick from '../../../assets/icons/ApprovedTick'

interface Props {
  steps: string[]
  currentStepNo: number
}

export const StepsTransactions: React.FunctionComponent<Props> = ({
  steps,
  currentStepNo,
}) => {
  useEffect(() => {
    const stepNumberDOMs = document.querySelectorAll('.stepNumber')
    console.log('stepNumberDOMs', stepNumberDOMs)

    stepNumberDOMs.forEach((currentDOM, index, array) => {
      if (index !== stepNumberDOMs.length - 1) {
        const nextDOM = array[index + 1]
        const nextDOMBound = nextDOM.getBoundingClientRect()
        const currentDOMBound = currentDOM.getBoundingClientRect()
        const lineWidth = nextDOMBound.left - currentDOMBound.right
        const lastChild: any = currentDOM.lastElementChild

        lastChild.style.width = lineWidth + 'px';
      }
    })
  }, [])

  return (
    <StepsWrapper className="d-flex justify-content-between">
      {steps &&
        steps.map((step: string, index: number) => (
          <div
            key={index}
            className="stepContainer d-flex align-items-center flex-column"
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
