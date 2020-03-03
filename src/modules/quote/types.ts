import { Currency } from '../../types/models'

export interface QuoteState {
  sending?: Currency
  receiving?: Currency
  maxPrices?: Currency[]
  minPrices?: Currency[]
  actualPrices?: Currency[]
  txFees?: Currency[]
  totalPrices?: Currency[]
  totalFees?: Currency[]
  bondToken?: string
  tx?: {}
  response?: any
  quotePending: boolean
  signPending: boolean
  transacting: boolean
  isSwapping: boolean
}

export enum QuoteActions {
  Clear = 'ixo/Quote/CLEAR',
  Buy = 'ixo/Quote/BUY',
  BuySuccess = 'ixo/Quote/BUY_FULFILLED',
  BuyPending = 'ixo/Quote/BUY_PENDING',
  BuyFailure = 'ixo/Quote/BUY_REJECTED',
  Sell = 'ixo/Quote/SELL',
  SellSuccess = 'ixo/Quote/SELL_FULFILLED',
  SellPending = 'ixo/Quote/SELL_PENDING',
  SellFailure = 'ixo/Quote/SELL_REJECTED',
  Swap = 'ixo/Quote/SWAP',
  SwapSuccess = 'ixo/Quote/SWAP_FULFILLED',
  SwapPending = 'ixo/Quote/SWAP_PENDING',
  SwapFailure = 'ixo/Quote/SWAP_REJECTED',
  Confirm = 'ixo/Quote/CONFIRM',
  ConfirmSuccess = 'ixo/Quote/CONFIRM_FULFILLED',
  ConfirmPending = 'ixo/Quote/CONFIRM_PENDING',
  ConfirmFailure = 'ixo/Quote/CONFIRM_REJECTED',
  QuoteFailure = 'ixo/Quote/QUOTE_FAILED',
}

export interface ClearAction {
  type: typeof QuoteActions.Clear
}

export interface BuyAction {
  type: typeof QuoteActions.Buy
  payload: Promise<any>
}

export interface BuyPendingAction {
  type: typeof QuoteActions.BuyPending
}

export interface BuyFailureAction {
  type: typeof QuoteActions.BuyFailure
}

export interface BuySuccessAction {
  type: typeof QuoteActions.BuySuccess
  payload: {
    data: any
  }
}

export interface SellAction {
  type: typeof QuoteActions.Sell
  payload: Promise<any>
}

export interface SellPendingAction {
  type: typeof QuoteActions.SellPending
}

export interface SellSuccessAction {
  type: typeof QuoteActions.SellSuccess
  payload: {
    data: any
  }
}

export interface SellFailureAction {
  type: typeof QuoteActions.SellFailure
}

export interface SwapAction {
  type: typeof QuoteActions.Swap
  payload: Promise<any>
}

export interface SwapPendingAction {
  type: typeof QuoteActions.SwapPending
}

export interface SwapSuccessAction {
  type: typeof QuoteActions.SwapSuccess
  payload: {
    data: any
  }
}

export interface SwapFailureAction {
  type: typeof QuoteActions.SwapFailure
}

export interface ConfirmAction {
  type: typeof QuoteActions.Confirm
  payload: Promise<any>
}

export interface ConfirmPendingAction {
  type: typeof QuoteActions.ConfirmPending
}

export interface ConfirmSuccessAction {
  type: typeof QuoteActions.ConfirmSuccess
  payload: {
    data: Currency[]
  }
}

export interface ConfirmFailureAction {
  type: typeof QuoteActions.ConfirmFailure
}

export interface QuoteFailureAction {
  type: typeof QuoteActions.QuoteFailure
}

export type QuoteActionTypes =
  | ClearAction
  | BuyAction
  | BuyPendingAction
  | BuySuccessAction
  | BuyFailureAction
  | SellAction
  | SellPendingAction
  | SellSuccessAction
  | SellFailureAction
  | SwapAction
  | SwapPendingAction
  | SwapSuccessAction
  | SwapFailureAction
  | ConfirmAction
  | ConfirmPendingAction
  | ConfirmSuccessAction
  | ConfirmFailureAction
  | QuoteFailureAction
