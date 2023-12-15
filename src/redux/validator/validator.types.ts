import { Coin } from '@cosmjs/proto-signing'
import { BondStatus } from '@ixo/impactxclient-sdk/types/codegen/cosmos/staking/v1beta1/staking'

export type TValidatorModel = {
  address: string
  website: string
  identity: string
  description: string
  commission: number
  moniker: string
  votingPower: string
  votingPowerRate: number
  status: BondStatus
  logo: string
  delegation?: Coin
  reward?: Coin
  jailed: boolean
}

export type TValidatorState = {
  [address: string]: TValidatorModel
}

export enum ValidatorActions {
  GetValidators = 'ixo/Validator/GET_VALIDATORS',
}

export interface GetValidatorAction {
  type: typeof ValidatorActions.GetValidators
  payload: TValidatorModel[]
}

export type ValidatorActionTypes = GetValidatorAction
