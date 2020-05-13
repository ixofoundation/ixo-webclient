import { BondSellState, BondSellActions, BondSellActionTypes } from './types'
// import { toast } from 'react-toastify'

export const initialState: BondSellState = {
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
  action: BondSellActionTypes,
): BondSellState => {
  switch (action.type) {
    case BondSellActions.InitiateQuote:
      return {
        ...state,
        quotePending: false,
      }
    case BondSellActions.GetQuotePending:
      return {
        ...state,
        transacting: true,
        quotePending: true,
      }
    case BondSellActions.GetQuoteSuccess:
      return {
        ...action.payload,
        quotePending: false,
        signPending: false,
        transacting: false,
      }
    case BondSellActions.GetQuoteFailure:
      // notify(action.payload)
      return {
        ...state,
        transacting: false,
        quotePending: false,
      }
    case BondSellActions.ConfirmSellPending:
      return {
        ...state,
        signPending: true,
      }
    case BondSellActions.ConfirmSellFailure:
      return {
        ...state,
        signPending: false,
      }
    case BondSellActions.Clear:
    case BondSellActions.ConfirmSellSuccess:
      return {
        ...initialState,
      }
  }

  return state
}
