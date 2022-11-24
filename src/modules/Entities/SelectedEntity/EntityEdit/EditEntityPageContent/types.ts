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

export interface EditEntityPageContentState {
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
  validation: {
    [identifier: string]: Validation
  }
}

export enum EditEntityPageContentActions {
  // Header
  UpdateHeaderContent = 'ixo/EditEntityPageContent/UPDATE_HEADER',
  UploadHeaderContentImage = 'ixo/EditEntityPageContent/UPLOAD_HEADER_IMAGE',
  UploadHeaderContentImagePending = 'ixo/EditEntityPageContent/UPLOAD_HEADER_IMAGE_PENDING',
  UploadHeaderContentImageSuccess = 'ixo/EditEntityPageContent/UPLOAD_HEADER_IMAGE_FULFILLED',
  UploadHeaderContentImageFailure = 'ixo/EditEntityPageContent/UPLOAD_HEADER_IMAGE_REJECTED',
  UploadHeaderContentLogo = 'ixo/EditEntityPageContent/UPLOAD_HEADER_LOGO',
  UploadHeaderContentLogoPending = 'ixo/EditEntityPageContent/UPLOAD_HEADER_LOGO_PENDING',
  UploadHeaderContentLogoSuccess = 'ixo/EditEntityPageContent/UPLOAD_HEADER_LOGO_FULFILLED',
  UploadHeaderContentLogoFailure = 'ixo/EditEntityPageContent/UPLOAD_HEADER_LOGO_REJECTED',
  // Body
  AddBodySection = 'ixo/EditEntityPageContent/ADD_BODY_SECTION',
  RemoveBodySection = 'ixo/EditEntityPageContent/REMOVE_BODY_SECTION',
  UpdateBodyContent = 'ixo/EditEntityPageContent/UPDATE_BODY',
  UploadBodyContentImage = 'ixo/EditEntityPageContent/UPLOAD_BODY_IMAGE',
  UploadBodyContentImagePending = 'ixo/EditEntityPageContent/UPLOAD_BODY_IMAGE_PENDING',
  UploadBodyContentImageSuccess = 'ixo/EditEntityPageContent/UPLOAD_BODY_IMAGE_FULFILLED',
  UploadBodyContentImageFailure = 'ixo/EditEntityPageContent/UPLOAD_BODY_IMAGE_REJECTED',
  // Image
  AddImageSection = 'ixo/EditEntityPageContent/ADD_IMAGE_SECTION',
  RemoveImageSection = 'ixo/EditEntityPageContent/REMOVE_IMAGE_SECTION',
  UpdateImageContent = 'ixo/EditEntityPageContent/UPDATE_IMAGE',
  UploadImageContentImage = 'ixo/EditEntityPageContent/UPLOAD_IMAGE_IMAGE',
  UploadImageContentImagePending = 'ixo/EditEntityPageContent/UPLOAD_IMAGE_IMAGE_PENDING',
  UploadImageContentImageSuccess = 'ixo/EditEntityPageContent/UPLOAD_IMAGE_IMAGE_FULFILLED',
  UploadImageContentImageFailure = 'ixo/EditEntityPageContent/UPLOAD_IMAGE_IMAGE_REJECTED',
  // Video
  AddVideoSection = 'ixo/EditEntityPageContent/ADD_VIDEO_SECTION',
  RemoveVideoSection = 'ixo/EditEntityPageContent/REMOVE_VIDEO_SECTION',
  UpdateVideoContent = 'ixo/EditEntityPageContent/UPDATE_VIDEO',
  UploadVideoContentVideo = 'ixo/EditEntityPageContent/UPLOAD_VIDEO_VIDEO',
  UploadVideoContentVideoPending = 'ixo/EditEntityPageContent/UPLOAD_VIDEO_VIDEO_PENDING',
  UploadVideoContentVideoSuccess = 'ixo/EditEntityPageContent/UPLOAD_VIDEO_VIDEO_FULFILLED',
  UploadVideoContentVideoFailure = 'ixo/EditEntityPageContent/UPLOAD_VIDEO_VIDEO_REJECTED',
  // Profile
  AddProfileSection = 'ixo/EditEntityPageContent/ADD_PROFILE_SECTION',
  RemoveProfileSection = 'ixo/EditEntityPageContent/REMOVE_PROFILE_SECTION',
  UpdateProfileContent = 'ixo/EditEntityPageContent/UPDATE_PROFILE',
  UploadProfileContentImage = 'ixo/EditEntityPageContent/UPLOAD_PROFILE_IMAGE',
  UploadProfileContentImagePending = 'ixo/EditEntityPageContent/UPLOAD_PROFILE_IMAGE_PENDING',
  UploadProfileContentImageSuccess = 'ixo/EditEntityPageContent/UPLOAD_PROFILE_IMAGE_FULFILLED',
  UploadProfileContentImageFailure = 'ixo/EditEntityPageContent/UPLOAD_PROFILE_IMAGE_REJECTED',
  // Social
  UpdateSocialContent = 'ixo/EditEntityPageContent/UPDATE_SOCIAL',
  // Embedded
  AddEmbeddedSection = 'ixo/EditEntityPageContent/ADD_EMBEDDED_SECTION',
  RemoveEmbeddedSection = 'ixo/EditEntityPageContent/REMOVE_EMBEDDED_SECTION',
  UpdateEmbeddedContent = 'ixo/EditEntityPageContent/UPDATE_EMBEDDED',
  // Validation
  Validated = 'ixo/EditEntityPageContent/SET_VALIDATED',
  ValidationError = 'ixo/EditEntityPageContent/VALIDATION_ERROR',

  // Import Page Contnet
  ImportEntityPageContent = 'ixo/EditEntityPageContent/IMPORT_ENTITY_PAGE_CONTENT',

  // Ordering Page Content
  OrderEntityPageContent = 'ixo/EditEntityPageContent/ORDER_ENTITY_PAGE_CONTENT',
}

export interface UpdateHeaderContentAction {
  type: typeof EditEntityPageContentActions.UpdateHeaderContent
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
  type: typeof EditEntityPageContentActions.UploadHeaderContentImage
  payload: Promise<{
    headerFileSrc: string
  }>
}

export interface UploadHeaderImagePendingAction {
  type: typeof EditEntityPageContentActions.UploadHeaderContentImagePending
}

export interface UploadHeaderImageSuccessAction {
  type: typeof EditEntityPageContentActions.UploadHeaderContentImageSuccess
  payload: {
    headerFileSrc: string
  }
}

export interface UploadHeaderImageFailureAction {
  type: typeof EditEntityPageContentActions.UploadHeaderContentImageFailure
}

export interface UploadHeaderLogoAction {
  type: typeof EditEntityPageContentActions.UploadHeaderContentLogo
  payload: Promise<{
    logoFileSrc: string
  }>
}

export interface UploadHeaderLogoPendingAction {
  type: typeof EditEntityPageContentActions.UploadHeaderContentLogoPending
}

export interface UploadHeaderLogoSuccessAction {
  type: typeof EditEntityPageContentActions.UploadHeaderContentLogoSuccess
  payload: {
    logoFileSrc: string
  }
}

export interface UploadHeaderLogoFailureAction {
  type: typeof EditEntityPageContentActions.UploadHeaderContentLogoFailure
}

export interface AddBodySectionAction {
  type: typeof EditEntityPageContentActions.AddBodySection
  payload: {
    id: string
  }
}

export interface RemoveBodySectionAction {
  type: typeof EditEntityPageContentActions.RemoveBodySection
  payload: {
    id: string
  }
}

export interface UpdateBodyContentAction {
  type: typeof EditEntityPageContentActions.UpdateBodyContent
  payload: {
    id: string
    title: string
    content: string
  }
}

export interface UploadBodyContentImageAction {
  type: typeof EditEntityPageContentActions.UploadBodyContentImage
  payload: Promise<{
    id: string
    fileSrc: string
  }>
}

export interface UploadBodyContentImagePendingAction {
  type: typeof EditEntityPageContentActions.UploadBodyContentImagePending
  meta: {
    id: string
  }
}

export interface UploadBodyContentImageSuccessAction {
  type: typeof EditEntityPageContentActions.UploadBodyContentImageSuccess
  payload: {
    id: string
    fileSrc: string
  }
}

export interface UploadBodyContentImageFailureAction {
  type: typeof EditEntityPageContentActions.UploadBodyContentImageFailure
  payload: {
    id: string
  }
}

export interface AddImageSectionAction {
  type: typeof EditEntityPageContentActions.AddImageSection
  payload: {
    id: string
  }
}

export interface RemoveImageSectionAction {
  type: typeof EditEntityPageContentActions.RemoveImageSection
  payload: {
    id: string
  }
}

export interface UpdateImageContentAction {
  type: typeof EditEntityPageContentActions.UpdateImageContent
  payload: {
    id: string
    title: string
    content: string
    imageDescription: string
  }
}

export interface UploadImageContentImageAction {
  type: typeof EditEntityPageContentActions.UploadImageContentImage
  payload: Promise<{
    id: string
    fileSrc: string
  }>
}

export interface UploadImageContentImagePendingAction {
  type: typeof EditEntityPageContentActions.UploadImageContentImagePending
  meta: {
    id: string
  }
}

export interface UploadImageContentImageSuccessAction {
  type: typeof EditEntityPageContentActions.UploadImageContentImageSuccess
  payload: {
    id: string
    fileSrc: string
  }
}

export interface UploadImageContentImageFailureAction {
  type: typeof EditEntityPageContentActions.UploadImageContentImageFailure
  payload: {
    id: string
  }
}

export interface AddVideoSectionAction {
  type: typeof EditEntityPageContentActions.AddVideoSection
  payload: {
    id: string
  }
}

export interface RemoveVideoSectionAction {
  type: typeof EditEntityPageContentActions.RemoveVideoSection
  payload: {
    id: string
  }
}

export interface UpdateVideoContentAction {
  type: typeof EditEntityPageContentActions.UpdateVideoContent
  payload: {
    id: string
    title: string
    content: string
  }
}

export interface UploadVideoContentVideoAction {
  type: typeof EditEntityPageContentActions.UploadVideoContentVideo
  payload: Promise<{
    id: string
    fileSrc: string
  }>
}

export interface UploadVideoContentVideoPendingAction {
  type: typeof EditEntityPageContentActions.UploadVideoContentVideoPending
  meta: {
    id: string
  }
}

export interface UploadVideoContentVideoSuccessAction {
  type: typeof EditEntityPageContentActions.UploadVideoContentVideoSuccess
  payload: {
    id: string
    fileSrc: string
  }
}

export interface UploadVideoContentVideoFailureAction {
  type: typeof EditEntityPageContentActions.UploadVideoContentVideoFailure
  payload: {
    id: string
  }
}

export interface AddProfileSectionAction {
  type: typeof EditEntityPageContentActions.AddProfileSection
  payload: {
    id: string
  }
}

export interface RemoveProfileSectionAction {
  type: typeof EditEntityPageContentActions.RemoveProfileSection
  payload: {
    id: string
  }
}

export interface UpdateProfileContentAction {
  type: typeof EditEntityPageContentActions.UpdateProfileContent
  payload: {
    id: string
    name: string
    position: string
    linkedInUrl: string
    twitterUrl: string
  }
}

export interface UploadProfileContentImageAction {
  type: typeof EditEntityPageContentActions.UploadProfileContentImage
  payload: Promise<{
    id: string
    fileSrc: string
  }>
}

export interface UploadProfileContentImagePendingAction {
  type: typeof EditEntityPageContentActions.UploadProfileContentImagePending
  meta: {
    id: string
  }
}

export interface UploadProfileContentImageSuccessAction {
  type: typeof EditEntityPageContentActions.UploadProfileContentImageSuccess
  payload: {
    id: string
    fileSrc: string
  }
}

export interface UploadProfileContentImageFailureAction {
  type: typeof EditEntityPageContentActions.UploadProfileContentImageFailure
  payload: {
    id: string
  }
}

export interface UpdateSocialContentAction {
  type: typeof EditEntityPageContentActions.UpdateSocialContent
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
  type: typeof EditEntityPageContentActions.AddEmbeddedSection
  payload: {
    id: string
  }
}

export interface RemoveEmbeddedSectionAction {
  type: typeof EditEntityPageContentActions.RemoveEmbeddedSection
  payload: {
    id: string
  }
}

export interface UpdateEmbeddedContentAction {
  type: typeof EditEntityPageContentActions.UpdateEmbeddedContent
  payload: {
    id: string
    title: string
    urls: string[]
  }
}

export interface ValidatedAction {
  type: typeof EditEntityPageContentActions.Validated
  payload: {
    identifier: string
  }
}

export interface ValidationErrorAction {
  type: typeof EditEntityPageContentActions.ValidationError
  payload: {
    identifier: string
    errors: string[]
  }
}

export interface ImportEntityPageContentAction {
  type: typeof EditEntityPageContentActions.ImportEntityPageContent
  payload: any
}

export interface OrderEntityPageContentAction {
  type: typeof EditEntityPageContentActions.OrderEntityPageContent
  payload: EditEntityPageContentState
}

export type EditEntityPageContentActionTypes =
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
  | ValidatedAction
  | ValidationErrorAction
  | ImportEntityPageContentAction
  | OrderEntityPageContentAction
