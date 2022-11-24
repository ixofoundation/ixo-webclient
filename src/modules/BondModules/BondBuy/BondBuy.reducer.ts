import { BondBuyState, BondBuyActions, BondBuyActionTypes } from './types'

export const initialState: BondBuyState = {
  quotePending: false,
  signPending: false,
  transacting: false,
  txFees: [],
}

export const reducer = (state = initialState, action: BondBuyActionTypes): BondBuyState => {
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
    case BondBuyActions.ConfirmBuyFailure:
      return {
        ...state,
        signPending: false,
      }
    case BondBuyActions.Clear:
    case BondBuyActions.ConfirmBuySuccess:
      return {
        ...initialState,
      }
  }

  return state
}
