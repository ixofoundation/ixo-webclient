import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as keysafeReducer } from 'modules/keysafe/keysafe.reducer'
import { reducer as ixoReducer } from 'modules/ixo/ixo.reducer'
import { reducer as web3Reducer } from 'modules/web3/web3.reducer'
import { reducer as bondBuyReducer } from 'modules/BondModules/BondBuy/BondBuy.reducer'
import { reducer as bondSellReducer } from 'modules/BondModules/BondSell/BondSell.reducer'
import { reducer as bondSwapReducer } from 'modules/BondModules/BondSwap/BondSwap.reducer'
import { reducer as accountReducer } from 'modules/Account/Account.reducer'
import { reducer as bondAccountOrdersReducer } from 'modules/BondModules/BondAccountOrders/BondAccountOrders.reducer'
import { reducer as bondAccountsReducer } from 'modules/BondModules/BondAccount/BondAccount.reducer'
import { reducer as bondReducer } from 'modules/BondModules/bond/bond.reducer'
import { reducer as tokenSupplyReducer } from 'modules/tokenSupply/tokenSupply.reducer'
import { reducer as entitiesReducer } from 'modules/EntityModules/Entities/Entities.reducer'
import { reducer as fuelEntityReducer } from 'modules/EntityModules/FuelEntity/FuelEntity.reducer'
import { reducer as submitEntityClaimReducer } from 'modules/EntityModules/SubmitEntityClaim/SubmitEntityClaim.reducer'
import { reducer as selectedEntityReducer } from 'modules/EntityModules/SelectedEntity/SelectedEntity.reducer'
import { reducer as createEntityReducer } from 'modules/EntityModules/CreateEntity/CreateEntity.reducer'
import { reducer as createEntityPageContentReducer } from 'modules/EntityModules/CreateEntityPageContent/CreateEntityPageContent.reducer'
import { reducer as createEntitySettingsReducer } from 'modules/EntityModules/CreateEntitySettings/CreateEntitySettings.reducer'
import { reducer as createEntityAdvancedReducer } from 'modules/EntityModules/CreateEntityAdvanced/CreateEntityAdvanced.reducer'
import { reducer as createEntityAttestationReducer } from 'modules/EntityModules/CreateEntityAttestation/CreateEntityAttestation.reducer'
import { reducer as createEntityClaimsReducer } from 'modules/EntityModules/CreateEntityClaims/CreateEntityClaims.reducer'
import { reducer as projectReducer } from 'pages/bond/store/reducers'
import { RootState } from './types'

export const rootReducer: any = (history) =>
  combineReducers<RootState>({
    keySafe: keysafeReducer,
    ixo: ixoReducer,
    web3: web3Reducer,
    bondBuy: bondBuyReducer,
    bondSell: bondSellReducer,
    bondSwap: bondSwapReducer,
    account: accountReducer,
    bondAccounts: bondAccountsReducer,
    bondAccountOrders: bondAccountOrdersReducer,
    activeBond: bondReducer,
    tokenSupply: tokenSupplyReducer,
    entities: entitiesReducer,
    fuelEntity: fuelEntityReducer,
    submitEntityClaim: submitEntityClaimReducer,
    selectedEntity: selectedEntityReducer,
    createEntity: createEntityReducer,
    createEntityPageContent: createEntityPageContentReducer,
    createEntityAttestation: createEntityAttestationReducer,
    createEntitySettings: createEntitySettingsReducer,
    createEntityAdvanced: createEntityAdvancedReducer,
    createEntityClaims: createEntityClaimsReducer,
    projectState: projectReducer,
    router: connectRouter(history),
  })
