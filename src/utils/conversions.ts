import { Timestamp } from '@ixo/impactxclient-sdk/types/codegen/google/protobuf/timestamp'
import Long from 'long'

export const durationToSeconds = (
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
