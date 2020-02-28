import { AccountActions, GetBalancesAction, GetOrdersAction } from './types'
import { Dispatch } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import Axios from 'axios'
import { RootState } from '../../common/redux/types'

export const getBalances = (address: string) => (
  dispatch: ThunkDispatch<RootState, void, GetBalancesAction>,
): GetBalancesAction => {
  return dispatch({
    type: AccountActions.GetBalances,
    payload: Axios.get(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/auth/accounts/' + address,
      {
        transformResponse: [
          (data: string): any => {
            return JSON.parse(data).result.value.coins
          },
        ],
      },
    ),
  })
}

export const getOrders = (address: string) => (
  dispatch: Dispatch,
): GetOrdersAction => {
  const config = {
    transformResponse: [
      (data: string): any => {
        return JSON.parse(data).txs
      },
    ],
  }

  const buyReq = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
      '/txs?message.action=buy&transfer.recipient=' +
      address,
    config,
  )
  const sellReq = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
      '/txs?message.action=sell&message.sender=' +
      address,
    config,
  )
  const swapReq = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
      '/txs?message.action=swap&transfer.recipient=' +
      address,
    config,
  )

  return dispatch({
    type: AccountActions.GetOrders,
    payload: Axios.all([sellReq, buyReq, swapReq]),
  })
}
