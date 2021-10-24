import { ValidatorInfo } from 'common/components/ValidatorSelector/ValidatorSelector'
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
  tradeMethod: TradeMethodType
  validators: ValidatorInfo[]
}

// Action
export enum EntityExchangeActions {
  ChangeTradeMethod = 'ixo/exchange/CHANGE_TRADEMETHOD',
  GetValidators = 'ixo/exchange/GET_VALIDATORS',
  GetValidatorsSuccess = 'ixo/exchange/GET_VALIDATORS_FULFILLED',
  GetValidatorsPending = 'ixo/exchange/GET_VALIDATORS_PENDING',
  GetValidatorsFailure = 'ixo/exchange/GET_VALIDATORS_REJECTED',
  GetValidatorLogo = 'ixo/exchange/GET_VALIDATOR_LOGO',
  GetValidatorDelegation = 'ixo/exchange/GET_VALIDATOR_DELEGATION',
  GetValidatorReward = 'ixo/exchange/GET_VALIDATOR_REWARD',
}

export interface ChangeTradeMethodAction {
  type: EntityExchangeActions.ChangeTradeMethod
  payload: any
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
    address: string,
    logo: string,
  }
}

export interface GetValidatorDelegationAction {
  type: typeof EntityExchangeActions.GetValidatorDelegation
  payload: {
    address: string,
    delegation: Currency,
  }
}
export interface GetValidatorRewardAction {
  type: typeof EntityExchangeActions.GetValidatorReward
  payload: {
    address: string,
    reward: Currency,
  }
}

export type EntityExchangeActionTypes =
  | ChangeTradeMethodAction
  | GetValidatorsAction
  | GetValidatorsSuccessAction
  | GetValidatorLogoAction
  | GetValidatorDelegationAction
  | GetValidatorRewardAction