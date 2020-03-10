import thunk from 'redux-thunk'
import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './reducers'
import { RootState } from './types'
import promise from 'redux-promise-middleware'

// TODO - PERSISTENCE

let publicStore: Store<RootState>

export function createPublicSiteStore(
  this: any,
  preloadedState?: RootState,
): Store<RootState> {
  publicStore = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk, promise)),
  )
  return publicStore
}

export function getPublicStore(): Store<RootState> {
  return publicStore
}

export function getInitializedStoreState(): RootState {
  return createPublicSiteStore().getState()
}
