import { ValidatorActionTypes, TValidatorState, ValidatorActions } from './validator.types'

const initialState: TValidatorState = {}

export const reducer = (state = initialState, action: ValidatorActionTypes): TValidatorState => {
  switch (action.type) {
    case ValidatorActions.GetValidators: {
      const validators = action.payload
      return Object.fromEntries(
        validators.map((validator) => {
          return [validator.address, validator]
        }),
      )
    }
    default:
      return { ...state }
  }
}
