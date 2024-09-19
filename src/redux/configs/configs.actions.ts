import Axios from 'axios'
import { AssetListConfigUrl, ExchangeConfigUrl, RelayersConfigUrl, SchemaGitUrl } from 'constants/chains'
import { Dispatch } from 'redux'
import {
  ConfigsStateActions,
  GetAssetListConfigAction,
  GetEntityConfigAction,
  GetExchangeConfigAction,
  GetRelayersConfigAction,
} from './configs.types'

export const getAssetListConfigAction =
  () =>
  (dispatch: Dispatch): GetAssetListConfigAction => {
    return dispatch({
      type: ConfigsStateActions.GetAssetListConfig,
      payload: Axios.get(AssetListConfigUrl!).then((response) => response.data),
    })
  }

export const getRelayersConfigAction =
  () =>
  (dispatch: Dispatch): GetRelayersConfigAction => {
    return dispatch({
      type: ConfigsStateActions.GetRelayersConfig,
      payload: Axios.get(RelayersConfigUrl!).then((response) => response.data),
    })
  }

export const getExchangeConfigAction =
  () =>
  (dispatch: Dispatch): GetExchangeConfigAction => {
    return dispatch({
      type: ConfigsStateActions.GetExchangeConfig,
      payload: Axios.get(ExchangeConfigUrl!)
        .then((response) => response.data)
        .catch((e) => console.error(e)),
    })
  }

export const getEntityConfigAction =
  () =>
  (dispatch: Dispatch): GetEntityConfigAction => {
    return dispatch({
      type: ConfigsStateActions.GetEntityConfig,
      payload: Axios.get(SchemaGitUrl!).then((response) => response.data),
    })
  }
