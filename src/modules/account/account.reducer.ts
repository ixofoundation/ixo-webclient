import { AccountActionTypes, AccountActions, AccountState } from './types'

export const accountInitialState: AccountState = {
  address: 'cosmos1fydp860ztlyxvyys8p536hm7nzg0348xtdwgls',
  name: 'miguel',
  balances: [],
  orders: [],
}

export const reducer = (
  state = accountInitialState,
  action: AccountActionTypes,
): AccountState => {
  switch (action.type) {
    case AccountActions.GetBalancesSuccess:
      return { ...state, balances: action.payload.data }
    case AccountActions.GetOrdersSuccess:
      return {
        ...state,
        orders: [
          ...action.payload[0].data,
          ...action.payload[1].data,
          ...action.payload[2].data,
        ],
      }
  }

  return state
}
