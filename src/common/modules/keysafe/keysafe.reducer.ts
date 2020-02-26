import { KeysafeState, KeysafeActions, KeysafeActionTypes } from './types'

const initialState: KeysafeState = {
  keysafe: null,
  error: {},
}

export const reducer = (
  state = initialState,
  action: KeysafeActionTypes,
): KeysafeState => {
  switch (action.type) {
    case KeysafeActions.InitKeysafe:
      return {
        ...state,
        keysafe: action.payload.keysafe,
        error: action.payload.error,
      }
    case KeysafeActions.ResetKeysafe:
      return initialState
  }

  return state
}
