// TODO - once orders has been sorted out properly and we know the endpoints then
// create a specific interface for the Order - it will be any for now

export enum BondAccountOrdersActions {
  GetOrders = 'ixo/BondAccountOrders/GET_BOND_ACCOUNT_ORDERS',
  GetOrdersSuccess = 'ixo/BondAccountOrders/GET_BOND_ACCOUNT_ORDERS_FULFILLED',
  GetOrdersPending = 'ixo/BondAccountOrders/GET_BOND_ACCOUNT_ORDERS_PENDING',
  GetOrdersFailure = 'ixo/BondAccountOrders/GET_BOND_ACCOUNT_ORDERS_REJECTED',
}

export interface GetBondAccountOrdersAction {
  type: typeof BondAccountOrdersActions.GetOrders
  payload: Promise<any>
}

export interface GetBondAccountOrdersSuccessAction {
  type: typeof BondAccountOrdersActions.GetOrdersSuccess
  payload: {
    bondAccountOrders: any[]
  }
}

export type BondAccountOrdersActionTypes = GetBondAccountOrdersAction | GetBondAccountOrdersSuccessAction
