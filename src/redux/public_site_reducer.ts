// State of the admin panel store
import { combineReducers, Reducer } from 'redux';
import { IKeysafeModelState, keysafeReducer } from './keysafe/keysafe_reducer';
import  { IIxoModelState, ixoReducer } from './ixo/ixo_reducer';
import  { IActiveProjectModelState, activeProjectReducer } from './activeProject/activeProject_reducer';
export interface PublicSiteStoreState {
	keysafeStore: IKeysafeModelState;
	ixoStore: IIxoModelState;
	activeProjectStore: IActiveProjectModelState;
}

export const publicSiteReducer: Reducer<PublicSiteStoreState> = combineReducers({
	keysafeStore: keysafeReducer,
	ixoStore: ixoReducer,
	activeProjectStore: activeProjectReducer
	// Add other reducers here
}) as Reducer<PublicSiteStoreState>;
