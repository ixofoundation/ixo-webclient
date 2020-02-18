import { Currency } from './'

export interface Bond {
  symbol: string
  name?: string
  address?: string
  type?: string
  collateral?: Currency
  totalSupply?: Currency
  price?: Currency
  trades: {}[]
  alpha?: number
  alphaDate?: Date
}

export enum BondActions {
  GET_BOND_BALANCES = 'GET_BOND_BALANCES',
  GET_TRADES = 'GET_TRADES',
  GET_TOTAL_SUPPLIES = 'GET_TOTAL_SUPPLIES',
}

interface BondActionType<T, P> {
  type: T
  payload?: P
}

export type BondAction =
  | BondActionType<typeof BondActions.GET_BOND_BALANCES, any>
  | BondActionType<typeof BondActions.GET_TRADES, any>
  | BondActionType<typeof BondActions.GET_TOTAL_SUPPLIES, any>
