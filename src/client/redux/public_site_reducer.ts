// State of the admin panel store
import {combineReducers, Reducer} from 'redux';
import {IUserModelState, userReducer} from "./user/user_reducer";
import {IPingModelState, pingReducer} from "./ping/ping_reducer";
import {IIxoModelState, ixoReducer} from "./ixo/ixo_reducer";

export interface IPublicSiteStoreState {
    pingStore: IPingModelState
    userStore: IUserModelState
    ixoStore: IIxoModelState
}

export const publicSiteReducer: Reducer<IPublicSiteStoreState> = combineReducers({
    userStore: userReducer,
    pingStore: pingReducer,
    ixoStore: ixoReducer
    // Add other reducers here
}) as Reducer<IPublicSiteStoreState>;
