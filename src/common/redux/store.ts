import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import { rootReducer } from './reducers';
import { RootState } from './types';

// TODO - PERSISTENCE

let publicStore: Store<RootState>;
export const history = createBrowserHistory();

export function createPublicSiteStore(
  this: any,
  preloadedState?: RootState,
): Store<RootState> {
  publicStore = createStore(
    rootReducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(thunk, promise, routerMiddleware(history)),
    ),
  );
  return publicStore;
}

export function getPublicStore(): Store<RootState> {
  return publicStore;
}

export function getInitializedStoreState(): RootState {
  return createPublicSiteStore().getState();
}
