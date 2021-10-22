import Axios from 'axios'
import { RelayerActions, GetRelayersAction } from './types'
import { Dispatch } from 'redux'
import { RelayersConfigUrl } from 'common/utils/constants'

export const getRelayers = () => (dispatch: Dispatch): GetRelayersAction => {
  return dispatch({
    type: RelayerActions.GetRelayers,
    payload: Axios.get(RelayersConfigUrl).then(
      (response) => response.data,
    ),
  })
}
