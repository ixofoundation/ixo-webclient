import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { SigningStargateClient } from '@ixo/impactxclient-sdk'
import { SigningCosmWasmClient, CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { Cw20Token, NativeToken } from 'types/tokens'
import { ConnectedWallet, WalletType } from 'types/wallet'

export enum TransactionType {
  TRANSACTION_SEND = 'send',
  TRANSACTION_TRANSFER = 'transfer',
  TRANSACTION_DELEGATE = 'delegate',
  TRANSACTION_UNDELEGATE = 'undelegate',
  TRANSACTION_BUY = 'buy',
  TRANSACTION_SELL = 'sell',
  TRANSACTION_SWAP = 'swap',
  TRANSACTION_DRAWDOWN = 'drawdown',
  TRANSACTION_WITHDRAW = 'withdraw',
  TRANSACTION_PAY = 'pay',
  TRANSACTION_PAID = 'paid',
  TRANSACTION_REFUNDED = 'refunded',
}
export interface TransactionInfo {
  id: string
  txhash: string
  date: Date
  type: TransactionType
  quantity: number
  price: number
  asset: string
}
export interface KeplrWalletInfo {
  address: string
  offlineSigner: any
}

export interface CurrencyType {
  denom: string
  minimalDenom: string
  decimals: number
  imageUrl: string
}

export interface AccountState {
  // refinement
  selectedWallet: WalletType | undefined
  connectedWallet: ConnectedWallet | undefined
  name: string
  registered: boolean
  pubKey: string //  base64
  signingClient: SigningStargateClient // signingClient
  cosmWasmClient: SigningCosmWasmClient // signingClient
  cwClient: CosmWasmClient
  did: string
  address: string
  balances: Coin[]
  nativeTokens: { [denom: string]: NativeToken }
  cw20Tokens: { [addr: string]: Cw20Token }
}

export enum AgentRole {
  Owner = 'PO',
  Evaluator = 'EA',
  ServiceProvider = 'SA',
  Investor = 'IA',
}

export type AgentRoleStrategyMap = {
  [TKey in AgentRole]: {
    title: string
    plural: string
  }
}

export enum AccountActions {
  Connect = 'ixo/Account/CONNECT',
  Disconnect = 'ixo/Account/DISCONNECT',
  ChooseWallet = 'ixo/Account/CHOOSE_WALLET',
  UpdateName = 'ixo/Account/UPDATE_NAME',
  UpdateAddress = 'ixo/Account/UPDATE_ADDRESS',
  UpdateBalances = 'ixo/Account/UPDATE_BALANCES',
  UpdateNativeTokens = 'ixo/Account/UPDATE_NATIVE_BALANCES',
  UpdateCw20Tokens = 'ixo/Account/UPDATE_CW20_BALANCES',
  UpdateRegistered = 'ixo/Account/UPDATE_REGISTERED',
  UpdatePubKey = 'ixo/Account/UPDATE_PUBKEY',
  UpdateSigningClient = 'ixo/Account/UPDATE_SIGNING_CLIENT',
  UpdateCosmWasmClient = 'ixo/Account/UPDATE_COSMWASM_CLIENT',
  UpdateCWClient = 'ixo/Account/UPDATE_CW_CLIENT',
  UpdateDid = 'ixo/Account/UPDATE_DID',
}

export interface ConnectAction {
  type: typeof AccountActions.Connect
  payload: ConnectedWallet
}

export interface DisconnectAction {
  type: typeof AccountActions.Disconnect
}
export interface ChooseWalletAction {
  type: typeof AccountActions.ChooseWallet
  payload: WalletType | undefined
}
export interface UpdateNameAction {
  type: typeof AccountActions.UpdateName
  payload: string
}
export interface UpdateAddressAction {
  type: typeof AccountActions.UpdateAddress
  payload: string
}
export interface UpdateBalancesAction {
  type: typeof AccountActions.UpdateBalances
  payload: Coin[]
}
export interface UpdateNativeTokensAction {
  type: typeof AccountActions.UpdateNativeTokens
  payload: { [addr: string]: NativeToken }
}
export interface UpdateCw20TokensAction {
  type: typeof AccountActions.UpdateCw20Tokens
  payload: { [addr: string]: Cw20Token }
}
export interface UpdateRegisteredAction {
  type: typeof AccountActions.UpdateRegistered
  payload: boolean
}
export interface UpdatePubKeyAction {
  type: typeof AccountActions.UpdatePubKey
  payload: string
}
export interface UpdateSigningClientAction {
  type: typeof AccountActions.UpdateSigningClient
  payload: SigningStargateClient
}
export interface UpdateCosmWasmClientAction {
  type: typeof AccountActions.UpdateCosmWasmClient
  payload: SigningCosmWasmClient
}
export interface UpdateCWClientAction {
  type: typeof AccountActions.UpdateCWClient
  payload: CosmWasmClient
}
export interface UpdateDidAction {
  type: typeof AccountActions.UpdateDid
  payload: string
}

export type AccountActionTypes =
  | ConnectAction
  | DisconnectAction
  | ChooseWalletAction
  | UpdateNameAction
  | UpdateAddressAction
  | UpdateBalancesAction
  | UpdateNativeTokensAction
  | UpdateCw20TokensAction
  | UpdateRegisteredAction
  | UpdatePubKeyAction
  | UpdateSigningClientAction
  | UpdateCosmWasmClientAction
  | UpdateCWClientAction
  | UpdateDidAction
