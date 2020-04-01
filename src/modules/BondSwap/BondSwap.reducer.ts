import { BondSwapState, BondSwapActions, BondSwapActionTypes } from './types'
// import { toast } from 'react-toastify'

export const initialState: BondSwapState = {
  quotePending: false,
  signPending: false,
  transacting: false,
  txFees: [],
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
  action: BondSwapActionTypes,
): BondSwapState => {
  switch (action.type) {
    case BondSwapActions.InitiateQuote:
      return {
        ...state,
        quotePending: false,
      }
    case BondSwapActions.GetQuotePending:
      return {
        ...state,
        transacting: true,
        quotePending: true,
      }
    case BondSwapActions.GetQuoteSuccess:
      return {
        ...action.payload,
        quotePending: false,
        signPending: false,
        transacting: false,
      }
    case BondSwapActions.GetQuoteFailure:
      // notify(action.payload)
      return {
        ...state,
        transacting: false,
        quotePending: false,
      }
    case BondSwapActions.ConfirmSwapPending:
      return {
        ...state,
        signPending: true,
      }
    case BondSwapActions.ConfirmSwapSuccess:
      if (action.payload) return { ...initialState }

      return { ...state, signPending: false }
    case BondSwapActions.ConfirmSwapFailure:
      return {
        ...state,
        signPending: false,
      }
    case BondSwapActions.Clear:
      return {
        ...initialState,
      }
  }

  return state
}
