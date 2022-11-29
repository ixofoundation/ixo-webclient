import { Validation } from '../createEntityOld/createEntity.types'

export interface AssociatedTemplateType {
  id: string
  templateId: string
  name: string
  collection: string
  denom: string
  quantity: number
}

export interface AlphaBondInfo {
  token: string
  name: string
  controllerDid: string
  reserveToken: string
  txFeePercentage: number
  exitFeePercentage: number
  feeAddress: string
  reserveWithdrawalAddress: string
  maxSupply: number
  initialPrice: number
  initialFundingPool: number
  initialSupply: number
  baseCurveShape: number
  orderQuantityLimits: number
  outcomePayment: number
  allowSells: boolean
  allowReserveWithdrawals: boolean
  bondDid: string
}

export interface CreateEntityTemplateState {
  existingEntity: {
    did: string
    sourceNet: string
    error: string
  }
  validation: {
    [identifier: string]: Validation
  }
  associatedTemplates: {
    [id: string]: AssociatedTemplateType
  }
  alphaBondInfo: AlphaBondInfo
}

export enum CreateEntityTemplateActions {
  // Existing Entity Did
  UpdateExistingEntityError = 'ixo/CreateEntityTemplate/UPDATE_EXISTING_ENTITY_ERROR',
  UpdateExistingEntityDid = 'ixo/CreateEntityTemplate/UPDATE_EXISTING_ENTITY_DID',
  FetchExistingEntityFailure = 'ixo/CreateEntityTemplate/FETCH_EXISTING_ENTITY_FAILURE',
  FetchExistingEntitySuccess = 'ixo/CreateEntityTemplate/FETCH_EXISTING_ENTITY_SUCCESS',
  ImportExistingEntity = 'ixo/CreateEntityTemplate/IMPORT_EXISTING_ENTITY',
  UpdateAssociatedTemplate = 'ixo/CreateEntityTemplate/UPDATE_ASSOCIATED_TEMPLATE',
  AddAssociatedTemplate = 'ixo/CreateEntityTemplate/ADD_ASSOCIATED_TEMPLATE',
  ClearAssociatedTemplates = 'ixo/CreateEntityTemplate/CLEAR_ASSOCIATED_TEMPLATES',
  RemoveAssociatedTemplate = 'ixo/CreateEntityTemplate/REMOVE_ASSOCIATED_TEMPLATE',
  UpdateAlphaBondInfo = 'ixo/CreateEntityTemplate/UPDATE_ALPHA_BONDINFO',
  Validated = 'ixo/CreateEntityTemplate/VALIDATED',
  ValidationError = 'ixo/CreateEntityTemplate/VALIDATION_ERROR',
}

export interface UpdateExistingEntityErrorAction {
  type: typeof CreateEntityTemplateActions.UpdateExistingEntityError
}
export interface UpdateExistingEntityDidAction {
  type: typeof CreateEntityTemplateActions.UpdateExistingEntityDid
  payload: {
    existingEntityDid: string
    sourceNet: string
  }
}

export interface FetchExistingEntityFailureAction {
  type: typeof CreateEntityTemplateActions.FetchExistingEntityFailure
}

export interface FetchExistingEntitySuccessAction {
  type: typeof CreateEntityTemplateActions.FetchExistingEntitySuccess
}

export interface ImportExistingEntity {
  type: typeof CreateEntityTemplateActions.ImportExistingEntity
}

export interface ValidatedAction {
  type: typeof CreateEntityTemplateActions.Validated
  payload: {
    identifier: string
  }
}

export interface ValidationErrorAction {
  type: typeof CreateEntityTemplateActions.ValidationError
  payload: {
    identifier: string
    errors: string[]
  }
}

export interface UpdateAssociatedTemplateAction {
  type: typeof CreateEntityTemplateActions.UpdateAssociatedTemplate
  payload: AssociatedTemplateType
}

export interface AddAssociatedTemplateAction {
  type: typeof CreateEntityTemplateActions.AddAssociatedTemplate
  payload: {
    id: string
  }
}

export interface ClearAssociatedTemplatesAction {
  type: typeof CreateEntityTemplateActions.ClearAssociatedTemplates
}

export interface RemoveAssociatedTemplateAction {
  type: typeof CreateEntityTemplateActions.RemoveAssociatedTemplate
  payload: {
    id: string
  }
}

export interface UpdateAlphaBondInfoAction {
  type: typeof CreateEntityTemplateActions.UpdateAlphaBondInfo
  payload: AlphaBondInfo
}

export type CreateEntityTemplateActionTypes =
  | UpdateExistingEntityErrorAction
  | UpdateExistingEntityDidAction
  | FetchExistingEntityFailureAction
  | ImportExistingEntity
  | FetchExistingEntitySuccessAction
  | ValidatedAction
  | ValidationErrorAction
  | UpdateAssociatedTemplateAction
  | AddAssociatedTemplateAction
  | ClearAssociatedTemplatesAction
  | RemoveAssociatedTemplateAction
  | UpdateAlphaBondInfoAction
