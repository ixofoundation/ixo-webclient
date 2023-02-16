import Axios from 'axios'
import {
  BondActions,
  GetBondDetailAction,
  ClearBondAction,
  GetTransactionsAction,
  GetOutcomesTargetsAction,
  GetPriceHistoryAction,
  GetAlphaHistoryAction,
  GetWithdrawHistoryAction,
  GetBondDidAction,
} from './bond.types'
import { Dispatch } from 'redux'
import { get } from 'lodash'
import { formatCurrency, minimalDenomToDenom } from '../account/account.utils'
import { RootState } from 'redux/store'
import { getDisplayAmount } from 'utils/currency'
import { BigNumber } from 'bignumber.js'
import moment from 'moment'
import { BlockSyncService } from 'services/blocksync'

const bsService = new BlockSyncService()

const BLOCKSYNC_API = process.env.REACT_APP_BLOCK_SYNC_URL
const BLOCKSCAN_API = process.env.REACT_APP_BLOCK_SCAN_URL

export const getBondDid = (bondDid: string): GetBondDidAction => {
  return {
    type: BondActions.GetBondDid,
    payload: bondDid,
  }
}

export const clearBond = (): ClearBondAction => ({
  type: BondActions.ClearBond,
})

export const getBondDetail =
  (bondDid: string) =>
  (dispatch: Dispatch): GetBondDetailAction => {
    if (!bondDid) {
      return undefined!
    }
    const bondRequest = Axios.get(`${process.env.REACT_APP_GAIA_URL}/bonds/${bondDid}`, {
      transformResponse: [
        (response: string): any => {
          const parsedResponse = JSON.parse(response)
          return get(parsedResponse, 'result.value', parsedResponse)
        },
      ],
    })

    return dispatch({
      type: BondActions.GetBondDetail,
      payload: Promise.all([bondRequest]).then(
        Axios.spread((...responses) => {
          const bond = responses[0].data

          const { function_parameters } = bond

          const initialRaised = function_parameters.find(({ param }: any) => param === 'd0')

          const publicAlpha = Number(
            bond.function_parameters.find((param: any) => param.param === 'publicAlpha')?.value ?? 0,
          )

          const systemAlpha = Number(
            bond.function_parameters.find((param: any) => param.param === 'systemAlpha')?.value ?? 0,
          )

          return {
            bondDid,
            symbol: bond.token,
            reserveDenom: bond.reserve_tokens[0],
            name: bond.name,
            address: bond.feeAddress,
            type: bond.function_type,
            myStake: formatCurrency(bond.current_supply),
            capital: formatCurrency(bond.current_reserve[0]),
            maxSupply: formatCurrency(bond.max_supply),
            initialRaised: initialRaised ? minimalDenomToDenom(bond.reserve_tokens[0], initialRaised.value) : 0,
            reserve: formatCurrency(bond.available_reserve[0]),
            outcomePayment: Number(bond.outcome_payment),
            systemAlpha,
            publicAlpha,
            alphaDate: new Date(),
            state: bond.state,
            initialSupply: Number(bond.function_parameters.find((param: any) => param.param === 'S0')?.value),
            initialPrice: Number(bond.function_parameters.find((param: any) => param.param === 'p0')?.value ?? 0),
            allowSells: bond.allow_sells ?? false,
            allowReserveWithdrawals: bond.allow_reserve_withdrawals,
            availableReserve: bond.available_reserve,
            controllerDid: bond.controller_did,
          }
        }),
      ),
    })
  }

export const getTransactionsByBondDID =
  (bondDid: string) =>
  (dispatch: Dispatch, getState: () => RootState): GetTransactionsAction => {
    const { account } = getState()
    let userDid: string | undefined = undefined

    try {
      const { userInfo } = account
      const { didDoc } = userInfo
      const { did } = didDoc
      userDid = did.slice(8)
    } catch (e) {
      userDid = undefined
    }

    const transactionReq = Axios.get(`${BLOCKSCAN_API}/transactions/listTransactionsByBondDid/${bondDid}`)

    const oldTransactionReq = Axios.get(`${BLOCKSCAN_API}/oldtransactions/listTransactionsByBondDid/${bondDid}`)

    const priceReq = Axios.get(`${BLOCKSYNC_API}/api/bonds/getPriceHistoryByBondDid/${bondDid}`)

    return dispatch({
      type: BondActions.GetTransactions,
      payload: Promise.all([oldTransactionReq, transactionReq, priceReq]).then(
        Axios.spread((...responses) => {
          const transactions = [...responses[0].data, ...responses[1].data]
          let priceHistory: any[] = []
          if (responses[2].data) {
            priceHistory = responses[2].data.priceHistory
          }

          return transactions.map((data) => {
            let transaction = data.tx_response
            const status = transaction.logs.length ? 'succeed' : 'failed'
            const events = transaction.logs[0]?.events
            const quantity = transaction.tx?.body?.messages[0]?.amount
              ? formatCurrency(transaction.tx?.body?.messages[0]?.amount).amount
              : 0
            const buySell = transaction.tx?.body?.messages[0]['@type'].includes('MsgBuy')
            let isMyTX = false
            // TODO: temporary hack for ubs demo on May, 2022
            if (buySell) {
              isMyTX = transaction.tx?.body?.messages[0]['buyer_did'].includes(userDid)
            }
            const price =
              priceHistory.find(
                (his) => {
                  return Math.abs(moment(his.time).diff(transaction.timestamp)) < 1000
                },
                // moment(his.time).diff(transaction.timestamp) < 1,
              )?.price ??
              priceHistory.filter((his) => transaction.timestamp > his.time).pop()?.price ??
              0

            transaction = {
              ...transaction,
              price: price,
            }

            let transfer_amount = '0'
            if (events) {
              const transfer_event = events.find((eve: any) => eve.type === 'transfer')
              if (transfer_event) {
                transfer_amount = getDisplayAmount(
                  new BigNumber(parseInt(transfer_event.attributes.find((attr: any) => attr.key === 'amount').value)),
                ).toString()
              }
            }

            return {
              ...transaction,
              status: status,
              quantity: quantity,
              buySell: buySell,
              price: price,
              value: new BigNumber(transfer_amount).dividedBy(new BigNumber(quantity)).toNumber().toFixed(2),
              amount: transfer_amount,
              isMyStake: isMyTX,
            }
          })
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

    const requests = items.map((item: any) => bsService.project.getProjectByProjectDid(item['@id']))

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
  (bondDid: any) =>
  (dispatch: Dispatch): GetPriceHistoryAction => {
    return dispatch({
      type: BondActions.GetPriceHistory,
      payload: Axios.get(`${process.env.REACT_APP_BLOCK_SYNC_URL}/api/bonds/getPriceHistoryByBondDid/${bondDid}`)
        .then((res) => res.data)
        .then((res) => res.priceHistory)
        .then((res) =>
          res
            .map((history: any) => ({
              price: Number(history.price),
              time: history.time,
            }))
            .sort((a: any, b: any): number => {
              if (moment(a.time).valueOf() > moment(b.time).valueOf()) {
                return 1
              }
              return -1
            }),
        )
        .catch(() => []),
    })
  }

export const getAlphaHistory =
  (bondDid: any) =>
  (dispatch: Dispatch): GetAlphaHistoryAction => {
    return dispatch({
      type: BondActions.GetAlphaHistory,
      // TODO: BLOCKSYNC_API, bondDid should be switched
      // payload: Axios.get(
      //   `${BLOCKSYNC_API}/api/bond/get/alphas/${'did:ixo:U7GK8p8rVhJMKhBVRCJJ8c'}`,
      // )
      payload: Axios.get(`${BLOCKSYNC_API}/api/bond/get/alphas/${bondDid}`)
        .then((res) => res.data)
        .then((res) =>
          res.map((history: any) => ({
            alpha: Number(JSON.parse(history.raw_value).value.alpha),
            editorDid: JSON.parse(history.raw_value).value.editor_did,
            time: history.timestamp,
          })),
        )
        .catch(() => []),
    })
  }

export const getWithdrawHistory =
  (bondDid: any) =>
  (dispatch: Dispatch): GetWithdrawHistoryAction => {
    const withdrawReserveReq = Axios.get(`${BLOCKSYNC_API}/api/bond/get/withdraw/reserve/bybonddid/${bondDid}`)

    const withdrawShareReq = Axios.get(`${BLOCKSYNC_API}/api/bond/get/withdraw/share/bybondid/${bondDid}`)

    return dispatch({
      type: BondActions.GetWithdrawHistory,
      payload: Promise.all([withdrawReserveReq, withdrawShareReq]).then(
        Axios.spread((...responses) => {
          const withdrawReserveTransactions = responses[0].data
          const withdrawShareTransactions = responses[1].data

          const withdrawTransactions = withdrawReserveTransactions.concat(withdrawShareTransactions)

          return withdrawTransactions
            .map((history: any) => ({
              events: JSON.parse(history.transaction).events,
              time: history.timestamp,
            }))
            .filter((history: any) =>
              history.events.some(({ type }: any) => type === 'withdraw_share' || type === 'withdraw_reserve'),
            )
            .map((history: any) => {
              const time = history.time
              const status = 'succeed'
              const description = '—'
              const txHash = '0x00000001111111'
              let amount = 0
              let denom = ''
              const type = 'Bond Reserve'
              let purpose = ''

              const isWithdrawShare = history.events.some(({ type }: any) => type === 'withdraw_share')
              const isWithdrawReserve = history.events.some(({ type }: any) => type === 'withdraw_reserve')

              if (isWithdrawShare) {
                const attributes = history.events.find(({ type }: any) => type === 'withdraw_share').attributes
                const value = attributes.find(({ key }: any) => key === 'amount').value
                amount = parseInt(value)
                denom = value.replace(/[0-9]/g, '')
                purpose = 'Share Withdrawal'
              } else if (isWithdrawReserve) {
                const attributes = history.events.find(({ type }: any) => type === 'withdraw_reserve').attributes
                const value = attributes.find(({ key }: any) => key === 'amount').value
                amount = parseInt(value)
                denom = value.replace(/[0-9]/g, '')
                purpose = 'Project Funding'
              }

              return {
                time,
                amount,
                denom,
                status,
                type,
                purpose,
                description,
                txHash,
              }
            })
            .sort((a: any, b: any) => (new Date(a.time).getTime() < new Date(b.time).getTime() ? 1 : -1))
        }),
      ),
    })
  }
