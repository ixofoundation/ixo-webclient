import { Validation } from '../types'

export interface EditEntityTemplateState {
  existingEntity: {
    did: string
    error: string
  }
  validation: {
    [identifier: string]: Validation
  }
}

export enum EditEntityTemplateActions {
  // Existing Entity Did
  UpdateExistingEntityDid = 'ixo/EditEntityTemplate/UPDATE_EXISTING_ENTITY_DID',
  FetchExistingEntityFailure = 'ixo/EditEntityTemplate/FETCH_EXISTING_ENTITY_FAILURE',
  FetchExistingEntitySuccess = 'ixo/EditEntityTemplate/FETCH_EXISTING_ENTITY_SUCCESS',
  ImportExistingEntity = 'ixo/EditEntityTemplate/IMPORT_EXISTING_ENTITY',
  Validated = 'ixo/EditEntityTemplate/VALIDATED',
}

export interface UpdateExistingEntityDidAction {
  type: typeof EditEntityTemplateActions.UpdateExistingEntityDid
  payload: {
    existingEntityDid: string
  }
}

export interface FetchExistingEntityFailureAction {
  type: typeof EditEntityTemplateActions.FetchExistingEntityFailure
}

export interface FetchExistingEntitySuccessAction {
  type: typeof EditEntityTemplateActions.FetchExistingEntitySuccess
}


export interface ImportExistingEntity {
  type: typeof EditEntityTemplateActions.ImportExistingEntity
}

export interface ValidatedAction {
  type: typeof EditEntityTemplateActions.Validated
  payload: {
    identifier: string
  }
}

export type EditEntityTemplateActionTypes =
 | UpdateExistingEntityDidAction
 | FetchExistingEntityFailureAction
 | ImportExistingEntity
 | FetchExistingEntitySuccessAction
 | ValidatedAction