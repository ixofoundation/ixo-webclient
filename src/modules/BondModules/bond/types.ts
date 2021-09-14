import { Currency } from '../../../types/models'

export interface BondState {
  bondDid: string
  symbol: string
  name?: string
  address?: string
  type?: string
  collateral?: Currency
  totalSupply?: Currency
  price?: Currency
  reserve?: Currency
  trades: {}[]
  alpha?: number
  alphaDate?: Date,
  transactions: any,
}

export enum BondActions {
  GetBalances = 'ixo/Bond/GET_BALANCES',
  GetBalancesPending = 'ixo/Bond/GET_BALANCES_PENDING',
  GetBalancesSuccess = 'ixo/Bond/GET_BALANCES_FULFILLED',
  GetBalancesFailure = 'ixo/Bond/GET_BALANCES_REJECTED',
  GetTrades = 'ixo/Bond/GET_TRADES',
  GetTradesPending = 'ixo/Bond/GET_TRADES_PENDING',
  GetTradesSuccess = 'ixo/Bond/GET_TRADES_FULFILLED',
  GetTradesFailure = 'ixo/Bond/GET_TRADES_REJECTED',
  ClearBond = 'ixo/Bond/CLEAR_BOND',
  GetTransactions = 'ixo/Bond/GET_TRANSACTIONS',
  GetTransactionsPending = 'ixo/Bond/GET_TRANSACTIONS_PENDING',
  GetTransactionsSuccess = 'ixo/Bond/GET_TRANSACTIONS_FULFILLED',
  GetTransactionsFailure = 'ixo/Bond/GET_TRANSACTIONS_REJECTED',
}

export interface GetBalancesAction {
  type: typeof BondActions.GetBalances
  payload: Promise<any>
}

export interface GetBalancesSuccessAction {
  type: typeof BondActions.GetBalancesSuccess
  payload: {
    bondDid: string
    symbol: string
    name: string
    address: string
    type: string
    collateral: Currency
    totalSupply: Currency
    price: Currency
    reserve: Currency
    alpha: 0
    alphaDate: Date
  }
}

export interface GetTradesAction {
  type: typeof BondActions.GetTrades
  payload: Promise<any>
}

export interface GetTradesSuccessAction {
  type: typeof BondActions.GetTradesSuccess
  payload: {
    trades: any[]
  }
}

export interface ClearBondAction {
  type: typeof BondActions.ClearBond
}

export interface GetTransactionsAction {
  type: typeof BondActions.GetTransactions
  payload: Promise<any>
}

export interface GetTransactionsSuccessAction {
  type: typeof BondActions.GetTransactionsSuccess
  payload: any
}

export type BondActionTypes =
  | GetBalancesAction
  | GetBalancesSuccessAction
  | GetTradesAction
  | GetTradesSuccessAction
  | ClearBondAction
  | GetTransactionsAction
  | GetTransactionsSuccessAction
