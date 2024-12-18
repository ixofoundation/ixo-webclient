import { combineReducers } from 'redux'
import { reducer as accountReducer } from 'redux/account/account.reducer'
import { reducer as configsReducer } from 'redux/configs/configs.reducer'
import { reducer as entities } from 'redux/entities/entities.reducer'
import { reducer as newEntityReducer } from 'redux/createEntity/createEntity.reducer'
import { reducer as newEntityAsActionReducer } from 'redux/createEntityAsAction/createEntityAsAction.reducer'
import { reducer as transferEntityReducer } from 'redux/transferEntity/transferEntity.reducer'
import { reducer as currentEntityReducer } from 'redux/currentEntity/currentEntity.reducer'
import { reducer as editEntityReducer } from 'redux/editEntity/editEntity.reducer'
import { reducer as validatorReducer } from 'redux/validator/validator.reducer'
import { reducer as customThemeReducer } from 'redux/theme/theme.reducer'
import { reducer as selectedEntityReducer } from 'redux/selectedEntity/selectedEntity.reducer'
import { reducer as selectedEntityExchangeReducer } from 'redux/selectedEntityExchange/entityExchange.reducer'
import { reducer as bondReducer } from 'redux/bond/bond.reducer'
import { reducer as submitEntityClaimReducer } from 'redux/submitEntityClaim/submitEntityClaim.reducer'
import { reducer as economyReducer } from 'redux/entityEconomy/entityEconomy.reducer'
import assistantReducer from 'redux/assistant/assistant.slice'
import exchangeReducer from 'redux/exchange/exchange.reducer'
import { multiStepReducer } from './entityMultiStepCreation/slice'
import createFlowReducer from 'redux/createFlow/slice'
import entitiesStateReducer from 'redux/entitiesState/slice'

export const rootReducer = () =>
  combineReducers({
    entities,
    activeBond: bondReducer,
    account: accountReducer,
    configs: configsReducer,
    newEntity: newEntityReducer,
    newEntityAsAction: newEntityAsActionReducer,
    editEntity: editEntityReducer,
    currentEntity: currentEntityReducer,
    transferEntity: transferEntityReducer,
    validator: validatorReducer,
    customTheme: customThemeReducer,
    selectedEntity: selectedEntityReducer,
    selectedEntityExchange: selectedEntityExchangeReducer,
    submitEntityClaim: submitEntityClaimReducer,
    exchange: exchangeReducer,
    economy: economyReducer,
    assistant: assistantReducer,
    multiStepCreation: multiStepReducer,
    createFlow: createFlowReducer,
    entitiesState: entitiesStateReducer,
  })
