import {
  EntityStage,
  EntityStatus,
  PageView,
  EntityView,
} from '../Entities/types'

export interface Owner {
  name: string
  country: string
  email: string
  website: string
  mission: string
  identifier: string
  credentialTokenId: string
  imageDid: string
  uploadingImage: boolean
}

export interface Creator {
  name: string
  country: string
  email: string
  website: string
  mission: string
  identifier: string
  matrixId: string
  imageDid: string
  uploadingImage: boolean
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

export interface Filter {
  id: string
  name: string
  tags: string[]
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
    [id: string]: Filter
  }
  displayCredentials: {
    [id: string]: DisplayCredential
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
  AddFilterSection = 'ixo/CreateEntitySettings/ADD_FILTER_SECTION',
  RemoveFilterSection = 'ixo/CreateEntitySettings/REMOVE_FILTER_SECTION',
  UpdateFilter = 'ixo/CreateEntitySettings/UPDATE_FILTER',
  // DisplayCredentials
  AddDisplayCredentialSection = 'ixo/CreateEntitySettings/ADD_DISPLAY_CREDENTIAL_SECTION',
  RemoveDisplayCredentialSection = 'ixo/CreateEntitySettings/REMOVE_DISPLAY_CREDENTIAL_SECTION',
  UpdateDisplayCredential = 'ixo/CreateEntitySettings/UPDATE_DISPLAY_CREDENTIALS',
}

export interface UpdateOwnerAction {
  type: typeof CreateEntitySettingsActions.UpdateOwner
  payload: {
    name: string
    country: string
    email: string
    website: string
    mission: string
    identifier: string
    credentialTokenId: string
  }
}

export interface UploadOwnerImageAction {
  type: typeof CreateEntitySettingsActions.UploadOwnerImage
  payload: Promise<{
    did: string
  }>
}

export interface UploadOwnerImagePendingAction {
  type: typeof CreateEntitySettingsActions.UploadOwnerImagePending
}

export interface UploadOwnerImageSuccessAction {
  type: typeof CreateEntitySettingsActions.UploadOwnerImageSuccess
  payload: {
    did: string
  }
}

export interface UploadOwnerImageFailureAction {
  type: typeof CreateEntitySettingsActions.UploadOwnerImageFailure
}

export interface UpdateCreatorAction {
  type: typeof CreateEntitySettingsActions.UpdateCreator
  payload: {
    name: string
    country: string
    email: string
    website: string
    mission: string
    identifier: string
    matrixId: string
  }
}

export interface UploadCreatorImageAction {
  type: typeof CreateEntitySettingsActions.UploadCreatorImage
  payload: Promise<{
    did: string
  }>
}

export interface UploadCreatorImagePendingAction {
  type: typeof CreateEntitySettingsActions.UploadCreatorImagePending
}

export interface UploadCreatorImageSuccessAction {
  type: typeof CreateEntitySettingsActions.UploadCreatorImageSuccess
  payload: {
    did: string
  }
}

export interface UploadCreatorImageFailureAction {
  type: typeof CreateEntitySettingsActions.UploadCreatorImageFailure
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
    credential: string
    issuer: string
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

export interface AddFilterSectionAction {
  type: typeof CreateEntitySettingsActions.AddFilterSection
  payload: {
    id: string
    name: string
    tags: string[]
  }
}

export interface RemoveFilterSectionAction {
  type: typeof CreateEntitySettingsActions.RemoveFilterSection
  payload: {
    id: string
  }
}

export interface UpdateFilterAction {
  type: typeof CreateEntitySettingsActions.UpdateFilter
  payload: {
    id: string
    name: string
    tags: string[]
  }
}

export interface AddDisplayCredentialSectionAction {
  type: typeof CreateEntitySettingsActions.AddDisplayCredentialSection
  payload: {
    id: string
    credential: string
    badge: string
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
  | AddFilterSectionAction
  | RemoveFilterSectionAction
  | UpdateFilterAction
  | AddDisplayCredentialSectionAction
  | RemoveDisplayCredentialSectionAction
  | UpdateDisplayCredentialAction
