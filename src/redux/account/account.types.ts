import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { SigningStargateClient } from '@ixo/impactxclient-sdk'
import { SigningCosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'

export interface DidDoc {
  did: string
  pubKey: string
  credentials?: unknown[]
}

export interface UserInfo {
  didDoc: DidDoc
  name: string
  ledgered: boolean
  loggedInKeysafe: boolean
  hasKYC: boolean
}

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

export enum WalletType {
  Keplr = 'keplr',
  Keysafe = 'keysafe',
}

export interface AccountState {
  userInfo: UserInfo
  address: string
  balances: Coin[]
  loginStatusCheckCompleted: boolean
  assistantToggled: boolean
  assistantFixed: boolean
  intent: string
  params: any
  accountNumber: string
  sequence: string
  transactions: TransactionInfo[]
  transactionsByAsset: {
    [asset: string]: TransactionInfo[]
  }[]
  usdRate: number
  marketChart: {
    prices: {
      date: Date
      price: number
    }[]
    market_caps: {
      date: Date
      caps: number
    }[]
    total_volumes: {
      date: Date
      volumes: number
    }[]
  }
  keplrWallet: KeplrWalletInfo
  // refinement
  selectedWallet: WalletType | undefined
  name: string
  registered: boolean
  pubKey: string //  base64
  signingClient: SigningStargateClient // signingClient
  cosmWasmClient: SigningCosmWasmClient // signingClient
  did: string
  chooseWalletOpen: boolean
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
  Login = 'ixo/Account/Login',
  Logout = 'ixo/Account/Logout',
  GetAccount = 'ixo/Account/GET_ACCOUNT',
  GetAccountSuccess = 'ixo/Account/GET_ACCOUNT_FULFILLED',
  GetAccountPending = 'ixo/Account/GET_ACCOUNT_PENDING',
  GetAccountFailure = 'ixo/Account/GET_ACCOUNT_REJECTED',
  GetTransactions = 'ixo/Account/GET_TRANSACTIONS',
  GetTransactionsSuccess = 'ixo/Account/GET_TRANSACTIONS_FULFILLED',
  GetTransactionsPending = 'ixo/Account/GET_TRANSACTIONS_PENDING',
  GetTransactionsFailure = 'ixo/Account/GET_TRANSACTIONS_REJECTED',
  GetTransactionsByAsset = 'ixo/Account/GET_TRANSACTIONSBYASSET',
  GetTransactionsByAssetSuccess = 'ixo/Account/GET_TRANSACTIONSBYASSET_FULFILLED',
  GetTransactionsByAssetPending = 'ixo/Account/GET_TRANSACTIONSBYASSET_PENDING',
  GetTransactionsByAssetFailure = 'ixo/Account/GET_TRANSACTIONSBYASSET_REJECTED',
  GetUSDRate = 'ixo/Account/GET_USDRATE',
  GetUSDRateSuccess = 'ixo/Account/GET_USDRATE_FULFILLED',
  GetUSDRatePending = 'ixo/Account/GET_USDRATE_PENDING',
  GetUSDRateFailure = 'ixo/Account/GET_USDRATE_REJECTED',
  GetMarketChart = 'ixo/Account/GET_MARKETCHART',
  GetMarketChartSuccess = 'ixo/Account/GET_MARKETCHART_FULFILLED',
  GetMarketChartPending = 'ixo/Account/GET_MARKETCHART_PENDING',
  GetMarketChartFailure = 'ixo/Account/GET_MARKETCHART_REJECTED',
  ToggleAssistant = 'ixo/Account/TOGGLE_ASSISTANT',
  SetKeplrWallet = 'ixo/Account/SET_KEPLR_WALLET',
  ChooseWallet = 'ixo/Account/CHOOSE_WALLET',
  UpdateName = 'ixo/Account/UPDATE_NAME',
  UpdateAddress = 'ixo/Account/UPDATE_ADDRESS',
  UpdateBalances = 'ixo/Account/UPDATE_BALANCES',
  UpdateRegistered = 'ixo/Account/UPDATE_REGISTERED',
  UpdatePubKey = 'ixo/Account/UPDATE_PUBKEY',
  UpdateSigningClient = 'ixo/Account/UPDATE_SIGNING_CLIENT',
  UpdateCosmWasmClient = 'ixo/Account/UPDATE_COSMWASM_CLIENT',
  UpdateDid = 'ixo/Account/UPDATE_DID',
  UpdateChooseWalletOpen = 'ixo/Account/UPDATE_CHOOSE_WALLET_OPEN',
}

export interface LoginAction {
  type: typeof AccountActions.Login
  payload: {
    userInfo: UserInfo
    address: string
    accountNumber: string
    sequence: string
  }
}

export interface LogoutAction {
  type: typeof AccountActions.Logout
}

export interface GetAccountAction {
  type: typeof AccountActions.GetAccount
  payload: Promise<any>
}

export interface GetAccountSuccessAction {
  type: typeof AccountActions.GetAccountSuccess
  payload: {
    balances: Coin[]
  }
}

export interface GetTransactionsAction {
  type: typeof AccountActions.GetTransactions
  payload: Promise<any>
}

export interface GetTransactionsSuccessAction {
  type: typeof AccountActions.GetTransactionsSuccess
  payload: TransactionInfo[]
}
export interface GetTransactionsByAssetAction {
  type: typeof AccountActions.GetTransactionsByAsset
  payload: Promise<any>
}

export interface GetTransactionsByAssetSuccessAction {
  type: typeof AccountActions.GetTransactionsByAssetSuccess
  payload: {
    [asset: string]: TransactionInfo[]
  }[]
}
export interface GetUSDRateAction {
  type: typeof AccountActions.GetUSDRate
  payload: Promise<number>
}
export interface GetUSDRateSuccessAction {
  type: typeof AccountActions.GetUSDRateSuccess
  payload: number
}
export interface GetMarketChartAction {
  type: typeof AccountActions.GetMarketChart
  payload: Promise<any>
}
export interface GetMarketChartSuccessAction {
  type: typeof AccountActions.GetMarketChartSuccess
  payload: any
}

export interface ToogleAssistantPayload {
  fixed?: boolean
  forceClose?: boolean
  forceOpen?: boolean
  intent?: string
  params?: any
}

export interface ToggleAssistantAction {
  type: typeof AccountActions.ToggleAssistant
  payload: ToogleAssistantPayload
}

export interface SetKeplrWalletAction {
  type: typeof AccountActions.SetKeplrWallet
  payload: KeplrWalletInfo
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
export interface UpdateDidAction {
  type: typeof AccountActions.UpdateDid
  payload: string
}
export interface UpdateChooseWalletOpenAction {
  type: typeof AccountActions.UpdateChooseWalletOpen
  payload: boolean
}

export type AccountActionTypes =
  | LoginAction
  | LogoutAction
  | GetAccountAction
  | GetAccountSuccessAction
  | GetTransactionsAction
  | GetTransactionsSuccessAction
  | GetTransactionsByAssetAction
  | GetTransactionsByAssetSuccessAction
  | GetUSDRateAction
  | GetUSDRateSuccessAction
  | GetMarketChartAction
  | GetMarketChartSuccessAction
  | ToggleAssistantAction
  | SetKeplrWalletAction
  | ChooseWalletAction
  | UpdateNameAction
  | UpdateAddressAction
  | UpdateBalancesAction
  | UpdateRegisteredAction
  | UpdatePubKeyAction
  | UpdateSigningClientAction
  | UpdateCosmWasmClientAction
  | UpdateDidAction
  | UpdateChooseWalletOpenAction
