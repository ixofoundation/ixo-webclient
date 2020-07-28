import React from 'react'
import { DropDownOption } from '../types'
import { SDGArray } from '../../../../../lib/commonData'
import DropDownImageSelect from '../DropDownImageSelect'

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
    <DropDownImageSelect
      options={options}
      value={value}
      onChange={onChange}
      selectText={'Select Tag'}
    />
  )
}

export default SDGDropDown
