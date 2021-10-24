import {
  EntityExchangeActionTypes,
  EntityExchangeActions,
  EntityExchangeState,
} from './types'

export const initialState: EntityExchangeState = {
  tradeMethod: null,
  validators: [],
}

export const reducer = (
  state = initialState,
  action: EntityExchangeActionTypes,
): any => {
  switch (action.type) {
    case EntityExchangeActions.ChangeTradeMethod:
      return {
        ...state,
        tradeMethod: action.payload.tradeMethod,
      }
    case EntityExchangeActions.GetValidatorsSuccess:
      return {
        ...state,
        validators: action.payload,
      }
    case EntityExchangeActions.GetValidatorLogo:
      return {
        ...state,
        validators: state.validators.map((validator) => ({
          ...validator,
          logo:
            validator.address !== action.payload.address
              ? validator.logo
              : action.payload.logo,
        })),
      }
    case EntityExchangeActions.GetValidatorDelegation:
      return {
        ...state,
        validators: state.validators.map((validator) => ({
          ...validator,
          delegation:
            validator.address !== action.payload.address
              ? validator.delegation
              : action.payload.delegation,
        })),
      }
    case EntityExchangeActions.GetValidatorReward:
      return {
        ...state,
        validators: state.validators.map((validator) => ({
          ...validator,
          reward:
            validator.address !== action.payload.address
              ? validator.reward
              : action.payload.reward,
        })),
      }
    default:
      return state
  }
}
