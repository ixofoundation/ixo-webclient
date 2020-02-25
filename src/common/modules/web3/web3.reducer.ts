import { createReducer } from '../../redux/redux.utils'
import { Web3Result, WEB3_RESULT } from './types'

export type IWeb3State = {
  web3: any
  error: Record<string, any>
}

const initialState: IWeb3State = {
  web3: null,
  error: {},
}

export const web3Reducer = createReducer<IWeb3State>(initialState, [
  {
    action: WEB3_RESULT,
    handler: (state: IWeb3State, action: Web3Result): IWeb3State => {
      state.web3 = action.web3
      state.error = action.error
      return {
        ...state,
      }
    },
  },
])
