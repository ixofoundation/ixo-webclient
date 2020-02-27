import { AccountActions } from './types'
import { AsyncAction } from 'redux-promise-middleware'
import Axios from 'axios'

export const getBalances = (address: string): AsyncAction => {
  return {
    type: AccountActions.GetBalances,
    payload: Axios.get(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/auth/accounts/' + address,
    ).then(response => {
      return response.data.result.value.coins
    }),
  }
}

export const getOrders = (address: string): AsyncAction => {
  const buyReq = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
      '/txs?message.action=buy&transfer.recipient=' +
      address,
  )
  const sellReq = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
      '/txs?message.action=sell&message.sender=' +
      address,
  )
  const swapReq = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
      '/txs?message.action=swap&transfer.recipient=' +
      address,
  )

  return {
    type: AccountActions.GetOrders,
    payload: Axios.all([sellReq, buyReq, swapReq]).then(
      Axios.spread((...responses) => {
        const buy = responses[0].data.txs
        const sell = responses[1].data.txs
        const swap = responses[2].data.txs
        return [...buy, ...sell, ...swap]
      }),
    ),
  }
}
