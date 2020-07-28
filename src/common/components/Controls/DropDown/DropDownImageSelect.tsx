import React, { useState } from 'react'
import DropDown from './DropDown'
import { DropDownOption } from './types'
import { Container } from './DropDownImageSelect.styles'

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
      <DropDown
        selectText={selectText}
        value={value}
        options={options}
        onChange={onChangeHandler}
      />
      {selectedIconSRC && (
        <img
          className={selectText === 'Select Country' ? 'country' : 'sdg'}
          src={require(`../../../../assets${selectedIconSRC.toLowerCase()}`)}
          alt="icon"
        />
      )}
    </Container>
  )
}

export default DropDownImageSelect
