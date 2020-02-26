import createReducer from '../../common/redux/createReducer'
import { QuoteState, QuoteActions, QuoteAction } from './types'
import { Currency } from '../../types/models'
import { toast } from 'react-toastify'

const notify = (payload: any): void => {
  if (payload.response) {
    toast.info(JSON.parse(payload.response.data.error).message, {
      position: toast.POSITION.BOTTOM_LEFT,
    })
  }
}

export const quotePending = createReducer<boolean>(false, {
  [QuoteActions.QUOTE_BUY + '_PENDING']() {
    return true
  },
  [QuoteActions.QUOTE_SELL + '_PENDING']() {
    return true
  },
  [QuoteActions.QUOTE_SWAP + '_PENDING']() {
    return true
  },
  [QuoteActions.QUOTE_BUY + '_FULFILLED']() {
    return false
  },
  [QuoteActions.QUOTE_SELL + '_FULFILLED']() {
    return false
  },
  [QuoteActions.QUOTE_SWAP + '_FULFILLED']() {
    return false
  },
  [QuoteActions.QUOTE_BUY + '_FAILED']() {
    return false
  },
  [QuoteActions.QUOTE_SELL + '_FAILED']() {
    return false
  },
  [QuoteActions.QUOTE_SWAP + '_FAILED']() {
    return false
  },
  [QuoteActions.QUOTE_BUY + '_REJECTED'](action: QuoteAction) {
    notify(action.payload)
    return false
  },
  [QuoteActions.QUOTE_SELL + '_REJECTED'](action: QuoteAction) {
    notify(action.payload)
    return false
  },
  [QuoteActions.QUOTE_SWAP + '_REJECTED'](action: QuoteAction) {
    notify(action.payload)
    return false
  },
})

export const signPending = createReducer<boolean>(false, {
  [QuoteActions.CONFIRM_QUOTE + '_PENDING']() {
    return true
  },
  [QuoteActions.CONFIRM_QUOTE + '_FULFILLED']() {
    return false
  },
  [QuoteActions.CONFIRM_QUOTE + '_FAILED']() {
    return false
  },
  [QuoteActions.CONFIRM_QUOTE + '_REJECTED']() {
    return false
  },
})

export const transacting = createReducer<boolean>(false, {
  [QuoteActions.QUOTE_BUY + '_PENDING']() {
    return true
  },
  [QuoteActions.QUOTE_SELL + '_PENDING']() {
    return true
  },
  [QuoteActions.QUOTE_SWAP + '_PENDING']() {
    return true
  },
  [QuoteActions.CLEAR_QUOTE]() {
    return false
  },
  [QuoteActions.QUOTE_BUY + '_REJECTED']() {
    return false
  },
  [QuoteActions.QUOTE_SELL + '_REJECTED']() {
    return false
  },
  [QuoteActions.QUOTE_SWAP + '_REJECTED']() {
    return false
  },
})

export const activeQuote = createReducer<QuoteState>(
  {},
  {
    [QuoteActions.QUOTE_BUY + '_FULFILLED'](action: QuoteAction) {
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
      quote: QuoteState,
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
      quote: QuoteState,
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
      quote: QuoteState,
      action: QuoteAction,
    ) {
      if (action.payload) return {}

      return quote
    },

    [QuoteActions.CLEAR_QUOTE]() {
      return {}
    },
  },
)
