import { Currency } from '../../types/models'
import { RootState } from '../../common/redux/types'

export function tokenBalance(store: RootState, symbol: string): Currency {
  let balance: Currency = { amount: 0, denom: symbol }
  store.account.balances.forEach((element: Currency) => {
    if (element.denom == symbol) {
      balance = Object.assign({}, element)
    }
  })
  return balance
}

export function remainingBalance(
  store: RootState,
  sending: Currency,
): Currency {
  const balance = tokenBalance(store, sending.denom!)

  balance.amount =
    parseInt(balance.amount! as any) - parseInt(sending.amount! as any)
  return balance
}

export function newBalance(store: RootState, recieving: Currency): Currency {
  const balance = tokenBalance(store, recieving.denom!)

  balance.amount =
    parseInt(balance.amount! as any) + parseInt(recieving.amount! as any)
  return balance
}

export function currencyStr(currency: Currency): string {
  const newCurr = Object.assign({}, currency)

  if (!Object.prototype.hasOwnProperty.call(currency, 'amount')) {
    newCurr.amount = 0
  }
  return (
    newCurr.amount!.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
    ' ' +
    newCurr.denom!.toUpperCase()
  )
}
