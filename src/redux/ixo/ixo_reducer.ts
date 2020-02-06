import { createReducer } from '../../lib/redux_utils/reducers'
import { IxoResult, IXO_RESULT } from './ixo_actions'

export type IIxoModelState = {
  ixo: any
  error: Record<string, any>
}

const initialState: IIxoModelState = {
  ixo: null,
  error: {},
}

export const ixoReducer = createReducer<IIxoModelState>(initialState, [
  {
    action: IXO_RESULT,
    handler: (state: IIxoModelState, action: IxoResult) => {
      ;(state.ixo = action.ixo), (state.error = action.error)
      return {
        ...state,
      }
    },
  },
])
