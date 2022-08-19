import Axios from 'axios'
import { AssetListConfigUrl } from 'common/utils/constants'
import { Dispatch } from 'redux'
import { ConfigsStateActions, GetAssetListConfigAction } from './configs.types'

export const GetAssetListConfig = () => (
  dispatch: Dispatch,
): GetAssetListConfigAction => {
  return dispatch({
    type: ConfigsStateActions.GetAssetListConfig,
    payload: Axios.get(AssetListConfigUrl).then((response) => response.data),
  })
}
