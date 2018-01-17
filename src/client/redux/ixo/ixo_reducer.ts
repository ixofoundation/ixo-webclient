import {createReducer} from "../../../lib/redux_utils/reducers";
import {IXO__CREATE__FAILURE, IXO__CREATE__INIT, IXO__CREATE__SUCCESS} from "./ixo_actions";

export type IIxoModelState = {
    ixo: any,
}

const initialState: IIxoModelState = {
    ixo: null,
};

export let ixoReducer = createReducer<IIxoModelState>(initialState, [
    {
        action: IXO__CREATE__INIT,
        handler: (state: IIxoModelState, action: IXO__CREATE__INIT) => {
            return {
                ...state,
            }
        }
    },
    {
        action: IXO__CREATE__SUCCESS,
        handler: (state: IIxoModelState, action: IXO__CREATE__SUCCESS) => {
            return {
                ...state,
                ixo: action.ixo,
                error: null
            }
        }
    },
    {
        action: IXO__CREATE__FAILURE,
        handler: (state: IIxoModelState, action: IXO__CREATE__FAILURE) => {
            return {
                ...state,
                error: action.error
            }
        }
    }
]);
