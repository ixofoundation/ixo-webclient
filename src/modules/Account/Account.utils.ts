import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'common/utils/currency.utils'
import { Currency } from '../../types/models'
import { CurrencyType } from './types'

export function tokenBalance(balances: Currency[], symbol: string): Currency {
  let balance: Currency = { amount: 0, denom: symbol }
  balances.forEach((element: Currency) => {
    if (element.denom === symbol) {
      balance = Object.assign({}, element)
    }
  })
  return balance
}

export function remainingBalance(
  balances: Currency[],
  sending: Currency,
): Currency {
  const balance = tokenBalance(balances, sending.denom!)

  balance.amount =
    parseInt(balance.amount! as any) - parseInt(sending.amount! as any)
  return balance
}

export function newBalance(
  balances: Currency[],
  receiving: Currency,
): Currency {
  const balance = tokenBalance(balances, receiving.denom!)

  balance.amount =
    parseInt(balance.amount! as any) + parseInt(receiving.amount! as any)
  return balance
}

export function currencyStr(currency: Currency, pretty = true): string {
  const newCurr = Object.assign({}, currency)

  if (!Object.prototype.hasOwnProperty.call(currency, 'amount')) {
    newCurr.amount = 0
  }

  if (pretty) {
    return `${newCurr.amount!.toString()} ${newCurr.denom!.toUpperCase()}`
  } else {
    return `${newCurr.amount!.toString()}${newCurr.denom!}`
  }
}

export function apiCurrencyToCurrency(currency: any): Currency {
  return {
    amount: currency.amount ? parseInt(currency.amount, 10) : 0,
    denom: currency.denom,
  }
}

export const Currencies: CurrencyType[] = [
  {
    denom: 'ixo',
    minimalDenom: 'uixo',
    decimals: 6,
    imageUrl: undefined,
  },
  {
    denom: 'xusd',
    minimalDenom: 'xusd',
    decimals: 0,
    imageUrl: undefined,
  },
  {
    denom: 'xeur',
    minimalDenom: 'xeur',
    decimals: 0,
    imageUrl: undefined,
  },
  {
    denom: 'edutest',
    minimalDenom: 'edutest',
    decimals: 0,
    imageUrl: undefined,
  },
]

export function minimalDenomToDenom(
  minimalDenom: string,
  amount: number | string,
): number {
  const isExist = Currencies.find(
    (currency) => currency.minimalDenom === minimalDenom,
  )
  let decimals = 0
  if (isExist) {
    decimals = isExist.decimals
  }

  return new BigNumber(amount)
    .dividedBy(new BigNumber(10).pow(decimals))
    .toNumber()
}

export function denomToMinimalDenom(
  denom: string,
  amount: number | string,
  isRound = false,
): string {
  const isExist = Currencies.find((currency) => currency.denom === denom)

  let decimals = 0
  if (isExist) {
    decimals = isExist.decimals
  }

  const newAmount = new BigNumber(amount)
  if (isRound) {
    return newAmount
      .times(new BigNumber(10).pow(decimals))
      .integerValue(BigNumber.ROUND_CEIL)
      .toString()
  }
  return newAmount.times(new BigNumber(10).pow(decimals)).toString()
}

export function findDenomByMinimalDenom(minimalDenom: string): string {
  return (
    Currencies.find((currency) => currency.minimalDenom === minimalDenom)
      ?.denom ?? minimalDenom
  )
}

export function findMinimalDenomByDenom(denom: string): string {
  return (
    Currencies.find((currency) => currency.denom === denom)?.minimalDenom ??
    denom
  )
}

export function formatCurrency(currency: any): Currency {
  if (
    currency === undefined ||
    currency.denom === undefined ||
    currency.amount === undefined
  ) {
    return {
      amount: 0,
      denom: '',
    }
  }

  const isExist = Currencies.find(
    (item) => item.minimalDenom === currency.denom,
  )

  if (isExist) {
    return {
      amount: currency.amount
        ? getBalanceNumber(new BigNumber(currency.amount), isExist.decimals)
        : 0,
      denom: isExist.denom,
    }
  }
  return {
    amount: Number(currency.amount),
    denom: currency.denom,
  }
}

export function currencyToApiCurrency(currency: any): any {
  return {
    amount: currency.amount.toString(),
    denom: currency.denom,
  }
}

export const checkValidAddress = (address: string): boolean => {
  if (address === undefined) return false
  if (address.length === 0) return false
  if (!address.startsWith('ixo')) return false
  if (address.length === 42) return true
  return false
}
