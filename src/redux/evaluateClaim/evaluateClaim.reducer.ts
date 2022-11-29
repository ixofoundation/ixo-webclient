import { EvaluateClaimActions, EvaluateClaimState, EvaluateClaimActionTypes } from './evaluateClaim.types'

export const initialState: EvaluateClaimState = {
  isLoading: true,
  isClaimLoading: true,
  isClaimTemplateLoading: true,
  claim: null,
  claimTemplate: null,
}

export const reducer = (state = initialState, action: EvaluateClaimActionTypes): EvaluateClaimState => {
  const { isClaimLoading, isClaimTemplateLoading, claim } = state
  let itemIndex = -1
  switch (action.type) {
    case EvaluateClaimActions.ClearClaim:
      return initialState
    case EvaluateClaimActions.GetClaim:
      return {
        ...state,
        claim: action.payload,
        isClaimLoading: false,
        isLoading: isClaimTemplateLoading,
      }
    case EvaluateClaimActions.GetClaimTemplate:
      return {
        ...state,
        claimTemplate: action.payload,
        isClaimTemplateLoading: false,
        isLoading: isClaimLoading,
      }

    case EvaluateClaimActions.SaveComment:
      itemIndex = claim.items.findIndex((item: any) => item.id === action.payload.itemId)
      if (itemIndex !== -1) {
        claim.items[itemIndex].evaluation.comments = action.payload.comments
      }
      return {
        ...state,
        claim,
      }
    case EvaluateClaimActions.UpdateStatus:
      itemIndex = claim.items.findIndex((item: any) => item.id === action.payload.itemId)
      if (itemIndex !== -1) {
        claim.items[itemIndex].evaluation.status = action.payload.status
      }
      return {
        ...state,
        claim,
      }
    case EvaluateClaimActions.MoveToNext:
      claim.stage = 'Approve'
      localStorage.setItem(claim.txHash, JSON.stringify(claim))

      return {
        ...state,
        claim,
      }
    case EvaluateClaimActions.MoveToStep:
      claim.stage = action.payload.step
      localStorage.setItem(claim.txHash, JSON.stringify(claim))

      return {
        ...state,
        claim,
      }
    default:
      return state
  }
}
