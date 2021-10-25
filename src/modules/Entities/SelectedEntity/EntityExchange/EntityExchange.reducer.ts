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
  stakeCellEntity: null,

  Inflation: 0,
  TotalSupply: 0,
  TotalStaked: 0,
  APY: 0,
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
    case EntityExchangeActions.ChangeStakeCellEntity:
      return {
        ...state,
        stakeCellEntity: action.payload
      }
    case EntityExchangeActions.GetTotalSupplySuccess:
      return {
        ...state,
        TotalSupply: action.payload
      }
    case EntityExchangeActions.GetInflationSuccess:
      return {
        ...state,
        Inflation: action.payload
      }
    case EntityExchangeActions.GetTotalStakedSuccess:
      return {
        ...state,
        TotalStaked: action.payload
      }
    case EntityExchangeActions.GetAPY:
      return {
        ...state,
        APY: action.payload
      }
    default:
      return state
  }
}