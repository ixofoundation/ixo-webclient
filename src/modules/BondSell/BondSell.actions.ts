import {
  ClearAction,
  GetQuoteAction,
  ConfirmSellAction,
  BondSellActions,
  BondSell,
  InitiateQuoteAction,
} from './types'
import Axios from 'axios'
import { Currency } from '../../types/models'
import { toast } from 'react-toastify'
import { Dispatch } from 'redux'
import { RootState } from 'src/common/redux/types'
import * as signingUtils from '../../common/utils/quote.signingUtils'
import keysafe from '../../common/keysafe/keysafe'

export const initiateQuote = (): InitiateQuoteAction => ({
  type: BondSellActions.InitiateQuote,
})

export const getQuote = (sending: Currency, minPrice: Currency) => (
  dispatch: Dispatch,
  getState: () => RootState,
): GetQuoteAction => {
  const {
    activeBond: { bondDid },
  } = getState()
  return dispatch({
    type: BondSellActions.GetQuote,
    payload: Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/bonds/${bondDid}/sell_return/${sending.amount}`,
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
        minPrice,
        receiving: response.data.returns[0],
        txFees: response.data.tx_fees,
        totalFee: response.data.total_fees[0],
      }
    }),
  })
}

export const confirmSell = () => (
  dispatch: Dispatch,
  getState: () => RootState,
): ConfirmSellAction => {
  const {
    bondSell: { sending, txFees },
    account: {
      address,
      userInfo: {
        didDoc: { pubKey },
      },
    },
  } = getState()

  const bondSellPayload: BondSell = {
    address,
    sending,
    txFees,
  }

  keysafe.requestSigning(
    JSON.stringify(bondSellPayload),
    (error, signature) => {
      if (error) {
        return null
      }

      return dispatch({
        type: BondSellActions.ConfirmSell,
        payload: Axios.post(
          `${process.env.REACT_APP_GAIA_URL}/txs`,
          JSON.stringify(
            signingUtils.signSellTx(bondSellPayload, signature, pubKey),
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

export const clear = (): ClearAction => ({
  type: BondSellActions.Clear,
})
