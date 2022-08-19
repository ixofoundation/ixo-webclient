import {
  ConfigsState,
  ConfigsStateActions,
  ConfigsStateActionTypes,
} from './configs.types'

export const initialState: ConfigsState = {
  assetListConfig: [],
  relayersConfig: [],
}

export const reducer = (
  state = initialState,
  action: ConfigsStateActionTypes,
): ConfigsState => {
  switch (action.type) {
    case ConfigsStateActions.GetAssetListConfigSuccess:
      return {
        ...state,
        assetListConfig: action.payload,
      }
    case ConfigsStateActions.GetRelayersConfigSuccess:
      return {
        ...state,
        relayersConfig: action.payload,
      }
    default:
      return state
  }
}
