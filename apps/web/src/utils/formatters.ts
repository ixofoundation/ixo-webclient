import moment from 'moment'
import { isoCountries } from 'lib/countries'

export function excerptText(theText: string, words = 20): string {
  if (!theText) {
    return ''
  }
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

export function getCountryName(countryCode?: string) {
  if(!countryCode) return undefined
  if (countryCode === 'AA') {
    return 'Global'
  } else if (Object.hasOwnProperty.call(isoCountries, countryCode)) {
    return isoCountries[countryCode]
  } else {
    return countryCode
  }
}

export function getIxoWorldRoute(path: string): string {
  const origin = import.meta.env.VITE_APP_IXO_WORLD_ORIGIN || 'https://ixo.world'
  return origin + path
}

export function thousandSeparator(number: string | number | undefined, delimitor = '’'): string {
  if (number === undefined || number === '') return undefined!
  if (typeof number !== 'string') {
    number = number.toString()
  }

  if (number.indexOf('.') > -1) {
    return number.split('.')[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${delimitor}`) + '.' + number.split('.')[1]
  }

  return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${delimitor}`)
}

export function toTitleCase(str: string): string {
  return str
    ? str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    : ''
}

export const serverDateFormat = (date: string | number): string => moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')

export const percentageFormat = (percentage: string): string => {
  const decimalCount = percentage.match(/^\d+(\.\d+)?$/)![1]
  if (decimalCount === undefined) return `${percentage}.${'0'.repeat(18)}`
  if (decimalCount.length > 19) return percentage.substring(0, percentage.length - (decimalCount.length - 19))
  return `${percentage}${'0'.repeat(19 - decimalCount.length)}`
}

export const articleFormat = (objStr: string): string => {
  if (objStr) return objStr.match(/^[aieouAIEOU].*/) ? 'an' : 'a'
  return ''
}

export const simplifyId = (id: string, prefix: string): string => id.match(new RegExp(`${prefix}:(.*)`))![1]

export const truncateString = (str: string, length: number, at = 'middle'): string => {
  const separator = '...'

  if (!str || str.length <= length) return str

  if (at === 'middle') {
    const sepLen = separator.length,
      charsToShow = length - sepLen,
      frontChars = Math.ceil(charsToShow / 2),
      backChars = Math.floor(charsToShow / 2)

    return str.substr(0, frontChars) + separator + str.substr(str.length - backChars)
  } else if (at === 'end') {
    return str.slice(0, length) + separator
  }
  return str
}

export const votingRemainingDateFormat = (min: number): string => {
  const x = moment.utc(min * 60 * 1000)
  const dayNum: number = Number(x.format('D')) - 1
  return `${('0' + dayNum).slice(-2)}d ${x.format('H[h] mm[m]')} `
}

export function getDifference(a: number, b: number) {
  const difference = Number((Number(a) - Number(b)).toFixed(2))
  if (difference >= 0) {
    return '+ ' + difference
  } else {
    return '- ' + Math.abs(difference)
  }
}
