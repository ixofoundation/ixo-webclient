import { createAction } from '../../lib/redux_utils/actions'
import { Ixo } from 'ixo-module'
import { IxoResult, IXO_RESULT } from './ixo_actions'

export function initIxo(BLOCK_SYNC_URL: string) {
  return (dispatch): void => {
    if (BLOCK_SYNC_URL) {
      const ixo = new Ixo(BLOCK_SYNC_URL)
      dispatch(
        createAction<IxoResult>(IXO_RESULT.type, {
          ixo: ixo,
          error: {},
        }),
      )
    } else {
      dispatch(
        createAction<IxoResult>(IXO_RESULT.type, {
          ixo: null,
          error: { error: 'Environment not setup for Blockchain node' },
        }),
      )
    }
  }
}

export function resetIxo() {
  return (dispatch): void => {
    dispatch(
      createAction<IxoResult>(IXO_RESULT.type, {
        ixo: null,
        error: {},
      }),
    )
  }
}
