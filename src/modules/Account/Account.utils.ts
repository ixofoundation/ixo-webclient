import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'common/utils/currency.utils'
import { Currency } from '../../types/models'

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
  if (currency.denom === 'uixo') {
    return {
      amount: currency.amount
        ? getBalanceNumber(new BigNumber(currency.amount))
        : 0,
      denom: 'ixo',
    }
  }
  return {
    amount: parseInt(currency.amount, 10),
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
  if (address.length === 0) return false
  if (!address.startsWith('ixo')) return false
  if (address.length === 42) return true
  return false
}
