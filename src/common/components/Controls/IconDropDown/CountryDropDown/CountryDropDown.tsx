import React from 'react'
import countries from '../../../../../lib/maps/countryLatLng.json'
import { DropDownOption } from '../types'
import IconDropDownSelect from '../IconDropDownSelect'
import { Container } from './CountryDropDown.styles'

interface Props {
  value: string
  onChange: (value: string) => void
  onBlur: (value: string) => void
  onFocus: (value: string) => void
}

const CountryDropDown: React.FunctionComponent<Props> = ({
  value,
  onChange,
  onBlur,
  onFocus,
  ...rest
}) => {
  const countryOptions: DropDownOption[] = countries.map((country) => ({
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
    <Container {...rest}>
      <IconDropDownSelect
        options={options}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        selectText={'Select Country'}
      />
    </Container>
  )
}

export default CountryDropDown
