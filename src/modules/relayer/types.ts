interface CurrencyInfo {
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
}

export enum RelayerActions {
  GetRelayers = 'ixo/Relayer/GET_RELAYER',
  GetRelayersPending = 'ixo/Relayer/GET_RELAYER_PENDING',
  GetRelayersSuccess = 'ixo/Relayer/GET_RELAYER_FULFILLED',
  GetRelayersFailure = 'ixo/Relayer/GET_RELAYER_REJECTED',
}

export interface GetRelayersAction {
  type: typeof RelayerActions.GetRelayers
  payload: Promise<any>
}

export interface GetRelayersPendingAction {
  type: typeof RelayerActions.GetRelayersPending
}

export interface GetRelayersSuccessAction {
  type: typeof RelayerActions.GetRelayersSuccess
  payload: RelayerInfo[]
}

export interface GetRelayersFailureAction {
  type: typeof RelayerActions.GetRelayersFailure
}

export type RelayerActionTypes =
  | GetRelayersAction
  | GetRelayersPendingAction
  | GetRelayersSuccessAction
  | GetRelayersFailureAction
