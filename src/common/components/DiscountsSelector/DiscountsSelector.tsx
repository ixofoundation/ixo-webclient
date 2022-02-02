import React from 'react'
import cx from 'classnames'
import { Label, DiscountsOptionWrapper } from './DiscountsSelector.styles'

interface Props {
  availableDiscounts?: string[]
  discounts?: string[]
  handleChange?: (newDiscount) => void
  label?: string
  alignClass?: string
}

const DiscountsSelector: React.FunctionComponent<Props> = ({
  availableDiscounts = ['5', '10', '20', 'other'],
  discounts,
  handleChange,
  label,
  alignClass = 'justify-content-between',
}) => {
  return (
    <div className={`d-flex align-items-center w-100 ${alignClass}`}>
      <Label>{label}</Label>
      <DiscountsOptionWrapper className="d-flex justify-content-between">
        {availableDiscounts.map((item, index) => (
          <div
            key={index.toString()}
            className={cx({ active: discounts.includes(item) })}
            onClick={(): void => handleChange(item)}
          >
            {item === 'other' ? item : `${item}%`}
          </div>
        ))}
      </DiscountsOptionWrapper>
    </div>
  )
}

export default DiscountsSelector
