import { Currency } from '../../types/models'

export interface AccountState {
  name?: string
  address?: string
  orders: {}[]
  balances: Currency[]
}

export enum AccountActions {
  GetBalances = 'ixo/Account/GET_BALANCES',
  GetBalancesSuccess = 'ixo/Account/GET_BALANCES_FULFILLED',
  GetOrders = 'ixo/Account/GET_ORDERS',
  GetOrdersSuccess = 'ixo/Account/GET_ORDERS_FULFILLED',
}

export interface GetBalancesSuccessAction {
  type: typeof AccountActions.GetBalancesSuccess
  payload: {
    balances: Currency[]
  }
}

export interface GetOrdersSuccessAction {
  type: typeof AccountActions.GetOrdersSuccess
  payload: {
    orders: {}[]
  }
}

export type AccountActionTypes =
  | GetBalancesSuccessAction
  | GetOrdersSuccessAction
