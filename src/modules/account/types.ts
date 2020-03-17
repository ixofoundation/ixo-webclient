import { Currency } from '../../types/models'

export interface DidDoc {
  did: string
  pubKey: string
}

export interface UserInfo {
  didDoc: DidDoc
  name: string
  ledgered: boolean
  loggedInKeysafe: boolean
  hasKYC: boolean
}

export interface AccountState {
  userInfo: UserInfo
  loginError: Record<string, any>
  address: string
  orders: any[]
  balances: Currency[]
}

export enum AccountActions {
  Login = 'ixo/Account/Login',
  Logout = 'ixo/Account/Logout',
  GetBalances = 'ixo/Account/GET_BALANCES',
  GetBalancesSuccess = 'ixo/Account/GET_BALANCES_FULFILLED',
  GetBalancesPending = 'ixo/Account/GET_BALANCES_PENDING',
  GetBalancesFailure = 'ixo/Account/GET_BALANCES_REJECTED',
  GetOrders = 'ixo/Account/GET_ORDERS',
  GetOrdersSuccess = 'ixo/Account/GET_ORDERS_FULFILLED',
  GetOrdersPending = 'ixo/Account/GET_ORDERS_PENDING',
  GetOrdersFailure = 'ixo/Account/GET_ORDERS_REJECTED',
}

export interface LoginAction {
  type: typeof AccountActions.Login
  payload: {
    userInfo: UserInfo
    loginError: Record<string, any>
  }
}

export interface LogoutAction {
  type: typeof AccountActions.Logout
}

export interface GetBalancesAction {
  type: typeof AccountActions.GetBalances
  payload: Promise<any>
}

export interface GetBalancesSuccessAction {
  type: typeof AccountActions.GetBalancesSuccess
  payload: {
    balances: Currency[]
  }
}

export interface GetOrdersAction {
  type: typeof AccountActions.GetOrders
  payload: Promise<any>
}

export interface GetOrdersSuccessAction {
  type: typeof AccountActions.GetOrdersSuccess
  payload: {
    orders: any[]
  }
}

export type AccountActionTypes =
  | LoginAction
  | LogoutAction
  | GetBalancesAction
  | GetBalancesSuccessAction
  | GetOrdersAction
  | GetOrdersSuccessAction
