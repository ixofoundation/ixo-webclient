import { Coin } from '@cosmjs/proto-signing'
import { DecCoin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import BigNumber from 'bignumber.js'
import { isNumber } from 'lodash'
import { thousandSeparator } from './formatters'

export const displayFiatAmount = (amount: BigNumber | number, fiatSymbol: string): string => {
  return `${fiatSymbol} ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export const displayTokenAmount = (amount: BigNumber | string | number, decimals = 3): string => {
  const amountParts = new BigNumber(amount).toFixed(decimals).split('.')
  const intAmountPart = amountParts[0]
  const decAmountPart = amountParts[1]

  if (decAmountPart) {
    return `${intAmountPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${decAmountPart}`
  }
  return `${intAmountPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export const getDisplayAmount = (amount: BigNumber | string | number | undefined, expo = 6): string => {
  if (!amount) {
    return ''
  }
  return new BigNumber(amount).dividedBy(new BigNumber(10).pow(expo)).toString()
}

export const getMinimalAmount = (amount: BigNumber | string | number | undefined, expo = 6): string => {
  if (!amount) {
    return ''
  }
  return new BigNumber(amount).times(new BigNumber(10).pow(expo)).toString()
}

export const convertPrice = (value: number, decimals = 3): string => {
  if (!value || value <= 0 || !isNumber(value)) {
    return `0`
  }

  if (value >= Math.pow(10, 9)) {
    return (value / Math.pow(10, 9)).toFixed(decimals) + 'B'
  } else if (value >= Math.pow(10, 6)) {
    return (value / Math.pow(10, 6)).toFixed(decimals) + 'M'
  } else if (value >= Math.pow(10, 3)) {
    return (value / Math.pow(10, 3)).toFixed(decimals) + 'K'
  }
  return value.toFixed(decimals).toString()
}

export const nFormatter = (num: number, digits = 0): string | number | undefined => {
  if (num === null || num <= 0) {
    return `0`
  }

  if (num >= Math.pow(10, 9)) {
    return (num / Math.pow(10, 9)).toFixed(digits) + 'B'
  }

  if (num >= Math.pow(10, 5)) {
    return (num / Math.pow(10, 6)).toFixed(digits) + 'M'
  }

  return thousandSeparator(num, ',')
}

export const convertDecCoinToCoin = (decCoin: DecCoin): Coin => {
  const amount = new BigNumber(decCoin.amount).dividedBy(Math.pow(10, 18)).toString()
  const denom = decCoin.denom
  return { amount, denom }
}

export const toFixed = (amount: string | undefined, decimals = 3): string => {
  return amount ? new BigNumber(amount).toFixed(decimals) : '0'
}

export const plus = (a: string, b: string): string => {
  return new BigNumber(a).plus(new BigNumber(b)).toString()
}

export const subtract = (a: string, b: string): string => {
  return new BigNumber(a).minus(new BigNumber(b)).toString()
}

export const isLessThan = (a: string, b: string): boolean => {
  return new BigNumber(a).isLessThan(new BigNumber(b))
}

export const isGreaterThan = (a: string, b: string | number): boolean => {
  return new BigNumber(a).isGreaterThan(new BigNumber(b))
}

export const isGreaterThanOrEqualTo = (a: string, b: string | number): boolean => {
  return new BigNumber(a).isGreaterThanOrEqualTo(new BigNumber(b))
}

export const percentFormat = (a: string | number, b: string | number, decimals: number): string => {
  return Number(b) !== 0 ? new BigNumber(a).dividedBy(new BigNumber(b)).times(100).toFixed(decimals) + '%' : '0%'
}
