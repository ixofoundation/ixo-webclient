import {
  ClearAction,
  GetQuoteAction,
  ConfirmBuyAction,
  BondBuyActions,
  BondBuy,
  InitiateQuoteAction,
} from './types'
import Axios from 'axios'
import { Currency } from '../../types/models'
import { toast } from 'react-toastify'
import { Dispatch } from 'redux'
import { RootState } from 'src/common/redux/types'
import * as signingUtils from '../quote/quote.signingUtils'
import keysafe from '../../common/keysafe/keysafe'

export const initiateQuote = (): InitiateQuoteAction => ({
  type: BondBuyActions.InitiateQuote,
})

export const getQuote = (receiving: Currency, maxPrice: Currency) => (
  dispatch: Dispatch,
  getState: () => RootState,
): GetQuoteAction => {
  const {
    activeBond: { bondDid },
  } = getState()

  return dispatch({
    type: BondBuyActions.GetQuote,
    payload: Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/bonds/${bondDid}/buy_price/${receiving.amount}`,
      {
        transformResponse: [
          (response: string): any => {
            return JSON.parse(response).result
          },
        ],
      },
    ).then(response => {
      return {
        receiving,
        maxPrice,
        actualPrice: response.data.prices[0],
        txFees: response.data.tx_fees,
        totalPrice: response.data.total_prices[0],
        totalFee: response.data.total_fees[0],
      }
    }),
  })
}

export const confirmBuy = () => (
  dispatch: Dispatch,
  getState: () => RootState,
): ConfirmBuyAction => {
  const {
    bondBuy,
    account: {
      address,
      userInfo: {
        didDoc: { pubKey },
      },
    },
  } = getState()

  const quoteBuyPayload: BondBuy = {
    address,
    receiving: bondBuy.receiving!,
    txFees: bondBuy.txFees!,
    maxPrices: [
      { amount: bondBuy.maxPrice.amount, denom: bondBuy.maxPrice.denom },
    ],
  }

  keysafe.requestSigning(
    JSON.stringify(quoteBuyPayload),
    (error, signature) => {
      if (error) {
        return null
      }

      return dispatch({
        type: BondBuyActions.ConfirmBuy,
        payload: Axios.post(
          `${process.env.REACT_APP_GAIA_URL}/txs`,
          JSON.stringify(
            signingUtils.signBuyTx(quoteBuyPayload, signature, pubKey),
          ),
        ).then(response => {
          if (!response.data.logs[0].success) {
            toast('Sale failed. Please try again.', {
              position: toast.POSITION.BOTTOM_LEFT,
            })
          } else {
            toast(
              'Transaction submitted. Check its status in the orders tab.',
              {
                position: toast.POSITION.BOTTOM_LEFT,
              },
            )
          }
        }),
      })
    },
  )

  return null
}

export const clearQuote = (): ClearAction => ({
  type: BondBuyActions.Clear,
})
