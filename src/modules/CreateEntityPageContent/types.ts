// TODO - Table

export enum EmbeddedPageContentType {
  Blog = 'blog',
}

export interface HeaderPageContent {
  title: string
  shortDescription: string
  imageDid: string
  imageDescription: string
  sdgs: string[]
  company: string
  country: string
  uploadingImage: boolean
}

export interface BodyPageContent {
  id: string
  title: string
  content: string
  imageDid: string
  uploadingImage: boolean
}

export interface ImagePageContent {
  id: string
  title: string
  content: string
  imageDid: string
  imageDescription: string
  uploadingImage: boolean
}

export interface VideoPageContent {
  id: string
  title: string
  content: string
  videoDid: string
  uploadingVideo: boolean
}

export interface ProfilePageContent {
  id: string
  name: string
  position: string
  linkedInUrl: string
  twitterUrl: string
  imageDid: string
  uploadingImage: boolean
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
  type: EmbeddedPageContentType
  urls: string[]
}

export interface CreateEntityPageContentState {
  header: HeaderPageContent
  body: {
    [id: string]: BodyPageContent
  }
  images: {
    [id: string]: ImagePageContent
  }
  videos: {
    [id: string]: VideoPageContent
  }
  profiles: {
    [id: string]: ProfilePageContent
  }
  social: SocialPageContent
  embedded: {
    [id: string]: EmbeddedPageContent
  }
}

export enum CreateEntityPageContentActions {
  // Header
  UpdateHeaderContent = 'ixo/CreateEntity/UPDATE_HEADER',
  UploadHeaderContentImage = 'ixo/CreateEntity/UPLOAD_HEADER_IMAGE',
  UploadHeaderContentImagePending = 'ixo/CreateEntity/UPLOAD_HEADER_IMAGE_PENDING',
  UploadHeaderContentImageSuccess = 'ixo/CreateEntity/UPLOAD_HEADER_IMAGE_FULFILLED',
  UploadHeaderContentImageFailure = 'ixo/CreateEntity/UPLOAD_HEADER_IMAGE_REJECTED',
  // Body
  AddBodySection = 'ixo/CreateEntity/ADD_BODY_SECTION',
  RemoveBodySection = 'ixo/CreateEntity/REMOVE_BODY_SECTION',
  UpdateBodyContent = 'ixo/CreateEntity/UPDATE_BODY',
  UploadBodyContentImage = 'ixo/CreateEntity/UPLOAD_BODY_IMAGE',
  UploadBodyContentImagePending = 'ixo/CreateEntity/UPLOAD_BODY_IMAGE_PENDING',
  UploadBodyContentImageSuccess = 'ixo/CreateEntity/UPLOAD_BODY_IMAGE_FULFILLED',
  UploadBodyContentImageFailure = 'ixo/CreateEntity/UPLOAD_BODY_IMAGE_REJECTED',
  // Image
  AddImageSection = 'ixo/CreateEntity/ADD_IMAGE_SECTION',
  RemoveImageSection = 'ixo/CreateEntity/REMOVE_IMAGE_SECTION',
  UpdateImageContent = 'ixo/CreateEntity/UPDATE_IMAGE',
  UploadImageContentImage = 'ixo/CreateEntity/UPLOAD_IMAGE_IMAGE',
  UploadImageContentImagePending = 'ixo/CreateEntity/UPLOAD_IMAGE_IMAGE_PENDING',
  UploadImageContentImageSuccess = 'ixo/CreateEntity/UPLOAD_IMAGE_IMAGE_FULFILLED',
  UploadImageContentImageFailure = 'ixo/CreateEntity/UPLOAD_IMAGE_IMAGE_REJECTED',
  // Video
  AddVideoSection = 'ixo/CreateEntity/ADD_VIDEO_SECTION',
  RemoveVideoSection = 'ixo/CreateEntity/REMOVE_VIDEO_SECTION',
  UpdateVideoContent = 'ixo/CreateEntity/UPDATE_VIDEO',
  UploadVideoContentVideo = 'ixo/CreateEntity/UPLOAD_VIDEO_VIDEO',
  UploadVideoContentVideoPending = 'ixo/CreateEntity/UPLOAD_VIDEO_VIDEO_PENDING',
  UploadVideoContentVideoSuccess = 'ixo/CreateEntity/UPLOAD_VIDEO_VIDEO_FULFILLED',
  UploadVideoContentVideoFailure = 'ixo/CreateEntity/UPLOAD_VIDEO_VIDEO_REJECTED',
  // Profile
  AddProfileSection = 'ixo/CreateEntity/ADD_PROFILE_SECTION',
  RemoveProfileSection = 'ixo/CreateEntity/REMOVE_PROFILE_SECTION',
  UpdateProfileContent = 'ixo/CreateEntity/UPDATE_PROFILE',
  UploadProfileContentImage = 'ixo/CreateEntity/UPLOAD_PROFILE_IMAGE',
  UploadProfileContentImagePending = 'ixo/CreateEntity/UPLOAD_PROFILE_IMAGE_PENDING',
  UploadProfileContentImageSuccess = 'ixo/CreateEntity/UPLOAD_PROFILE_IMAGE_FULFILLED',
  UploadProfileContentImageFailure = 'ixo/CreateEntity/UPLOAD_PROFILE_IMAGE_REJECTED',
  // Social
  UpdateSocialContent = 'ixo/CreateEntity/UPDATE_SOCIAL',
  // Embedded
  AddEmbeddedSection = 'ixo/CreateEntity/ADD_EMBEDDED_SECTION',
  RemoveEmbeddedSection = 'ixo/CreateEntity/REMOVE_EMBEDDED_SECTION',
  UpdateEmbeddedContent = 'ixo/CreateEntity/UPDATE_EMBEDDED',
}

export interface UpdateHeaderContentAction {
  type: typeof CreateEntityPageContentActions.UpdateHeaderContent
  payload: {
    title: string
    shortDescription: string
    imageDescription: string
    sdgs: string[]
    company: string
    country: string
  }
}

export interface UploadHeaderImageAction {
  type: typeof CreateEntityPageContentActions.UploadHeaderContentImage
  payload: Promise<{
    did: string
  }>
}

export interface UploadHeaderImagePendingAction {
  type: typeof CreateEntityPageContentActions.UploadHeaderContentImagePending
}

export interface UploadHeaderImageSuccessAction {
  type: typeof CreateEntityPageContentActions.UploadHeaderContentImageSuccess
  payload: {
    did: string
  }
}

export interface UploadHeaderImageFailureAction {
  type: typeof CreateEntityPageContentActions.UploadHeaderContentImageFailure
}

export interface AddBodySectionAction {
  type: typeof CreateEntityPageContentActions.AddBodySection
  payload: {
    id: string
    title: string
    content: string
    imageDid: string
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
    did: string
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
    did: string
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
    title: string
    content: string
    imageDid: string
    imageDescription: string
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
    did: string
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
    did: string
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
    title: string
    content: string
    videoDid: string
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
    did: string
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
    did: string
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
    name: string
    position: string
    linkedInUrl: string
    twitterUrl: string
    imageDid: string
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
    did: string
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
    did: string
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
    title: string
    type: EmbeddedPageContentType
    urls: string[]
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
    type: EmbeddedPageContentType
    urls: string[]
  }
}

export type CreateEntityPageContentActionTypes =
  | UpdateHeaderContentAction
  | UploadHeaderImageAction
  | UploadHeaderImagePendingAction
  | UploadHeaderImageSuccessAction
  | UploadHeaderImageFailureAction
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
