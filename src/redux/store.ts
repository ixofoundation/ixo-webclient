import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // localStorage
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { rootReducer } from './reducers'
import promise from 'redux-promise-middleware'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

export const history = createBrowserHistory()

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [],
}

const persistedReducer = persistReducer(persistConfig, rootReducer(history))

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Temporarily disable serializable check, need to get state serializable in future
        ignoreActions: true,
        ignoreState: true,
      },
      immutableCheck: false,
    })
      .concat(routerMiddleware(history))
      .concat(promise),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export type AsyncAppThunk<ReturnType = void> = AppThunk<Promise<ReturnType>>
