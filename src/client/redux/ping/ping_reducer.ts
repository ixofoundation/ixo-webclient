import {createReducer} from "../../../lib/redux_utils/reducers";
import {PING__CREATE__FAILURE, PING__CREATE__INIT, PING__CREATE__SUCCESS} from "./ping_actions";

export type IPingModelState = {
  pingResult: any,
  error:any
}

const initialState: IPingModelState = {
  pingResult: null,
  error:null
};

export let pingReducer = createReducer<IPingModelState>(initialState, [
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
        pingResult: action.pingResult,
        error:null
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
