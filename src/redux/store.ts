'use client'
import { Action, AnyAction, Reducer, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
// import storage from './storage'
import promise from 'redux-promise-middleware'
import { rootReducer } from './reducers'


// const persistConfig = {
//   key: 'root',
//   version: 1,
//   // storage,
//   whitelist: [],
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer)

// Replace 'history' with 'navigate' here

export const makeStore = () =>
  configureStore({
    reducer: rootReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          ignoreActions: true,
          ignoreState: true,
        },
        immutableCheck: false,
      }).concat(promise),
  })

// export const makeStore = () => {
//   const isServer = typeof window === 'undefined'
//   if (isServer) return makeConfiguredStore(rootReducer)

//   const persistedReducer = persistReducer(persistConfig, rootReducer(history))

//   let store: any = makeConfiguredStore(persistedReducer)

//   store.__persistor = persistStore(store)

//   return store
// }

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export type AsyncAppThunk<ReturnType = void> = AppThunk<Promise<ReturnType>>
