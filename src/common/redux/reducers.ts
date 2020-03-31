import { combineReducers, Reducer } from 'redux'
import { reducer as keysafeReducer } from '../../modules/keysafe/keysafe.reducer'
import { reducer as ixoReducer } from '../../modules/ixo/ixo.reducer'
import { reducer as web3Reducer } from '../../modules/web3/web3.reducer'
import { reducer as quoteReducer } from '../../modules/quote/quote.reducer'
import { reducer as bondBuyReducer } from '../../modules/BondBuy/BondBuy.reducer'
import { reducer as accountReducer } from '../../modules/account/account.reducer'
import { reducer as bondAccountOrdersReducer } from '../../modules/BondAccountOrders/BondAccountOrders.reducer'
import { reducer as bondReducer } from '../../modules/bond/bond.reducer'
import { reducer as tokenSupplyReducer } from '../../modules/tokenSupply/tokenSupply.reducer'
import { RootState } from './types'

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  keySafe: keysafeReducer,
  ixo: ixoReducer,
  web3: web3Reducer,
  activeQuote: quoteReducer,
  bondBuy: bondBuyReducer,
  account: accountReducer,
  bondAccountOrders: bondAccountOrdersReducer,
  activeBond: bondReducer,
  tokenSupply: tokenSupplyReducer,
})
