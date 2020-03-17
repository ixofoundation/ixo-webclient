import { AccountActionTypes, AccountActions, AccountState } from './types'

export const initialState: AccountState = {
  userInfo: null,
  loginError: {},
  address: 'cosmos1fydp860ztlyxvyys8p536hm7nzg0348xtdwgls',
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
        ...initialState,
        userInfo: action.payload.userInfo,
        loginError: action.payload.loginError,
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
