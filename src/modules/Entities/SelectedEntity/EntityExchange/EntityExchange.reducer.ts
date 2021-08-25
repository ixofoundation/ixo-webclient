import {
  EntityExchangeActionTypes, 
  EntityExchangeActions,
  EntityExchangeState,
  TradeMethodType
} from './types'

export const initialState: EntityExchangeState = {
  tradeMethod: TradeMethodType.Swap
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