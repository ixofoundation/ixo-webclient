import { Validation } from '../types'

export interface HeaderPageContent {
  title: string
  shortDescription: string
  imageDescription: string
  sdgs: string[]
  brand: string
  location: string
  headerFileSrc: string
  headerFileUploading: boolean
  logoFileSrc: string
  logoFileUploading: boolean
}

export interface BodyPageContent {
  id: string
  title: string
  content: string
  fileSrc: string
  uploading: boolean
}

export interface ImagePageContent {
  id: string
  title: string
  content: string
  imageDescription: string
  fileSrc: string
  uploading: boolean
}

export interface VideoPageContent {
  id: string
  title: string
  content: string
  fileSrc: string
  uploading: boolean
}

export interface ProfilePageContent {
  id: string
  name: string
  position: string
  linkedInUrl: string
  twitterUrl: string
  fileSrc: string
  uploading: boolean
}

export interface SocialPageContent {
  linkedInUrl: string
  facebookUrl: string
  twitterUrl: string
  discourseUrl: string
  instagramUrl: string
  telegramUrl: string
  githubUrl: string
  otherUrl: string
}

export interface EmbeddedPageContent {
  id: string
  title: string
  urls: string[]
}

export enum LinkedResourceType {
  UNDEFINED = '',
  IMPACT_PROOF = 'Impact Proof',
  CREDENTIAL = 'Crediential',
  IMAGE = 'Image',
  DATA_ASSET = 'Data Asset',
  AUTHORISATION = 'Authorisation',
  PDF = 'PDF',
  CODE = 'Code',
  ALGORITHM = 'Algorithm',
}

export interface LinkedResourceContent {
  id: string //  "cid83udb28"
  path: string
  type: LinkedResourceType //  "credential"
  resourceFormat: string //  "json-ld"
  displayName: string // "Meter Log"
  displayDescription: string //  "This is a log of all meter readings"
  endpoint: string //  "https://nifty.download"
  proof?: string //  "multihash"
  encrypted: boolean //  false
}

export interface CreateEntityPageContentState {
  header: HeaderPageContent
  body: {
    [id: string]: BodyPageContent
  }
  images: {
    [id: string]: ImagePageContent
  }
  profiles: {
    [id: string]: ProfilePageContent
  }
  social: SocialPageContent
  embedded: {
    [id: string]: EmbeddedPageContent
  }
  linkedResources: {
    [id: string]: LinkedResourceContent
  }
  validation: {
    [identifier: string]: Validation
  }
}

export enum CreateEntityPageContentActions {
  // Header
  UpdateHeaderContent = 'ixo/CreateEntityPageContent/UPDATE_HEADER',
  UploadHeaderContentImage = 'ixo/CreateEntityPageContent/UPLOAD_HEADER_IMAGE',
  UploadHeaderContentImagePending = 'ixo/CreateEntityPageContent/UPLOAD_HEADER_IMAGE_PENDING',
  UploadHeaderContentImageSuccess = 'ixo/CreateEntityPageContent/UPLOAD_HEADER_IMAGE_FULFILLED',
  UploadHeaderContentImageFailure = 'ixo/CreateEntityPageContent/UPLOAD_HEADER_IMAGE_REJECTED',
  UploadHeaderContentLogo = 'ixo/CreateEntityPageContent/UPLOAD_HEADER_LOGO',
  UploadHeaderContentLogoPending = 'ixo/CreateEntityPageContent/UPLOAD_HEADER_LOGO_PENDING',
  UploadHeaderContentLogoSuccess = 'ixo/CreateEntityPageContent/UPLOAD_HEADER_LOGO_FULFILLED',
  UploadHeaderContentLogoFailure = 'ixo/CreateEntityPageContent/UPLOAD_HEADER_LOGO_REJECTED',
  // Body
  AddBodySection = 'ixo/CreateEntityPageContent/ADD_BODY_SECTION',
  RemoveBodySection = 'ixo/CreateEntityPageContent/REMOVE_BODY_SECTION',
  UpdateBodyContent = 'ixo/CreateEntityPageContent/UPDATE_BODY',
  UploadBodyContentImage = 'ixo/CreateEntityPageContent/UPLOAD_BODY_IMAGE',
  UploadBodyContentImagePending = 'ixo/CreateEntityPageContent/UPLOAD_BODY_IMAGE_PENDING',
  UploadBodyContentImageSuccess = 'ixo/CreateEntityPageContent/UPLOAD_BODY_IMAGE_FULFILLED',
  UploadBodyContentImageFailure = 'ixo/CreateEntityPageContent/UPLOAD_BODY_IMAGE_REJECTED',
  // Image
  AddImageSection = 'ixo/CreateEntityPageContent/ADD_IMAGE_SECTION',
  RemoveImageSection = 'ixo/CreateEntityPageContent/REMOVE_IMAGE_SECTION',
  UpdateImageContent = 'ixo/CreateEntityPageContent/UPDATE_IMAGE',
  UploadImageContentImage = 'ixo/CreateEntityPageContent/UPLOAD_IMAGE_IMAGE',
  UploadImageContentImagePending = 'ixo/CreateEntityPageContent/UPLOAD_IMAGE_IMAGE_PENDING',
  UploadImageContentImageSuccess = 'ixo/CreateEntityPageContent/UPLOAD_IMAGE_IMAGE_FULFILLED',
  UploadImageContentImageFailure = 'ixo/CreateEntityPageContent/UPLOAD_IMAGE_IMAGE_REJECTED',
  // Video
  AddVideoSection = 'ixo/CreateEntityPageContent/ADD_VIDEO_SECTION',
  RemoveVideoSection = 'ixo/CreateEntityPageContent/REMOVE_VIDEO_SECTION',
  UpdateVideoContent = 'ixo/CreateEntityPageContent/UPDATE_VIDEO',
  UploadVideoContentVideo = 'ixo/CreateEntityPageContent/UPLOAD_VIDEO_VIDEO',
  UploadVideoContentVideoPending = 'ixo/CreateEntityPageContent/UPLOAD_VIDEO_VIDEO_PENDING',
  UploadVideoContentVideoSuccess = 'ixo/CreateEntityPageContent/UPLOAD_VIDEO_VIDEO_FULFILLED',
  UploadVideoContentVideoFailure = 'ixo/CreateEntityPageContent/UPLOAD_VIDEO_VIDEO_REJECTED',
  // Profile
  AddProfileSection = 'ixo/CreateEntityPageContent/ADD_PROFILE_SECTION',
  RemoveProfileSection = 'ixo/CreateEntityPageContent/REMOVE_PROFILE_SECTION',
  UpdateProfileContent = 'ixo/CreateEntityPageContent/UPDATE_PROFILE',
  UploadProfileContentImage = 'ixo/CreateEntityPageContent/UPLOAD_PROFILE_IMAGE',
  UploadProfileContentImagePending = 'ixo/CreateEntityPageContent/UPLOAD_PROFILE_IMAGE_PENDING',
  UploadProfileContentImageSuccess = 'ixo/CreateEntityPageContent/UPLOAD_PROFILE_IMAGE_FULFILLED',
  UploadProfileContentImageFailure = 'ixo/CreateEntityPageContent/UPLOAD_PROFILE_IMAGE_REJECTED',
  // Social
  UpdateSocialContent = 'ixo/CreateEntityPageContent/UPDATE_SOCIAL',
  // Embedded
  AddEmbeddedSection = 'ixo/CreateEntityPageContent/ADD_EMBEDDED_SECTION',
  RemoveEmbeddedSection = 'ixo/CreateEntityPageContent/REMOVE_EMBEDDED_SECTION',
  UpdateEmbeddedContent = 'ixo/CreateEntityPageContent/UPDATE_EMBEDDED',
  // LinkedResources
  AddLinkedResourcesSection = 'ixo/CreateEntityPageContent/ADD_LINKEDRESOURCES_SECTION',
  RemoveLinkedResourcesSection = 'ixo/CreateEntityPageContent/REMOVE_LINKEDRESOURCES_SECTION',
  UpdateLinkedResources = 'ixo/CreateEntityPageContent/UPDATE_LINKEDRESOURCES',
  // Validation
  Validated = 'ixo/CreateEntityPageContent/SET_VALIDATED',
  ValidationError = 'ixo/CreateEntityPageContent/VALIDATION_ERROR',

  // Import Page Contnet
  ImportEntityPageContent = 'ixo/CreateEntityPageContent/IMPORT_ENTITY_PAGE_CONTENT',

  // Ordering Page Content
  OrderEntityPageContent = 'ixo/CreateEntityPageContent/ORDER_ENTITY_PAGE_CONTENT',
}

export interface UpdateHeaderContentAction {
  type: typeof CreateEntityPageContentActions.UpdateHeaderContent
  payload: {
    title: string
    shortDescription: string
    imageDescription: string
    sdgs: string[]
    brand: string
    location: string
  }
}

export interface UploadHeaderImageAction {
  type: typeof CreateEntityPageContentActions.UploadHeaderContentImage
  payload: Promise<{
    headerFileSrc: string
  }>
}

export interface UploadHeaderImagePendingAction {
  type: typeof CreateEntityPageContentActions.UploadHeaderContentImagePending
}

export interface UploadHeaderImageSuccessAction {
  type: typeof CreateEntityPageContentActions.UploadHeaderContentImageSuccess
  payload: {
    headerFileSrc: string
  }
}

export interface UploadHeaderImageFailureAction {
  type: typeof CreateEntityPageContentActions.UploadHeaderContentImageFailure
}

export interface UploadHeaderLogoAction {
  type: typeof CreateEntityPageContentActions.UploadHeaderContentLogo
  payload: Promise<{
    logoFileSrc: string
  }>
}

export interface UploadHeaderLogoPendingAction {
  type: typeof CreateEntityPageContentActions.UploadHeaderContentLogoPending
}

export interface UploadHeaderLogoSuccessAction {
  type: typeof CreateEntityPageContentActions.UploadHeaderContentLogoSuccess
  payload: {
    logoFileSrc: string
  }
}

export interface UploadHeaderLogoFailureAction {
  type: typeof CreateEntityPageContentActions.UploadHeaderContentLogoFailure
}

export interface AddBodySectionAction {
  type: typeof CreateEntityPageContentActions.AddBodySection
  payload: {
    id: string
  }
}

export interface RemoveBodySectionAction {
  type: typeof CreateEntityPageContentActions.RemoveBodySection
  payload: {
    id: string
  }
}

export interface UpdateBodyContentAction {
  type: typeof CreateEntityPageContentActions.UpdateBodyContent
  payload: {
    id: string
    title: string
    content: string
  }
}

export interface UploadBodyContentImageAction {
  type: typeof CreateEntityPageContentActions.UploadBodyContentImage
  payload: Promise<{
    id: string
    fileSrc: string
  }>
}

export interface UploadBodyContentImagePendingAction {
  type: typeof CreateEntityPageContentActions.UploadBodyContentImagePending
  meta: {
    id: string
  }
}

export interface UploadBodyContentImageSuccessAction {
  type: typeof CreateEntityPageContentActions.UploadBodyContentImageSuccess
  payload: {
    id: string
    fileSrc: string
  }
}

export interface UploadBodyContentImageFailureAction {
  type: typeof CreateEntityPageContentActions.UploadBodyContentImageFailure
  payload: {
    id: string
  }
}

export interface AddImageSectionAction {
  type: typeof CreateEntityPageContentActions.AddImageSection
  payload: {
    id: string
  }
}

export interface RemoveImageSectionAction {
  type: typeof CreateEntityPageContentActions.RemoveImageSection
  payload: {
    id: string
  }
}

export interface UpdateImageContentAction {
  type: typeof CreateEntityPageContentActions.UpdateImageContent
  payload: {
    id: string
    title: string
    content: string
    imageDescription: string
  }
}

export interface UploadImageContentImageAction {
  type: typeof CreateEntityPageContentActions.UploadImageContentImage
  payload: Promise<{
    id: string
    fileSrc: string
  }>
}

export interface UploadImageContentImagePendingAction {
  type: typeof CreateEntityPageContentActions.UploadImageContentImagePending
  meta: {
    id: string
  }
}

export interface UploadImageContentImageSuccessAction {
  type: typeof CreateEntityPageContentActions.UploadImageContentImageSuccess
  payload: {
    id: string
    fileSrc: string
  }
}

export interface UploadImageContentImageFailureAction {
  type: typeof CreateEntityPageContentActions.UploadImageContentImageFailure
  payload: {
    id: string
  }
}

export interface AddVideoSectionAction {
  type: typeof CreateEntityPageContentActions.AddVideoSection
  payload: {
    id: string
  }
}

export interface RemoveVideoSectionAction {
  type: typeof CreateEntityPageContentActions.RemoveVideoSection
  payload: {
    id: string
  }
}

export interface UpdateVideoContentAction {
  type: typeof CreateEntityPageContentActions.UpdateVideoContent
  payload: {
    id: string
    title: string
    content: string
  }
}

export interface UploadVideoContentVideoAction {
  type: typeof CreateEntityPageContentActions.UploadVideoContentVideo
  payload: Promise<{
    id: string
    fileSrc: string
  }>
}

export interface UploadVideoContentVideoPendingAction {
  type: typeof CreateEntityPageContentActions.UploadVideoContentVideoPending
  meta: {
    id: string
  }
}

export interface UploadVideoContentVideoSuccessAction {
  type: typeof CreateEntityPageContentActions.UploadVideoContentVideoSuccess
  payload: {
    id: string
    fileSrc: string
  }
}

export interface UploadVideoContentVideoFailureAction {
  type: typeof CreateEntityPageContentActions.UploadVideoContentVideoFailure
  payload: {
    id: string
  }
}

export interface AddProfileSectionAction {
  type: typeof CreateEntityPageContentActions.AddProfileSection
  payload: {
    id: string
  }
}

export interface RemoveProfileSectionAction {
  type: typeof CreateEntityPageContentActions.RemoveProfileSection
  payload: {
    id: string
  }
}

export interface UpdateProfileContentAction {
  type: typeof CreateEntityPageContentActions.UpdateProfileContent
  payload: {
    id: string
    name: string
    position: string
    linkedInUrl: string
    twitterUrl: string
  }
}

export interface UploadProfileContentImageAction {
  type: typeof CreateEntityPageContentActions.UploadProfileContentImage
  payload: Promise<{
    id: string
    fileSrc: string
  }>
}

export interface UploadProfileContentImagePendingAction {
  type: typeof CreateEntityPageContentActions.UploadProfileContentImagePending
  meta: {
    id: string
  }
}

export interface UploadProfileContentImageSuccessAction {
  type: typeof CreateEntityPageContentActions.UploadProfileContentImageSuccess
  payload: {
    id: string
    fileSrc: string
  }
}

export interface UploadProfileContentImageFailureAction {
  type: typeof CreateEntityPageContentActions.UploadProfileContentImageFailure
  payload: {
    id: string
  }
}

export interface UpdateSocialContentAction {
  type: typeof CreateEntityPageContentActions.UpdateSocialContent
  payload: {
    linkedInUrl: string
    facebookUrl: string
    twitterUrl: string
    discourseUrl: string
    instagramUrl: string
    telegramUrl: string
    githubUrl: string
    otherUrl: string
  }
}

export interface AddEmbeddedSectionAction {
  type: typeof CreateEntityPageContentActions.AddEmbeddedSection
  payload: {
    id: string
  }
}

export interface RemoveEmbeddedSectionAction {
  type: typeof CreateEntityPageContentActions.RemoveEmbeddedSection
  payload: {
    id: string
  }
}

export interface UpdateEmbeddedContentAction {
  type: typeof CreateEntityPageContentActions.UpdateEmbeddedContent
  payload: {
    id: string
    title: string
    urls: string[]
  }
}

export interface AddLinkedResourcesSectionAction {
  type: typeof CreateEntityPageContentActions.AddLinkedResourcesSection
  payload: {
    id: string
  }
}

export interface RemoveLinkedResourcesSectionAction {
  type: typeof CreateEntityPageContentActions.RemoveLinkedResourcesSection
  payload: {
    id: string
  }
}

export interface UpdateLinkedResourcesAction {
  type: typeof CreateEntityPageContentActions.UpdateLinkedResources
  payload: LinkedResourceContent
}

export interface ValidatedAction {
  type: typeof CreateEntityPageContentActions.Validated
  payload: {
    identifier: string
  }
}

export interface ValidationErrorAction {
  type: typeof CreateEntityPageContentActions.ValidationError
  payload: {
    identifier: string
    errors: string[]
  }
}

export interface ImportEntityPageContentAction {
  type: typeof CreateEntityPageContentActions.ImportEntityPageContent
  payload: any
}

export interface OrderEntityPageContentAction {
  type: typeof CreateEntityPageContentActions.OrderEntityPageContent
  payload: CreateEntityPageContentState
}

export type CreateEntityPageContentActionTypes =
  | UpdateHeaderContentAction
  | UploadHeaderImageAction
  | UploadHeaderImagePendingAction
  | UploadHeaderImageSuccessAction
  | UploadHeaderImageFailureAction
  | UploadHeaderLogoAction
  | UploadHeaderLogoPendingAction
  | UploadHeaderLogoSuccessAction
  | UploadHeaderLogoFailureAction
  | AddBodySectionAction
  | RemoveBodySectionAction
  | UpdateBodyContentAction
  | UploadBodyContentImageAction
  | UploadBodyContentImagePendingAction
  | UploadBodyContentImageSuccessAction
  | UploadBodyContentImageFailureAction
  | AddImageSectionAction
  | RemoveImageSectionAction
  | UpdateImageContentAction
  | UploadImageContentImageAction
  | UploadImageContentImagePendingAction
  | UploadImageContentImageSuccessAction
  | UploadImageContentImageFailureAction
  | AddVideoSectionAction
  | RemoveVideoSectionAction
  | UpdateVideoContentAction
  | UploadVideoContentVideoAction
  | UploadVideoContentVideoPendingAction
  | UploadVideoContentVideoSuccessAction
  | UploadVideoContentVideoFailureAction
  | AddProfileSectionAction
  | RemoveProfileSectionAction
  | UpdateProfileContentAction
  | UploadProfileContentImageAction
  | UploadProfileContentImagePendingAction
  | UploadProfileContentImageSuccessAction
  | UploadProfileContentImageFailureAction
  | UpdateSocialContentAction
  | AddEmbeddedSectionAction
  | RemoveEmbeddedSectionAction
  | UpdateEmbeddedContentAction
  | AddLinkedResourcesSectionAction
  | RemoveLinkedResourcesSectionAction
  | UpdateLinkedResourcesAction
  | ValidatedAction
  | ValidationErrorAction
  | ImportEntityPageContentAction
  | OrderEntityPageContentAction
