export type KeysafeState = {
  keysafe: any
  error: Record<string, any>
}

/* export interface KeysafeResult {
  keysafe: any
  error: Record<string, any>
} */

export enum KeysafeActions {
  InitKeysafe = 'ixo/Keysafe/INIT_KEYSAFE',
  ResetKeysafe = 'ixo/Keysafe/RESET_KEYSAFE',
}

export interface InitKeySafeAction {
  type: typeof KeysafeActions.InitKeysafe
  payload: {
    keysafe: any
    error: Record<string, any>
  }
}

export interface ResetKeySafeAction {
  type: typeof KeysafeActions.ResetKeysafe
}

export type KeysafeActionTypes = InitKeySafeAction | ResetKeySafeAction
