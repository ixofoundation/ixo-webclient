import {
  ClearAction,
  GetQuoteAction,
  ConfirmBuyAction,
  BondBuyActions,
  // BondBuy,
  InitiateQuoteAction,
} from './types'
import Axios from 'axios'
import { Currency } from '../../types/models'
import { toast } from 'react-toastify'
import { Dispatch } from 'redux'
import { RootState } from 'src/common/redux/types'
// import * as signingUtils from '../../common/utils/quote.signingUtils'
import keysafe from '../../common/keysafe/keysafe'

const generateBuyJson = (
  sendDetails: any,
  signature: string,
  created: any,
): string => {
  return JSON.stringify({
    payload: [{ type: 'cosmos-sdk/MsgBuy', value: sendDetails }],
    signatures: [{ signatureValue: signature, created: created }],
  })
}

const buy = (data: any, signature: any): any => {
  const { signatureValue, created } = signature
  const ledgerObjectJson = generateBuyJson(data, signatureValue, created)
  const ledgerObjectUppercaseHex = new Buffer(ledgerObjectJson)
    .toString('hex')
    .toUpperCase()
  const broadcastFormat = {
    mode: 'block',
    tx: ledgerObjectUppercaseHex,
  }
  return broadcastFormat
}

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
    bondBuy: { receiving, maxPrice }, //txFees,
    account: {
      userInfo: {
        didDoc: { did, pubKey },
      },
    },
  } = getState()

  const bondBuyPayload = {
    pub_key: pubKey,
    buyer_did: did,
    bond_did: bondDid,
    amount: receiving,
    max_prices: [{ amount: maxPrice.amount, denom: maxPrice.denom }],
  }

  keysafe.requestSigning(JSON.stringify(bondBuyPayload), (error, signature) => {
    if (error) {
      return null
    }

    const buyJson = buy(bondBuyPayload, signature)

    console.log(JSON.stringify(buyJson))

    return dispatch({
      type: BondBuyActions.ConfirmBuy,
      payload: Axios.post(
        `${process.env.REACT_APP_GAIA_URL}/txs`,
        JSON.stringify(buyJson),
      ).then(response => {
        console.log(JSON.stringify(response))
        if (!response.data.logs[0].success) {
          toast('Sale failed. Please try again.', {
            position: toast.POSITION.BOTTOM_LEFT,
          })
        } else {
          toast('Transaction submitted. Check its status in the orders tab.', {
            position: toast.POSITION.BOTTOM_LEFT,
          })
        }
      }),
    })
  })

  return null
}

export const clear = (): ClearAction => ({
  type: BondBuyActions.Clear,
})
