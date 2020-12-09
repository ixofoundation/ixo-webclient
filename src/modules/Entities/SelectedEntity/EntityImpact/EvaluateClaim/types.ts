export interface EvaluateClaimState {
  isLoading: boolean
  isClaimLoading: boolean
  isClaimTemplateLoading: boolean
  claim: any
  claimTemplate: any
}

export enum EvaluateClaimActions {
  GetClaim = 'ixo/claim/GET_CLAIM',
  ClearClaim = 'ixo/claim/CLEAR_CLAIM',
  GetClaimTemplate = 'ixo/claim/GET_CLAIM_TEMPLATE'
}

export interface GetClaimAction {
  type: EvaluateClaimActions.GetClaim,
  payload: any
}

export interface ClearClaimAction {
  type: typeof EvaluateClaimActions.ClearClaim
}

export interface GetClaimTemplateAction {
  type: EvaluateClaimActions.GetClaimTemplate,
  payload: any
}

export type EvaluateClaimActionTypes =
  | GetClaimAction
  | ClearClaimAction
  | GetClaimTemplateAction
