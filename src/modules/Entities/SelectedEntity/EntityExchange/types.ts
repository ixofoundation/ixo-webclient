// Reducer state
export enum TradeMethodType {
  Swap = 'Swap',
  Purchase = 'Purchase',
  Sell = 'Sell',
  Auction = 'Auction',
  Bid = 'Bid',
}

export interface EntityExchangeState {
  tradeMethod: TradeMethodType
  portfolioAsset: string
}

// Action
export enum EntityExchangeActions {
  ChangeTradeMethod = 'ixo/exchange/CHANGE_TRADEMETHOD',
  ChangePortfolioAsset = 'ixo/exchange/CHANGE_PORTFOLIOASSET',
}

export interface ChangeTradeMethodAction {
  type: EntityExchangeActions.ChangeTradeMethod,
  payload: any
}
export interface ChangePortfolioAssetAction {
  type: EntityExchangeActions.ChangePortfolioAsset,
  payload: string
}

export type EntityExchangeActionTypes =
  | ChangeTradeMethodAction
  | ChangePortfolioAssetAction
  

