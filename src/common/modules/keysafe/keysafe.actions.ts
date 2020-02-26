import { createAction } from '../../redux/redux.utils'
import { KeysafeResult, KEYSAFE_RESULT } from './types'

export function initKeysafe() {
  return (dispatch): void => {
    if (!window['ixoKs']) {
      dispatch(
        createAction<KeysafeResult>(KEYSAFE_RESULT.type, {
          keysafe: null,
          error: { error: 'Please install IXO Keysafe!' },
        }),
      )
    } else {
      const IxoInpageProvider = window['ixoKs']
      const keysafe = new IxoInpageProvider()

      if (keysafe) {
        dispatch(
          createAction<KeysafeResult>(KEYSAFE_RESULT.type, {
            keysafe: keysafe,
            error: {},
          }),
        )
      } else {
        dispatch(
          createAction<KeysafeResult>(KEYSAFE_RESULT.type, {
            keysafe: null,
            error: { error: 'Please log into IXO Keysafe' },
          }),
        )
      }
    }
  }
}

export function resetIxo() {
  return (dispatch): void => {
    dispatch(
      createAction<KeysafeResult>(KEYSAFE_RESULT.type, {
        keysafe: null,
        error: {},
      }),
    )
  }
}
