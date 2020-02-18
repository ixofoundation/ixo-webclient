import { createReducer } from '../../lib/redux_utils/reducers'
import { KeysafeResult, KEYSAFE_RESULT } from './keysafe_actions'

export type IKeysafeModelState = {
  keysafe: any
  error: Record<string, any>
}

const initialState: IKeysafeModelState = {
  keysafe: null,
  error: {},
}

export const keysafeReducer = createReducer<IKeysafeModelState>(initialState, [
  {
    action: KEYSAFE_RESULT,
    handler: (
      state: IKeysafeModelState,
      action: KeysafeResult,
    ): IKeysafeModelState => {
      state.keysafe = action.keysafe
      state.error = action.error
      return {
        ...state,
      }
    },
  },
])
