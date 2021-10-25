import moment from 'moment'
import { isoCountries } from '../../lib/commonData'
require('dotenv').config()

export function excerptText(theText: string, words = 20): string {
  const cutOffCount = words
  const wordCount = theText.split(' ').length - 1

  if (wordCount > cutOffCount) {
    let count = 0
    let theIndex = 0

    for (let i = 0; i < theText.length - 1; i++) {
      if (count < cutOffCount) {
        if (theText[i] === ' ') {
          count++
        }
      } else {
        theIndex = i
        break
      }
    }
    return theText.slice(0, theIndex - 1) + '...'
  } else {
    return theText
  }
}

export function getCountryName(countryCode: string): string {
  if (countryCode === 'AA') {
    return 'Global'
  } else if (Object.hasOwnProperty.call(isoCountries, countryCode)) {
    return isoCountries[countryCode]
  } else {
    return countryCode
  }
}

export function getIxoWorldRoute(path: string): string {
  const origin = process.env.REACT_APP_IXO_WORLD_ORIGIN || 'https://ixo.world'
  return origin + path
}

export function thousandSeparator(number: string | number, delimitor: string = '’'): string {
  if (typeof number !== 'string') {
    number = number.toString()
  }

  return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${delimitor}`)
}

export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

export const serverDateFormat = (date: string | number): string =>
  moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
