import { applyMiddleware, createStore, AnyAction } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // localStorage
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './reducers'
import { RootState, ReduxStoreAndPersistor } from './types'
import promise from 'redux-promise-middleware'

export const history = createBrowserHistory()

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'createEntity',
    'createEntityTemplate',
    'createEntityPageContent',
    'createEntityAttestation',
    'createEntitySettings',
    'createEntityAdvanced',
    'createEntityClaims',
  ],
}

const configureStore = (preloadedState?: any): ReduxStoreAndPersistor => {
  const persistedReducer = persistReducer<RootState, AnyAction>(
    persistConfig,
    rootReducer(history),
  )

  const store = createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(thunk, promise, routerMiddleware(history)),
    ),
  )

  const persistor = persistStore(store)

  return { store, persistor }
}

export default configureStore
