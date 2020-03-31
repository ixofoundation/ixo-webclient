import {
  ClearAction,
  GetQuoteAction,
  ConfirmBuyAction,
  BondBuyActions,
  BondBuy,
} from './types'
import Axios from 'axios'
import { Currency } from '../../types/models'
import { toast } from 'react-toastify'
import { Dispatch } from 'redux'
import { RootState } from 'src/common/redux/types'
import * as signingUtils from '../quote/quote.signingUtils'
import keysafe from '../../common/keysafe/keysafe'

export const initiateQuote = (): ClearAction => ({
  type: BondBuyActions.Clear,
})

export const getQuote = (receiving: Currency, maxPrices: Currency[]) => (
  dispatch: Dispatch,
): GetQuoteAction => {
  return dispatch({
    type: BondBuyActions.GetQuote,
    payload: Axios.get(
      `${
        process.env.REACT_APP_GAIA_URL
      }/bonds/U7GK8p8rVhJMKhBVRCJJ8c/buy_price/${
        //${receiving!.denom}
        receiving!.amount
      }`,
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
        maxPrices,
        actualPrices: response.data.prices,
        adjustedSupply: response.data.adjusted_supply,
        txFees: response.data.tx_fees,
        totalPrices: response.data.total_prices,
        totalFees: response.data.total_fees,
      }
    }),
  })
}

export const confirmBuy = () => (
  dispatch: Dispatch,
  getState: () => RootState,
): ConfirmBuyAction => {
  const {
    activeQuote,
    account: {
      address,
      userInfo: {
        didDoc: { pubKey },
      },
    },
  } = getState()

  const quoteBuyPayload: BondBuy = {
    address,
    receiving: activeQuote.receiving!,
    txFees: activeQuote.txFees!,
    maxPrices: activeQuote.maxPrices!,
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
