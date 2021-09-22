import {
  ChangePortfolioAssetAction,
  ChangeTradeMethodAction,
  EntityExchangeActions
} from './types'

export const changeTradeMethod = (tradeMethod: string): ChangeTradeMethodAction => ({
  type: EntityExchangeActions.ChangeTradeMethod,
  payload: {
    tradeMethod
  }
})

export const changePortfolioAsset = (asset: string): ChangePortfolioAssetAction => ({
  type: EntityExchangeActions.ChangePortfolioAsset,
  payload: asset
})