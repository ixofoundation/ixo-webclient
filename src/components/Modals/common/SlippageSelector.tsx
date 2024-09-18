import React from 'react'
import cx from 'classnames'
import { SlippageContainer, Label, SlippageOptionWrapper } from './SlippageSelector.styles'
import { SlippageType } from './types'
import { Coin } from '@cosmjs/proto-signing'
import { toFixed } from 'utils/currency'

interface Props {
  lastPrice: Coin
  slippage: SlippageType
  handleChange: (newSlippage: SlippageType) => void
}

const SlippageSelector: React.FunctionComponent<Props> = ({ lastPrice, slippage, handleChange }) => {
  return (
    <SlippageContainer>
      <Label>{`Max. offer to quote above the last price of ${toFixed(
        lastPrice?.amount,
        3,
      )} ${lastPrice?.denom.toUpperCase()}`}</Label>
      <SlippageOptionWrapper className={'d-flex justify-content-center align-items-center mt-3'}>
        <div
          className={cx({ active: slippage === SlippageType.Five })}
          onClick={(): void => handleChange(SlippageType.Five)}
        >
          {SlippageType.Five}%
        </div>
        <div
          className={cx({ active: slippage === SlippageType.Ten })}
          onClick={(): void => handleChange(SlippageType.Ten)}
        >
          {SlippageType.Ten}%
        </div>
        <div
          className={cx({ active: slippage === SlippageType.Twenty })}
          onClick={(): void => handleChange(SlippageType.Twenty)}
        >
          {SlippageType.Twenty}%
        </div>
        <div
          className={cx({ active: slippage === SlippageType.Other })}
          onClick={(): void => handleChange(SlippageType.Other)}
        >
          {`>20%`}
        </div>
      </SlippageOptionWrapper>
    </SlippageContainer>
  )
}

export default SlippageSelector
