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
import {
  apiCurrencyToCurrency,
  currencyToApiCurrency,
} from '../Account/Account.utils'

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
        actualPrice: apiCurrencyToCurrency(response.data.prices[0]),
        txFees: response.data.tx_fees.map(txFee =>
          apiCurrencyToCurrency(txFee),
        ),
        totalPrice: apiCurrencyToCurrency(response.data.total_prices[0]),
        totalFee: apiCurrencyToCurrency(response.data.total_fees[0]),
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
    amount: currencyToApiCurrency(amount),
    max_prices: [currencyToApiCurrency(maxPrice)],
  }

  console.log(JSON.stringify(tx))

  keysafe.requestSigning(JSON.stringify(tx), (error, signature) => {
    if (error) {
      return null
    }

    return dispatch({
      type: BondBuyActions.ConfirmBuy,
      payload: Axios.post(
        `${process.env.REACT_APP_GAIA_URL}/txs`,
        JSON.stringify(
          transactionUtils.generateTx('bonds/MsgBuy', tx, signature),
        ),
      )
        .then(response => {
          if (!response.data.logs[0].success) {
            Toast.errorToast('Sale failed. Please try again.')
          } else {
            Toast.successToast(
              'Transaction submitted. Check its status in the orders tab.',
            )
          }
        })
        .catch(error => {
          Toast.errorToast(`Error: ${error.message}`)
        }),
    })
  })

  return null
}

export const clear = (): ClearAction => ({
  type: BondBuyActions.Clear,
})
