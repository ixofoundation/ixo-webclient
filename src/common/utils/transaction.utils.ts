export interface Transaction {
  mode: string
  tx: string
}

export const generateTx = (
  type: string,
  value: any,
  signature: any,
  fee: any,
): Transaction => {
  const ledger = {
    payload: [{ type, value }],
    signatures: [
      {
        signatureValue: Buffer.from(signature.signatureValue, 'hex').toString(
          'base64',
        ),
        created: signature.created,
      },
    ],
    fee: fee,
  }

  return {
    mode: 'block',
    tx: new Buffer(JSON.stringify(ledger)).toString('hex').toUpperCase(),
  }
}
