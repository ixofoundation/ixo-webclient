import thunk from 'redux-thunk';
import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { PublicSiteStoreState, publicSiteReducer } from './public_site_reducer';
import logger from 'redux-logger';

let publicStore: Store<PublicSiteStoreState>;

export function createPublicSiteStore(this: any, preloadedState?: PublicSiteStoreState): Store<PublicSiteStoreState> {
	const middlewares: Middleware[] = [thunk];
	middlewares.push(logger);
	publicStore = createStore.call(this, publicSiteReducer, preloadedState, applyMiddleware(...middlewares));
	return publicStore;
}

export function getPublicStore(): Store<PublicSiteStoreState> {
	return publicStore;
}

export function getInitializedStoreState(): PublicSiteStoreState {
	return createPublicSiteStore().getState();
}
