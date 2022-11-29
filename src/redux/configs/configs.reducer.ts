import { ConfigsState, ConfigsStateActions, ConfigsStateActionTypes } from './configs.types'

export const initialState: ConfigsState = {
  assetListConfig: [],
  relayersConfig: [],
  exchangeConfig: undefined,
} as any

export const reducer = (state = initialState, action: ConfigsStateActionTypes): ConfigsState => {
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
    case ConfigsStateActions.GetExchangeConfigSuccess:
      return {
        ...state,
        exchangeConfig: action.payload,
      }
    default:
      return state
  }
}
