import { BondStatus, Validator } from '@ixo/impactxclient-sdk/types/codegen/cosmos/staking/v1beta1/staking'

export type TValidatorModel = {
  address: string
  website: string
  identity: string
  description: string
  commission: number
  moniker: string
  votingPower: number
  status: BondStatus
}

export type TValidatorState = {
  [address: string]: TValidatorModel
}

export enum ValidatorActions {
  GetValidators = 'ixo/Validator/GET_VALIDATORS',
}

export interface GetValidatorAction {
  type: typeof ValidatorActions.GetValidators
  payload: Validator[]
}

export type ValidatorActionTypes = GetValidatorAction
