import createReducer from '../../common/redux/createReducer'
import { QuoteState, QuoteActions, QuoteActionTypes } from './types'
import { toast } from 'react-toastify'

// NB - the params MUST ALL be quote: Quote, action: QuoteAction, even though they may not be used

export const initialState: QuoteState = {
  sending: null,
  receiving: null,
  maxPrices: null,
  minPrices: null,
  actualPrices: null,
  txFees: null,
  totalPrices: null,
  totalFees: null,
  bondToken: null,
  tx: null,
  response: null,
  quotePending: false,
  signPending: false,
  transacting: false,
}

const notify = (payload: any): void => {
  if (payload.response) {
    toast.info(JSON.parse(payload.response.data.error).message, {
      position: toast.POSITION.BOTTOM_LEFT,
    })
  }
}

export const quotePending = createReducer<boolean>(false, {
  [QuoteActions.Buy + '_PENDING'](quote: QuoteState, action: any) {
    return true
  },
  [QuoteActions.Sell + '_PENDING'](quote: QuoteState, action: any) {
    return true
  },
  [QuoteActions.Swap + '_PENDING'](quote: QuoteState, action: any) {
    return true
  },
  [QuoteActions.Buy + '_FULFILLED'](quote: QuoteState, action: any) {
    return false
  },
  [QuoteActions.Sell + '_FULFILLED'](quote: QuoteState, action: any) {
    return false
  },
  [QuoteActions.Swap + '_FULFILLED'](quote: QuoteState, action: any) {
    return false
  },
  [QuoteActions.Buy + '_FAILED'](quote: QuoteState, action: any) {
    return false
  },
  [QuoteActions.Sell + '_FAILED'](quote: QuoteState, action: any) {
    return false
  },
  [QuoteActions.Swap + '_FAILED'](quote: QuoteState, action: any) {
    return false
  },
  [QuoteActions.Buy + '_REJECTED'](quote: QuoteState, action: any) {
    notify(action.payload)
    return false
  },
  [QuoteActions.Sell + '_REJECTED'](quote: QuoteState, action: any) {
    notify(action.payload)
    return false
  },
  [QuoteActions.Swap + '_REJECTED'](quote: QuoteState, action: any) {
    notify(action.payload)
    return false
  },
})

export const signPending = createReducer<boolean>(false, {
  [QuoteActions.Confirm + '_PENDING'](quote: QuoteState, action: any) {
    return true
  },
  [QuoteActions.Confirm + '_FULFILLED'](quote: QuoteState, action: any) {
    return false
  },
  [QuoteActions.Confirm + '_FAILED'](quote: QuoteState, action: any) {
    return false
  },
  [QuoteActions.Confirm + '_REJECTED'](quote: QuoteState, action: any) {
    return false
  },
})

export const transacting = createReducer<boolean>(false, {
  [QuoteActions.Buy + '_PENDING'](quote: QuoteState, action: any) {
    return true
  },
  [QuoteActions.Sell + '_PENDING'](quote: QuoteState, action: any) {
    return true
  },
  [QuoteActions.Swap + '_PENDING'](quote: QuoteState, action: any) {
    return true
  },
  [QuoteActions.Clear](quote: QuoteState, action: any) {
    return false
  },
  [QuoteActions.Buy + '_REJECTED'](quote: QuoteState, action: any) {
    return false
  },
  [QuoteActions.Sell + '_REJECTED'](quote: QuoteState, action: any) {
    return false
  },
  [QuoteActions.Swap + '_REJECTED'](quote: QuoteState, action: any) {
    return false
  },
})

export const activeQuote = (
  state = initialState,
  action: QuoteActionTypes,
): QuoteState => {
  switch (action.type) {
    case QuoteActions.BuySuccess:
      return {
        ...initialState,
        sending: action.payload.data.sending,
        receiving: action.payload.data.receiving,
        maxPrices: action.payload.data.maxPrices,
        actualPrices: action.payload.data.result.prices,
        txFees: action.payload.data.result.tx_fees,
        totalPrices: action.payload.data.result.total_prices,
        totalFees: action.payload.data.result.total_fees,
      }
    case QuoteActions.SellSuccess:
      return {
        ...initialState,
        sending: action.payload.data.sending,
        maxPrices: action.payload.data.minPrices,
        receiving: action.payload.data.result.returns[0],
        txFees: action.payload.data.result.tx_fees,
        totalFees: action.payload.data.result.total_fees,
      }
    case QuoteActions.SwapSuccess:
      return {
        ...initialState,
        receiving: action.payload.data.result.total_returns[0],
        // isSwapping: true,
        totalFees: action.payload.data.result.total_fees,
      }
    case QuoteActions.ConfirmSuccess:
      if (action.payload) return { ...initialState }

      return state
    case QuoteActions.Clear:
      return {
        ...initialState,
      }
  }

  return state
}
