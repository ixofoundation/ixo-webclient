import Axios from 'axios'
import { TokenSupplyActions, GetTotalSuppliesAction } from './types'
import { Dispatch } from 'redux'

export const getTotalSupplies = () => (
  dispatch: Dispatch,
): GetTotalSuppliesAction => {
  return dispatch({
    type: TokenSupplyActions.GetTotalSupplies,
    payload: Axios.get(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/supply/total',
      {
        transformResponse: [
          (response: string): any => {
            return JSON.parse(response).result
          },
        ],
      },
    ),
  })
}
