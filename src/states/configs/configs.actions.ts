import Axios from 'axios'
import { AssetListConfigUrl, RelayersConfigUrl } from 'common/utils/constants'
import { Dispatch } from 'redux'
import {
  ConfigsStateActions,
  GetAssetListConfigAction,
  GetRelayersConfigAction,
} from './configs.types'

export const getAssetListConfig = () => (
  dispatch: Dispatch,
): GetAssetListConfigAction => {
  return dispatch({
    type: ConfigsStateActions.GetAssetListConfig,
    payload: Axios.get(AssetListConfigUrl).then((response) => response.data),
  })
}

export const getRelayersConfig = () => (
  dispatch: Dispatch,
): GetRelayersConfigAction => {
  return dispatch({
    type: ConfigsStateActions.GetRelayersConfig,
    payload: Axios.get(RelayersConfigUrl).then((response) => response.data),
  })
}
