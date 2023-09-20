import { DecCoin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { TokenAsset } from '@ixo/impactxclient-sdk/types/custom_queries/currency.types'

export type CURRENCY = DecCoin

export type CURRENCY_TOKEN = {
  token?: TokenAsset
  ibc?: boolean
  chain?: string
  batches?: Map<string, string>
} & CURRENCY
