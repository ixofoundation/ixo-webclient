// State of the admin panel store
import { combineReducers, Reducer } from 'redux';
import { IPingModelState, pingReducer } from './ping/ping_reducer';
import  { IIxoModelState, ixoReducer } from './ixo/ixo_reducer';

export interface PublicSiteStoreState {
	pingStore: IPingModelState;
	ixoStore: IIxoModelState;
}

export const publicSiteReducer: Reducer<PublicSiteStoreState> = combineReducers({
	pingStore: pingReducer,
	ixoStore: ixoReducer
	// Add other reducers here
}) as Reducer<PublicSiteStoreState>;
