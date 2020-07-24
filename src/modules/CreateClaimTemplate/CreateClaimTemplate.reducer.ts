import {
  CreateClaimTemplateState,
  CreateClaimTemplateActions,
  CreateClaimTemplateActionTypes,
} from './types'

export const initialState: CreateClaimTemplateState = {
  activeStep: 1,
  attestations: [],
  evaluation: [],
  approval: [],
}

export const reducer = (
  state = initialState,
  action: CreateClaimTemplateActionTypes,
): CreateClaimTemplateState => {
  switch (action.type) {
    case CreateClaimTemplateActions.updateActiveStep:
      return {
        ...state,
        activeStep: action.payload,
      }
    case CreateClaimTemplateActions.addAttestation:
      return {
        ...state,
        attestations: [...state.attestations, action.payload],
      }
  }

  return state
}
