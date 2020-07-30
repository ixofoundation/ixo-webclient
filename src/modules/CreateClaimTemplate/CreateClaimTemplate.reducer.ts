import {
  CreateClaimTemplateState,
  CreateClaimTemplateActions,
  CreateClaimTemplateActionTypes,
} from './types'

export const initialState: CreateClaimTemplateState = {
  activeStep: 1,
  claimInfo: { claimName: '', shortDescription: '' },
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
    case CreateClaimTemplateActions.UpdateClaimInfo:
      return {
        ...state,
        claimInfo: { ...action.payload },
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
    case CreateClaimTemplateActions.UpdateAttestation:
      console.log(action.payload)
      return {
        ...state,
        attestations: [
          ...state.attestations.map(attestation => {
            return attestation.id === action.payload.id
              ? action.payload
              : attestation
          }),
        ],
      }
  }

  return state
}
