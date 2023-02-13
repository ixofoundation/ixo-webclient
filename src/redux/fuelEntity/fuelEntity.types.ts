export interface FuelEntityOrder {
  symbol: string
  subscription: string
  amount: string
  transactionFee: string
  gasFee: string
  fiat: string
  fiatSymbol: string
  fiatConversion: string
}

export interface FuelEntityState {
  order: FuelEntityOrder
  sending: boolean
  sent: boolean
  error?: string
}

export interface FuelEntityOrderTx {
  pubKey: string
  from_did: string
  to_did_or_addr: string
  amount: {
    denom: string
    amount: string
  }[
    
  ]
}

export enum FuelEntityActions {
  GetOrder = 'ixo/FuelEntity/GET_ORDER',
  ConfirmOrder = 'ixo/FuelEntity/CONFIRM_ORDER',
  ConfirmOrderPending = 'ixo/FuelEntity/CONFIRM_ORDER_PENDING',
  ConfirmOrderSuccess = 'ixo/FuelEntity/CONFIRM_ORDER_FULFILLED',
  ConfirmOrderFailure = 'ixo/FuelEntity/CONFIRM_ORDER_REJECTED',
  CancelOrder = 'ixo/FuelEntity/CANCEL_ORDER',
}

export interface GetOrderAction {
  type: typeof FuelEntityActions.GetOrder
  payload: {
    order: FuelEntityOrder
  }
}

export interface ConfirmOrderAction {
  type: typeof FuelEntityActions.ConfirmOrder
  payload: Promise<any>
}

export interface ConfirmOrderPendingAction {
  type: typeof FuelEntityActions.ConfirmOrderPending
}

export interface ConfirmOrderSuccessAction {
  type: typeof FuelEntityActions.ConfirmOrderSuccess
}

export interface ConfirmOrderFailureAction {
  type: typeof FuelEntityActions.ConfirmOrderFailure
}

export interface CancelOrderAction {
  type: typeof FuelEntityActions.CancelOrder
}

export type FuelEntityActionTypes =
  | GetOrderAction
  | ConfirmOrderAction
  | ConfirmOrderPendingAction
  | ConfirmOrderFailureAction
  | ConfirmOrderSuccessAction
  | CancelOrderAction
