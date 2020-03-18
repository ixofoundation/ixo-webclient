import { AccountActionTypes, AccountActions, AccountState } from './types'

export const initialState: AccountState = {
  address: null,
  userInfo: null,
  balances: [],
  orders: [],
}

export const reducer = (
  state = initialState,
  action: AccountActionTypes,
): AccountState => {
  switch (action.type) {
    case AccountActions.Login:
      return {
        ...state,
        userInfo: action.payload.userInfo,
        address: action.payload.address,
      }
    case AccountActions.GetBalancesSuccess:
      return { ...state, balances: action.payload.balances }
    case AccountActions.GetOrdersSuccess:
      return {
        ...state,
        orders: [...action.payload.orders],
      }
    case AccountActions.Logout:
      return { ...initialState }
  }

  return state
}
