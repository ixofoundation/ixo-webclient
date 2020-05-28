import { Currency } from 'src/types/models'

export interface FuelEntityOrder {
  subscription: string
  currency: string
  currencySymbol: string
  amount: number
  currencyConversion: number
  transactionFee: number
}

export interface FuelEntityState {
  order: FuelEntityOrder
  sending: boolean
  error?: string
}

export interface FuelEntityOrderTx {
  pubKey: string
  fromDid: string
  toDid: string
  amount: Currency[]
}

export enum FuelEntityActions {
  GetOrder = 'ixo/FuelEntity/GET_ORDER',
  ConfirmOrder = 'ixo/FuelEntity/CONFIRM_ORDER',
  ConfirmOrderPending = 'ixo/FuelEntity/CONFIRM_ORDER_PENDING',
  ConfirmOrderSuccess = 'ixo/FuelEntity/CONFIRM_ORDER_SUCCESS',
  ConfirmOrderFailure = 'ixo/FuelEntity/CONFIRM_ORDER_FAILURE',
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

export type FuelEntityActionTypes =
  | GetOrderAction
  | ConfirmOrderAction
  | ConfirmOrderPendingAction
  | ConfirmOrderFailureAction
  | ConfirmOrderSuccessAction
