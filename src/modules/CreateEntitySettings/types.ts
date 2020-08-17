import { FileContent, Validation } from 'modules/CreateEntity/types';
import {
  EntityStage,
  EntityStatus,
  PageView,
  EntityView,
} from '../Entities/types';

export interface Creator extends FileContent {
  displayName: string
  location: string
  email: string
  website: string
  mission: string
  creatorId: string
  credential: string
}

export interface Owner extends FileContent {
  displayName: string
  location: string
  email: string
  website: string
  mission: string
  ownerId: string
}

export interface Status {
  startDate: string
  endDate: string
  stage: EntityStage
  status: EntityStatus
}

export interface Privacy {
  pageView: PageView
  entityView: EntityView
}

export interface RequiredCredential {
  id: string
  credential: string
  issuer: string
}

export interface DisplayCredential {
  id: string
  credential: string
  badge: string
}

export interface CreateEntitySettingsState {
  owner: Owner
  creator: Creator
  status: Status
  privacy: Privacy
  requiredCredentials: {
    [id: string]: RequiredCredential
  }
  filters: {
    [name: string]: string[]
  }
  displayCredentials: {
    [id: string]: DisplayCredential
  }
  validation: {
    [identifier: string]: Validation
  }
}

export enum CreateEntitySettingsActions {
  // Creator
  UpdateCreator = 'ixo/CreateEntitySettings/UPDATE_CREATOR',
  UploadCreatorImage = 'ixo/CreateEntitySettings/UPLOAD_CREATOR_IMAGE',
  UploadCreatorImagePending = 'ixo/CreateEntitySettings/UPLOAD_CREATOR_IMAGE_PENDING',
  UploadCreatorImageSuccess = 'ixo/CreateEntitySettings/UPLOAD_CREATOR_IMAGE_FULFILLED',
  UploadCreatorImageFailure = 'ixo/CreateEntitySettings/UPLOAD_CREATOR_IMAGE_REJECTED',
  // Owner
  UpdateOwner = 'ixo/CreateEntitySettings/UPDATE_OWNER',
  UploadOwnerImage = 'ixo/CreateEntitySettings/UPLOAD_OWNER_IMAGE',
  UploadOwnerImagePending = 'ixo/CreateEntitySettings/UPLOAD_OWNER_IMAGE_PENDING',
  UploadOwnerImageSuccess = 'ixo/CreateEntitySettings/UPLOAD_OWNER_IMAGE_FULFILLED',
  UploadOwnerImageFailure = 'ixo/CreateEntitySettings/UPLOAD_OWNER_IMAGE_REJECTED',
  // Status
  UpdateStatus = 'ixo/CreateEntitySettings/UPDATE_STATUS',
  // Privacy
  UpdatePrivacy = 'ixo/CreateEntitySettings/UPDATE_PRIVACY',
  // RequiredCredentials
  AddRequiredCredentialSection = 'ixo/CreateEntitySettings/ADD_REQUIRED_CREDENTIAL_SECTION',
  RemoveRequiredCredentialSection = 'ixo/CreateEntitySettings/REMOVE_REQUIRED_CREDENTIAL_SECTION',
  UpdateRequiredCredential = 'ixo/CreateEntitySettings/UPDATE_REQUIRED_CREDENTIALS',
  // Filter
  UpdateFilters = 'ixo/CreateEntitySettings/UPDATE_FIL',
  // DisplayCredentials
  AddDisplayCredentialSection = 'ixo/CreateEntitySettings/ADD_DISPLAY_CREDENTIAL_SECTION',
  RemoveDisplayCredentialSection = 'ixo/CreateEntitySettings/REMOVE_DISPLAY_CREDENTIAL_SECTION',
  UpdateDisplayCredential = 'ixo/CreateEntitySettings/UPDATE_DISPLAY_CREDENTIALS',
  // Validation
  Validated = 'ixo/CreateEntitySettings/SET_VALIDATED',
  ValidationError = 'ixo/CreateEntitySettings/VALIDATION_ERROR',
}

export interface UpdateCreatorAction {
  type: typeof CreateEntitySettingsActions.UpdateCreator
  payload: {
    displayName: string
    location: string
    email: string
    website: string
    mission: string
    creatorId: string
    credential: string
  }
}

export interface UploadCreatorImageAction {
  type: typeof CreateEntitySettingsActions.UploadCreatorImage
  payload: Promise<{
    fileSrc: string
  }>
}

export interface UploadCreatorImagePendingAction {
  type: typeof CreateEntitySettingsActions.UploadCreatorImagePending
}

export interface UploadCreatorImageSuccessAction {
  type: typeof CreateEntitySettingsActions.UploadCreatorImageSuccess
  payload: {
    fileSrc: string
  }
}

export interface UploadCreatorImageFailureAction {
  type: typeof CreateEntitySettingsActions.UploadCreatorImageFailure
}

export interface UpdateOwnerAction {
  type: typeof CreateEntitySettingsActions.UpdateOwner
  payload: {
    displayName: string
    location: string
    email: string
    website: string
    mission: string
    ownerId: string
  }
}

export interface UploadOwnerImageAction {
  type: typeof CreateEntitySettingsActions.UploadOwnerImage
  payload: Promise<{
    fileSrc: string
  }>
}

export interface UploadOwnerImagePendingAction {
  type: typeof CreateEntitySettingsActions.UploadOwnerImagePending
}

export interface UploadOwnerImageSuccessAction {
  type: typeof CreateEntitySettingsActions.UploadOwnerImageSuccess
  payload: {
    fileSrc: string
  }
}

export interface UploadOwnerImageFailureAction {
  type: typeof CreateEntitySettingsActions.UploadOwnerImageFailure
}

export interface UpdateStatusAction {
  type: typeof CreateEntitySettingsActions.UpdateStatus
  payload: {
    startDate: string
    endDate: string
    stage: EntityStage
    status: EntityStatus
  }
}

export interface UpdatePrivacyAction {
  type: typeof CreateEntitySettingsActions.UpdatePrivacy
  payload: {
    pageView: PageView
    entityView: EntityView
  }
}

export interface AddRequiredCredentialSectionAction {
  type: typeof CreateEntitySettingsActions.AddRequiredCredentialSection
  payload: {
    id: string
  }
}

export interface RemoveRequiredCredentialSectionAction {
  type: typeof CreateEntitySettingsActions.RemoveRequiredCredentialSection
  payload: {
    id: string
  }
}

export interface UpdateRequiredCredentialAction {
  type: typeof CreateEntitySettingsActions.UpdateRequiredCredential
  payload: {
    id: string
    credential: string
    issuer: string
  }
}

export interface UpdateFiltersAction {
  type: typeof CreateEntitySettingsActions.UpdateFilters
  payload: {
    [name: string]: string[]
  }
}

export interface AddDisplayCredentialSectionAction {
  type: typeof CreateEntitySettingsActions.AddDisplayCredentialSection
  payload: {
    id: string
  }
}

export interface RemoveDisplayCredentialSectionAction {
  type: typeof CreateEntitySettingsActions.RemoveDisplayCredentialSection
  payload: {
    id: string
  }
}

export interface UpdateDisplayCredentialAction {
  type: typeof CreateEntitySettingsActions.UpdateDisplayCredential
  payload: {
    id: string
    credential: string
    badge: string
  }
}

export interface ValidatedAction {
  type: typeof CreateEntitySettingsActions.Validated
  payload: {
    identifier: string
  }
}

export interface ValidationErrorAction {
  type: typeof CreateEntitySettingsActions.ValidationError
  payload: {
    identifier: string
    errors: string[]
  }
}

export type CreateEntitySettingsActionTypes =
  | UpdateOwnerAction
  | UploadOwnerImageAction
  | UploadOwnerImagePendingAction
  | UploadOwnerImageSuccessAction
  | UploadOwnerImageFailureAction
  | UpdateCreatorAction
  | UploadCreatorImageAction
  | UploadCreatorImagePendingAction
  | UploadCreatorImageSuccessAction
  | UploadCreatorImageFailureAction
  | UpdateStatusAction
  | UpdatePrivacyAction
  | AddRequiredCredentialSectionAction
  | RemoveRequiredCredentialSectionAction
  | UpdateRequiredCredentialAction
  | UpdateFiltersAction
  | AddDisplayCredentialSectionAction
  | RemoveDisplayCredentialSectionAction
  | UpdateDisplayCredentialAction
  | ValidatedAction
  | ValidationErrorAction;
