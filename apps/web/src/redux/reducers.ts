import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { reducer as accountReducer } from 'redux/account/account.reducer'
import { reducer as configsReducer } from 'redux/configs/configs.reducer'
import { reducer as entitiesReducer } from 'redux/entitiesExplorer/entitiesExplorer.reducer'
import { reducer as newEntityReducer } from 'redux/createEntity/createEntity.reducer'
import { reducer as transferEntityReducer } from 'redux/transferEntity/transferEntity.reducer'
import { reducer as currentEntityReducer } from 'redux/currentEntity/currentEntity.reducer'
import { reducer as editEntityReducer } from 'redux/editEntity/editEntity.reducer'
import { reducer as validatorReducer } from 'redux/validator/validator.reducer'
import { reducer as customThemeReducer } from 'redux/theme/theme.reducer'
import { reducer as selectedEntityReducer } from 'redux/selectedEntity/selectedEntity.reducer'
import { reducer as selectedEntityExchangeReducer } from 'redux/selectedEntityExchange/entityExchange.reducer'
import { reducer as bondReducer } from 'redux/bond/bond.reducer'
import { reducer as submitEntityClaimReducer } from 'redux/submitEntityClaim/submitEntityClaim.reducer'
import exchangeReducer from 'redux/exchange/exchange.reducer'

export const rootReducer = (history: any) =>
  combineReducers({
    activeBond: bondReducer,
    account: accountReducer,
    entities: entitiesReducer,
    configs: configsReducer,
    newEntity: newEntityReducer,
    editEntity: editEntityReducer,
    currentEntity: currentEntityReducer,
    transferEntity: transferEntityReducer,
    validator: validatorReducer,
    customTheme: customThemeReducer,
    selectedEntity: selectedEntityReducer,
    selectedEntityExchange: selectedEntityExchangeReducer,
    submitEntityClaim: submitEntityClaimReducer,
    exchange: exchangeReducer,
    router: connectRouter(history),
  })
