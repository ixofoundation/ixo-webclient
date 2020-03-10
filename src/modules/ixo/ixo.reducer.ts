import { IxoState, IxoActionTypes, IxoActions } from './types'

export const initialState: IxoState = {
  ixo: null,
}

export const reducer = (
  state = initialState,
  action: IxoActionTypes,
): IxoState => {
  switch (action.type) {
    case IxoActions.InitIxo:
      return {
        ...state,
        ixo: action.payload.ixo,
      }
    case IxoActions.ResetIxo:
      return initialState
  }

  return state
}
