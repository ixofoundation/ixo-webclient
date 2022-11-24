import { Currency } from 'types/models'

export interface BondSellState {
  sending?: Currency
  receiving?: Currency
  totalFee?: Currency
  minPrice?: Currency
  txFees: Currency[]
  signPending: boolean
  quotePending: boolean
  transacting: boolean
}

export interface BondSellTx {
  pub_key: string
  seller_did: string
  bond_did: string
  amount: Currency
}

export enum BondSellActions {
  InitiateQuote = 'ixo/BondSell/INITIATE_QUOTE',
  GetQuote = 'ixo/BondSell/GET_QUOTE',
  GetQuoteSuccess = 'ixo/BondSell/GET_QUOTE_FULFILLED',
  GetQuotePending = 'ixo/BondSell/GET_QUOTE_PENDING',
  GetQuoteFailure = 'ixo/BondSell/GET_QUOTE_REJECTED',
  ConfirmSell = 'ixo/BondSell/CONFIRM_SELL',
  ConfirmSellSuccess = 'ixo/BondSell/CONFIRM_SELL_FULFILLED',
  ConfirmSellPending = 'ixo/BondSell/CONFIRM_SELL_PENDING',
  ConfirmSellFailure = 'ixo/BondSell/CONFIRM_SELL_REJECTED',
  Clear = 'ixo/BondSell/CLEAR',
}

export interface InitiateQuoteAction {
  type: typeof BondSellActions.InitiateQuote
}

export interface GetQuoteAction {
  type: typeof BondSellActions.GetQuote
  payload: Promise<{
    sending: Currency
    totalFee: Currency
    minPrice: Currency
    txFees: Currency[]
  }>
}

export interface GetQuotePendingAction {
  type: typeof BondSellActions.GetQuotePending
}

export interface GetQuoteFailureAction {
  type: typeof BondSellActions.GetQuoteFailure
}

export interface GetQuoteSuccessAction {
  type: typeof BondSellActions.GetQuoteSuccess
  payload: {
    sending: Currency
    totalFee: Currency
    minPrice: Currency
    txFees: Currency[]
  }
}

export interface ConfirmSellAction {
  type: typeof BondSellActions.ConfirmSell
  payload: Promise<Currency[]>
}

export interface ConfirmSellPendingAction {
  type: typeof BondSellActions.ConfirmSellPending
}

export interface ConfirmSellSuccessAction {
  type: typeof BondSellActions.ConfirmSellSuccess
  payload: {
    data: Currency[]
  }
}

export interface ConfirmSellFailureAction {
  type: typeof BondSellActions.ConfirmSellFailure
}

export interface ClearAction {
  type: typeof BondSellActions.Clear
}

export type BondSellActionTypes =
  | InitiateQuoteAction
  | GetQuoteAction
  | GetQuotePendingAction
  | GetQuoteSuccessAction
  | GetQuoteFailureAction
  | ConfirmSellAction
  | ConfirmSellPendingAction
  | ConfirmSellSuccessAction
  | ConfirmSellFailureAction
  | ClearAction
