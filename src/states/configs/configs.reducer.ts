import {
  ConfigsState,
  ConfigsStateActions,
  ConfigsStateActionTypes,
} from './configs.types'

export const initialState: ConfigsState = {
  assetListConfig: [],
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
    default:
      return state
  }
}
