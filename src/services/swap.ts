import { TxResponse } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/abci/v1beta1/abci'

import { TRX_FEE, TRX_FEE_OPTION } from 'types/transactions'

export const defaultTrxFeeOption: TRX_FEE_OPTION = 'average'

export const defaultTrxFee: TRX_FEE = {
  amount: [{ amount: String(5000), denom: 'uixo' }],
  gas: String(300000),
}

export const getValueFromTrxEvents = (trxRes: TxResponse, event: string, attribute: string, messageIndex = 0) =>
  JSON.parse(trxRes?.rawLog!)
    [messageIndex]['events'].find((e: any) => e.type === event)
    ['attributes'].find((e: any) => e.key === attribute)['value']
