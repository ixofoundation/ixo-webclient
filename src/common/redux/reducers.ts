import { combineReducers, Reducer } from 'redux'
import { reducer as keysafeReducer } from '../../modules/keysafe/keysafe.reducer'
import { reducer as ixoReducer } from '../../modules/ixo/ixo.reducer'
import { reducer as web3Reducer } from '../../modules/web3/web3.reducer'
import { reducer as bondBuyReducer } from '../../modules/BondBuy/BondBuy.reducer'
import { reducer as bondSellReducer } from '../../modules/BondSell/BondSell.reducer'
import { reducer as bondSwapReducer } from '../../modules/BondSwap/BondSwap.reducer'
import { reducer as accountReducer } from '../../modules/Account/Account.reducer'
import { reducer as bondAccountOrdersReducer } from '../../modules/BondAccountOrders/BondAccountOrders.reducer'
import { reducer as bondReducer } from '../../modules/bond/bond.reducer'
import { reducer as tokenSupplyReducer } from '../../modules/tokenSupply/tokenSupply.reducer'
import { reducer as entitiesReducer } from '../../modules/Entities/Entities.reducer'
import { reducer as fuelEntityReducer } from '../../modules/FuelEntity/FuelEntity.reducer'
import { reducer as submitEntityClaimReducer } from '../../modules/SubmitEntityClaim/SubmitEntityClaim.reducer'
import { reducer as selectedEntityReducer } from '../../modules/SelectedEntity/SelectedEntity.reducer'
import { RootState } from './types'

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  keySafe: keysafeReducer,
  ixo: ixoReducer,
  web3: web3Reducer,
  bondBuy: bondBuyReducer,
  bondSell: bondSellReducer,
  bondSwap: bondSwapReducer,
  account: accountReducer,
  bondAccountOrders: bondAccountOrdersReducer,
  activeBond: bondReducer,
  tokenSupply: tokenSupplyReducer,
  entities: entitiesReducer,
  fuelEntity: fuelEntityReducer,
  submitEntityClaim: submitEntityClaimReducer,
  selectedEntity: selectedEntityReducer,
})
