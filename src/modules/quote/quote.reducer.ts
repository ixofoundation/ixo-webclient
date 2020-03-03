import { QuoteState, QuoteActions, QuoteActionTypes } from './types'
// import { toast } from 'react-toastify'

export const initialState: QuoteState = {
  quotePending: false,
  signPending: false,
  transacting: false,
  isSwapping: false,
}

/* const notify = (payload: any): void => {
  if (payload.response) {
    toast.info(JSON.parse(payload.response.data.error).message, {
      position: toast.POSITION.BOTTOM_LEFT,
    })
  }
} */

export const reducer = (
  state = initialState,
  action: QuoteActionTypes,
): QuoteState => {
  switch (action.type) {
    case QuoteActions.BuyPending:
      return {
        ...state,
        transacting: true,
        quotePending: true,
      }
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
        quotePending: false,
      }
    case QuoteActions.BuyFailure:
      // notify(action.payload)
      return {
        ...state,
        transacting: false,
        quotePending: false,
      }
    case QuoteActions.SellPending:
      return {
        ...state,
        transacting: true,
        quotePending: true,
      }
    case QuoteActions.SellSuccess:
      return {
        ...initialState,
        sending: action.payload.data.sending,
        minPrices: action.payload.data.minPrices,
        receiving: action.payload.data.result.returns[0],
        txFees: action.payload.data.result.tx_fees,
        totalFees: action.payload.data.result.total_fees,
        quotePending: false,
      }
    case QuoteActions.SellFailure:
      // notify(action.payload)
      return {
        ...state,
        transacting: false,
        quotePending: false,
      }
    case QuoteActions.SwapPending:
      return {
        ...state,
        transacting: true,
        quotePending: true,
      }
    case QuoteActions.SwapSuccess:
      return {
        ...initialState,
        receiving: action.payload.data.result.total_returns[0],
        isSwapping: true,
        totalFees: action.payload.data.result.total_fees,
        quotePending: false,
      }
    case QuoteActions.SwapFailure:
      // notify(action.payload)
      return {
        ...state,
        transacting: false,
        quotePending: false,
      }
    case QuoteActions.ConfirmPending:
      return {
        ...state,
        signPending: true,
      }
    case QuoteActions.ConfirmSuccess:
      if (action.payload) return { ...initialState }

      return { ...state, signPending: false }
    case QuoteActions.ConfirmFailure:
      return {
        ...state,
        signPending: false,
      }
    case QuoteActions.QuoteFailure:
      return {
        ...state,
        quotePending: false,
      }
    case QuoteActions.Clear:
      return {
        ...initialState,
      }
  }

  return state
}
