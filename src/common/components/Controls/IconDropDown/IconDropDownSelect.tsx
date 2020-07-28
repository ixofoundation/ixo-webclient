import React, { useState } from 'react'
import { DropDownOption } from './types'
import { Container, SelectContainer } from './IconDropDownSelect.styles'

interface Props {
  options: DropDownOption[]
  value: string
  onChange: (value: string) => void
  selectText: string
}

const DropDownImageSelect: React.FunctionComponent<Props> = ({
  options,
  value,
  onChange,
  selectText,
}) => {
  const [selectedIconSRC, setSelectedIconSRC] = useState(null)
  const onChangeHandler = (value: string): void => {
    if (!!value && value.length > 0) {
      const selectedOption = options.find(option => option.value === value)
      if (!selectedOption) {
        setSelectedIconSRC(null)
      } else {
        setSelectedIconSRC(selectedOption.iconAssetPath)
      }
    } else {
      setSelectedIconSRC(null)
    }
    onChange(value)
  }

  return (
    <Container>
      <SelectContainer
        defaultValue={value}
        onChange={(e): void => onChangeHandler(e.target.value)}
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
      {selectedIconSRC && (
        <img
          src={require(`../../../../assets${selectedIconSRC.toLowerCase()}`)}
          alt="icon"
        />
      )}
    </Container>
  )
}

export default DropDownImageSelect
