import { Currency } from '../../../types/models'

export interface PriceHistory {
  price: number
  time: Date
}

export interface AlphaHistory {
  alpha: number
  time: Date
  editorDid: string
}

export interface WithdrawHistory {
  status: string
  time: Date
  amount: number
  type: string
  purpose: string
  description: string
  denom: string
  txHash: string
}

export enum BondStateType {
  HATCH = 'HATCH',
  OPEN = 'OPEN',
  SETTLED = 'SETTLE',
  FAILED = 'FAILED',
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
  myStake?: Currency
  capital?: Currency
  trades: {}[]
  publicAlpha?: number
  systemAlpha?: number
  state: BondStateType
  alphaDate?: Date
  transactions: any
  priceHistory: PriceHistory[]
  alphaHistory: AlphaHistory[]
  withdrawHistory: WithdrawHistory[]
  lastPrice: number
  maxSupply: Currency
  initialSupply: number
  initialPrice: number
  initialRaised: number
  allowSells: boolean
  allowReserveWithdrawals: boolean
  availableReserve: Currency[]
  controllerDid: string
  outcomePayment: number

  Outcomes: {
    Targets: OutcomeTarget[]
    Rewards: OutcomeRewards[]
  }
}

export interface OutcomeTarget {
  goal: string
}
export interface OutcomeRewards {
  date: Date
}

export enum BondActions {
  GetBondDid = 'ixo/Bond/GET_BONDDID',
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
  GetOutcomesTargets = 'ixo/Bond/GET_OUTCOMESTARGET',
  GetOutcomesTargetsPending = 'ixo/Bond/GET_OUTCOMESTARGET_PENDING',
  GetOutcomesTargetsSuccess = 'ixo/Bond/GET_OUTCOMESTARGET_FULFILLED',
  GetOutcomesTargetsFailure = 'ixo/Bond/GET_OUTCOMESTARGET_REJECTED',
  GetPriceHistory = 'ixo/Bond/GET_PRICEHISTORY',
  GetPriceHistoryPending = 'ixo/Bond/GET_PRICEHISTORY_PENDING',
  GetPriceHistorySuccess = 'ixo/Bond/GET_PRICEHISTORY_FULFILLED',
  GetPriceHistoryFailure = 'ixo/Bond/GET_PRICEHISTORY_REJECTED',
  GetAlphaHistory = 'ixo/Bond/GET_ALPHAHISTORY',
  GetAlphaHistoryPending = 'ixo/Bond/GET_ALPHAHISTORY_PENDING',
  GetAlphaHistorySuccess = 'ixo/Bond/GET_ALPHAHISTORY_FULFILLED',
  GetAlphaHistoryFailure = 'ixo/Bond/GET_ALPHAHISTORY_REJECTED',
  GetWithdrawHistory = 'ixo/Bond/GET_WITHDRAWHISTORY',
  GetWithdrawHistoryPending = 'ixo/Bond/GET_WITHDRAWHISTORY_PENDING',
  GetWithdrawHistorySuccess = 'ixo/Bond/GET_WITHDRAWHISTORY_FULFILLED',
  GetWithdrawHistoryFailure = 'ixo/Bond/GET_WITHDRAWHISTORY_REJECTED',
}

export interface GetBondDidAction {
  type: typeof BondActions.GetBondDid
  payload: string
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
    systemAlpha: number
    publicAlpha: number
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
export interface GetOutcomesTargetsAction {
  type: typeof BondActions.GetOutcomesTargets
  payload: Promise<any>
}

export interface GetOutcomesTargetsSuccessAction {
  type: typeof BondActions.GetOutcomesTargetsSuccess
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

export interface GetAlphaHistoryAction {
  type: typeof BondActions.GetAlphaHistory
  payload: Promise<AlphaHistory[]>
}

export interface GetAlphaHistorySuccessAction {
  type: typeof BondActions.GetAlphaHistorySuccess
  payload: AlphaHistory[]
}

export interface GetWithdrawHistoryAction {
  type: typeof BondActions.GetWithdrawHistory
  payload: Promise<WithdrawHistory[]>
}

export interface GetWithdrawHistorySuccessAction {
  type: typeof BondActions.GetWithdrawHistorySuccess
  payload: WithdrawHistory[]
}

export type BondActionTypes =
  | GetBondDidAction
  | GetBalancesAction
  | GetBalancesSuccessAction
  | GetTradesAction
  | GetTradesSuccessAction
  | ClearBondAction
  | GetTransactionsAction
  | GetTransactionsSuccessAction
  | GetOutcomesTargetsAction
  | GetOutcomesTargetsSuccessAction
  | GetPriceHistoryAction
  | GetPriceHistorySuccessAction
  | GetAlphaHistoryAction
  | GetAlphaHistorySuccessAction
  | GetWithdrawHistoryAction
  | GetWithdrawHistorySuccessAction
