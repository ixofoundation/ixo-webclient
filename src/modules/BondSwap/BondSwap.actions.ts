import {
  ClearAction,
  GetQuoteAction,
  ConfirmSwapAction,
  BondSwapActions,
  BondSwap,
  InitiateQuoteAction,
} from './types'
import Axios from 'axios'
import { Currency } from '../../types/models'
import { currencyStr } from '../account/account.utils'
import { toast } from 'react-toastify'
import { Dispatch } from 'redux'
import { RootState } from 'src/common/redux/types'
import * as signingUtils from '../../common/utils/quote.signingUtils'
import keysafe from '../../common/keysafe/keysafe'

export const initiateQuote = (): InitiateQuoteAction => ({
  type: BondSwapActions.InitiateQuote,
})

export const getQuote = (sending: Currency, receiving: Currency) => (
  dispatch: Dispatch,
  getState: () => RootState,
): GetQuoteAction => {
  const {
    activeBond: { bondDid },
  } = getState()

  return dispatch({
    type: BondSwapActions.GetQuote,
    payload: Axios.get(
      `${
        process.env.REACT_APP_GAIA_URL
      }/bonds/${bondDid}/swap_return/${currencyStr(sending!, false)}/${
        receiving!.denom
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
        sending,
        receiving: response.data.total_returns[0],
        totalFee: response.data.total_fees[0],
        txFees: response.data.tx_fees,
      }
    }),
  })
}

export const confirmSwap = () => (
  dispatch: Dispatch,
  getState: () => RootState,
): ConfirmSwapAction => {
  const {
    activeBond: { symbol: bondToken },
    bondSwap: { sending, receiving, txFees },
    account: {
      address,
      userInfo: {
        didDoc: { pubKey },
      },
    },
  } = getState()

  const quoteSwapPayload: BondSwap = {
    address,
    bondToken,
    sending,
    receiving,
    txFees,
  }

  keysafe.requestSigning(
    JSON.stringify(quoteSwapPayload),
    (error, signature) => {
      if (error) {
        return null
      }

      return dispatch({
        type: BondSwapActions.ConfirmSwap,
        payload: Axios.post(
          `${process.env.REACT_APP_GAIA_URL}/txs`,
          JSON.stringify(
            signingUtils.signSwapTx(quoteSwapPayload, signature, pubKey),
          ),
        ).then(response => {
          if (!response.data.logs[0].success) {
            toast('Trade failed. Please try again.', {
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

export const clear = (): ClearAction => {
  return {
    type: BondSwapActions.Clear,
  }
}
