import { Currency } from '../../types/models'

export interface AccountState {
  name: string
  address: string
  orders: any[]
  balances: Currency[]
}

export enum AccountActions {
  GetBalances = 'ixo/Account/GET_BALANCES',
  GetBalancesSuccess = 'ixo/Account/GET_BALANCES_FULFILLED',
  GetBalancesPending = 'ixo/Account/GET_BALANCES_PENDING',
  GetBalancesFailure = 'ixo/Account/GET_BALANCES_REJECTED',
  GetOrders = 'ixo/Account/GET_ORDERS',
  GetOrdersSuccess = 'ixo/Account/GET_ORDERS_FULFILLED',
  GetOrdersPending = 'ixo/Account/GET_ORDERS_PENDING',
  GetOrdersFailure = 'ixo/Account/GET_ORDERS_REJECTED',
}

export interface GetBalancesAction {
  type: typeof AccountActions.GetBalances
  payload: Promise<any>
}

export interface GetBalancesSuccessAction {
  type: typeof AccountActions.GetBalancesSuccess
  payload: {
    data: Currency[]
  }
}

export interface GetOrdersAction {
  type: typeof AccountActions.GetOrders
  payload: Promise<any>
}

export interface GetOrdersSuccessAction {
  type: typeof AccountActions.GetOrdersSuccess
  payload: any[]
}

export type AccountActionTypes =
  | GetBalancesAction
  | GetBalancesSuccessAction
  | GetOrdersAction
  | GetOrdersSuccessAction
