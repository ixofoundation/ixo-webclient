import { AsyncAction } from 'redux-promise-middleware'
import Axios from 'axios'
import { BondActions } from './types'

export const getBondBalances = (symbol: string): AsyncAction => {
  const bondRequest = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/bonds/' + symbol,
  )
  const priceRequest = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
      '/bonds/' +
      symbol +
      '/current_price',
  )

  return {
    type: BondActions.GET_BOND_BALANCES,
    payload: Axios.all([bondRequest, priceRequest]).then(
      Axios.spread((...responses) => {
        const bond = responses[0].data.result.value
        const price = responses[1].data.result[0]

        return {
          symbol: bond.token,
          name: bond.name,
          address: bond.feeAddress,
          type: bond.function_type,

          collateral: bond.current_supply,
          totalSupply: bond.max_supply,
          price: price,

          alpha: 0,
          alphaDate: new Date(),
        }
      }),
    ),
  }
}

export const getTotalSupplies = (): AsyncAction => {
  return {
    type: BondActions.GET_TOTAL_SUPPLIES,
    payload: Axios.get(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/supply/total',
    ).then(response => {
      const supplies = response.data.result

      return supplies
    }),
  }
}

export const getTransactions = (): AsyncAction => {
  // TODO: Select Specific token
  // TODO: Are queries disappearing?

  const buyReq = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/txs?message.action=buy',
  )
  const sellReq = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/txs?message.action=sell',
  )
  const swapReq = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/txs?message.action=swap',
  )

  return {
    type: BondActions.GET_TRADES,
    payload: Axios.all([buyReq, sellReq, swapReq]).then(
      Axios.spread((...responses) => [
        ...responses[0].data.txs,
        ...responses[1].data.txs,
        ...responses[2].data.txs,
      ]),
    ),
  }
}
