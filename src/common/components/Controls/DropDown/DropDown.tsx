import React from 'react'
import { DropDownOption } from './types'
import { SelectContainer } from './DropDown.styles'
import availableFlags from '../../../../lib/json/availableFlags.json'
import availableSDGs from '../../../../lib/json/availableSDGs.json'

interface Props {
  selectText: string
  value?: string
  options: DropDownOption[]
  onChange: (value: string) => void
}

const getURL = (value: string): string => {
  if (isNaN(parseInt(value))) {
    if (availableFlags.availableFlags.includes(value)) {
      return `url(${require(`../../../../assets/images/country-flags/${value.toLowerCase()}.svg`)})`
    } else if (value == 'AA') {
      return `url(${require('../../../../assets/images/country-flags/global.svg')})`
    }
  } else {
    if (availableSDGs.availableSDGs.includes(value)) {
      return `url(${require(`../../../../assets/images/sdg/sdg${value}.svg`)})`
    }
  }
  return ''
}

const DropDown: React.FunctionComponent<Props> = ({
  selectText,
  options,
  value,
  onChange,
}) => {
  return (
    <SelectContainer
      defaultValue={value}
      onChange={(e): void => onChange(e.target.value)}
      className={value && value.length > 0 ? 'active' : null}
      id="symbol"
      style={{
        backgroundImage:
          value !== '' && value !== null && value !== undefined
            ? getURL(`${value}`)
            : '',
      }}
    >
      <option value="">{selectText}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </SelectContainer>
  )
}

export default DropDown
