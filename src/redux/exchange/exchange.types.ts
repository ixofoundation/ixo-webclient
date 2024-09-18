import BigNumber from 'bignumber.js'

export interface ExchangeState {
  balances: Record<string, string>
  chainId: string | undefined
  tokenBalances: any[]
  inputAsset: ExchangeAsset
  outputAsset: ExchangeAsset
  settings: ExchangeSettings
}

export type ExchangeSettings = {
  slippage: number
}

export type ExchangeAsset = {
  amount: BigNumber
  entity: any
  balance: any
  asset: any
  batches?: any
  minimumOutputAmount?: BigNumber
  usdAmount?: BigNumber
}

export enum ExchangeActions {
  SetBalances = 'ixo/Exchange/SET_BALANCES',
  SetInputAssetUSDAmount = 'ixo/Exchange/SET_INPUT_ASSET_USD_AMOUNT',
  SetOutputAssetUSDAmount = 'ixo/Exchange/SET_OUTPUT_ASSET_USD_AMOUNT',
  SetInputAssetEntity = 'ixo/Exchange/SET_INPUT_ASSET_ENTITY',
  SetOutputAssetEntity = 'ixo/Exchange/SET_OUTPUT_ASSET_ENTITY',
  SetSlippage = 'ixo/Exchange/SET_SLIPPAGE',
  SetTokenBalances = 'ixo/Exchange/SET_TOKEN_BALANCES',
  SetInputAsset = 'ixo/Exchange/SetInputAsset',
  SetOutputAsset = 'ixo/Exchange/SetOutputAsset',
  SetInputAssetAmount = 'ixo/Exchange/SetInputAssetAmount',
  ResetState = 'ixo/Exchange/ResetState',
}

export interface SetBalancesAction {
  type: typeof ExchangeActions.SetBalances
  payload: Record<string, string>
}

export interface SetInputAssetUSDAmountAction {
  type: typeof ExchangeActions.SetInputAssetUSDAmount
  payload: BigNumber
}
export interface SetOutputAssetUSDAmountAction {
  type: typeof ExchangeActions.SetOutputAssetUSDAmount
  payload: BigNumber
}
export interface SetInputAssetEntityAction {
  type: typeof ExchangeActions.SetInputAssetEntity
  payload: any
}
export interface SetOutputAssetEntityAction {
  type: typeof ExchangeActions.SetOutputAssetEntity
  payload: any
}
export interface SetSlippageAction {
  type: typeof ExchangeActions.SetSlippage
  payload: number
}
export interface SetTokenBalancesAction {
  type: typeof ExchangeActions.SetTokenBalances
  payload: any
}
export interface SetInputAssetAction {
  type: typeof ExchangeActions.SetInputAsset
  payload: any
}

export interface SetOutputAssetAction {
  type: typeof ExchangeActions.SetOutputAsset
  payload: any
}

export interface SetInputAssetAmountAction {
  type: typeof ExchangeActions.SetInputAssetAmount
  payload: BigNumber
}

export interface ResetStateAction {
  type: typeof ExchangeActions.ResetState
}

export type ExchangeActionTypes =
  | SetBalancesAction
  | SetInputAssetUSDAmountAction
  | SetOutputAssetUSDAmountAction
  | SetInputAssetEntityAction
  | SetOutputAssetEntityAction
  | SetSlippageAction
  | SetTokenBalancesAction
  | SetInputAssetAction
  | SetOutputAssetAction
  | SetInputAssetAmountAction
  | ResetStateAction
