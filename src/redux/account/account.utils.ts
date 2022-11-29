import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'common/utils/currency.utils'
import { CurrencyType } from './account.types'

export function tokenBalance(balances: Coin[], symbol: string): Coin {
  let balance: Coin = { amount: '0', denom: symbol }
  balances.forEach((element: Coin) => {
    if (element.denom === symbol) {
      balance = Object.assign({}, element)
    }
  })
  return balance
}

export function remainingBalance(balances: Coin[], sending: Coin): Coin {
  const balance = tokenBalance(balances, sending.denom!)

  const amount = new BigNumber(balance.amount).minus(new BigNumber(sending.amount)).toString()
  return {
    denom: balance.denom,
    amount,
  }
}

export function apiCurrencyToCurrency(currency: any): Coin {
  return {
    amount: currency.amount,
    denom: currency.denom,
  }
}

export const Currencies: CurrencyType[] = [
  {
    denom: 'ixo',
    minimalDenom: 'uixo',
    decimals: 6,
    imageUrl: require('assets/tokens/ixo.svg'),
  },
  {
    denom: 'xusd',
    minimalDenom: 'xusd',
    decimals: 0,
    imageUrl: require('assets/tokens/osmo.svg'),
  },
  {
    denom: 'xeur',
    minimalDenom: 'xeur',
    decimals: 0,
    imageUrl: require('assets/tokens/osmo.svg'),
  },
  {
    denom: 'edutest',
    minimalDenom: 'edutest',
    decimals: 0,
    imageUrl: require('assets/tokens/osmo.svg'),
  },
  {
    denom: 'earthday',
    minimalDenom: 'earthday',
    decimals: 0,
    imageUrl: require('assets/tokens/osmo.svg'),
  },
]

export function minimalDenomToDenom(minimalDenom: string, amount: number | string): number {
  const isExist = Currencies.find((currency) => currency.minimalDenom === minimalDenom)
  let decimals = 0
  if (isExist) {
    decimals = isExist.decimals
  }

  return new BigNumber(amount).dividedBy(new BigNumber(10).pow(decimals)).toNumber()
}

export function minimalAmountToAmount(minimalDenom: string, amount: number | string): string {
  const isExist = Currencies.find((currency) => currency.minimalDenom === minimalDenom)
  let decimals = 0
  if (isExist) {
    decimals = isExist.decimals
  }

  return new BigNumber(amount).dividedBy(new BigNumber(10).pow(decimals)).toString()
}

export function denomToMinimalDenom(denom: string, amount: number | string, isRound = false, decimals = 0): string {
  const isExist = Currencies.find((currency) => currency.denom === denom)

  let times = 0
  if (isExist) {
    times = isExist.decimals
  }

  const newAmount = new BigNumber(amount)
  if (isRound) {
    return newAmount.times(new BigNumber(10).pow(times)).integerValue(BigNumber.ROUND_CEIL).toFixed(decimals).toString()
  }
  return newAmount.times(new BigNumber(10).pow(times)).toFixed(decimals).toString()
}

export function findDenomByMinimalDenom(minimalDenom: string): string {
  return Currencies.find((currency) => currency.minimalDenom === minimalDenom)?.denom ?? minimalDenom
}

export function findMinimalDenomByDenom(denom: string): string {
  return Currencies.find((currency) => currency.denom === denom)?.minimalDenom ?? denom
}

export function formatCurrency(currency: Coin): Coin {
  if (currency === undefined || currency.denom === undefined || currency.amount === undefined) {
    return {
      amount: '0',
      denom: '',
    }
  }

  const isExist = Currencies.find((item) => item.minimalDenom === currency.denom)

  if (isExist) {
    return {
      amount: currency.amount ? getBalanceNumber(new BigNumber(currency.amount), isExist.decimals).toString() : '0',
      denom: isExist.denom,
    }
  }
  return {
    amount: currency.amount,
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
