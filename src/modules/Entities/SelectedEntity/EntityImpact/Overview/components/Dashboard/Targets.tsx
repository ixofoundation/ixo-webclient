import * as React from 'react'
import TargetProgress from './TargetProgress'
import IxoGradient from 'assets/icons/IxoGradient'
import styled from 'styled-components'
import IndicateArrow from 'assets/icons/IndicateArrow'

const Number = styled.div`
  font-size: 2.75rem;
  color: #39C3E6;
  margin-left: 0.625rem;
`
const Percent = styled.div`
  align-self: flex-start;
  margin-top: 0.725rem;
  font-size: 0.75rem;
  color: #6FCF97;
  font-weight: bold;
  margin-left: 0.625rem;

  svg {
    margin-right: 0.4rem;
  }
`

const Targets: React.FunctionComponent = () => {
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="d-flex flex-grow-1 justify-content-center align-items-center">
        <div>
          <div className="d-flex align-items-center">
            <IxoGradient fill='#436779' />
            <Number>
              0
            </Number>
            <Percent>
              <IndicateArrow fill="#6FCF97" />
              0%
            </Percent>
          </div>
          <div className="text-white text-center">
            Project Alpha
          </div>
        </div>
      </div>
      <TargetProgress
        total={100}
        progress={100}
        rejected={ 0 }
      />
    </div>
  )
}

export default Targets