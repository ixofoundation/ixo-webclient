import React from 'react'
import DropDown from '../DropDown'
import { DropDownOption } from '../types'
import { SDGArray } from '../../../../../lib/commonData'

interface Props {
  value: string
  onChange: (value: string) => void
}

const SDGDropDown: React.FunctionComponent<Props> = ({ value, onChange }) => {
  const options: DropDownOption[] = SDGArray.map((sdg, index) => ({
    text: sdg.title,
    value: (index + 1).toString(),
    iconAssetPath: `/images/sdg/sdg${index + 1}.svg`,
  }))

  return (
    <DropDown
      selectText="Select Tag"
      value={value}
      options={options}
      onChange={onChange}
    />
  )
}

export default SDGDropDown
