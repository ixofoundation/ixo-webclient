import { BondBuyState, BondBuyActions, BondBuyActionTypes } from './types'
// import { toast } from 'react-toastify'

export const initialState: BondBuyState = {
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
  action: BondBuyActionTypes,
): BondBuyState => {
  switch (action.type) {
    case BondBuyActions.InitiateQuote:
      return {
        ...state,
        quotePending: false,
      }
    case BondBuyActions.GetQuotePending:
      return {
        ...state,
        transacting: true,
        quotePending: true,
      }
    case BondBuyActions.GetQuoteSuccess:
      return {
        ...action.payload,
        quotePending: false,
        signPending: false,
        transacting: false,
      }
    case BondBuyActions.GetQuoteFailure:
      // notify(action.payload)
      return {
        ...state,
        transacting: false,
        quotePending: false,
      }
    case BondBuyActions.ConfirmBuyPending:
      return {
        ...state,
        signPending: true,
      }
    case BondBuyActions.ConfirmBuySuccess:
      if (action.payload) return { ...initialState }

      return { ...state, signPending: false }
    case BondBuyActions.ConfirmBuyFailure:
      return {
        ...state,
        signPending: false,
      }
    case BondBuyActions.Clear:
      return {
        ...initialState,
      }
  }

  return state
}
