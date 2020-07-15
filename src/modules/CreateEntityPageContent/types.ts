export enum EmbeddedPageContentType {
  Blog = 'blog',
}

export interface HeaderPageContent {
  title: string
  shortDescription: string
  imageDid: string
  imageDescription: string
  sdgs: string[]
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
  title: string
  content: string
  videoDid: string
  uploadingVideo: boolean
}

export interface TablePageContent {
  row: string[]
  columns: string[][]
}

export interface ProfilePageContent {
  name: string
  position: string
  linkedInUrl: string
  twitterUrl: string
  imageDid: string
  uploadingImage: boolean
}

export interface SocialPageContent {
  linkedInUrl: string
  facebookInUrl: string
  twitterInUrl: string
  discourseInUrl: string
  instagramUrl: string
  telegramUrl: string
  githubUrl: string
  otherUrl: string
}

export interface EmbeddedPageContent {
  title: string
  type: EmbeddedPageContentType
  url: string
}

export interface PageContentState {
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
  table: TablePageContent
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
  UpdateHeader = 'ixo/CreateEntity/UPDATE_HEADER',
  UploadHeaderImage = 'ixo/CreateEntity/UPLOAD_HEADER_IMAGE',
  UploadHeaderImagePending = 'ixo/CreateEntity/UPLOAD_HEADER_IMAGE_PENDING',
  UploadHeaderImageSuccess = 'ixo/CreateEntity/UPLOAD_HEADER_IMAGE_FULFILLED',
  UploadHeaderImageFailure = 'ixo/CreateEntity/UPLOAD_HEADER_IMAGE_REJECTED',
  // Body
  AddBodySection = 'ixo/CreateEntity/ADD_BODY_SECTION',
  UpdateBody = 'ixo/CreateEntity/UPDATE_BODY',
  UploadBodyImage = 'ixo/CreateEntity/UPLOAD_BODY_IMAGE',
  UploadBodyImagePending = 'ixo/CreateEntity/UPLOAD_BODY_IMAGE_PENDING',
  UploadBodyImageSuccess = 'ixo/CreateEntity/UPLOAD_BODY_IMAGE_FULFILLED',
  UploadBodyImageFailure = 'ixo/CreateEntity/UPLOAD_BODY_IMAGE_REJECTED',
  // Image
  AddImageSection = 'ixo/CreateEntity/ADD_IMAGE_SECTION',
  UpdateImage = 'ixo/CreateEntity/UPDATE_IMAGE',
  UploadImageImage = 'ixo/CreateEntity/UPLOAD_IMAGE_IMAGE',
  UploadImageImagePending = 'ixo/CreateEntity/UPLOAD_IMAGE_IMAGE_PENDING',
  UploadImageImageSuccess = 'ixo/CreateEntity/UPLOAD_IMAGE_IMAGE_FULFILLED',
  UploadImageImageFailure = 'ixo/CreateEntity/UPLOAD_IMAGE_IMAGE_REJECTED',
  // Video
  AddVideoSection = 'ixo/CreateEntity/ADD_VIDEO_SECTION',
  UpdateVideo = 'ixo/CreateEntity/UPDATE_VIDEO',
  UploadVideoVideo = 'ixo/CreateEntity/UPLOAD_VIDEO_VIDEO',
  UploadVideoVideoPending = 'ixo/CreateEntity/UPLOAD_VIDEO_VIDEO_PENDING',
  UploadVideoVideoSuccess = 'ixo/CreateEntity/UPLOAD_VIDEO_VIDEO_FULFILLED',
  UploadVideoVideoFailure = 'ixo/CreateEntity/UPLOAD_VIDEO_VIDEO_REJECTED',
  // Profile
  AddProfileSection = 'ixo/CreateEntity/ADD_PROFILE_SECTION',
  UpdateProfile = 'ixo/CreateEntity/UPDATE_PROFILE',
  UploadProfileImage = 'ixo/CreateEntity/UPLOAD_PROFILE_IMAGE',
  UploadProfileImagePending = 'ixo/CreateEntity/UPLOAD_PROFILE_IMAGE_PENDING',
  UploadProfileImageSuccess = 'ixo/CreateEntity/UPLOAD_PROFILE_IMAGE_FULFILLED',
  UploadProfileImageFailure = 'ixo/CreateEntity/UPLOAD_PROFILE_IMAGE_REJECTED',
  // Table
  UpdateTable = 'ixo/CreateEntity/ADD_TABLE',
  // Social
  UpdateSocial = 'ixo/CreateEntity/UPDATE_SOCIAL',
  // Embedded
  AddEmbeddedSection = 'ixo/CreateEntity/ADD_EMBEDDED_SECTION',
  UpdateEmbedded = 'ixo/CreateEntity/UPDATE_EMBEDDED',
}

export interface UpdateHeaderAction {
  type: typeof CreateEntityPageContentActions.UpdateHeader
  payload: {
    title: string
    shortDescription: string
    imageDescription: string
    sdgs: string[]
    country: string
  }
}

export interface UploadHeaderImageAction {
  type: typeof CreateEntityPageContentActions.UploadHeaderImage
  payload: Promise<string>
}

export interface AddBodySectionAction {
  type: typeof CreateEntityPageContentActions.AddBodySection
  payload: {
    id: string
  }
}

export interface UpdateBodyContentAction {
  type: typeof CreateEntityPageContentActions.UpdateBody
  payload: {
    id: string
    title: string
    content: string
  }
}

export interface UploadBodyImageAction {
  type: typeof CreateEntityPageContentActions.UploadBodyImage
  payload: Promise<{
    id: string
    did: string
  }>
}

export interface AddImageSectionAction {
  type: typeof CreateEntityPageContentActions.AddImageSection
  payload: {
    id: string
  }
}

export interface UpdateImageAction {
  type: typeof CreateEntityPageContentActions.UpdateImage
  payload: {
    id: string
    title: string
    content: string
    imageDescription: string
  }
}

export interface UploadImageAction {
  type: typeof CreateEntityPageContentActions.UploadImageImage
  payload: Promise<{
    id: string
    did: string
  }>
}
