import bs58 from 'bs58'

export interface Transaction {
  mode: string
  tx: any
}

export const generateTx = (type: string, value: any, signature: any, fee: any): Transaction => {
  const tx = {
    msg: [{ type, value }],
    signatures: [
      {
        signature: signature.signatureValue, // expected to be base64 encoded
        pub_key: {
          type: 'tendermint/PubKeyEd25519',
          // @ts-ignore
          value: bs58.decode(signature.publicKey).toString('base64'),
        },
      },
    ],
    fee: fee,
    // memo: "this is an optional memo",
  }
  return {
    mode: 'block',
    tx,
  }
}
