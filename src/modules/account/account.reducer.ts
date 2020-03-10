import { AccountActionTypes, AccountActions, AccountState } from './types'

export const initialState: AccountState = {
  address: 'cosmos1fydp860ztlyxvyys8p536hm7nzg0348xtdwgls',
  name: 'miguel',
  balances: [],
  orders: [],
}

export const reducer = (
  state = initialState,
  action: AccountActionTypes,
): AccountState => {
  switch (action.type) {
    case AccountActions.GetBalancesSuccess:
      return { ...state, balances: action.payload.balances }
    case AccountActions.GetOrdersSuccess:
      return {
        ...state,
        orders: [...action.payload.orders],
      }
  }

  return state
}
