export interface AssetType {
  symbol: string //  IXO
  base: string //  uxio
  display: string //  ixo
  description: string
  entityId: string
  assetType: string
  denomUnits: {
    denom: string
    exponent: number
    aliases: string[]
  }
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

export interface ConfigsState {
  assetListConfig: AssetListConfig[]
  relayersConfig: RelayerInfo[]
}

export enum ConfigsStateActions {
  GetAssetListConfig = 'ixo/configs/GET_ASSETLIST_CONFIG',
  GetAssetListConfigSuccess = 'ixo/configs/GET_ASSETLIST_CONFIG_FULFILLED',
  GetRelayersConfig = 'ixo/configs/GET_RELAYER_CONFIG',
  GetRelayersConfigSuccess = 'ixo/configs/GET_RELAYER_CONFIG_FULFILLED',
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

export type ConfigsStateActionTypes =
  | GetAssetListConfigAction
  | GetAssetListConfigSuccessAction
  | GetRelayersConfigAction
  | GetRelayersSuccessAction
