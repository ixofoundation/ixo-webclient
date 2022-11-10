import BigNumber from 'bignumber.js'
import { isNumber } from 'lodash'
import { thousandSeparator } from './formatters'

export const displayFiatAmount = (
  amount: BigNumber | number,
  fiatSymbol: string,
): string => {
  return `${fiatSymbol} ${amount
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export const displayTokenAmount = (
  amount: BigNumber | string | number,
  decimals = 3,
): string => {
  const amountParts = new BigNumber(amount).toFixed(decimals).split('.')
  const intAmountPart = amountParts[0]
  const decAmountPart = amountParts[1]

  if (decAmountPart) {
    return `${intAmountPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ',',
    )}.${decAmountPart}`
  }
  return `${intAmountPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export const getBalanceNumber = (balance: BigNumber, decimals = 6): string => {
  const displayBalance = new BigNumber(balance)
    .dividedBy(new BigNumber(10).pow(decimals))
    .toString()

  return displayBalance
}

export const getUIXOAmount = (ixoAmount: string): string => {
  return new BigNumber(ixoAmount).times(new BigNumber(10).pow(6)).toString()
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

export const nFormatter = (num: number, digits = 0): string | number => {
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
