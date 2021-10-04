import Axios from 'axios'
import {
  BondActions,
  GetBalancesAction,
  GetTradesAction,
  ClearBondAction,
  GetTransactionsAction,
} from './types'
import { Dispatch } from 'redux'
import { get } from 'lodash'
import { apiCurrencyToCurrency } from '../../Account/Account.utils'
import { RootState } from 'common/redux/types'

export const clearBond = (): ClearBondAction => ({
  type: BondActions.ClearBond,
})

export const getBalances =
  (bondDid: string) =>
  (dispatch: Dispatch): GetBalancesAction => {
    dispatch(clearBond())
    const bondRequest = Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/bonds/${bondDid}`,
      {
        transformResponse: [
          (response: string): any => {
            const parsedResponse = JSON.parse(response)
            return get(parsedResponse, 'result.value', parsedResponse)
          },
        ],
      },
    )
    const priceRequest = Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/bonds/${bondDid}/current_price`,
      {
        transformResponse: [
          (response: string): any => {
            const parsedResponse = JSON.parse(response)
            return get(parsedResponse, 'result', ['error'])[0]
          },
        ],
      },
    )

    return dispatch({
      type: BondActions.GetBalances,
      payload: Promise.all([bondRequest, priceRequest]).then(
        Axios.spread((...responses) => {
          const bond = responses[0].data
          const price = responses[1].data

          return {
            bondDid,
            symbol: bond.token,
            reserveDenom: bond.reserve_tokens[0],
            name: bond.name,
            address: bond.feeAddress,
            type: bond.function_type,
            myStake: apiCurrencyToCurrency(bond.current_supply),
            capital: bond.current_reserve.length > 0 ? apiCurrencyToCurrency(bond.current_reserve[0]) : { amount: 0, denom: '' },
            maxSupply: apiCurrencyToCurrency(bond.max_supply),  //  not currently shown on UI

            collateral: apiCurrencyToCurrency(bond.current_supply),
            totalSupply: apiCurrencyToCurrency(bond.max_supply),
            price: apiCurrencyToCurrency(price),
            reserve: bond.available_reserve.length > 0 ? apiCurrencyToCurrency(bond.available_reserve[0]) : { amount: 0, denom: '' },
            alpha: 0,
            alphaDate: new Date(),
          }
        }),
      ),
    })
  }

export const getTransactions =
  () =>
  (dispatch: Dispatch): GetTradesAction => {
    // TODO: Select Specific token
    // TODO: Are queries disappearing?

    const config = {
      transformResponse: [
        (response: string): any => {
          return JSON.parse(response).txs
        },
      ],
    }

    const buyReq = Axios.get(
      process.env.REACT_APP_GAIA_URL + '/txs?message.action=buy',
      config,
    )
    const sellReq = Axios.get(
      process.env.REACT_APP_GAIA_URL + '/txs?message.action=sell',
      config,
    )
    const swapReq = Axios.get(
      process.env.REACT_APP_GAIA_URL + '/txs?message.action=swap',
      config,
    )

    return dispatch({
      type: BondActions.GetTrades,
      payload: Promise.all([buyReq, sellReq, swapReq]).then(
        Axios.spread((...responses) => {
          const buy = responses[0].data
          const sell = responses[1].data
          const swap = responses[2].data
          return { trades: [...buy, ...sell, ...swap] }
        }),
      ),
    })
  }

export const getTransactionsByBondDID =
  () =>
  (dispatch: Dispatch, getState: () => RootState): GetTransactionsAction => {
    const {
      activeBond: { bondDid },
    } = getState()

    return dispatch({
      type: BondActions.GetTransactions,
      payload: Axios.get(
        `${process.env.REACT_APP_BLOCK_SYNC_URL}/transactions/listTransactionsByBondDid/${bondDid}`,
      ).then((res) => {
        return res.data.map((data) => {
          const transaction = data.tx_response;
          const status = transaction.logs.length ? 'succeed' : 'failed'
          const events = transaction.logs[0]?.events
          const quantity = parseInt(transaction.tx?.body?.messages[0]?.amount?.amount)
          const buySell = transaction.tx?.body?.messages[0]['@type'].includes('MsgBuy')
          let transfer_amount = 0
          if (events) {
            const transfer_event = events.find((eve) => eve.type === 'transfer')
            console.log(transfer_event);
            if (transfer_event) {
              transfer_amount = parseInt(
                transfer_event.attributes.find(
                  (attr) => attr.key === 'amount',
                ).value,
              )
            }
          }
          return {
            ...transaction,
            status: status,
            quantity: quantity,
            buySell: buySell,
            price: (transfer_amount / quantity).toFixed(2)
          }
        })
      }),
    })
  }