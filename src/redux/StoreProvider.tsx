'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { AppStore, makeStore } from './store'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  // const persistor = persistStore(storeRef.current)

  return (
    <Provider store={storeRef.current}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        {children}
      {/* </PersistGate> */}
    </Provider>
  )
}
