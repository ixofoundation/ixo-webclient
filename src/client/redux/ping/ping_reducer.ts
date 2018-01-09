import {createReducer} from "../../../lib/redux_utils/reducers";
import {PING__CREATE__FAILURE, PING__CREATE__INIT, PING__CREATE__SUCCESS} from "./ping_actions";

export type IPingModelState = {
}

const initialState: IPingModelState = {
    result: null
};

export let pingReducer = createReducer<IPingModelState>(initialState, [
    // Register survey actions
    {
        action : PING__CREATE__INIT,
        handler: (state: IPingModelState, action: PING__CREATE__INIT) => {
            return {
                ...state,
            }
        }
    },
    {
        action : PING__CREATE__SUCCESS,
        handler: (state: IPingModelState, action: PING__CREATE__SUCCESS) => {
            return {
                ...state,
                result: action.result
            }
        }
    },
    {
        action : PING__CREATE__FAILURE,
        handler: (state: IPingModelState, action: PING__CREATE__FAILURE) => {
            return {
                ...state,
                error: action.error
            }
        }
    }
]);
