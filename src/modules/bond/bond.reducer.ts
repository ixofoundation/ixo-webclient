import createReducer from '../../common/redux/createReducer'
import { BondActions } from './types'
import { Currency } from '../../types/models'
import { BondState, BondActionTypes, BondActions } from './types'

export const activeBondInitialState = {
  symbol: 'token1',
  name: 'N/A',
  address: 'N/A',
  collateral: { amount: 0, denom: 'N/A' },
  totalSupply: { amount: 0, denom: 'N/A' },
  price: { amount: 0, denom: 'N/A' },
  alpha: 0,
  alphaDate: new Date(),
  trades: [],
} as BondState

export const reducer = (state = activeBondInitialState, action: BondActionTypes): BondState => {
  switch(action.type) {
    case BondActions.GetBalancesSuccess
      
  }
}

/* 
export const activeBond = createReducer(activeBondInitialState, {
  [BondActions.GetBalances + '_FULFILLED'](activeBond: BondState, action: any) {
    const newState = Object.assign({}, action.payload)
    newState.trades = []

    // keep old trade if the same
    if (activeBond.symbol == action.payload.symbol) {
      newState.trades = activeBond.trades
    }
    return newState
  },
  [BondActions.GetTrades + '_FULFILLED'](activeBond: BondState, action: any) {
    const newState = Object.assign({}, activeBond)
    newState.trades = action.payload!
    return newState
  },
})

export const totalSupplies = createReducer([] as Currency[], {
  ['BondActions.GET_TOTAL_SUPPLIES' + '_FULFILLED'](
    totalSupplies: [],
    action: any,
  ) {
    const newState = Object.assign([], action.payload)
    return newState
  },
}) */

// activeBond: Bond;
// balances: [Currency];
// accounts: Accounts;
// activeQuote: Quote;
