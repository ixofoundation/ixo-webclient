import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { reducer as accountReducer } from 'redux/account/account.reducer'
import { reducer as configsReducer } from 'redux/configs/configs.reducer'
import { reducer as entitiesReducer } from 'redux/entitiesExplorer/entitiesExplorer.reducer'
import { reducer as newEntityReducer } from 'redux/createEntity/createEntity.reducer'
import { reducer as currentEntityReducer } from 'redux/currentEntity/currentEntity.reducer'
import { reducer as editEntityReducer } from 'redux/editEntity/editEntity.reducer'
import { reducer as validatorReducer } from 'redux/validator/validator.reducer'

export const rootReducer = (history: any) =>
  combineReducers({
    account: accountReducer,
    entities: entitiesReducer,
    configs: configsReducer,
    newEntity: newEntityReducer,
    editEntity: editEntityReducer,
    currentEntity: currentEntityReducer,
    validator: validatorReducer,
    router: connectRouter(history),
  })
