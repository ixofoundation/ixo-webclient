import { ValidatorInfo } from 'common/components/ValidatorSelector/ValidatorSelector'
import { LiquidityPool, PoolDetail } from 'states/configs/configs.types'
import { Currency } from 'types/models'

// Reducer state
export enum TradeMethodType {
  Swap = 'Swap',
  Purchase = 'Purchase',
  Sell = 'Sell',
  Auction = 'Auction',
  Bid = 'Bid',
}

export interface EntityExchangeState {
  portfolioAsset: string
  stakeCellEntity: string
  selectedAccountAddress: string

  TotalSupply: number
  Inflation: number
  TotalBonded: number //  bonded
  TotalNotBonded: number //  bonded + not-bonded
  APY: number
  validators: ValidatorInfo[]

  selectedValidator: string

  liquidityPools: LiquidityPool[]
}

// Action
export enum EntityExchangeActions {
  ChangePortfolioAsset = 'ixo/exchange/CHANGE_PORTFOLIOASSET',
  ChangeStakeCellEntity = 'ixo/exchange/CHANGE_STAKECELLENTITY',
  ChangeSelectedAccountAddress = 'ixo/exchange/CHANGE_SELECTED_ACCOUNT_ADDRESS',
  GetTotalSupply = 'ixo/exchange/GET_TOTALSUPPLY',
  GetTotalSupplySuccess = 'ixo/exchange/GET_TOTALSUPPLY_FULFILLED',
  GetTotalSupplyPending = 'ixo/exchange/GET_TOTALSUPPLY_PENDING',
  GetTotalSupplyFailure = 'ixo/exchange/GET_TOTALSUPPLY_REJECTED',
  GetTotalStaked = 'ixo/exchange/GET_TOTALSTAKED',
  GetTotalStakedSuccess = 'ixo/exchange/GET_TOTALSTAKED_FULFILLED',
  GetTotalStakedPending = 'ixo/exchange/GET_TOTALSTAKED_PENDING',
  GetTotalStakedFailure = 'ixo/exchange/GET_TOTALSTAKED_REJECTED',
  GetInflation = 'ixo/exchange/GET_INFLATION',
  GetInflationSuccess = 'ixo/exchange/GET_INFLATION_FULFILLED',
  GetInflationPending = 'ixo/exchange/GET_INFLATION_PENDING',
  GetInflationFailure = 'ixo/exchange/GET_INFLATION_REJECTED',
  GetAPY = 'ixo/exchange/GET_APY',
  GetAPYSuccess = 'ixo/exchange/GET_APY_FULFILLED',
  GetAPYPending = 'ixo/exchange/GET_APY_PENDING',
  GetAPYFailure = 'ixo/exchange/GET_APY_REJECTED',
  GetValidators = 'ixo/exchange/GET_VALIDATORS',
  GetValidatorsSuccess = 'ixo/exchange/GET_VALIDATORS_FULFILLED',
  GetValidatorsPending = 'ixo/exchange/GET_VALIDATORS_PENDING',
  GetValidatorsFailure = 'ixo/exchange/GET_VALIDATORS_REJECTED',
  GetValidatorLogo = 'ixo/exchange/GET_VALIDATOR_LOGO',
  GetValidatorDelegation = 'ixo/exchange/GET_VALIDATOR_DELEGATION',
  GetValidatorReward = 'ixo/exchange/GET_VALIDATOR_REWARD',

  SetSelectedValidator = 'ixo/exchange/SET_SELECTED_VALIDATOR',

  GetLiquidityPools = 'ixo/exchange/GET_LIQUIDITY_POOLS',
  GetLiquidityPoolsSuccess = 'ixo/exchange/GET_LIQUIDITY_POOLS_FULFILLED',
  GetLiquidityPoolsPending = 'ixo/exchange/GET_LIQUIDITY_POOLS_PENDING',
  GetLiquidityPoolsFailure = 'ixo/exchange/GET_LIQUIDITY_POOLS_REJECTED',

  GetLiquidityPoolDetail = 'ixo/exchange/GET_LIQUIDITY_POOL_DETAIL',
  GetLiquidityPoolDetailSuccess = 'ixo/exchange/GET_LIQUIDITY_POOL_DETAIL_FULFILLED',
  GetLiquidityPoolDetailPending = 'ixo/exchange/GET_LIQUIDITY_POOL_DETAIL_PENDING',
  GetLiquidityPoolDetailFailure = 'ixo/exchange/GET_LIQUIDITY_POOL_DETAIL_REJECTED',
}
export interface ChangePortfolioAssetAction {
  type: EntityExchangeActions.ChangePortfolioAsset
  payload: string
}
export interface ChangeStakeCellEntityAction {
  type: EntityExchangeActions.ChangeStakeCellEntity
  payload: string
}
export interface ChangeSelectedAccountAddressAction {
  type: EntityExchangeActions.ChangeSelectedAccountAddress
  payload: string
}

export interface SetSelectedValidatorAction {
  type: EntityExchangeActions.SetSelectedValidator
  payload: string
}

export interface GetTotalSupplyAction {
  type: typeof EntityExchangeActions.GetTotalSupply
  payload: Promise<number>
}
export interface GetTotalSupplySuccessAction {
  type: typeof EntityExchangeActions.GetTotalSupplySuccess
  payload: number
}
export interface GetTotalStakedAction {
  type: typeof EntityExchangeActions.GetTotalStaked
  payload: Promise<{
    TotalBonded: number
    TotalNotBonded: number
  }>
}
export interface GetTotalStakedSuccessAction {
  type: typeof EntityExchangeActions.GetTotalStakedSuccess
  payload: {
    TotalBonded: number
    TotalNotBonded: number
  }
}
export interface GetAPYAction {
  type: typeof EntityExchangeActions.GetAPY
  payload: Promise<number>
}
export interface GetAPYSuccessAction {
  type: typeof EntityExchangeActions.GetAPYSuccess
  payload: number
}
export interface GetInflationAction {
  type: typeof EntityExchangeActions.GetInflation
  payload: Promise<number>
}
export interface GetInflationSuccessAction {
  type: typeof EntityExchangeActions.GetInflationSuccess
  payload: number
}
export interface GetValidatorsAction {
  type: typeof EntityExchangeActions.GetValidators
  payload: Promise<ValidatorInfo[]>
}

export interface GetValidatorsSuccessAction {
  type: typeof EntityExchangeActions.GetValidatorsSuccess
  payload: ValidatorInfo[]
}

export interface GetValidatorLogoAction {
  type: typeof EntityExchangeActions.GetValidatorLogo
  payload: {
    address: string
    logo: string
  }
}

export interface GetValidatorDelegationAction {
  type: typeof EntityExchangeActions.GetValidatorDelegation
  payload: {
    address: string
    delegation: Currency
  }
}
export interface GetValidatorRewardAction {
  type: typeof EntityExchangeActions.GetValidatorReward
  payload: {
    address: string
    reward: Currency
  }
}

export interface GetLiquidityPoolsAction {
  type: typeof EntityExchangeActions.GetLiquidityPools
  payload: Promise<LiquidityPool[]>
}

export interface GetLiquidityPoolsSuccessAction {
  type: typeof EntityExchangeActions.GetLiquidityPoolsSuccess
  payload: LiquidityPool[]
}
export interface GetLiquidityPoolDetailAction {
  type: typeof EntityExchangeActions.GetLiquidityPoolDetail
  payload: Promise<{
    poolID: string
    poolDetail: PoolDetail
  }>
}

export interface GetLiquidityPoolDetailSuccessAction {
  type: typeof EntityExchangeActions.GetLiquidityPoolDetailSuccess
  payload: {
    poolID: string
    poolDetail: PoolDetail
  }
}

export type EntityExchangeActionTypes =
  | ChangePortfolioAssetAction
  | ChangeStakeCellEntityAction
  | ChangeSelectedAccountAddressAction
  | SetSelectedValidatorAction
  | GetAPYAction
  | GetAPYSuccessAction
  | GetInflationAction
  | GetInflationSuccessAction
  | GetTotalSupplyAction
  | GetTotalSupplySuccessAction
  | GetTotalStakedAction
  | GetTotalStakedSuccessAction
  | GetValidatorsAction
  | GetValidatorsSuccessAction
  | GetValidatorLogoAction
  | GetValidatorDelegationAction
  | GetValidatorRewardAction
  | GetLiquidityPoolsAction
  | GetLiquidityPoolsSuccessAction
  | GetLiquidityPoolDetailAction
  | GetLiquidityPoolDetailSuccessAction
