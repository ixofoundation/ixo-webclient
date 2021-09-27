import { combineReducers, Reducer } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as bondBuyReducer } from 'modules/BondModules/BondBuy/BondBuy.reducer'
import { reducer as bondSellReducer } from 'modules/BondModules/BondSell/BondSell.reducer'
import { reducer as bondSwapReducer } from 'modules/BondModules/BondSwap/BondSwap.reducer'
import { reducer as accountReducer } from 'modules/Account/Account.reducer'
import { reducer as bondAccountOrdersReducer } from 'modules/BondModules/BondAccountOrders/BondAccountOrders.reducer'
import { reducer as bondAccountsReducer } from 'modules/BondModules/BondAccount/BondAccount.reducer'
import { reducer as bondReducer } from 'modules/BondModules/bond/bond.reducer'
import { reducer as tokenSupplyReducer } from 'modules/tokenSupply/tokenSupply.reducer'
import { reducer as entitiesReducer } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.reducer'
import { reducer as fuelEntityReducer } from 'modules/Entities/FuelEntity/FuelEntity.reducer'
import { reducer as submitEntityClaimReducer } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.reducer'
import { reducer as selectedEntityReducer } from 'modules/Entities/SelectedEntity/SelectedEntity.reducer'
import { reducer as selectedEntityAgentsReducer } from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.reducer'
import { reducer as selectedEntityExchangeReducer } from 'modules/Entities/SelectedEntity/EntityExchange/EntityExchange.reducer'
import { reducer as createEntityReducer } from 'modules/Entities/CreateEntity/CreateEntity.reducer'
import { reducer as createEntityTemplateReducer} from 'modules/Entities/CreateEntity/CreateTemplate/CreateTemplate.reducer'
import { reducer as createEntityPageContentReducer } from 'modules/Entities/CreateEntity/CreateEntityPageContent/CreateEntityPageContent.reducer'
import { reducer as createEntitySettingsReducer } from 'modules/Entities/CreateEntity/CreateEntitySettings/CreateEntitySettings.reducer'
import { reducer as createEntityAdvancedReducer } from 'modules/Entities/CreateEntity/CreateEntityAdvanced/CreateEntityAdvanced.reducer'
import { reducer as createEntityAttestationReducer } from 'modules/Entities/CreateEntity/CreateEntityAttestation/CreateEntityAttestation.reducer'
import { reducer as createEntityClaimsReducer } from 'modules/Entities/CreateEntity/CreateEntityClaims/CreateEntityClaims.reducer'
import { reducer as EditEntityPageContentReducer } from 'modules/Entities/SelectedEntity/EntityEdit/EditEntityPageContent/EditEntityPageContent.reducer'
import { reducer as EditEntityAttestationReducer } from 'modules/Entities/SelectedEntity/EntityEdit/EditEntityAttestation/EditEntityAttestation.reducer'
import { reducer as EditEntityReducer } from 'modules/Entities/SelectedEntity/EntityEdit/EditEntity.reducer'
import { reducer as EditEntitySettingsReducer } from 'modules/Entities/SelectedEntity/EntityEdit/EditEntitySettings/EditEntitySettings.reducer'
import { reducer as EditEntityAdvancedReducer } from 'modules/Entities/SelectedEntity/EntityEdit/EditEntityAdvanced/EditEntityAdvanced.reducer'
import { reducer as EditEntityClaimsReducer } from 'modules/Entities/SelectedEntity/EntityEdit/EditEntityClaims/EditEntityClaims.reducer'
import { reducer as EditEntityTemplateReducer } from 'modules/Entities/SelectedEntity/EntityEdit/EditTemplate/EditTemplate.reducer'

import { reducer as projectReducer } from 'pages/bond/store/reducers'
import { reducer as evaluateClaimReducer } from 'modules/Entities/SelectedEntity/EntityImpact/EvaluateClaim/EvaluateClaim.reducer'
import { RootState } from './types'

export const rootReducer = (history): Reducer<RootState> =>
  combineReducers<RootState>({
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
    selectedEntityAgents: selectedEntityAgentsReducer,
    selectedEntityExchange: selectedEntityExchangeReducer,
    createEntity: createEntityReducer,
    createEntityTemplate: createEntityTemplateReducer,
    createEntityPageContent: createEntityPageContentReducer,
    createEntityAttestation: createEntityAttestationReducer,
    createEntitySettings: createEntitySettingsReducer,
    createEntityAdvanced: createEntityAdvancedReducer,
    createEntityClaims: createEntityClaimsReducer,
    editEntity: EditEntityReducer,
    editEntityPageContent: EditEntityPageContentReducer,
    editEntityAttestation: EditEntityAttestationReducer,
    editEntitySettings: EditEntitySettingsReducer,
    editEntityAdvanced: EditEntityAdvancedReducer,
    editEntityClaims: EditEntityClaimsReducer,
    editEntityTemplate: EditEntityTemplateReducer,
    projectState: projectReducer,
    evaluateClaim: evaluateClaimReducer,
    router: connectRouter(history),
  })
