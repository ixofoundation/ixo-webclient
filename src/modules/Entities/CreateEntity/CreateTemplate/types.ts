import { Validation } from '../types'

export interface AssociatedTemplateType {
  id: string
  templateId: string
  name: string
  collection: string
  denom: string
  quantity: string
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
  Validated = 'ixo/CreateEntityTemplate/VALIDATED',
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

export type CreateEntityTemplateActionTypes =
  | UpdateExistingEntityErrorAction
  | UpdateExistingEntityDidAction
  | FetchExistingEntityFailureAction
  | ImportExistingEntity
  | FetchExistingEntitySuccessAction
  | ValidatedAction
  | UpdateAssociatedTemplateAction
  | AddAssociatedTemplateAction
  | ClearAssociatedTemplatesAction
  | RemoveAssociatedTemplateAction
