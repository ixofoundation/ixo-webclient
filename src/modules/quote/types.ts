import { Currency } from '../../types/models'

export interface QuoteState {
  sending?: Currency
  receiving?: Currency
  maxPrices?: [Currency]
  minPrices?: [Currency]
  actualPrices?: [Currency]
  txFees?: [Currency]
  totalPrices?: [Currency]
  totalFees?: [Currency]
  bondToken?: string
  tx?: {}
  response?: any
  quotePending: boolean
  signPending: boolean
  transacting: boolean
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
  ClearFlags = 'ixo/Quote/CLEAR_FLAGS',
}

export interface ClearAction {
  type: typeof QuoteActions.Clear
}

export interface BuyAction {
  type: typeof QuoteActions.Buy
  payload: Promise<any>
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

export interface SellSuccessAction {
  type: typeof QuoteActions.SellSuccess
  payload: {
    data: any
  }
}

export interface SwapAction {
  type: typeof QuoteActions.Swap
  payload: Promise<any>
}

export interface SwapSuccessAction {
  type: typeof QuoteActions.SwapSuccess
  payload: {
    data: any
  }
}

export interface ConfirmAction {
  type: typeof QuoteActions.Confirm
  payload: Promise<any>
}

export interface ConfirmSuccessAction {
  type: typeof QuoteActions.ConfirmSuccess
  payload: {
    data: Currency[]
  }
}

export type QuoteActionTypes =
  | ClearAction
  | BuyAction
  | BuySuccessAction
  | SellAction
  | SellSuccessAction
  | SwapAction
  | SwapSuccessAction
  | ConfirmAction
  | ConfirmSuccessAction
