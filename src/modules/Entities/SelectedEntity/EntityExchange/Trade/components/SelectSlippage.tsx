import React from 'react'
import {
  SlippageContainer,
  SlippageText,
  ValueRadio,
} from './SelectSlippage.styles'

interface Props {
  value: number
  handleChange: any
  className?: string
}

const SelectSlippage: React.FunctionComponent<Props> = ({
  value,
  handleChange,
  className,
}) => {
  return (
    <SlippageContainer className={className}>
      <SlippageText style={{ fontSize: '16px', color: '#FFFFFF' }}>
        Transaction settings
      </SlippageText>
      <SlippageText
        className="mb-2"
        style={{ fontSize: '14px', color: '#678A9C', marginRight: '10px' }}
      >
        Slippage tolerance
      </SlippageText>

      <ValueRadio
        className={value === 0.01 ? 'active' : ''}
        onClick={(): any => handleChange(0.01)}
      >
        1%
      </ValueRadio>
      <ValueRadio
        className={value === 0.03 ? 'active' : ''}
        onClick={(): any => handleChange(0.03)}
      >
        3%
      </ValueRadio>
      <ValueRadio
        className={value === 0.05 ? 'active' : ''}
        onClick={(): any => handleChange(0.05)}
      >
        5%
      </ValueRadio>
      <ValueRadio
        className={value === 0.025 ? 'active' : ''}
        onClick={(): any => handleChange(0.025)}
      >
        2.5%
      </ValueRadio>
    </SlippageContainer>
  )
}
export default SelectSlippage
