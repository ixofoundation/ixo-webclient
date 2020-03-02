import { combineReducers, Reducer } from 'redux'
import { reducer as keysafeReducer } from '../modules/keysafe/keysafe.reducer'
import { reducer as ixoReducer } from '../modules/ixo/ixo.reducer'
import { reducer as loginReducer } from '../../modules/login/login.reducer'
import { reducer as web3Reducer } from '../modules/web3/web3.reducer'
import {
  activeQuote as activeQuoteReducer,
  quotePending as quotePendingReducer,
  signPending as signPendingReducer,
  transacting as transactingReducer,
} from '../../modules/quote/quote.reducer'
import {
  account as accountReducer,
  balances as balancesReducer,
} from '../../modules/account/account.reducer'
import {
  activeBond as activeBondReducer,
  totalSupplies as totalSuppliesReducer,
} from '../../modules/bond/bond.reducer'
import { RootState } from './types'

export const rootReducer: Reducer<RootState> = combineReducers({
  keySafe: keysafeReducer,
  ixo: ixoReducer,
  login: loginReducer,
  web3: web3Reducer,
  activeQuote: activeQuoteReducer,
  quotePending: quotePendingReducer,
  signPending: signPendingReducer,
  transacting: transactingReducer,
  account: accountReducer,
  balances: balancesReducer,
  activeBond: activeBondReducer,
  totalSupplies: totalSuppliesReducer,
}) as Reducer<RootState>
