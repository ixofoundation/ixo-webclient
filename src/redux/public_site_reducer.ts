// State of the admin panel store
import { combineReducers, Reducer } from 'redux';
import { IKeysafeModelState, keysafeReducer } from './keysafe/keysafe_reducer';
import  { IIxoModelState, ixoReducer } from './ixo/ixo_reducer';

export interface PublicSiteStoreState {
	keysafeStore: IKeysafeModelState;
	ixoStore: IIxoModelState;
}

export const publicSiteReducer: Reducer<PublicSiteStoreState> = combineReducers({
	keysafeStore: keysafeReducer,
	ixoStore: ixoReducer
	// Add other reducers here
}) as Reducer<PublicSiteStoreState>;
