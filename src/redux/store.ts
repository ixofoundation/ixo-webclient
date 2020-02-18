import thunk from 'redux-thunk'
import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { PublicSiteStoreState, publicSiteReducer } from './public_site_reducer'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

// TODO - PERSISTENCE

let publicStore: Store<PublicSiteStoreState>

export function createPublicSiteStore(
  this: any,
  preloadedState?: PublicSiteStoreState,
): Store<PublicSiteStoreState> {
  publicStore = createStore(
    publicSiteReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk, logger, promise)),
  )
  return publicStore
}

export function getPublicStore(): Store<PublicSiteStoreState> {
  return publicStore
}

export function getInitializedStoreState(): PublicSiteStoreState {
  return createPublicSiteStore().getState()
}
