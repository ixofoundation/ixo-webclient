// State of the admin panel store
import { combineReducers, Reducer } from 'redux'
import { IKeysafeModelState, keysafeReducer } from './keysafe/keysafe_reducer'
import { IIxoModelState, ixoReducer } from './ixo/ixo_reducer'
import { ILoginModelState, loginReducer } from './login/login_reducer'
import { web3Reducer } from './web3/web3_reducer'
import {
  activeQuote as activeQuoteReducer,
  quotePending as quotePendingReducer,
  signPending as signPendingReducer,
  transacting as transactingReducer,
} from './quote/quote_reducer'
import {
  account as accountReducer,
  balances as balancesReducer,
} from './account/account_reducer'
import {
  activeBond as activeBondReducer,
  totalSupplies as totalSuppliesReducer,
} from './bond/bond_reducer'

export interface PublicSiteStoreState {
  keySafe: IKeysafeModelState
  ixo: IIxoModelState
  login: ILoginModelState
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

export const publicSiteReducer: Reducer<PublicSiteStoreState> = combineReducers(
  {
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
  },
) as Reducer<PublicSiteStoreState>
