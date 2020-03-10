import {
  ClearAction,
  SellAction,
  BuyAction,
  ConfirmAction,
  SwapAction,
  QuoteActions,
} from './types'
import Axios from 'axios'
import { Currency } from '../../types/models'
import { currencyStr } from '../account/account.utils'
import KeystationService from '../../service/KeystationService'
import { toast } from 'react-toastify'
import { Dispatch } from 'redux'
import { RootState } from 'src/common/redux/types'
const ks = new KeystationService()

export const clear = (): ClearAction => {
  return {
    type: QuoteActions.Clear,
  }
}

// BUYING

export const buy = (
  sending: Currency,
  receiving: Currency,
  maxPrices: Currency[],
) => (dispatch: Dispatch): BuyAction => {
  return dispatch({
    type: QuoteActions.Buy,
    payload: Axios.get(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
        '/bonds/' +
        receiving!.denom +
        '/buy_price/' +
        receiving!.amount,
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
    account: { address },
  } = getState()

  const maxPrices = activeQuote
    .maxPrices!.map((maxPrice: Currency) => currencyStr(maxPrice, false))
    .join(',')

  const payload = {
    base_req: {
      from: address,
      chain_id: process.env.REACT_APP_CHAIN_ID,
    },
    bond_token: symbol,
    bond_amount: activeQuote.receiving!.amount,
    max_prices: maxPrices,
  }

  return dispatch({
    type: QuoteActions.Confirm,
    payload: Axios.post(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/bonds/buy',
      JSON.stringify(payload),
    ).then(response => {
      return (ks.signBuyTx(activeQuote, response, address) as Promise<
        any
      >).then(response => {
        if (!response.logs) {
          toast(JSON.parse(response.raw_log).message, {
            position: toast.POSITION.BOTTOM_LEFT,
          })
        } else {
          toast('Transaction submitted. Check its status in the orders tab.', {
            position: toast.POSITION.BOTTOM_LEFT,
          })
        }
      })
    }),
  })
}

// SELLING

export const sell = (sending: Currency, minPrices: Currency[]) => (
  dispatch: Dispatch,
): SellAction => {
  return dispatch({
    type: QuoteActions.Sell,
    payload: Axios.get(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
        '/bonds/' +
        sending!.denom +
        '/sell_return/' +
        sending!.amount,
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
    account: { address },
  } = getState()

  const minPrices = activeQuote
    .minPrices!.map((minPrice: Currency) => currencyStr(minPrice, false))
    .join(',')

  const payload = {
    base_req: {
      from: address,
      chain_id: process.env.REACT_APP_CHAIN_ID,
    },
    bond_token: symbol,
    bond_amount: activeQuote.receiving!.amount,
    min_prices: minPrices,
  }

  return dispatch({
    type: QuoteActions.Confirm,
    payload: Axios.post(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/bonds/sell',
      JSON.stringify(payload),
    ).then(response => {
      return (ks.signSellTx(activeQuote, response, address) as Promise<
        any
      >).then(response => {
        if (!response.logs[0].success) {
          toast('Sale failed. Please try again.', {
            position: toast.POSITION.BOTTOM_LEFT,
          })
        } else {
          toast('Transaction submitted. Check its status in the orders tab.', {
            position: toast.POSITION.BOTTOM_LEFT,
          })
        }
      })
    }),
  })
}

// SWAPPING

export const swap = (sending: Currency, receiving: Currency) => (
  dispatch: Dispatch,
  getState: () => RootState,
): SwapAction => {
  const symbol = getState().activeBond.symbol

  return dispatch({
    type: QuoteActions.Swap,
    payload: Axios.get(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
        '/bonds/' +
        symbol +
        '/swap_return/' +
        currencyStr(sending!, false) +
        '/' +
        receiving!.denom,
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
    account: { address },
  } = getState()

  const payload = {
    base_req: {
      from: address,
      chain_id: process.env.REACT_APP_CHAIN_ID,
    },
    from_token: activeQuote.sending!.denom,
    to_token: activeQuote.receiving!.denom,
    from_amount: activeQuote.receiving!.amount,
  }
  return dispatch({
    type: QuoteActions.Confirm,
    payload: Axios.post(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/bonds/swap',
      JSON.stringify(payload),
    ).then(response => {
      return (ks.signSwapTx(activeQuote, response, address) as Promise<
        any
      >).then(response => {
        if (!response.logs[0].success) {
          toast('Trade failed. Please try again.', {
            position: toast.POSITION.BOTTOM_LEFT,
          })
        } else {
          toast('Transaction submitted. Check its status in the orders tab.', {
            position: toast.POSITION.BOTTOM_LEFT,
          })
        }
      })
    }),
  })
}
