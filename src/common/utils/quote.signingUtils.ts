import { BondBuy } from '../../modules/BondBuy/types'
import { BondSell } from '../../modules/BondSell/types'
import { BondSwap } from '../../modules/BondSwap/types'
import { Currency } from '../../types/models'

interface SignedTxInput {
  msgs: [
    {
      type: string
      value: any
    },
  ]
  fee: { amount: Currency[]; gas: string }
  memo: ''
}

interface SignedTx {
  tx: {
    msg: [
      {
        type: string
        value: any
      },
    ]
    fee: { amount: Currency[]; gas: string }
    signatures: [
      {
        signature: string
        pub_key: {
          type: string
          value: string
        }
      },
    ]
    memo: string
  }
  mode: 'sync'
}

export const sign = (
  input: SignedTxInput,
  signature: any,
  pubKey: string,
): SignedTx => {
  const signatureBase64 = Buffer.from(signature, 'binary').toString('base64')
  const pubKeyBase64 = Buffer.from(pubKey, 'binary').toString('base64')

  const signedTx: SignedTx = {
    tx: {
      msg: input.msgs,
      fee: input.fee,
      signatures: [
        {
          signature: signatureBase64,
          pub_key: {
            type: 'tendermint/PubKeySecp256k1',
            value: pubKeyBase64,
          },
        },
      ],
      memo: input.memo,
    },
    mode: 'sync',
  }

  return signedTx
}

export const signBuyTx = (
  quote: BondBuy,
  signature: any,
  pubKey: string,
): SignedTx => {
  const input: SignedTxInput = {
    msgs: [
      {
        type: 'cosmos-sdk/MsgBuy',
        value: {
          buyer: quote.address,
          amount: {
            amount: quote.receiving.amount,
            denom: quote.receiving.denom,
          },
          max_prices: quote.maxPrices,
        },
      },
    ],
    fee: { amount: quote.txFees, gas: String(200000) },
    memo: '',
  }

  return sign(input, signature, pubKey)
}

export const signSellTx = (
  quote: BondSell,
  signature: any,
  pubKey: string,
): SignedTx => {
  const input: SignedTxInput = {
    msgs: [
      {
        type: 'cosmos-sdk/MsgSell',
        value: {
          seller: quote.address,
          amount: {
            amount: quote.sending.amount,
            denom: quote.sending.denom,
          },
        },
      },
    ],
    fee: { amount: quote.txFees, gas: String(200000) },
    memo: '',
  }

  return sign(input, signature, pubKey)
}

export const signSwapTx = (
  quote: BondSwap,
  signature: any,
  pubKey: string,
): SignedTx => {
  const input: SignedTxInput = {
    msgs: [
      {
        type: 'cosmos-sdk/MsgSwap',
        value: {
          swapper: quote.address,
          bond_token: quote.bondToken,
          from: quote.sending,
          to_token: quote.receiving.denom,
        },
      },
    ],
    fee: { amount: quote.txFees, gas: String(200000) },
    memo: '',
  }

  return sign(input, signature, pubKey)
}
