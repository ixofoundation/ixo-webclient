import { Currency } from '../../types/models'

export interface BuyPayload {
  pub_key: string
  buyer_did: string
  bond_did: string
  amount: Currency
  max_prices: Currency[]
}

export interface BondSellPayload {
  pub_key: string
  seller_did: string
  bond_did: string
  amount: Currency
}

export interface Transaction {
  mode: string
  tx: string
}

export const generateBuyTx = (
  buyPayload: BuyPayload,
  signature: any,
): Transaction => {
  const ledger = {
    payload: [
      {
        type: 'cosmos-sdk/MsgBuy',
        value: buyPayload,
      },
    ],
    signatures: [
      {
        signatureValue: Buffer.from(signature.signatureValue, 'hex').toString(
          'base64',
        ),
        created: signature.created,
      },
    ],
  }

  return {
    mode: 'block',
    tx: new Buffer(JSON.stringify(ledger)).toString('hex').toUpperCase(),
  }
}

export const generateSellTx = (
  sellPayload: BondSellPayload,
  signature: any,
): Transaction => {
  const ledger = {
    payload: [{ type: 'cosmos-sdk/MsgSell', value: sellPayload }],
    signatures: [
      {
        signatureValue: Buffer.from(signature.signatureValue, 'hex').toString(
          'base64',
        ),
        created: signature.created,
      },
    ],
  }

  return {
    mode: 'block',
    tx: new Buffer(JSON.stringify(ledger)).toString('hex').toUpperCase(),
  }
}
