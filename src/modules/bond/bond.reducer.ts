import { BondActions } from './types'
import { BondState, BondActionTypes } from './types'

export const initialState = {
  symbol: 'token1',
  name: 'N/A',
  address: 'N/A',
  type: '',
  collateral: { amount: 0, denom: 'N/A' },
  totalSupply: { amount: 0, denom: 'N/A' },
  price: { amount: 0, denom: 'N/A' },
  reserve: { amount: 0, denom: 'N/A' },
  alpha: 0,
  alphaDate: new Date(),
  trades: [],
} as BondState

export const reducer = (
  state = initialState,
  action: BondActionTypes,
): BondState => {
  switch (action.type) {
    case BondActions.GetBalancesSuccess:
      return {
        ...action.payload,
        trades: state.symbol === action.payload.symbol ? [...state.trades] : [],
      }

    case BondActions.GetTradesSuccess:
      return {
        ...state,
        trades: action.payload.trades,
      }
  }

  return state
}
