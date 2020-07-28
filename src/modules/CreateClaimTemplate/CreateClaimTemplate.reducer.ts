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
    case CreateClaimTemplateActions.UpdateActiveStep:
      return {
        ...state,
        activeStep: action.payload,
      }
    case CreateClaimTemplateActions.AddAttestation:
      return {
        ...state,
        attestations: [...state.attestations, action.payload],
      }
    case CreateClaimTemplateActions.RemoveAttestation:
      return {
        ...state,
        attestations: state.attestations.filter(
          attestation => attestation.id !== action.payload,
        ),
      }
  }

  return state
}
