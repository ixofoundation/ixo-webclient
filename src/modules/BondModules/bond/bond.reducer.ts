import { BondActions } from './types'
import { BondState, BondActionTypes } from './types'

export const initialState = {
  bondDid: '',
  symbol: '',
  reserveDenom: '',
  name: '',
  address: '',
  type: '',
  collateral: { amount: 0, denom: '' },
  totalSupply: { amount: 0, denom: '' },
  price: { amount: 0, denom: '' },
  reserve: { amount: 0, denom: '' },
  alpha: 0,
  alphaDate: new Date(),
  trades: [],
  transactions: []
} as BondState

export const reducer = (
  state = initialState,
  action: BondActionTypes,
): BondState => {
  switch (action.type) {
    case BondActions.GetBalancesSuccess:
      return {
        ...state,
        ...action.payload,
        trades: state.symbol === action.payload.symbol ? [...state.trades] : [],
      }

    case BondActions.GetTradesSuccess:
      return {
        ...state,
        trades: action.payload.trades,
      }
    case BondActions.ClearBond:
      return initialState
    case BondActions.GetTransactionsSuccess:
      return {
        ...state,
        transactions: action.payload,
      }
  }

  return state
}
