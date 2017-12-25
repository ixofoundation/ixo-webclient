import {createReducer} from "../../../lib/redux_utils/reducers";
import {USER__CREATE__FAILURE, USER__CREATE__INIT, USER__CREATE__SUCCESS} from "./user_actions";

export type IUserModelState = {
    username: number,
    walletAddress: string
}

const initialState: IUserModelState = {
    username     : null,
    walletAddress: null
};

export let userReducer = createReducer<IUserModelState>(initialState, [
    // Register survey actions
    {
        action : USER__CREATE__INIT,
        handler: (state: IUserModelState, action: USER__CREATE__INIT) => {
            return {
                ...state,
                id           : state.username,
                walletAddress: state.walletAddress
            }
        }
    },
    {
        action : USER__CREATE__SUCCESS,
        handler: (state: IUserModelState, action: USER__CREATE__SUCCESS) => {
            return {
                ...state,
                result: action.result
            }
        }
    },
    {
        action : USER__CREATE__FAILURE,
        handler: (state: IUserModelState, action: USER__CREATE__FAILURE) => {
            return {
                ...state,
                error: action.error
            }
        }
    }
]);
