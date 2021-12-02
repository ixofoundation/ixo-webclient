import Axios from 'axios'
import {
  BondActions,
  GetBalancesAction,
  GetTradesAction,
  ClearBondAction,
  GetTransactionsAction,
  GetOutcomesTargetsAction,
  GetPriceHistoryAction,
} from './types'
import { Dispatch } from 'redux'
import { get } from 'lodash'
import { formatCurrency } from '../../Account/Account.utils'
import { RootState } from 'common/redux/types'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { getBalanceNumber } from 'common/utils/currency.utils'
import { BigNumber } from 'bignumber.js'
import moment from 'moment'

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
    // const reserveRequest = Axios.get(
    //   `${process.env.REACT_APP_GAIA_URL}/bonds/${bondDid}/current_reserve`,
    //   {
    //     transformResponse: [
    //       (response: string): any => {
    //         const parsedResponse = JSON.parse(response)
    //         return get(parsedResponse, 'result', ['error'])[0]
    //       },
    //     ],
    //   },
    // )

    return dispatch({
      type: BondActions.GetBalances,
      payload: Promise.all([bondRequest, priceRequest]).then(
        Axios.spread((...responses) => {
          const bond = responses[0].data
          const price = responses[1].data
          // const reserve = responses[2].data

          return {
            bondDid,
            symbol: bond.token,
            reserveDenom: bond.reserve_tokens[0],
            name: bond.name,
            address: bond.feeAddress,
            type: bond.function_type,
            // myStake: apiCurrencyToCurrency({
            //   amount: getBalanceNumber(new BigNumber(bond.current_supply.amount)),
            //   denom: bond.current_supply.denom,
            // }),
            myStake: formatCurrency(bond.current_supply),
            // capital:
            //   bond.current_reserve.length > 0
            //     ? apiCurrencyToCurrency({
            //         amount: getBalanceNumber(
            //           new BigNumber(bond.current_reserve[0].amount),
            //         ),
            //         denom: bond.current_reserve[0].denom,
            //       })
            //     : { amount: 0, denom: '' },
            capital: formatCurrency(bond.current_reserve[0]),
            // maxSupply: apiCurrencyToCurrency({
            //   amount: getBalanceNumber(
            //     new BigNumber(bond.max_supply.amount ?? 0),
            //   ),
            //   denom: bond.max_supply.denom,
            // }), //  not currently shown on UI
            maxSupply: formatCurrency(bond.max_supply),

            // collateral: apiCurrencyToCurrency(bond.current_supply),
            // totalSupply: apiCurrencyToCurrency(bond.max_supply),
            // price: {
            //   amount: getBalanceNumber(
            //     new BigNumber(apiCurrencyToCurrency(price).amount),
            //   ),
            //   denom: price.denom,
            // },
            price: formatCurrency(price),

            // reserve:
            //   bond.available_reserve.length > 0
            //     ? apiCurrencyToCurrency({
            //         amount: getBalanceNumber(
            //           new BigNumber(bond.available_reserve[0].amount),
            //         ),
            //         denom: bond.available_reserve[0].denom,
            //       })
            //     : { amount: 0, denom: '' },
            reserve: formatCurrency(bond.available_reserve[0]),
            alpha: 0,
            alphaDate: new Date(),
            state: bond.state,
            initialSupply: Number(
              bond.function_parameters.find((param) => param.param === 'S0')
                ?.value,
            ),
            allowSells: bond.allow_sells ?? false,
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
  (bondDid: string) =>
  (
    dispatch: Dispatch,
    // getState: () => RootState,
  ): GetTransactionsAction => {
    // const {
    //   activeBond: { bondDid },
    // } = getState()

    const transactionReq = Axios.get(
      `${process.env.REACT_APP_BLOCK_SYNC_URL}/transactions/listTransactionsByBondDid/${bondDid}`,
    )

    const priceReq = Axios.get(
      `${process.env.REACT_APP_BLOCK_SYNC_URL}/api/bonds/getPriceHistoryByBondDid/${bondDid}`,
    )

    return dispatch({
      type: BondActions.GetTransactions,
      payload: Promise.all([transactionReq, priceReq]).then(
        Axios.spread((...responses) => {
          const transactions = responses[0].data
          const priceHistory = responses[1].data.priceHistory

          return transactions
            .map((data) => {
              const transaction = data.tx_response
              const status = transaction.logs.length ? 'succeed' : 'failed'
              const events = transaction.logs[0]?.events
              const quantity = transaction.tx?.body?.messages[0]?.amount
                ? formatCurrency(transaction.tx?.body?.messages[0]?.amount)
                    .amount
                : 0
              const buySell =
                transaction.tx?.body?.messages[0]['@type'].includes('MsgBuy')
              const price =
                priceHistory.find(
                  (his) =>
                    moment(his.time).diff(transaction.timestamp, 'minutes') ===
                    0,
                )?.price ?? 0
              let transfer_amount = 0
              if (events) {
                const transfer_event = events.find(
                  (eve) => eve.type === 'transfer',
                )
                if (transfer_event) {
                  transfer_amount = getBalanceNumber(
                    new BigNumber(
                      parseInt(
                        transfer_event.attributes.find(
                          (attr) => attr.key === 'amount',
                        ).value,
                      ),
                    ),
                  )
                }
              }
              return {
                ...transaction,
                status: status,
                quantity: quantity,
                buySell: buySell,
                price: price,
                value: (transfer_amount / quantity).toFixed(2),
                amount: transfer_amount,
              }
            })
            .reverse()
        }),
      ),
    })
  }

export const getOutcomesTargets =
  () =>
  (dispatch: Dispatch, getState: () => RootState): GetOutcomesTargetsAction => {
    const {
      selectedEntity: {
        entityClaims: { items },
      },
    } = getState()

    const requests = items.map((item) =>
      blocksyncApi.project.getProjectByProjectDid(item['@id']),
    )

    return dispatch({
      type: BondActions.GetOutcomesTargets,
      payload: Promise.all(requests).then(
        Axios.spread((...responses) => {
          return responses.map((response: any, index) => {
            return {
              ...items[index],
              ddoTags: response.data.ddoTags,
            }
          })
        }),
      ),
    })
  }

export const getPriceHistory =
  (bondDid) =>
  (dispatch: Dispatch): GetPriceHistoryAction => {
    return dispatch({
      type: BondActions.GetPriceHistory,
      payload: Axios.get(
        `${process.env.REACT_APP_BLOCK_SYNC_URL}/api/bonds/getPriceHistoryByBondDid/${bondDid}`,
      )
        .then((res) => res.data)
        .then((res) => res.priceHistory)
        .then((res) =>
          res.map((history) => ({
            price: Number(history.price),
            time: history.time,
          })),
        )
        .catch(() => []),
    })
  }
