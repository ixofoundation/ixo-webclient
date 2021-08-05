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
}

// Action
export enum EntityExchangeActions {
  ChangeTradeMethod = 'ixo/exchange/CHANGE_TRADEMETHOD',
}

export interface ChangeTradeMethodAction {
  type: EntityExchangeActions.ChangeTradeMethod,
  payload: any
}
export type EntityExchangeActionTypes =
  | ChangeTradeMethodAction
  

