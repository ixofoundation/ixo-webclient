import { createReducer } from '../../redux/redux.utils'
import { IxoResult, IXO_RESULT } from './types'

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
    handler: (state: IIxoModelState, action: IxoResult): IIxoModelState => {
      state.ixo = action.ixo
      state.error = action.error
      return {
        ...state,
      }
    },
  },
])
