import * as React from 'react'
import Select from './Select'
import { isoCountries } from '../../lib/commonData'

export default class CountrySelect extends Select {
  generateSelect = () => {
    const selectOptions = []

    for (const code in isoCountries) {
      if (isoCountries.hasOwnProperty(code)) {
        selectOptions.push(
          <option key={code} value={code}>
            {isoCountries[code]}
          </option>,
        )
      }
    }

    return selectOptions
  }
}
