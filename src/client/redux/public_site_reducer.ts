// State of the admin panel store
import {combineReducers, Reducer} from 'redux';
import {IUserModelState, userReducer} from "./user/user_reducer";
import {IWeb3ModelState, web3Reducer} from "./web3/web3_reducer";

export interface IPublicSiteStoreState {
  userStore: IUserModelState
  web3Store: IWeb3ModelState
}

export const publicSiteReducer: Reducer<IPublicSiteStoreState> = combineReducers({
  userStore: userReducer,
  web3Store: web3Reducer
  // Add other reducers here
}) as Reducer<IPublicSiteStoreState>;
