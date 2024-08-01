import Axios from 'axios'
import {
  BondActions,
  GetBondDetailAction,
  ClearBondAction,
  GetPriceHistoryAction,
  GetAlphaHistoryAction,
  GetWithdrawHistoryAction,
  GetBondDidAction,
} from './bond.types'
import { Dispatch } from 'redux'
import { get } from 'lodash'
import { formatCurrency, minimalDenomToDenom } from '../account/account.utils'
import moment from 'moment'

const BLOCKSYNC_API = import.meta.env.VITE_APP_BLOCK_SYNC_URL

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
    const bondRequest = Axios.get(`${import.meta.env.VITE_APP_GAIA_URL}/bonds/${bondDid}`, {
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

export const getPriceHistory =
  (bondDid: any) =>
  (dispatch: Dispatch): GetPriceHistoryAction => {
    return dispatch({
      type: BondActions.GetPriceHistory,
      payload: Axios.get(`${import.meta.env.VITE_APP_BLOCK_SYNC_URL}/api/bonds/getPriceHistoryByBondDid/${bondDid}`)
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
