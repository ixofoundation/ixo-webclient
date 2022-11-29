import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { BondStateType } from 'redux/bond/bond.types'

export interface AssetType {
  symbol: string //  IXO
  base: string //  uxio
  display: string //  ixo
  description: string
  entityId: string
  assetType: 'coin' | 'bond' | 'nft' // elses would come up
  denomUnits: {
    denom: string
    exponent: number
    aliases: string[]
  }[]
  logoURIs: {
    png: string
    svg: string
    zlottie: string
  }
  isStakeCurrency: boolean
  isFeeCurrency: boolean
  isBondToken: boolean
  coingeckoId: string
}

export interface AssetListConfig {
  chainId: string
  assets: AssetType[]
}

export interface CurrencyInfo {
  coinDenom: string
  coinMinimalDenom: string
  coinDecimals: number
  coinGeckoId: string
  coinImageUrl?: string
}

interface Bech32Config {
  bech32PrefixAccAddr: string
  bech32PrefixAccPub: string
  bech32PrefixValAddr: string
  bech32PrefixValPub: string
  bech32PrefixConsAddr: string
  bech32PrefixConsPub: string
}

export interface PaymentCoins {
  coinDenom: string
  coinMinimalDenom: string
  coinDecimals: number
  coinGeckoId: string
  coinImageUrl: string
  counterpartyChainId: string
  sourceChannelId: string
  destChannelId: string
}

export interface ChainInfo {
  rpc: string
  rest: string
  chainId: string
  chainName: string
  stakeCurrency: CurrencyInfo
  bip44: {
    coinType: number
  }
  bech32Config: Bech32Config
  currencies: CurrencyInfo[]
  feeCurrencies: CurrencyInfo[]
  features: string[]
  paymentCoins: PaymentCoins[]
}

export interface RelayerInfo extends ChainInfo {
  name: string
  blocksync: string
  explorerUrlToTx: string
  displayName: string
}

export interface PoolCurrency {
  coinDenom: string //  IXO
  coinMinimalDenom: string //  uixo
  coinDecimals: number //  6
  coinGeckoId: string //  pool:uixo
  coinImageUrl: string //  assets/tokens/ixo.svg
}
export interface PoolDetail {
  token: string //  xusdpool
  name: string //  xUSD Pool
  description: string //  IXO:XUSD Swapper
  creator_did: string //  did:sov:CYCc2xaJKrp8Yt947Nc6jd
  controller_did: string //  did:sov:CYCc2xaJKrp8Yt947Nc6jd
  function_type: string //  swapper_function
  function_parameters: string[] //  this wouldn't be used
  reserve_tokens: string[] //  ["uixo","xusd"]
  tx_fee_percentage: number //  0.300000
  exit_fee_percentage: number //  0.10000000
  fee_address: string //  ixo19h3lqj50uhzdrv8mkafnp55nqmz4ghc2sd3m48
  reserve_withdrawal_address: string //  ixo19h3lqj50uhzdrv8mkafnp55nqmz4ghc2sd3m48
  max_supply: {
    denom: string //  xusdpool
    amount: number //  10000000000
  }
  order_quantity_limits: {
    denom: string // uixo
    amount: number //  5000000000
  }[]
  sanity_rate: number //  0.500000000000000000
  sanity_margin_percentage: number //  20.000000000000000000
  current_supply: {
    denom: string //  xusdpool
    amount: number //  0
  } //  this wouldn't be used
  current_reserve: Coin[] //  this wouldn't be used
  available_reserve: Coin[] //  this wouldn't be used
  current_outcome_payment_reserve: string[] //  this wouldn't be used
  allow_sells: boolean // this wouldn't be used
  allow_reserve_withdrawals: boolean //  this wouldn't be used
  alpha_bond: boolean //  this wouldn't be used
  batch_blocks: number //  this wouldn't be used
  outcome_payment: number // this wouldn't be used
  state: BondStateType //  this wouldn't be used
  bond_did: string //  did:ixo:Pa9DmfutkxCvFNXrYPmbEz
}
export interface LiquidityPool {
  entityID: string // the investment entity in ixo project module
  poolID: string // the bondId in ixo bond module
  poolCurrency: PoolCurrency
  poolDetail: PoolDetail | null
}

export interface ExchangeConfig {
  tradingAllowed: boolean
  liquidityPools: LiquidityPool[]
}

export interface ConfigsState {
  assetListConfig: AssetListConfig[]
  relayersConfig: RelayerInfo[]
  exchangeConfig: ExchangeConfig
}

export enum ConfigsStateActions {
  GetAssetListConfig = 'ixo/configs/GET_ASSETLIST_CONFIG',
  GetAssetListConfigSuccess = 'ixo/configs/GET_ASSETLIST_CONFIG_FULFILLED',
  GetRelayersConfig = 'ixo/configs/GET_RELAYER_CONFIG',
  GetRelayersConfigSuccess = 'ixo/configs/GET_RELAYER_CONFIG_FULFILLED',
  GetExchangeConfig = 'ixo/configs/GET_EXCHANGE_CONFIG',
  GetExchangeConfigSuccess = 'ixo/configs/GET_EXCHANGE_CONFIG_FULFILLED',
}

export interface GetAssetListConfigAction {
  type: typeof ConfigsStateActions.GetAssetListConfig
  payload: Promise<AssetListConfig[]>
}
export interface GetAssetListConfigSuccessAction {
  type: typeof ConfigsStateActions.GetAssetListConfigSuccess
  payload: AssetListConfig[]
}

export interface GetRelayersConfigAction {
  type: typeof ConfigsStateActions.GetRelayersConfig
  payload: Promise<RelayerInfo[]>
}
export interface GetRelayersSuccessAction {
  type: typeof ConfigsStateActions.GetRelayersConfigSuccess
  payload: RelayerInfo[]
}

export interface GetExchangeConfigAction {
  type: typeof ConfigsStateActions.GetExchangeConfig
  payload: Promise<ExchangeConfig>
}
export interface GetExchangeSuccessAction {
  type: typeof ConfigsStateActions.GetExchangeConfigSuccess
  payload: ExchangeConfig
}

export type ConfigsStateActionTypes =
  | GetAssetListConfigAction
  | GetAssetListConfigSuccessAction
  | GetRelayersConfigAction
  | GetRelayersSuccessAction
  | GetExchangeConfigAction
  | GetExchangeSuccessAction
