import { Expiration } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export declare type Timestamp = string

TimeAgo.addDefaultLocale(en)

export const timeAgo = new TimeAgo('en-US')

export const formatCookingTime = (duration: number): string => {
  const hours = Math.floor(duration / 60)
  const minutes = Math.floor((duration % 60) / 60)

  return `${hours}h ${minutes}min cooking time`
}

export const formatFuelUsage = (duration: number): string => {
  return `${duration}kg fuel used`
}

// Function to check if the expiration is of the 'at_time' type
function isAtTimeExpiration(expiration: Expiration): expiration is { at_time: Timestamp } {
  return (expiration as any).at_time !== undefined
}

// Function to check if the expiration has expired
export const hasExpired = (expiration: Expiration): boolean => {
  if (isAtTimeExpiration(expiration)) {
    const expirationTimeBigInt = BigInt(expiration.at_time)
    const currentTimeBigInt = BigInt(Date.now())

    // Convert current time from milliseconds to microseconds for comparison
    const currentTimeMicroseconds = currentTimeBigInt * BigInt(1000)

    // Check if the current time in microseconds is greater than the expiration time
    return currentTimeMicroseconds > expirationTimeBigInt
  } else if ('at_height' in expiration) {
    // TODO handle at height
  } else {
    // Handle the case for never if necessary
  }

  // If it's not an 'at_time' expiration, we can't determine if it's expired
  // without more context, so return false or handle accordingly
  return false
}
