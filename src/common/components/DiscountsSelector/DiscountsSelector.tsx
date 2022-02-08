import cx from 'classnames'
import ModalInput from 'common/components/ModalInput/ModalInput'
import { isFloat } from 'common/utils/validationUtils'
import React, { useState } from 'react'
import { DiscountsOptionWrapper, Label } from './DiscountsSelector.styles'
interface Props {
  availableDiscounts?: string[]
  discounts?: string[]
  handleChange?: (newDiscount: string) => void
  label?: string
  alignClass?: string
  updateAvailableDiscounts?: (newDiscounts: string[]) => void
}

const DiscountsSelector: React.FunctionComponent<Props> = ({
  availableDiscounts = ['5', '10', '20', 'other'],
  discounts,
  handleChange,
  label,
  alignClass = 'justify-content-between',
  updateAvailableDiscounts,
}) => {
  const [clickedOther, setClickedOther] = useState<boolean>(false)
  const [otherDiscount, setOtherDiscount] = useState<string>()
  return (
    <div className={`d-flex align-items-center w-100 ${alignClass}`}>
      <Label>{label}</Label>
      <DiscountsOptionWrapper className="d-flex justify-content-between">
        {availableDiscounts.map((item, index) => {
          if (item === 'other' && clickedOther) {
            return (
              <ModalInput
                key={index.toString()}
                invalid={otherDiscount !== undefined && !isFloat(otherDiscount)}
                hideLabel={true}
                placeholder="%"
                value={otherDiscount}
                handleChange={(e): void => setOtherDiscount(e.target.value)}
                handleKeyDown={(e): void => {
                  if (
                    e.key === 'Enter' &&
                    otherDiscount !== undefined &&
                    isFloat(otherDiscount)
                  ) {
                    availableDiscounts.splice(
                      availableDiscounts.length - 1,
                      0,
                      e.target.value,
                    )
                    updateAvailableDiscounts(availableDiscounts)
                    setClickedOther(false)
                    handleChange(e.target.value)
                    setOtherDiscount(undefined)
                  }
                }}
                autoFocus={true}
              />
            )
          }
          return (
            <div
              key={index.toString()}
              className={cx({ active: discounts.includes(item) })}
              onClick={(): void => {
                if (item === 'other') {
                  setClickedOther(true)
                } else {
                  handleChange(item)
                }
              }}
            >
              {item === 'other' ? item : `${item}%`}
            </div>
          )
        })}
      </DiscountsOptionWrapper>
    </div>
  )
}

export default DiscountsSelector
