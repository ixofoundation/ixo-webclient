import { GetValidatorAction, TValidatorModel, ValidatorActions } from './validator.types'

export const getValidatorAction = (validators: TValidatorModel[]): GetValidatorAction => ({
  type: ValidatorActions.GetValidators,
  payload: validators,
})
