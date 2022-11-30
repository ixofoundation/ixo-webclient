import Axios from 'axios'
import { AssetListConfigUrl, ExchangeConfigUrl, RelayersConfigUrl } from 'constants/chains'
import { Dispatch } from 'redux'
import {
  ConfigsStateActions,
  GetAssetListConfigAction,
  GetExchangeConfigAction,
  GetRelayersConfigAction,
} from './configs.types'

export const getAssetListConfig =
  () =>
  (dispatch: Dispatch): GetAssetListConfigAction => {
    return dispatch({
      type: ConfigsStateActions.GetAssetListConfig,
      payload: Axios.get(AssetListConfigUrl!).then((response) => response.data),
    })
  }

export const getRelayersConfig =
  () =>
  (dispatch: Dispatch): GetRelayersConfigAction => {
    return dispatch({
      type: ConfigsStateActions.GetRelayersConfig,
      payload: Axios.get(RelayersConfigUrl!).then((response) => response.data),
    })
  }

export const getExchangeConfig =
  () =>
  (dispatch: Dispatch): GetExchangeConfigAction => {
    return dispatch({
      type: ConfigsStateActions.GetExchangeConfig,
      payload: Axios.get(ExchangeConfigUrl!).then((response) => response.data),
    })
  }
