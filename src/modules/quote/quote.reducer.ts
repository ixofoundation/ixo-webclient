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
        ...action.payload,
        quotePending: false,
        signPending: false,
        transacting: false,
        isSwapping: false,
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
        ...action.payload,
        quotePending: false,
        signPending: false,
        transacting: false,
        isSwapping: false,
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
        ...action.payload,
        isSwapping: true,
        quotePending: false,
        signPending: false,
        transacting: false,
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
