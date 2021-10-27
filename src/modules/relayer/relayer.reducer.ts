import { RelayerActionTypes, RelayerActions, RelayerInfo } from './types'

export const initialState: RelayerInfo[] = []

export const reducer = (
  state = initialState,
  action: RelayerActionTypes,
): RelayerInfo[] => {
  switch (action.type) {
    case RelayerActions.GetRelayersSuccess:
      return action.payload
  }

  return state
}
