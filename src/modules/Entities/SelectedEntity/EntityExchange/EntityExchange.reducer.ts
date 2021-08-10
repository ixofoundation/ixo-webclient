import {
  EntityExchangeActionTypes, 
  EntityExchangeActions,
  TradeMethodType,
  EntityExchangeState
} from './types'

export const initialState: EntityExchangeState = {
  tradeMethod: null
}

export const reducer = (
  state = initialState,
  action: EntityExchangeActionTypes,
): any => {
  switch (action.type) {
    case EntityExchangeActions.ChangeTradeMethod:
      return {
        ...state,
        tradeMethod: action.payload.tradeMethod
      }
    default:
      return state
  }
}