import thunk from 'redux-thunk';
import {applyMiddleware, createStore, Middleware, Store} from 'redux';
import {IPublicSiteStoreState, publicSiteReducer} from "./public_site_reducer";
import logger from 'redux-logger'

let publicStore: Store<IPublicSiteStoreState>;

export function createPublicSiteStore(preloadedState?: IPublicSiteStoreState): Store<IPublicSiteStoreState> {
  const middlewares: Middleware[] = [thunk];
  middlewares.push(logger);
  publicStore = createStore.call(this, publicSiteReducer, preloadedState, applyMiddleware(...middlewares));
  return publicStore;
}

export function getPublicStore(): Store<IPublicSiteStoreState> {
  return publicStore
}

export function getInitializedStoreState(): IPublicSiteStoreState {
  return createPublicSiteStore().getState();
}
