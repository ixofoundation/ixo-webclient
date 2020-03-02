import { InitKeySafeAction, ResetKeySafeAction, KeysafeActions } from './types'

export function initKeysafe(): InitKeySafeAction {
  let keysafe
  let error

  if (!window['ixoKs']) {
    keysafe = null
    error = { error: 'Please install IXO Keysafe!' }
  } else {
    const IxoInpageProvider = window['ixoKs']
    const ixoInpageProvider = new IxoInpageProvider()

    if (ixoInpageProvider) {
      keysafe = ixoInpageProvider
      error = {}
    } else {
      keysafe = null
      error = { error: 'Please log into IXO Keysafe' }
    }
  }

  return {
    type: KeysafeActions.InitKeysafe,
    payload: {
      keysafe,
      error,
    },
  }
}

export const resetKeysafe = (): ResetKeySafeAction => ({
  type: KeysafeActions.ResetKeysafe,
})
