import Select from '../Select/Select'
import { isoCountries } from 'lib/commonData'

export default class CountrySelect extends Select {
  generateSelect = (): Array<JSX.Element> => {
    const selectOptions = []

    for (const code in isoCountries) {
      if (Object.prototype.hasOwnProperty.call(isoCountries, code)) {
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
