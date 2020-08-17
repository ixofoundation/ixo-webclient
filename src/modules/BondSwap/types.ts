import { Currency } from '../../types/models';

export interface BondSwapState {
  sending?: Currency
  receiving?: Currency
  totalFee?: Currency
  txFees: Currency[]
  signPending: boolean
  quotePending: boolean
  transacting: boolean
}

export interface BondSwap {
  address: string
  receiving: Currency
  sending: Currency
  txFees: Currency[]
  bondToken: string
}

export enum BondSwapActions {
  InitiateQuote = 'ixo/BondSwap/INITIATE_QUOTE',
  GetQuote = 'ixo/BondSwap/GET_QUOTE',
  GetQuoteSuccess = 'ixo/BondSwap/GET_QUOTE_FULFILLED',
  GetQuotePending = 'ixo/BondSwap/GET_QUOTE_PENDING',
  GetQuoteFailure = 'ixo/BondSwap/GET_QUOTE_REJECTED',
  ConfirmSwap = 'ixo/BondSwap/CONFIRM_SWAP',
  ConfirmSwapSuccess = 'ixo/BondSwap/CONFIRM_SWAP_FULFILLED',
  ConfirmSwapPending = 'ixo/BondSwap/CONFIRM_SWAP_PENDING',
  ConfirmSwapFailure = 'ixo/BondSwap/CONFIRM_SWAP_REJECTED',
  Clear = 'ixo/BondSwap/CLEAR',
}

export interface InitiateQuoteAction {
  type: typeof BondSwapActions.InitiateQuote
}

export interface GetQuoteAction {
  type: typeof BondSwapActions.GetQuote
  payload: Promise<{
    sending: Currency
    receiving: Currency
    totalFee: Currency
    txFees: Currency[]
  }>
}

export interface GetQuotePendingAction {
  type: typeof BondSwapActions.GetQuotePending
}

export interface GetQuoteFailureAction {
  type: typeof BondSwapActions.GetQuoteFailure
}

export interface GetQuoteSuccessAction {
  type: typeof BondSwapActions.GetQuoteSuccess
  payload: {
    sending: Currency
    receiving: Currency
    totalFee: Currency
    txFees: Currency[]
  }
}

export interface ConfirmSwapAction {
  type: typeof BondSwapActions.ConfirmSwap
  payload: Promise<Currency[]>
}

export interface ConfirmSwapPendingAction {
  type: typeof BondSwapActions.ConfirmSwapPending
}

export interface ConfirmSwapSuccessAction {
  type: typeof BondSwapActions.ConfirmSwapSuccess
  payload: {
    data: Currency[]
  }
}

export interface ConfirmSwapFailureAction {
  type: typeof BondSwapActions.ConfirmSwapFailure
}

export interface ClearAction {
  type: typeof BondSwapActions.Clear
}

export type BondSwapActionTypes =
  | InitiateQuoteAction
  | GetQuoteAction
  | GetQuotePendingAction
  | GetQuoteSuccessAction
  | GetQuoteFailureAction
  | ConfirmSwapAction
  | ConfirmSwapPendingAction
  | ConfirmSwapSuccessAction
  | ConfirmSwapFailureAction
  | ClearAction;
