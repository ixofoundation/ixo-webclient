import {
  ClearAction,
  GetQuoteAction,
  ConfirmBuyAction,
  BondBuyActions,
  InitiateQuoteAction,
  BondBuyTx,
} from './types'
import Axios from 'axios'
import { Currency } from '../../types/models'
import { Dispatch } from 'redux'
import { RootState } from 'src/common/redux/types'
import * as transactionUtils from '../../common/utils/transaction.utils'
import keysafe from '../../common/keysafe/keysafe'
import * as Toast from '../../common/utils/Toast'

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
    activeBond: { bondDid },
    bondBuy: { receiving: amount, maxPrice },
    account: {
      userInfo: {
        didDoc: { did, pubKey },
      },
    },
  } = getState()

  const tx: BondBuyTx = {
    pub_key: pubKey,
    buyer_did: did,
    bond_did: bondDid,
    amount,
    max_prices: [maxPrice],
  }

  keysafe.requestSigning(JSON.stringify(tx), (error, signature) => {
    if (error) {
      return null
    }

    return dispatch({
      type: BondBuyActions.ConfirmBuy,
      payload: Axios.post(
        `${process.env.REACT_APP_GAIA_URL}/txs`,
        JSON.stringify(
          transactionUtils.generateTx('cosmos-sdk/MsgBuy', tx, signature),
        ),
      ).then(response => {
        if (!response.data.logs[0].success) {
          Toast.errorToast('Sale failed. Please try again.')
        } else {
          Toast.successToast(
            'Transaction submitted. Check its status in the orders tab.',
          )
        }
      }),
    })
  })

  return null
}

export const clear = (): ClearAction => ({
  type: BondBuyActions.Clear,
})
