import { Currency } from '../../../types/models'

export interface PriceHistory {
  price: number
  time: Date
}

export interface BondState {
  bondDid: string
  symbol: string
  reserveDenom: string
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
  priceHistory: PriceHistory[],
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
  GetPriceHistory = 'ixo/Bond/GET_PRICEHISTORY',
  GetPriceHistoryPending = 'ixo/Bond/GET_PRICEHISTORY_PENDING',
  GetPriceHistorySuccess = 'ixo/Bond/GET_PRICEHISTORY_FULFILLED',
  GetPriceHistoryFailure = 'ixo/Bond/GET_PRICEHISTORY_REJECTED',
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
    reserveDenom: string
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

export interface GetPriceHistoryAction {
  type: typeof BondActions.GetPriceHistory
  payload: Promise<PriceHistory[]>
}

export interface GetPriceHistorySuccessAction {
  type: typeof BondActions.GetPriceHistorySuccess
  payload: PriceHistory[]
}

export type BondActionTypes =
  | GetBalancesAction
  | GetBalancesSuccessAction
  | GetTradesAction
  | GetTradesSuccessAction
  | ClearBondAction
  | GetTransactionsAction
  | GetTransactionsSuccessAction
  | GetPriceHistoryAction
  | GetPriceHistorySuccessAction
