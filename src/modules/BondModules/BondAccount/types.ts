// TODO - once orders has been sorted out properly and we know the endpoints then
// create a specific interface for the Order - it will be any for now

export enum BondAccountActions {
  GetAccounts = 'ixo/BondAccountOrders/GET_BOND_ACCOUNT',
  GetAccountsSuccess = 'ixo/BondAccountOrders/GET_BOND_ACCOUNT_FULFILLED',
  GetAccountsPending = 'ixo/BondAccountOrders/GET_BOND_ACCOUNT_PENDING',
  GetAccountsFailure = 'ixo/BondAccountOrders/GET_BOND_ACCOUNT_REJECTED',
}

export interface GetBondAccountAction {
  type: typeof BondAccountActions.GetAccounts
  payload: Promise<any>
}

export interface GetBondAccountSuccessAction {
  type: typeof BondAccountActions.GetAccountsSuccess
  payload: any
}

export type BondAccountActionTypes = GetBondAccountAction | GetBondAccountSuccessAction
