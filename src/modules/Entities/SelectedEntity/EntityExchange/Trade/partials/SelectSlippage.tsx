import React from 'react'
import {
  SlippageContainer,
  SlippageText,
  ValueRadio,
} from './SelectSlippage.styles'

interface Props {
  value: number
  handleChange: any
  handleHover: any
}

const SelectSlippage: React.FunctionComponent<Props> = ({
  value,
  handleChange,
  handleHover,
}) => {
  return (
    <SlippageContainer
      onMouseEnter={(): any => {
        handleHover(true)
      }}
      onMouseLeave={(): any => {
        handleHover(false)
      }}
    >
      <SlippageText style={{ fontSize: '16px', color: '#FFFFFF' }}>
        Transaction settings
      </SlippageText>
      <SlippageText
        style={{ fontSize: '14px', color: '#678A9C', marginRight: '10px' }}
      >
        Slippage tolerance
      </SlippageText>

      <ValueRadio
        className={value === 1 ? 'active' : ''}
        onClick={(): any => handleChange(1)}
      >
        1%
      </ValueRadio>
      <ValueRadio
        className={value === 3 ? 'active' : ''}
        onClick={(): any => handleChange(3)}
      >
        3%
      </ValueRadio>
      <ValueRadio
        className={value === 5 ? 'active' : ''}
        onClick={(): any => handleChange(5)}
      >
        5%
      </ValueRadio>
      <ValueRadio
        className={value === 2.5 ? 'active' : ''}
        onClick={(): any => handleChange(2.5)}
      >
        2.5%
      </ValueRadio>
    </SlippageContainer>
  )
}
export default SelectSlippage
