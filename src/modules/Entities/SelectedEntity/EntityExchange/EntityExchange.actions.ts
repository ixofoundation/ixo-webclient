import { Dispatch } from 'redux'
import Axios from 'axios'
import {
  ChangeTradeMethodAction,
  EntityExchangeActions,
  // GetAPYAction,
  GetInflationAction,
  GetTotalStakedAction,
  GetTotalSupplyAction,
} from './types'
import { BigNumber } from 'bignumber.js'
import { getBalanceNumber } from 'common/utils/currency.utils'

export const changeTradeMethod = (
  tradeMethod: string,
): ChangeTradeMethodAction => ({
  type: EntityExchangeActions.ChangeTradeMethod,
  payload: {
    tradeMethod,
  },
})

export const getInflation = () => (dispatch: Dispatch): GetInflationAction => {
  return dispatch({
    type: EntityExchangeActions.GetInflation,
    payload: Axios.get(`${process.env.REACT_APP_GAIA_URL}/minting/inflation`)
      .then((response) => response.data)
      .then(({ result }) => Number(result))
      .catch(() => 0),
  })
}

export const getTotalSupply = (denom = 'uixo') => (dispatch: Dispatch): GetTotalSupplyAction => {
  // convert denom
  return dispatch({
    type: EntityExchangeActions.GetTotalSupply,
    payload: Axios.get(`${process.env.REACT_APP_GAIA_URL}/cosmos/bank/v1beta1/supply/${denom}`)
      .then((response) => response.data)
      .then((response) => response.amount)
      .then((response) => getBalanceNumber(new BigNumber(response.amount)))
      .catch(() => 0),
  })
}

export const getTotalStaked = () => (dispatch: Dispatch): GetTotalStakedAction => {
  // convert denom
  return dispatch({
    type: EntityExchangeActions.GetTotalStaked,
    payload: Axios.get(`${process.env.REACT_APP_GAIA_URL}/cosmos/staking/v1beta1/pool`)
      .then((response) => response.data)
      .then((response) => response.pool)
      .then((response) => getBalanceNumber(new BigNumber(response.bonded_tokens)))
      .catch(() => 0),
  })
}

// export const getAPY = () => (dispatch: Dispatch): GetAPYAction => {

//   return dispatch({
//     type: EntityExchangeActions.GetAPY,
//     payload: Axios.get(
//       process.env.REACT_APP_GAIA_URL + '/bank/balances/' + address,
//     ).then((response) => {
//       return 0
//     }),
//   })
// }
