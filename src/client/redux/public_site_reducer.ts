// State of the admin panel store
import {combineReducers, Reducer} from 'redux';
import {IUserModelState, userReducer} from "./user/user_reducer";
import {IWeb3ModelState, web3Reducer} from "./web3/web3_reducer";
import {IPingModelState, pingReducer} from "./ping/ping_reducer";
import {IIxoModelState, ixoReducer} from "./ixo/ixo_reducer";

export interface IPublicSiteStoreState {
    pingStore: IPingModelState
    userStore: IUserModelState
    web3Store: IWeb3ModelState
    ixoStore: IIxoModelState
}

export const publicSiteReducer: Reducer<IPublicSiteStoreState> = combineReducers({
    userStore: userReducer,
    web3Store: web3Reducer,
    pingStore: pingReducer,
    ixoStore: ixoReducer
    // Add other reducers here
}) as Reducer<IPublicSiteStoreState>;
