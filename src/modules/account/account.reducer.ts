import { AccountActionTypes, AccountActions, AccountState } from './types'
import { Currency } from '../../types/models'

const accountInitialState: AccountState = {
  address: 'cosmos1fydp860ztlyxvyys8p536hm7nzg0348xtdwgls',
  name: 'miguel',
  balances: [],
  orders: [],
}

export const balancesInitialState: Currency[] = []

export const account = (
  state = accountInitialState,
  action: AccountActionTypes,
): AccountState => {
  switch (action.type) {
    case AccountActions.GetBalancesSuccess:
      return { ...state, balances: action.payload.balances }
    /*     case AccountActions.GetOrdersSuccess:
      return { ...state, orders: action.payload.orders } */
  }

  return state
}

export const balances = (
  state = balancesInitialState,
  action: AccountActionTypes,
): Currency[] => {
  switch (action.type) {
    case AccountActions.GetBalancesSuccess:
      return [...action.payload.balances]
  }

  return state
}
