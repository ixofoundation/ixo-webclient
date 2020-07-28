import React, { useState } from 'react'
import DropDown from '../DropDown'
import { DropDownOption } from '../types'
import { SDGArray } from '../../../../../lib/commonData'

interface Props {
  value: string
  onChange: (value: string) => void
}

const SDGDropDown: React.FunctionComponent<Props> = ({ value, onChange }) => {
  const [selectedSDG_SRC, setSelectedSDG_SRC] = useState(null)

  const options: DropDownOption[] = SDGArray.map((sdg, index) => ({
    text: sdg.title,
    value: (index + 1).toString(),
    iconAssetPath: `/images/sdg/sdg${index + 1}.svg`,
  }))

  const onChangeHandler = (value: string): void => {
    if (!!value && value.length > 0) {
      const selectedOption = options.find(option => option.value === value)
      if (!selectedOption) {
        setSelectedSDG_SRC(null)
      } else {
        setSelectedSDG_SRC(selectedOption.iconAssetPath)
      }
    } else {
      setSelectedSDG_SRC(null)
    }
    onChange(value)
  }

  return (
    <div style={{ position: 'relative' }}>
      <DropDown
        selectText="Select Tag"
        value={value}
        options={options}
        onChange={onChangeHandler}
      />
      {selectedSDG_SRC && (
        <img
          style={{
            width: '2rem',
            position: 'absolute',
            top: 'calc(50% - 1rem)',
            left: '10px',
            border: '1px solid transparent',
            borderRadius: '40px',
          }}
          src={require(`../../../../../assets${selectedSDG_SRC.toLowerCase()}`)}
          alt="flag"
        />
      )}
    </div>
  )
}

export default SDGDropDown
