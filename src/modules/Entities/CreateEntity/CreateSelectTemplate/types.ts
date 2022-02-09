import { Validation } from '../types'

export interface CreateEntityTemplateState {
  existingEntity: {
    did: string
    sourceNet: string
    error: string
  }
  validation: {
    [identifier: string]: Validation
  }
}

export enum CreateEntityTemplateActions {
  // Existing Entity Did
  UpdateExistingEntityDid = 'ixo/CreateEntityTemplate/UPDATE_EXISTING_ENTITY_DID',
  FetchExistingEntityFailure = 'ixo/CreateEntityTemplate/FETCH_EXISTING_ENTITY_FAILURE',
  FetchExistingEntitySuccess = 'ixo/CreateEntityTemplate/FETCH_EXISTING_ENTITY_SUCCESS',
  ImportExistingEntity = 'ixo/CreateEntityTemplate/IMPORT_EXISTING_ENTITY',
  Validated = 'ixo/CreateEntityTemplate/VALIDATED',
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

export type CreateEntityTemplateActionTypes =
 | UpdateExistingEntityDidAction
 | FetchExistingEntityFailureAction
 | ImportExistingEntity
 | FetchExistingEntitySuccessAction
 | ValidatedAction