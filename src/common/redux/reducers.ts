// State of the admin panel store
import { combineReducers, Reducer } from 'redux'
import {
  IKeysafeModelState,
  keysafeReducer,
} from '../modules/keysafe/keysafe.reducer'
import { reducer as ixoReducer } from '../modules/ixo/ixo.reducer'
import { reducer as loginReducer } from '../../modules/login/login.reducer'
import { LoginState } from '../../modules/login/types'
import { IxoState } from '../../common/modules/ixo/types'
import { web3Reducer } from '../modules/web3/web3.reducer'
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

export interface RootState {
  keySafe: IKeysafeModelState
  ixo: IxoState
  login: LoginState
  web3: any
  activeQuote: any
  quotePending: any
  signPending: any
  transacting: any
  account: any
  balances: any
  activeBond: any
  totalSupplies: any
}

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
