import { createReducer } from "../../../lib/redux_utils/reducers";
import { IXO_RESULT } from "./ixo_actions";
import { stat } from "fs";

export type IIxoModelState = {
    ixo: any,
    error: Object,
}

const initialState: IIxoModelState = {
    ixo: null,
    error: null,
};

export let ixoReducer = createReducer<IIxoModelState>(initialState, [
    {
        action: IXO_RESULT,
        handler: (state: IIxoModelState, action: IXO_RESULT) => {
                state.ixo = action.ixo,
                state.error = action.error
            return {
                ...state
            };
        }
    }
]);
