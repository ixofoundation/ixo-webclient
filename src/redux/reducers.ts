import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { reducer as accountReducer } from 'redux/account/account.reducer'
import { reducer as bondReducer } from 'redux/bond/bond.reducer'
import { reducer as projectReducer } from 'redux/project/project.reducer'
import { reducer as economyReducer } from 'redux/entityEconomy/entityEconomy.reducer'
import { reducer as configsReducer } from 'redux/configs/configs.reducer'
import { reducer as entitiesReducer } from 'redux/entitiesExplorer/entitiesExplorer.reducer'
import { reducer as newEntityReducer } from 'redux/createEntity/createEntity.reducer'
import { reducer as createEntityReducer } from 'redux/createEntityOld/createEntity.reducer'
import { reducer as createEntityAdvancedReducer } from 'redux/createEntityAdvanced/createEntityAdvanced.reducer'
import { reducer as createEntityAttestationReducer } from 'redux/createEntityAttestation/createEntityAttestation.reducer'
import { reducer as createEntityClaimsReducer } from 'redux/createEntityClaims/createEntityClaims.reducer'
import { reducer as createEntityPageContentReducer } from 'redux/createEntityPageContent/createEntityPageContent.reducer'
import { reducer as createEntitySettingsReducer } from 'redux/createEntitySettings/createEntitySettings.reducer'
import { reducer as createSelectTemplateReducer } from 'redux/createSelectTemplate/createSelectTemplate.reducer'
import { reducer as createEntityTemplateReducer } from 'redux/createTemplate/createTemplate.reducer'
import { reducer as fuelEntityReducer } from 'redux/fuelEntity/fuelEntity.reducer'
import { reducer as evaluateClaimReducer } from 'redux/evaluateClaim/evaluateClaim.reducer'
import { reducer as selectedEntityReducer } from 'redux/selectedEntity/selectedEntity.reducer'
import { reducer as currentEntityReducer } from 'redux/currentEntity/currentEntity.reducer'
import { reducer as submitEntityClaimReducer } from 'redux/submitEntityClaim/submitEntityClaim.reducer'
import { reducer as selectedEntityExchangeReducer } from 'redux/selectedEntityExchange/entityExchange.reducer'
import { reducer as selectedEntityAgentsReducer } from 'redux/selectedEntityAgents/entityAgents.reducer'
import { reducer as editEntityReducer } from 'redux/editEntity/editEntity.reducer'
import { reducer as editEntityAdvancedReducer } from 'redux/editEntityAdvanced/editEntityAdvanced.reducer'
import { reducer as editEntityAttestationReducer } from 'redux/editEntityAttestation/editEntityAttestation.reducer'
import { reducer as editEntityClaimsReducer } from 'redux/editEntityClaims/editEntityClaims.reducer'
import { reducer as editEntityPageContentReducer } from 'redux/editEntityPageContent/editEntityPageContent.reducer'
import { reducer as editEntitySettingsReducer } from 'redux/editEntitySettings/editEntitySettings.reducer'
import { reducer as editEntityTemplateReducer } from 'redux/editEntityTemplate/editTemplate.reducer'

export const rootReducer = (history: any) =>
  combineReducers({
    account: accountReducer,
    activeBond: bondReducer,
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
    editEntity: editEntityReducer,
    editEntityPageContent: editEntityPageContentReducer,
    editEntityAttestation: editEntityAttestationReducer,
    editEntitySettings: editEntitySettingsReducer,
    editEntityAdvanced: editEntityAdvancedReducer,
    editEntityClaims: editEntityClaimsReducer,
    editEntityTemplate: editEntityTemplateReducer,
    projectState: projectReducer,
    evaluateClaim: evaluateClaimReducer,
    createSelectTemplate: createSelectTemplateReducer,
    economy: economyReducer,
    configs: configsReducer,
    newEntity: newEntityReducer,
    currentEntity: currentEntityReducer,
    router: connectRouter(history),
  })
