import React from 'react'
import DropDown from '../DropDown'
import countries from '../../../../../lib/maps/countryLatLng.json'
import { DropDownOption } from '../types'

interface Props {
  value: string
  onChange: (value: string) => void
}

const CountryDropDown: React.FunctionComponent<Props> = ({
  value,
  onChange,
}) => {
  const countryOptions: DropDownOption[] = countries.map(country => ({
    text: country.country,
    value: country.alpha2,
    iconAssetPath: `/images/country-flags/${country.alpha2}.svg`,
  }))

  const options = [
    ...[
      {
        text: 'Global',
        value: 'AA',
        iconAssetPath: '/images/country-flags/global.svg',
      },
    ],
    ...countryOptions,
  ]

  return (
    <DropDown
      selectText="Select Country"
      value={value}
      options={options}
      onChange={onChange}
    />
  )
}

export default CountryDropDown
