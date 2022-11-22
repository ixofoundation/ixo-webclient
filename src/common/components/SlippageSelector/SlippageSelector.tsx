import React from 'react'
import cx from 'classnames'
import {
  SlippageContainer,
  Label,
  SlippageOptionWrapper,
} from './SlippageSelector.styles'
import { formatCurrency } from 'modules/Account/Account.utils'

export enum SlippageType {
  Five = 5,
  Ten = 10,
  Twenty = 20,
  Other = 100,
}

interface Props {
  lastPrice?: number
  denom: string
  symbol: string
  slippage: SlippageType
  handleChange: (newSlippage) => void
}

const SlippageSelector: React.FunctionComponent<Props> = ({
  lastPrice = 1,
  denom,
  symbol,
  slippage,
  handleChange,
}) => {
  return (
    <SlippageContainer>
      <Label>{`Max. offer to quote above the last price of ${
        symbol !== 'xusd'
          ? formatCurrency({
              amount: String(lastPrice),
              denom,
            }).amount
          : lastPrice
      } ${formatCurrency({
        amount: String(lastPrice),
        denom,
      }).denom.toUpperCase()}`}</Label>
      <SlippageOptionWrapper
        className={'d-flex justify-content-center align-items-center mt-3'}
      >
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
