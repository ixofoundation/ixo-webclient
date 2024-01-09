import { Validator } from '@ixo/impactxclient-sdk/types/codegen/cosmos/staking/v1beta1/staking'
import { GetValidatorAction, TValidatorModel, ValidatorActions } from './validator.types'

export const getValidatorAction = (validators: TValidatorModel[]): GetValidatorAction => ({
  type: ValidatorActions.GetValidators,
  payload: validators,
})
