import { DecCoin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { TokenAsset } from '@ixo/impactxclient-sdk/types/custom_queries/currency.types'
import { ChainInfo, Keplr } from '@keplr-wallet/types'
import WalletConnect from '@walletconnect/client'
import { OfflineSigner } from '@cosmjs/proto-signing'

export type CURRENCY = DecCoin

export type CURRENCY_TOKEN = {
  token?: TokenAsset
  ibc?: boolean
  chain?: string
  batches?: Map<string, string>
} & CURRENCY

export enum WalletType {
  Leap = 'leap',
  Keplr = 'keplr',
  KeplrMobile = 'keplr_mobile',
  Google = 'google',
  Apple = 'apple',
  Discord = 'discord',
  Twitter = 'twitter',
  WalletConnect = 'wc',
  ImpactXMobile = 'impactx_mobile',
}
export interface IKeplrWalletConnectV1 extends Keplr {
  dontOpenAppOnEnable: boolean
}
export declare type WalletClient = Pick<
  Keplr,
  'enable' | 'getOfflineSigner' | 'getOfflineSignerAuto' | 'getOfflineSignerOnlyAmino'
> &
  Partial<Pick<Keplr, 'mode' | 'experimentalSuggestChain'>> & {
    getKey: (chainId: string) => Promise<{
      name: string
      algo: string
      pubKey: Uint8Array
      address: Uint8Array
      bech32Address: string
    }>
    disconnect?: () => Promise<void>
  }
export interface Wallet {
  type: WalletType
  name: string
  description: string
  imageUrl: string
  getClient: (
    chainInfo: ChainInfo,
    walletConnect?: WalletConnect,
    options?: Record<string, any>,
  ) => Promise<WalletClient | undefined>
  getOfflineSignerFunction: (client: WalletClient) => (chainId: string) => OfflineSigner | Promise<OfflineSigner>
  shouldForceConnect?: () => Promise<boolean>
  windowKeystoreRefreshEvent?: string
}
export interface ConnectedWallet {
  wallet: Wallet
  walletClient: WalletClient
  chainInfo: ChainInfo
  offlineSigner: OfflineSigner
  name: string
  address: string
  did: string
  publicKey:
    | {
        data: Uint8Array
        hex: string
      }
    | Uint8Array
}
