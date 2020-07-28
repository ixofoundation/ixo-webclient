import React from 'react'
import countries from '../../../../../lib/maps/countryLatLng.json'
import { DropDownOption } from '../types'
import IconDropDownSelect from '../IconDropDownSelect'
import { Container } from './CountryDropDown.styles'

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
    <Container>
      <IconDropDownSelect
        options={options}
        value={value}
        onChange={onChange}
        selectText={'Select Country'}
      />
    </Container>
  )
}

export default CountryDropDown
