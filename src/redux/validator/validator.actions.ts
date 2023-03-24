import { Validator } from '@ixo/impactxclient-sdk/types/codegen/cosmos/staking/v1beta1/staking'
import { GetValidatorAction, ValidatorActions } from './validator.types'

export const getValidatorAction = (validators: Validator[]): GetValidatorAction => ({
  type: ValidatorActions.GetValidators,
  payload: validators,
})
