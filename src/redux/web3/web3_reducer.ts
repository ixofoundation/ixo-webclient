import { createReducer } from '../../lib/redux_utils/reducers'
import { Web3Result, WEB3_RESULT } from './web3_actions'

export type IWeb3State = {
  web3: any
  error: Object
}

const initialState: IWeb3State = {
  web3: null,
  error: {},
}

export const web3Reducer = createReducer<IWeb3State>(initialState, [
  {
    action: WEB3_RESULT,
    handler: (state: IWeb3State, action: Web3Result) => {
      ;(state.web3 = action.web3), (state.error = action.error)
      return {
        ...state,
      }
    },
  },
])
