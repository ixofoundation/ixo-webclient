import createReducer from '../createReducer'
import { Quote, QuoteActions, QuoteAction } from '../../model/quote'
import { Currency } from '../../model'
import { toast } from 'react-toastify'

const notify = (payload: any) => {
  if (payload.response) {
    toast.info(JSON.parse(payload.response.data.error).message, {
      position: toast.POSITION.BOTTOM_LEFT,
    })
  }
}

export const quotePending = createReducer<boolean>(false, {
  [QuoteActions.QUOTE_BUY + '_PENDING'](quote: Quote, action: QuoteAction) {
    return true
  },
  [QuoteActions.QUOTE_SELL + '_PENDING'](quote: Quote, action: QuoteAction) {
    return true
  },
  [QuoteActions.QUOTE_SWAP + '_PENDING'](quote: Quote, action: QuoteAction) {
    return true
  },
  [QuoteActions.QUOTE_BUY + '_FULFILLED'](quote: Quote, action: QuoteAction) {
    return false
  },
  [QuoteActions.QUOTE_SELL + '_FULFILLED'](quote: Quote, action: QuoteAction) {
    return false
  },
  [QuoteActions.QUOTE_SWAP + '_FULFILLED'](quote: Quote, action: QuoteAction) {
    return false
  },
  [QuoteActions.QUOTE_BUY + '_FAILED'](quote: Quote, action: QuoteAction) {
    return false
  },
  [QuoteActions.QUOTE_SELL + '_FAILED'](quote: Quote, action: QuoteAction) {
    return false
  },
  [QuoteActions.QUOTE_SWAP + '_FAILED'](quote: Quote, action: QuoteAction) {
    return false
  },
  [QuoteActions.QUOTE_BUY + '_REJECTED'](quote: Quote, action: QuoteAction) {
    notify(action.payload)
    return false
  },
  [QuoteActions.QUOTE_SELL + '_REJECTED'](quote: Quote, action: QuoteAction) {
    notify(action.payload)
    return false
  },
  [QuoteActions.QUOTE_SWAP + '_REJECTED'](quote: Quote, action: QuoteAction) {
    notify(action.payload)
    return false
  },
})

export const signPending = createReducer<boolean>(false, {
  [QuoteActions.CONFIRM_QUOTE + '_PENDING'](quote: Quote, action: QuoteAction) {
    return true
  },
  [QuoteActions.CONFIRM_QUOTE + '_FULFILLED'](
    quote: Quote,
    action: QuoteAction,
  ) {
    return false
  },
  [QuoteActions.CONFIRM_QUOTE + '_FAILED'](quote: Quote, action: QuoteAction) {
    return false
  },
  [QuoteActions.CONFIRM_QUOTE + '_REJECTED'](
    quote: Quote,
    action: QuoteAction,
  ) {
    return false
  },
})

export const transacting = createReducer<boolean>(false, {
  [QuoteActions.QUOTE_BUY + '_PENDING'](quote: Quote, action: QuoteAction) {
    return true
  },
  [QuoteActions.QUOTE_SELL + '_PENDING'](quote: Quote, action: QuoteAction) {
    return true
  },
  [QuoteActions.QUOTE_SWAP + '_PENDING'](quote: Quote, action: QuoteAction) {
    return true
  },
  [QuoteActions.CLEAR_QUOTE](state: Quote, action: QuoteAction) {
    return false
  },
  [QuoteActions.QUOTE_BUY + '_REJECTED'](quote: Quote, action: QuoteAction) {
    return false
  },
  [QuoteActions.QUOTE_SELL + '_REJECTED'](quote: Quote, action: QuoteAction) {
    return false
  },
  [QuoteActions.QUOTE_SWAP + '_REJECTED'](quote: Quote, action: QuoteAction) {
    return false
  },
})

export const activeQuote = createReducer<Quote>(
  {},
  {
    [QuoteActions.QUOTE_BUY + '_FULFILLED'](quote: Quote, action: QuoteAction) {
      const newQuote = Object.assign({}, action.payload.quote)
      const result = action.payload.result

      newQuote.actualPrices = result.prices as [Currency]
      newQuote.adjustedSupply = result.adjusted_supply as [Currency]
      newQuote.txFees = result.tx_fees as [Currency]
      newQuote.totalPrices = result.total_prices as [Currency]
      newQuote.totalFees = result.total_fees as [Currency]

      return newQuote
    },
    [QuoteActions.QUOTE_SELL + '_FULFILLED'](
      quote: Quote,
      action: QuoteAction,
    ) {
      const newQuote = Object.assign({}, action.payload.quote)
      const result = action.payload.result

      newQuote.recieving = result.returns[0]

      // newQuote.actualPrices = result.prices as [Currency]
      // newQuote.totalPrices = result.total_prices as [Currency]
      newQuote.txFees = result.tx_fees as [Currency]
      newQuote.exitFees = result.exit_fees as [Currency]
      newQuote.totalFees = result.total_fees as [Currency]

      return newQuote
    },
    [QuoteActions.QUOTE_SWAP + '_FULFILLED'](
      quote: Quote,
      action: QuoteAction,
    ) {
      const newQuote = Object.assign({}, action.payload.quote)
      const result = action.payload.result

      newQuote.recieving = result.total_returns[0]
      newQuote.isSwapping = true
      // newQuote.actualPrices = result.prices as [Currency]
      // newQuote.totalPrices = result.total_prices as [Currency]
      // newQuote.txFees = result.tx_fees as [Currency]
      // newQuote.exitFees = result.exit_fees as [Currency]
      newQuote.totalFees = result.total_fees as [Currency]

      return newQuote
    },
    [QuoteActions.CONFIRM_QUOTE + '_FULFILLED'](
      quote: Quote,
      action: QuoteAction,
    ) {
      if (action.payload) return {}

      return quote
    },

    [QuoteActions.CLEAR_QUOTE](state: Quote, action: QuoteAction) {
      return {}
    },
  },
)
