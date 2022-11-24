import { EntityClaimStatus } from 'modules/Entities/SelectedEntity/EntityImpact/EntityClaims/types'

interface ClaimSubject {
  id: string
}

export interface ClaimItem {
  id: string
  value: string | string[]
  attribute: string
}

export interface Claim {
  __v: EntityClaimStatus
  _id: string
  _creator: string
  _created: string
  type: string
  txHash: string
  projectDid: string
  issuerId: string
  evaluations: any[]
  dateTime: Date
  claimSubject: ClaimSubject
  '@context': string
  items: ClaimItem[]
}

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
  GetClaimTemplate = 'ixo/claim/GET_CLAIM_TEMPLATE',
  SaveComment = 'ixo/claim/SAVE_COMMENT',
  UpdateStatus = 'ixo/claim/UPDATE_STATUS',
  MoveToNext = 'ixo/claim/MOVE_TO_NEXT_STEP',
  MoveToStep = 'ixo/claim/MOVE_TO_STEP',
}

export interface GetClaimAction {
  type: EvaluateClaimActions.GetClaim
  payload: any
}

export interface ClearClaimAction {
  type: typeof EvaluateClaimActions.ClearClaim
}

export interface GetClaimTemplateAction {
  type: EvaluateClaimActions.GetClaimTemplate
  payload: any
}

export interface SaveCommentAction {
  type: EvaluateClaimActions.SaveComment
  payload: any
}

export interface UpdateStatusAction {
  type: EvaluateClaimActions.UpdateStatus
  payload: any
}

export interface MoveToNextStepAction {
  type: EvaluateClaimActions.MoveToNext
}

export interface MoveToStepAction {
  type: EvaluateClaimActions.MoveToStep
  payload: any
}

export enum EvaluateClaimStatus {
  Queried = 'Queried',
  Rejected = 'Rejected',
  Approved = 'Approved',
}

export type EvaluateClaimActionTypes =
  | GetClaimAction
  | ClearClaimAction
  | GetClaimTemplateAction
  | SaveCommentAction
  | UpdateStatusAction
  | MoveToNextStepAction
  | MoveToStepAction
