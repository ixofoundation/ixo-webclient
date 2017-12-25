import {createReducer} from "../../../lib/redux_utils/reducers";
import {USER__CREATE__FAILURE, USER__CREATE__INIT, USER__CREATE__SUCCESS} from "../user/user_actions";
import {INIT__WEB3__INIT, INIT__WEB3__SUCCESS} from "./web3_actions";


export type IWeb3ModelState = {
  web3Instance: any
}

const initialState: IWeb3ModelState = {
  web3Instance     : null
};

export let web3Reducer = createReducer<IWeb3ModelState>(initialState, [
  // Register survey actions
  {
    action : INIT__WEB3__INIT,
    handler: (state: IWeb3ModelState, action: USER__CREATE__INIT) => {
      return {
        ...state,
      }
    }
  },
  {
    action : INIT__WEB3__SUCCESS,
    handler: (state: IWeb3ModelState, action: INIT__WEB3__SUCCESS) => {
      return {
        ...state,
        web3Instance: action.web3Instance
      }
    }
  },
  {
    action : USER__CREATE__FAILURE,
    handler: (state: IWeb3ModelState, action: USER__CREATE__FAILURE) => {
      return {
        ...state,
        error: action.error
      }
    }
  }
]);
