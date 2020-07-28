import React from 'react'
import { DropDownOption } from './types'
import { SelectContainer } from './DropDown.styles'

interface Props {
  selectText: string
  value?: string
  options: DropDownOption[]
  onChange: (value: string) => void
}

const DropDown: React.FunctionComponent<Props> = ({
  selectText,
  options,
  value,
  onChange,
}) => {
  return (
    <div>
      <SelectContainer
        defaultValue={value}
        onChange={(e): void => onChange(e.target.value)}
        className={value && value.length > 0 ? 'active' : null}
        id="symbol"
      >
        <option value="">{selectText}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </SelectContainer>
    </div>
  )
}

export default DropDown
