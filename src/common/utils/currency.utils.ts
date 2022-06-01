import BigNumber from 'bignumber.js'
import { thousandSeparator } from './formatters'

export const displayFiatAmount = (
  amount: BigNumber | number,
  fiatSymbol: string,
): string => {
  return `${fiatSymbol} ${amount
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export const displayTokenAmount = (amount: BigNumber | number): string => {
  const amountParts = amount.toFixed(3).split('.')
  const intAmountPart = amountParts[0]
  const decAmountPart = amountParts[1]

  return `${intAmountPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    '’',
  )}.${decAmountPart}`
}

export const getBalanceNumber = (balance: BigNumber, decimals = 6): number => {
  const displayBalance = new BigNumber(balance).dividedBy(
    new BigNumber(10).pow(decimals),
  )

  return displayBalance.toNumber()
}

export const getUIXOAmount = (ixoAmount: string): string => {
  return new BigNumber(ixoAmount).times(new BigNumber(10).pow(6)).toString()
}

export const convertPrice = (value: number, decimal = 0): string => {
  if (value === null || value <= 0) {
    return `0`
  }

  if (value >= Math.pow(10, 9)) {
    return (value / Math.pow(10, 9)).toFixed(decimal) + 'B'
  } else if (value >= Math.pow(10, 6)) {
    return (value / Math.pow(10, 6)).toFixed(decimal) + 'M'
  } else if (value >= Math.pow(10, 3)) {
    return (value / Math.pow(10, 3)).toFixed(decimal) + 'K'
  }
  return value.toString()
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

  // const lookup = [
  //   { value: 1, symbol: '' },
  //   { value: 1e3, symbol: 'K' },
  //   { value: 1e6, symbol: 'M' },
  //   { value: 1e9, symbol: 'G' },
  //   { value: 1e12, symbol: 'T' },
  //   { value: 1e15, symbol: 'P' },
  //   { value: 1e18, symbol: 'E' },
  // ]
  // // const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  // const item = lookup
  //   .slice()
  //   .reverse()
  //   .find(function (item) {
  //     return num >= item.value
  //   })
  // return item
  //   ? (num / item.value).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] +
  //       item.symbol
  //   : '0'
}
