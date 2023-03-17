import { Coin as BaseCoin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { Expiration } from '@ixo/impactxclient-sdk/types/codegen/DaoCore.types'
import { CheckedDepositInfo, Coin } from '@ixo/impactxclient-sdk/types/codegen/DaoPreProposeSingle.types'
import { Timestamp } from '@ixo/impactxclient-sdk/types/codegen/google/protobuf/timestamp'
import Long from 'long'
import { Duration } from 'types/dao'

export const durationToSeconds1 = (
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

function numberToLong(number: number) {
  return Long.fromNumber(number)
}

export function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000)
  const nanos = (date.getTime() % 1000) * 1000000
  return {
    seconds,
    nanos,
  }
}

export function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1000
  millis += t.nanos / 1000000
  return new Date(millis)
}

const secPerDay = 24 * 60 * 60
export const secondsToWdhms = (
  seconds: string | number,
  // Set to 5 or more to display all units.
  numUnits = 2,
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

  const wDisplay = w ? w + 'w' : null
  const dDisplay = d ? d + 'd' : null
  const hDisplay = h ? h + 'h' : null
  const mDisplay = m ? m + 'm' : null
  const sDisplay = s ? s + 's' : null

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
