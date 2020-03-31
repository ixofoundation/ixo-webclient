import {
  ClearAction,
  SellAction,
  BuyAction,
  ConfirmAction,
  SwapAction,
  QuoteActions,
  QuoteBuy,
  QuoteSell,
  QuoteSwap,
} from './types'
import Axios from 'axios'
import { Currency } from '../../types/models'
import { currencyStr } from '../account/account.utils'
import { toast } from 'react-toastify'
import { Dispatch } from 'redux'
import { RootState } from 'src/common/redux/types'
import * as signingUtils from './quote.signingUtils'
import keysafe from '../../common/keysafe/keysafe'

export const clear = (): ClearAction => {
  return {
    type: QuoteActions.Clear,
  }
}

export const buy = (
  sending: Currency,
  receiving: Currency,
  maxPrices: Currency[],
) => (dispatch: Dispatch): BuyAction => {
  return dispatch({
    type: QuoteActions.Buy,
    payload: Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/bonds/${receiving!.denom}/buy_price/${
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
        sending,
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
): ConfirmAction => {
  const {
    activeQuote,
    activeBond: { symbol },
    account: {
      address,
      userInfo: {
        didDoc: { pubKey },
      },
    },
  } = getState()

  const quoteBuyPayload: QuoteBuy = {
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
        type: QuoteActions.Confirm,
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

export const sell = (sending: Currency, minPrices: Currency[]) => (
  dispatch: Dispatch,
): SellAction => {
  return dispatch({
    type: QuoteActions.Sell,
    payload: Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/bonds/${sending!.denom}/sell_return/${
        sending!.amount
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
        minPrices,
        receiving: response.data.returns[0],
        txFees: response.data.tx_fees,
        totalFees: response.data.total_fees,
      }
    }),
  })
}

export const confirmSell = () => (
  dispatch: Dispatch,
  getState: () => RootState,
): ConfirmAction => {
  const {
    activeQuote,
    activeBond: { symbol },
    account: {
      address,
      userInfo: {
        didDoc: { pubKey },
      },
    },
  } = getState()

  const quoteSellPayload: QuoteSell = {
    address,
    sending: activeQuote.sending!,
    txFees: activeQuote.txFees!,
  }

  keysafe.requestSigning(
    JSON.stringify(quoteSellPayload),
    (error, signature) => {
      if (error) {
        return null
      }

      return dispatch({
        type: QuoteActions.Confirm,
        payload: Axios.post(
          `${process.env.REACT_APP_GAIA_URL}/bonds/sell`,
          JSON.stringify({
            base_req: {
              from: address,
              chain_id: process.env.REACT_APP_CHAIN_ID,
            },
            bond_token: symbol,
            bond_amount: activeQuote.receiving!.amount,
            min_prices: activeQuote
              .minPrices!.map((minPrice: Currency) =>
                currencyStr(minPrice, false),
              )
              .join(','),
          }),
        ).then(() => {
          Axios.post(
            `${process.env.REACT_APP_GAIA_URL}/txs`,
            JSON.stringify(
              signingUtils.signSellTx(quoteSellPayload, signature, pubKey),
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
          })
        }),
      })
    },
  )

  return null
}

export const swap = (sending: Currency, receiving: Currency) => (
  dispatch: Dispatch,
  getState: () => RootState,
): SwapAction => {
  const symbol = getState().activeBond.symbol

  return dispatch({
    type: QuoteActions.Swap,
    payload: Axios.get(
      `${
        process.env.REACT_APP_GAIA_URL
      }/bonds/${symbol}/swap_return/${currencyStr(sending!, false)}/${
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
        receiving: response.data.total_returns[0],
        totalFees: response.data.total_fees,
      }
    }),
  })
}

export const confirmSwap = () => (
  dispatch: Dispatch,
  getState: () => RootState,
): ConfirmAction => {
  const {
    activeQuote,
    account: {
      address,
      userInfo: {
        didDoc: { pubKey },
      },
    },
  } = getState()

  const quoteSwapPayload: QuoteSwap = {
    address,
    bondToken: activeQuote.bondToken!,
    sending: activeQuote.sending!,
    receiving: activeQuote.receiving!,
    txFees: activeQuote.txFees!,
  }

  keysafe.requestSigning(
    JSON.stringify(quoteSwapPayload),
    (error, signature) => {
      if (error) {
        return null
      }

      return dispatch({
        type: QuoteActions.Confirm,
        payload: Axios.post(
          `${process.env.REACT_APP_GAIA_URL}/bonds/swap`,
          JSON.stringify({
            base_req: {
              from: address,
              chain_id: process.env.REACT_APP_CHAIN_ID,
            },
            from_token: activeQuote.sending!.denom,
            to_token: activeQuote.receiving!.denom,
            from_amount: activeQuote.receiving!.amount,
          }),
        ).then(() => {
          Axios.post(
            `${process.env.REACT_APP_GAIA_URL}/txs`,
            JSON.stringify(
              signingUtils.signSellTx(quoteSwapPayload, signature, pubKey),
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
          })
        }),
      })
    },
  )

  return null
}
