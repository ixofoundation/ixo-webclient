'use client'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { rootReducer } from './reducers'
import promise from 'redux-promise-middleware'
import { configureStore, ThunkAction, Action, Reducer, AnyAction } from '@reduxjs/toolkit'

export const history = createBrowserHistory()

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [],
}

// Replace 'history' with 'navigate' here

const makeConfiguredStore = (reducer: Reducer<any, AnyAction>) =>
  configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          ignoreActions: true,
          ignoreState: true,
        },
        immutableCheck: false,
      })
        .concat(routerMiddleware(history)) // And here
        .concat(promise),
  })

export const store = () => {
  const isServer = typeof window === 'undefined'
  if (isServer) return makeConfiguredStore(rootReducer)

  const persistedReducer = persistReducer(persistConfig, rootReducer(history))

  let store: any = makeConfiguredStore(persistedReducer)

  store.__persistor = persistStore(store)

  return store
}

export type AppStore = ReturnType<typeof store>
export type AppDispatch = ReturnType<typeof store>['dispatch']
export type RootState = ReturnType<typeof store>['getState']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export type AsyncAppThunk<ReturnType = void> = AppThunk<Promise<ReturnType>>
