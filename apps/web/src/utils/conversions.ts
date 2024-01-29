import { Coin as BaseCoin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { Expiration } from '@ixo/impactxclient-sdk/types/codegen/DaoCore.types'
import { CheckedDepositInfo, Coin } from '@ixo/impactxclient-sdk/types/codegen/DaoPreProposeSingle.types'
import BigNumber from 'bignumber.js'
import { Duration, DurationUnits, DurationWithUnits } from 'types/dao'

export const durationWithUnitsToSeconds = (
  unit: 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds' | '',
  amount: number,
): number => {
  switch (unit) {
    case 'weeks':
      return amount * 60 * 60 * 24 * 7
    case 'days':
      return amount * 60 * 60 * 24
    case 'hours':
      return amount * 60 * 60
    case 'minutes':
      return amount * 60
    case 'seconds':
      return amount
    default:
      return 0
  }
}

export const convertDurationWithUnitsToSeconds = ({ units, value }: DurationWithUnits): number => {
  switch (units) {
    case DurationUnits.Seconds:
      return value
    case DurationUnits.Minutes:
      return value * 60
    case DurationUnits.Hours:
      return value * 60 * 60
    case DurationUnits.Days:
      return value * 60 * 60 * 24
    case DurationUnits.Weeks:
      return value * 60 * 60 * 24 * 7
    case DurationUnits.Months:
      return value * 60 * 60 * 24 * 30
    case DurationUnits.Years:
      return value * 60 * 60 * 24 * 365
    default:
      throw new Error(`Unsupported duration unit: ${units}`)
  }
}

export const convertDurationWithUnitsToDuration = (durationWithUnits: DurationWithUnits): { time: number } => ({
  time: convertDurationWithUnitsToSeconds(durationWithUnits),
})

// Use largest whole-number unit possible.
export const convertSecondsToDurationWithUnits = (seconds: number): DurationWithUnits => {
  if (seconds % (60 * 60 * 24 * 365) === 0) {
    return {
      value: seconds / (60 * 60 * 24 * 365),
      units: DurationUnits.Years,
    }
  } else if (seconds % (60 * 60 * 24 * 30) === 0) {
    return {
      value: seconds / (60 * 60 * 24 * 30),
      units: DurationUnits.Months,
    }
  } else if (seconds % (60 * 60 * 24 * 7) === 0) {
    return {
      value: seconds / (60 * 60 * 24 * 7),
      units: DurationUnits.Weeks,
    }
  } else if (seconds % (60 * 60 * 24) === 0) {
    return {
      value: seconds / (60 * 60 * 24),
      units: DurationUnits.Days,
    }
  } else if (seconds % (60 * 60) === 0) {
    return {
      value: seconds / (60 * 60),
      units: DurationUnits.Hours,
    }
  } else if (seconds % 60 === 0) {
    return {
      value: seconds / 60,
      units: DurationUnits.Minutes,
    }
  } else {
    return {
      value: seconds,
      units: DurationUnits.Seconds,
    }
  }
}

export const convertExpirationToDate = (
  blocksPerYear: number,
  expiration: Expiration,
  // For converting height to rough date.
  currentBlockHeight: number,
): Date | undefined =>
  'at_height' in expiration && currentBlockHeight > 0
    ? new Date(Date.now() + convertBlocksToSeconds(blocksPerYear, expiration.at_height - currentBlockHeight) * 1000)
    : 'at_time' in expiration
    ? // Timestamp is in nanoseconds, convert to microseconds.
      new Date(Number(expiration.at_time) / 1e6)
    : undefined

export const convertBlocksToSeconds = (blocksPerYear: number, blocks: number) =>
  Math.round((blocks / blocksPerYear) * 365 * 24 * 60 * 60)

export const convertSecondsToBlocks = (blocksPerYear: number, seconds: number) =>
  Math.round((seconds * blocksPerYear) / (365 * 24 * 60 * 60))

export const durationToSeconds = (blocksPerYear: number, duration: Duration) =>
  'height' in duration ? convertBlocksToSeconds(blocksPerYear, duration.height) : duration.time

const secPerDay = 24 * 60 * 60
export const secondsToWdhms = (
  seconds: string | number,
  // Set to 5 or more to display all units.
  numUnits = 2,
  fullUnits = false,
  gap = false,
): string => {
  const secondsInt = Math.ceil(Number(seconds))
  if (secondsInt === 0) {
    return '0s'
  }

  const w = Math.floor(secondsInt / (secPerDay * 7))
  const d = Math.floor((secondsInt % (secPerDay * 7)) / secPerDay)
  const h = Math.floor((secondsInt % secPerDay) / 3600)
  const m = Math.floor((secondsInt % 3600) / 60)
  const s = Math.floor(secondsInt % 60)

  const wDisplay = w ? w + (gap ? ' ' : '') + (fullUnits ? 'weeks' : 'w') : null
  const dDisplay = d ? d + (gap ? ' ' : '') + (fullUnits ? 'days' : 'd') : null
  const hDisplay = h ? h + (gap ? ' ' : '') + (fullUnits ? 'hours' : 'h') : null
  const mDisplay = m ? m + (gap ? ' ' : '') + (fullUnits ? 'minutes' : 'm') : null
  const sDisplay = s ? s + (gap ? ' ' : '') + (fullUnits ? 'seconds' : 's') : null

  return (
    [wDisplay, dDisplay, hDisplay, mDisplay, sDisplay]
      // Ignore empty values.
      .filter(Boolean)
      // Only keep certain precision of units.
      .slice(0, numUnits)
      // Separate with commas.
      .join(' ')
  )
}

export function formatMinutes(minutes: number) {
  if (typeof minutes !== 'number' || isNaN(minutes)) {
    return 'Invalid input'
  }

  const days = Math.floor(minutes / (24 * 60))
  const hours = Math.floor((minutes % (24 * 60)) / 60)
  const remainingMinutes = minutes % 60

  let formattedString = ''
  if (days > 0) {
    formattedString += `${days}d `
  }
  if (hours > 0) {
    formattedString += `${hours}h `
  }
  if (remainingMinutes >= 0) {
    formattedString += `${remainingMinutes}m`
  }

  return formattedString.trim()
}

// Converts Date to string from the current point with no sign.
// Example: dateToWdhms(new Date(Date.now() + 1000)) === '1 second'
//          dateToWdhms(new Date(Date.now() - 1000)) === '1 second'
export const dateToWdhms = (date: Date, numUnits = 2) =>
  secondsToWdhms(Math.abs(date.getTime() - Date.now()) / 1000, numUnits)

export const expirationAtTimeToSecondsFromNow = (exp: Expiration) => {
  if (!('at_time' in exp)) {
    return
  }

  const end = Number(exp['at_time'])
  const nowSeconds = new Date().getTime() / 1000
  const endSeconds = end / 1000000000

  return endSeconds - nowSeconds
}

export const depositInfoToCoin = (depositInfo: CheckedDepositInfo | null): Coin | undefined => {
  try {
    if (!depositInfo) {
      throw new Error('No Deposit Info')
    }
    const denom = 'cw20' in depositInfo.denom ? depositInfo.denom.cw20 : depositInfo.denom.native
    return {
      denom,
      amount: depositInfo.amount,
    }
  } catch (e) {
    return undefined
  }
}

export const serializeCoin = (coin: BaseCoin | undefined | null, separator = ' '): string => {
  return coin ? `${coin.amount}${separator}${coin.denom}` : ''
}

export function convertMicroDenomToDenomWithDecimals(amount: number | string, decimals = 0) {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  amount = amount / Math.pow(10, decimals)
  return isNaN(amount) ? 0 : amount
}

export function convertDenomToMicroDenomWithDecimals(amount: number | string, decimals = 0) {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  // Need to round. Example: `8.029409 * Math.pow(10, 6)`.
  amount = Math.round(amount * Math.pow(10, decimals))
  return isNaN(amount) ? 0 : amount
}

export function convertSecondsToNanoSeconds(seconds: string | number): string {
  return new BigNumber(seconds).multipliedBy(1000000000).toString()
}

export function convertNanoSecondsToSeconds(ns: string | number): string {
  return new BigNumber(ns).dividedBy(1000000000).toString()
}
