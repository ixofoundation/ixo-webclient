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

  TotalSupply: number
  Inflation: number
  TotalStaked: number
  APY: number
}

// Action
export enum EntityExchangeActions {
  ChangeTradeMethod = 'ixo/exchange/CHANGE_TRADEMETHOD',
  GetTotalSupply = 'ixo/exchange/GET_TOTALSUPPLY',
  GetTotalSupplySuccess = 'ixo/exchange/GET_TOTALSUPPLY_FULFILLED',
  GetTotalSupplyPending = 'ixo/exchange/GET_TOTALSUPPLY_PENDING',
  GetTotalSupplyFailure = 'ixo/exchange/GET_TOTALSUPPLY_REJECTED',
  GetTotalStaked = 'ixo/exchange/GET_TOTALSTAKED',
  GetTotalStakedSuccess = 'ixo/exchange/GET_TOTALSTAKED_FULFILLED',
  GetTotalStakedPending = 'ixo/exchange/GET_TOTALSTAKED_PENDING',
  GetTotalStakedFailure = 'ixo/exchange/GET_TOTALSTAKED_REJECTED',
  GetInflation = 'ixo/exchange/GET_INFLATION',
  GetInflationSuccess = 'ixo/exchange/GET_INFLATION_FULFILLED',
  GetInflationPending = 'ixo/exchange/GET_INFLATION_PENDING',
  GetInflationFailure = 'ixo/exchange/GET_INFLATION_REJECTED',
  GetAPY = 'ixo/exchange/GET_APY',
  GetAPYSuccess = 'ixo/exchange/GET_APY_FULFILLED',
  GetAPYPending = 'ixo/exchange/GET_APY_PENDING',
  GetAPYFailure = 'ixo/exchange/GET_APY_REJECTED',
}

export interface ChangeTradeMethodAction {
  type: EntityExchangeActions.ChangeTradeMethod,
  payload: any
}
export interface GetTotalSupplyAction {
  type: typeof EntityExchangeActions.GetTotalSupply
  payload: Promise<number>
}
export interface GetTotalSupplySuccessAction {
  type: typeof EntityExchangeActions.GetTotalSupplySuccess
  payload: number
}
export interface GetTotalStakedAction {
  type: typeof EntityExchangeActions.GetTotalStaked
  payload: Promise<number>
}
export interface GetTotalStakedSuccessAction {
  type: typeof EntityExchangeActions.GetTotalStakedSuccess
  payload: number
}
export interface GetAPYAction {
  type: typeof EntityExchangeActions.GetAPY
  payload: Promise<number>
}
export interface GetAPYSuccessAction {
  type: typeof EntityExchangeActions.GetAPYSuccess
  payload: number
}
export interface GetInflationAction {
  type: typeof EntityExchangeActions.GetInflation
  payload: Promise<number>
}
export interface GetInflationSuccessAction {
  type: typeof EntityExchangeActions.GetInflationSuccess
  payload: number
}
export type EntityExchangeActionTypes =
  | ChangeTradeMethodAction
  | GetAPYAction
  | GetAPYSuccessAction
  | GetInflationAction
  | GetInflationSuccessAction
  | GetTotalSupplyAction
  | GetTotalSupplySuccessAction
  | GetTotalStakedAction
  | GetTotalStakedSuccessAction

