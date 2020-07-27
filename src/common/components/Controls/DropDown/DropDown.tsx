import React from 'react'
import { DropDownOption } from './types'

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
    <select value={value} onChange={(e): void => onChange(e.target.value)}>
      <option value="">{selectText}</option>
      {options.map(opt => (
        // TODO - icon
        <option key={opt.value} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </select>
  )
}

export default DropDown
