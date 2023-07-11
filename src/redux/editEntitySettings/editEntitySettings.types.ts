import { EntityStage, EntityStatus, PageView, EntityView, TermsOfUseType } from '../../types/entities'
import { Validation } from '../editEntityOld/editEntity.types'
import { EmbeddedPageContent } from 'redux/editEntityPageContent/editEntityPageContent.types'

export interface Creator {
  displayName: string
  location: string
  email: string
  website: string
  mission: string
  creatorId: string
  credential: string
  fileSrc: string
  uploading: boolean
}

export interface Owner {
  displayName: string
  location: string
  email: string
  website: string
  mission: string
  ownerId: string
  fileSrc: string
  uploading: boolean
}

export interface Status {
  startDate: string
  endDate: string
  stage: EntityStage
  status: EntityStatus
}

export interface Version {
  versionNumber: string
  effectiveDate: string
  notes: string
}

export interface TermsOfUse {
  type: TermsOfUseType
  paymentTemplateId: string
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

export interface EditEntitySettingsState {
  owner: Owner
  creator: Creator
  status: Status
  version: Version
  termsOfUse: TermsOfUse
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
  headlineTemplateId: string
  embeddedAnalytics: {
    [id: string]: EmbeddedPageContent
  }
}

export enum EditEntitySettingsActions {
  // Creator
  UpdateCreator = 'ixo/EditEntitySettings/UPDATE_CREATOR',
  UploadCreatorImage = 'ixo/EditEntitySettings/UPLOAD_CREATOR_IMAGE',
  UploadCreatorImagePending = 'ixo/EditEntitySettings/UPLOAD_CREATOR_IMAGE_PENDING',
  UploadCreatorImageSuccess = 'ixo/EditEntitySettings/UPLOAD_CREATOR_IMAGE_FULFILLED',
  UploadCreatorImageFailure = 'ixo/EditEntitySettings/UPLOAD_CREATOR_IMAGE_REJECTED',
  // Owner
  UpdateOwner = 'ixo/EditEntitySettings/UPDATE_OWNER',
  UploadOwnerImage = 'ixo/EditEntitySettings/UPLOAD_OWNER_IMAGE',
  UploadOwnerImagePending = 'ixo/EditEntitySettings/UPLOAD_OWNER_IMAGE_PENDING',
  UploadOwnerImageSuccess = 'ixo/EditEntitySettings/UPLOAD_OWNER_IMAGE_FULFILLED',
  UploadOwnerImageFailure = 'ixo/EditEntitySettings/UPLOAD_OWNER_IMAGE_REJECTED',
  // Status
  UpdateStatus = 'ixo/EditEntitySettings/UPDATE_STATUS',
  // Headline Metrics
  UpdateHeadlineMetric = 'ixo/EditEntitySettings/UPDATE_HEADLINE_METRIC',
  // Version
  UpdateVersion = 'ixo/EditEntitySettings/UPDATE_VERSION',
  // Terms Of Ise
  UpdateTermsOfUse = 'ixo/EditEntitySettings/UPDATE_TERMS_OF_USE',
  // Privacy
  UpdatePrivacy = 'ixo/EditEntitySettings/UPDATE_PRIVACY',
  // RequiredCredentials
  AddRequiredCredentialSection = 'ixo/EditEntitySettings/ADD_REQUIRED_CREDENTIAL_SECTION',
  RemoveRequiredCredentialSection = 'ixo/EditEntitySettings/REMOVE_REQUIRED_CREDENTIAL_SECTION',
  UpdateRequiredCredential = 'ixo/EditEntitySettings/UPDATE_REQUIRED_CREDENTIALS',
  // Filter
  UpdateFilters = 'ixo/EditEntitySettings/UPDATE_FIL',
  // DisplayCredentials
  AddDisplayCredentialSection = 'ixo/EditEntitySettings/ADD_DISPLAY_CREDENTIAL_SECTION',
  RemoveDisplayCredentialSection = 'ixo/EditEntitySettings/REMOVE_DISPLAY_CREDENTIAL_SECTION',
  UpdateDisplayCredential = 'ixo/EditEntitySettings/UPDATE_DISPLAY_CREDENTIALS',
  // Validation
  Validated = 'ixo/EditEntitySettings/SET_VALIDATED',
  ValidationError = 'ixo/EditEntitySettings/VALIDATION_ERROR',
  // Analytics
  AddAnalyticsSection = 'ixo/EditEntitySettings/ADD_ANALYTICS_SECTION',
  UpdateAnalyticsContent = 'ixo/EditEntitySettings/UPDATE_ANALYTICS_CONTENT',
  RemoveAnalyticsSection = 'ixo/EditEntitySettings/REMOVE_ANALYTICS_SECTION',

  ImportEntitySettings = 'ixo/EditEntitySettings/IMPORT_ENTITY_SETTINGS',
}

export interface UpdateCreatorAction {
  type: typeof EditEntitySettingsActions.UpdateCreator
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
  type: typeof EditEntitySettingsActions.UploadCreatorImage
  payload: Promise<{
    fileSrc: string
  }>
}

export interface UploadCreatorImagePendingAction {
  type: typeof EditEntitySettingsActions.UploadCreatorImagePending
}

export interface UploadCreatorImageSuccessAction {
  type: typeof EditEntitySettingsActions.UploadCreatorImageSuccess
  payload: {
    fileSrc: string
  }
}

export interface UploadCreatorImageFailureAction {
  type: typeof EditEntitySettingsActions.UploadCreatorImageFailure
}

export interface UpdateOwnerAction {
  type: typeof EditEntitySettingsActions.UpdateOwner
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
  type: typeof EditEntitySettingsActions.UploadOwnerImage
  payload: Promise<{
    fileSrc: string
  }>
}

export interface UploadOwnerImagePendingAction {
  type: typeof EditEntitySettingsActions.UploadOwnerImagePending
}

export interface UploadOwnerImageSuccessAction {
  type: typeof EditEntitySettingsActions.UploadOwnerImageSuccess
  payload: {
    fileSrc: string
  }
}

export interface UploadOwnerImageFailureAction {
  type: typeof EditEntitySettingsActions.UploadOwnerImageFailure
}

export interface UpdateStatusAction {
  type: typeof EditEntitySettingsActions.UpdateStatus
  payload: {
    startDate: string
    endDate: string
    stage: EntityStage
    status: EntityStatus
  }
}

export interface UpdateVersionAction {
  type: typeof EditEntitySettingsActions.UpdateVersion
  payload: {
    versionNumber: string
    effectiveDate: string
    notes: string
  }
}

export interface UpdateTermsOfUseAction {
  type: typeof EditEntitySettingsActions.UpdateTermsOfUse
  payload: {
    type: TermsOfUseType
    paymentTemplateId: string
  }
}

export interface UpdateHeadlineMetricAction {
  type: typeof EditEntitySettingsActions.UpdateHeadlineMetric
  payload: {
    headlineTemplateId: string
  }
}

export interface UpdatePrivacyAction {
  type: typeof EditEntitySettingsActions.UpdatePrivacy
  payload: {
    pageView: PageView
    entityView: EntityView
  }
}

export interface AddRequiredCredentialSectionAction {
  type: typeof EditEntitySettingsActions.AddRequiredCredentialSection
  payload: {
    id: string
  }
}

export interface RemoveRequiredCredentialSectionAction {
  type: typeof EditEntitySettingsActions.RemoveRequiredCredentialSection
  payload: {
    id: string
  }
}

export interface UpdateRequiredCredentialAction {
  type: typeof EditEntitySettingsActions.UpdateRequiredCredential
  payload: {
    id: string
    credential: string
    issuer: string
  }
}

export interface UpdateFiltersAction {
  type: typeof EditEntitySettingsActions.UpdateFilters
  payload: {
    [name: string]: string[]
  }
}

export interface AddDisplayCredentialSectionAction {
  type: typeof EditEntitySettingsActions.AddDisplayCredentialSection
  payload: {
    id: string
  }
}

export interface RemoveDisplayCredentialSectionAction {
  type: typeof EditEntitySettingsActions.RemoveDisplayCredentialSection
  payload: {
    id: string
  }
}

export interface UpdateDisplayCredentialAction {
  type: typeof EditEntitySettingsActions.UpdateDisplayCredential
  payload: {
    id: string
    credential: string
    badge: string
  }
}

export interface ValidatedAction {
  type: typeof EditEntitySettingsActions.Validated
  payload: {
    identifier: string
  }
}

export interface ValidationErrorAction {
  type: typeof EditEntitySettingsActions.ValidationError
  payload: {
    identifier: string
    errors: string[]
  }
}

export interface AddAnalyticsSectionAction {
  type: typeof EditEntitySettingsActions.AddAnalyticsSection
  payload: {
    id: string
  }
}

export interface UpdateAnalyticsContentAction {
  type: typeof EditEntitySettingsActions.UpdateAnalyticsContent
  payload: {
    id: string
    title: string
    urls: string[]
  }
}

export interface RemoveAnalyticsSectionAction {
  type: typeof EditEntitySettingsActions.RemoveAnalyticsSection
  payload: {
    id: string
  }
}

export interface ImportEntitySettingsAction {
  type: typeof EditEntitySettingsActions.ImportEntitySettings
  payload: any
}

export type EditEntitySettingsActionTypes =
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
  | UpdateTermsOfUseAction
  | UpdateHeadlineMetricAction
  | UpdateVersionAction
  | ValidatedAction
  | ValidationErrorAction
  | AddAnalyticsSectionAction
  | UpdateAnalyticsContentAction
  | RemoveAnalyticsSectionAction
  | ImportEntitySettingsAction
