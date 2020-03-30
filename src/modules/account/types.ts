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
  address: string
  accountNumber: string
  sequence: string
  orders: any[]
  balances: Currency[]
  loginStatusCheckCompleted: boolean
}

export enum AccountActions {
  Login = 'ixo/Account/Login',
  Logout = 'ixo/Account/Logout',
  GetAccount = 'ixo/Account/GET_ACCOUNT',
  GetAccountSuccess = 'ixo/Account/GET_ACCOUNT_FULFILLED',
  GetAccountPending = 'ixo/Account/GET_ACCOUNT_PENDING',
  GetAccountFailure = 'ixo/Account/GET_ACCOUNT_REJECTED',
  GetOrders = 'ixo/Account/GET_ORDERS',
  GetOrdersSuccess = 'ixo/Account/GET_ORDERS_FULFILLED',
  GetOrdersPending = 'ixo/Account/GET_ORDERS_PENDING',
  GetOrdersFailure = 'ixo/Account/GET_ORDERS_REJECTED',
}

export interface LoginAction {
  type: typeof AccountActions.Login
  payload: {
    userInfo: UserInfo
    address: string
  }
}

export interface LogoutAction {
  type: typeof AccountActions.Logout
}

export interface GetAccountAction {
  type: typeof AccountActions.GetAccount
  payload: Promise<any>
}

export interface GetAccountSuccessAction {
  type: typeof AccountActions.GetAccountSuccess
  payload: {
    balances: Currency[]
    sequence: string
    accountNumber: string
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
  | GetAccountAction
  | GetAccountSuccessAction
  | GetOrdersAction
  | GetOrdersSuccessAction
