import { QuoteAction, Quote, QuoteActions } from '../../model/quote'
import { AsyncAction } from 'redux-promise-middleware'
import Axios from 'axios'
import { Currency } from '../../model'
import { currencyStr } from '../../model/account'
import { Bond } from '../../model/bond'
import KeystationService from '../../service/KeystationService'
import { toast } from 'react-toastify'
const ks = new KeystationService()

export function clearQuote(): QuoteAction {
  return {
    type: QuoteActions.CLEAR_QUOTE,
  }
}

// BUYING

export const quoteBuy = (quote: Quote): AsyncAction => {
  return {
    type: QuoteActions.QUOTE_BUY,
    payload: Axios.get(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
        '/bonds/' +
        quote.recieving!.denom +
        '/buy_price/' +
        quote.recieving!.amount,
    ).then(response => {
      return { quote: quote, result: response.data.result }
    }),
  }
}

export const confirmBuy = (
  quote: Quote,
  bond: Bond,
  address: string,
): AsyncAction => {
  const maxPrices = quote
    .maxPrices!.map((maxPrice: Currency) => currencyStr(maxPrice))
    .join(',')

  const payload = {
    base_req: {
      from: address,
      chain_id: process.env.REACT_APP_CHAIN_ID,
    },
    bond_token: bond.symbol,
    bond_amount: quote.recieving!.amount,
    max_prices: maxPrices,
  }

  return {
    type: QuoteActions.CONFIRM_QUOTE,
    payload: Axios.post(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/bonds/buy',
      JSON.stringify(payload),
    ).then(response => {
      return (ks.signBuyTx(quote, response, address) as Promise<any>).then(
        response => {
          console.log(response)
          if (!response.logs) {
            toast(JSON.parse(response.raw_log).message, {
              position: toast.POSITION.BOTTOM_LEFT,
            })
            return false
          } else {
            toast(
              'Transaction submitted. Check its status in the orders tab.',
              { position: toast.POSITION.BOTTOM_LEFT },
            )
            return true
          }
        },
      )
    }),
  }
}

// SELLING

export const quoteSell = (quote: Quote): AsyncAction => {
  return {
    type: QuoteActions.QUOTE_SELL,
    payload: Axios.get(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
        '/bonds/' +
        quote.sending!.denom +
        '/sell_return/' +
        quote.sending!.amount,
    ).then(response => {
      return { quote: quote, result: response.data.result }
    }),
  }
}

export const confirmSell = (
  quote: Quote,
  bond: Bond,
  address: string,
): AsyncAction => {
  const minPrices = quote
    .minPrices!.map((minPrice: Currency) => currencyStr(minPrice))
    .join(',')

  const payload = {
    base_req: {
      from: address,
      chain_id: process.env.REACT_APP_CHAIN_ID,
    },
    bond_token: bond.symbol,
    bond_amount: quote.recieving!.amount,
    min_prices: minPrices,
  }

  return {
    type: QuoteActions.CONFIRM_QUOTE,
    payload: Axios.post(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/bonds/sell',
      JSON.stringify(payload),
    ).then(response => {
      return (ks.signSellTx(quote, response, address) as Promise<any>).then(
        response => {
          console.log(response)
          if (!response.logs[0].success) {
            toast('Sale failed. Please try again.', {
              position: toast.POSITION.BOTTOM_LEFT,
            })
            return false
          } else {
            toast(
              'Transaction submitted. Check its status in the orders tab.',
              { position: toast.POSITION.BOTTOM_LEFT },
            )
            return true
          }

          console.log('signed?', response)
        },
      )
    }),
  }
}

// SWAPPING

export const quoteSwap = (quote: Quote): AsyncAction => {
  return {
    type: QuoteActions.QUOTE_SWAP,
    payload: Axios.get(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
        '/bonds/' +
        quote.bondToken +
        '/swap_return/' +
        currencyStr(quote.sending!) +
        '/' +
        quote.recieving!.denom,
    ).then(response => {
      return { quote: quote, result: response.data.result }
    }),
  }
}

export const confirmSwap = (
  quote: Quote,
  bond: Bond,
  address: string,
): AsyncAction => {
  const payload = {
    base_req: {
      from: address,
      chain_id: process.env.REACT_APP_CHAIN_ID,
    },
    from_token: quote.sending!.denom,
    to_token: quote.recieving!.denom,
    from_amount: quote.recieving!.amount,
  }
  return {
    type: QuoteActions.CONFIRM_QUOTE,
    payload: Axios.post(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/bonds/swap',
      JSON.stringify(payload),
    ).then(response => {
      return (ks.signSwapTx(quote, response, address) as Promise<any>).then(
        response => {
          console.log(response)
          if (!response.logs[0].success) {
            toast('Trade failed. Please try again.', {
              position: toast.POSITION.BOTTOM_LEFT,
            })
            return false
          } else {
            toast(
              'Transaction submitted. Check its status in the orders tab.',
              { position: toast.POSITION.BOTTOM_LEFT },
            )
            return true
          }
          console.log('signed?', response)
        },
      )
    }),
  }
}
