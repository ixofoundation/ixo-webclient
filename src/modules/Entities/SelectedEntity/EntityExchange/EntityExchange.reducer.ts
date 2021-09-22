import {
  EntityExchangeActionTypes, 
  EntityExchangeActions,
  EntityExchangeState,
  // TradeMethodType
} from './types'

export const initialState: EntityExchangeState = {
  // tradeMethod: TradeMethodType.Swap
  tradeMethod: null,
  portfolioAsset: null,
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
    case EntityExchangeActions.ChangePortfolioAsset:
      return {
        ...state,
        portfolioAsset: action.payload
      }
    default:
      return state
  }
}