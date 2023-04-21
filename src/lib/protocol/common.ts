import { StdFee } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/amino'

export const RPC_ENDPOINT = process.env.REACT_APP_RPC_URL

export type KeyTypes = 'ed' | 'secp'

export interface TSigner {
  address: string
  did: string
  pubKey: Uint8Array
  keyType: KeyTypes
}

export const fee: StdFee = {
  amount: [
    {
      denom: 'uixo',
      amount: '100000',
    },
  ],
  gas: '3000000',
}
