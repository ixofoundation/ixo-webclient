import {
  EvaluateClaimActions,
  EvaluateClaimState,
  EvaluateClaimActionTypes
} from './types'

export const initialState: EvaluateClaimState = {
  isLoading: true,
  isClaimLoading: true,
  isClaimTemplateLoading: true,
  claim: null,
  claimTemplate: null
}

export const reducer = (
  state = initialState,
  action: EvaluateClaimActionTypes,
): EvaluateClaimState => {
  const { isClaimLoading, isClaimTemplateLoading } = state

  switch (action.type) {
    case EvaluateClaimActions.ClearClaim:
      return initialState
    case EvaluateClaimActions.GetClaim:
      return {
        ...state,
        claim: action.payload,
        isClaimLoading: false,
        isLoading: isClaimTemplateLoading
      }
    case EvaluateClaimActions.GetClaimTemplate:
      return {
        ...state,
        claimTemplate: action.payload,
        isClaimTemplateLoading: false,
        isLoading: isClaimTemplateLoading
      }
    default:
      return state
  }
}