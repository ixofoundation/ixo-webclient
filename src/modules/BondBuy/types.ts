import { Currency } from '../../types/models'

export interface BondBuyState {
  totalPrice?: Currency
  receiving?: Currency
  actualPrice?: Currency
  totalFee?: Currency
  maxPrice?: Currency
  txFees: Currency[]
  signPending: boolean
  quotePending: boolean
  transacting: boolean
}

export interface BondBuy {
  address: string
  receiving: Currency
  maxPrices: Currency[]
  txFees: Currency[]
}

export enum BondBuyActions {
  InitiateQuote = 'ixo/BondBuy/INITIATE_QUOTE',
  GetQuote = 'ixo/BondBuy/GET_QUOTE',
  GetQuoteSuccess = 'ixo/BondBuy/GET_QUOTE_FULFILLED',
  GetQuotePending = 'ixo/BondBuy/GET_QUOTE_PENDING',
  GetQuoteFailure = 'ixo/BondBuy/GET_QUOTE_REJECTED',
  ConfirmBuy = 'ixo/BondBuy/CONFIRM_BUY',
  ConfirmBuySuccess = 'ixo/BondBuy/CONFIRM_BUY_FULFILLED',
  ConfirmBuyPending = 'ixo/BondBuy/CONFIRM_BUY_PENDING',
  ConfirmBuyFailure = 'ixo/BondBuy/CONFIRM_BUY_REJECTED',
  Clear = 'ixo/BondBuy/CLEAR',
}

export interface InitiateQuoteAction {
  type: typeof BondBuyActions.InitiateQuote
}

export interface GetQuoteAction {
  type: typeof BondBuyActions.GetQuote
  payload: Promise<any>
}

export interface GetQuotePendingAction {
  type: typeof BondBuyActions.GetQuotePending
}

export interface GetQuoteFailureAction {
  type: typeof BondBuyActions.GetQuoteFailure
}

export interface GetQuoteSuccessAction {
  type: typeof BondBuyActions.GetQuoteSuccess
  payload: {
    receiving: Currency
    actualPrice: Currency
    totalPrice: Currency
    totalFee: Currency
    maxPrice: Currency
    txFees: Currency[]
  }
}

export interface ConfirmBuyAction {
  type: typeof BondBuyActions.ConfirmBuy
  payload: Promise<any>
}

export interface ConfirmBuyPendingAction {
  type: typeof BondBuyActions.ConfirmBuyPending
}

export interface ConfirmBuySuccessAction {
  type: typeof BondBuyActions.ConfirmBuySuccess
  payload: {
    data: Currency[]
  }
}

export interface ConfirmBuyFailureAction {
  type: typeof BondBuyActions.ConfirmBuyFailure
}

export interface ClearAction {
  type: typeof BondBuyActions.Clear
}

export type BondBuyActionTypes =
  | InitiateQuoteAction
  | GetQuoteAction
  | GetQuotePendingAction
  | GetQuoteSuccessAction
  | GetQuoteFailureAction
  | ConfirmBuyAction
  | ConfirmBuyPendingAction
  | ConfirmBuySuccessAction
  | ConfirmBuyFailureAction
  | ClearAction
