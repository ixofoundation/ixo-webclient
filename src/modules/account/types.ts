import { Currency } from '../../types/models'

export interface AccountState {
  name?: string
  address?: string
  orders?: {}[]
  balances: Currency[]
}

export enum AccountActions {
  SIGN_ORDER = 'SIGN_ORDER',
  GET_BALANCES = 'GET_BALANCES',
  GET_ORDERS = 'GET_ORDERS',
  INIT_PROVIDER = 'INIT_PROVIDER',
}

interface WalletActionType<T, P> {
  type: T
  payload?: P
}

export type WalletAction =
  | WalletActionType<typeof AccountActions.SIGN_ORDER, string>
  | WalletActionType<typeof AccountActions.GET_BALANCES, any>
  | WalletActionType<typeof AccountActions.INIT_PROVIDER, any>
  | WalletActionType<typeof AccountActions.GET_ORDERS, any>
