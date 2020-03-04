import { Currency } from '../../types/models'

export interface QuoteState {
  sending?: Currency
  recieving?: Currency
  maxPrices?: [Currency]
  minPrices?: [Currency]
  actualPrices?: [Currency]
  txFees?: [Currency]
  totalPrices?: [Currency]
  totalFees?: [Currency]
  bondToken?: string
  tx?: {}
  response?: any
}

export enum QuoteActions {
  CLEAR_QUOTE = 'CLEAR_QUOTE',
  QUOTE_BUY = 'QUOTE_BUY',
  QUOTE_SELL = 'QUOTE_SELL',
  QUOTE_SWAP = 'QUOTE_SWAP',
  CONFIRM_QUOTE = 'CONFIRM_QUOTE',
}

interface QuoteActionType<T, P> {
  type: T
  payload?: P
}

export type QuoteAction =
  | QuoteActionType<typeof QuoteActions.CLEAR_QUOTE, any>
  | QuoteActionType<typeof QuoteActions.QUOTE_BUY, QuoteState>
  | QuoteActionType<typeof QuoteActions.QUOTE_SELL, QuoteState>
  | QuoteActionType<typeof QuoteActions.QUOTE_SWAP, QuoteState>
  | QuoteActionType<typeof QuoteActions.CONFIRM_QUOTE, any>
