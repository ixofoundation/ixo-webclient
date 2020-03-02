import { AccountActions, GetBalancesAction, GetOrdersAction } from './types'
import { Dispatch } from 'redux'
import Axios from 'axios'

export const getBalances = (address: string) => (
  dispatch: Dispatch,
): GetBalancesAction => {
  return dispatch({
    type: AccountActions.GetBalances,
    payload: Axios.get(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/auth/accounts/' + address,
      {
        transformResponse: [
          (response: string): any => {
            return JSON.parse(response).result.value.coins
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
      (response: string): any => {
        return JSON.parse(response).txs
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
