import React, { useState } from 'react'
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
  const [selectedImageSRC, setSelectedImageSRC] = useState(null)

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

  const onChangeHandler = (value: string): void => {
    if (!!value && value.length > 0) {
      const selectedOption = options.find(option => option.value === value)
      if (!selectedOption) {
        setSelectedImageSRC(null)
      } else {
        setSelectedImageSRC(selectedOption.iconAssetPath)
      }
    } else {
      setSelectedImageSRC(null)
    }
    onChange(value)
  }

  return (
    <div style={{ position: 'relative' }}>
      <DropDown
        selectText="Select Country"
        value={value}
        options={options}
        onChange={onChangeHandler}
      />
      {selectedImageSRC && (
        <img
          style={{
            width: '2rem',
            position: 'absolute',
            top: 'calc(50% - 1rem)',
            left: '10px',
            border: '1px solid transparent',
            borderRadius: '4px',
          }}
          src={require(`../../../../../assets${selectedImageSRC.toLowerCase()}`)}
          alt="flag"
        />
      )}
    </div>
  )
}

export default CountryDropDown
