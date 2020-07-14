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
  title: string
  content: string
  imageDid: string
  uploadingImage: boolean
}

export interface ImagePageContent {
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

export interface PageContentSections {
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

export interface CreateEntityState {
  pageContentSections: PageContentSections
}

export enum CreateEntityActions {
  // Header
  UpdateHeaderPageContent = 'ixo/CreateEntity/UPDATE_HEADER_PAGE_CONTENT',
  UploadHeaderPageContentImage = 'ixo/CreateEntity/UPLOAD_HEADER_PAGE_CONTENT_IMAGE',
  UploadHeaderPageContentImagePending = 'ixo/CreateEntity/UPLOAD_HEADER_PAGE_CONTENT_IMAGE_PENDING',
  UploadHeaderPageContentImageSuccess = 'ixo/CreateEntity/UPLOAD_HEADER_PAGE_CONTENT_IMAGE_FULFILLED',
  UploadHeaderPageContentImageFailure = 'ixo/CreateEntity/UPLOAD_HEADER_PAGE_CONTENT_IMAGE_REJECTED',
  // Body
  AddBodyPageContentSection = 'ixo/CreateEntity/ADD_BODY_PAGE_CONTENT_SECTION',
  UpdateBodyPageContent = 'ixo/CreateEntity/UPDATE_BODY_PAGE_CONTENT',
  UploadBodyPageContentImage = 'ixo/CreateEntity/UPLOAD_BODY_PAGE_CONTENT_IMAGE',
  UploadBodyPageContentImagePending = 'ixo/CreateEntity/UPLOAD_BODY_PAGE_CONTENT_IMAGE_PENDING',
  UploadBodyPageContentImageSuccess = 'ixo/CreateEntity/UPLOAD_BODY_PAGE_CONTENT_IMAGE_FULFILLED',
  UploadBodyPageContentImageFailure = 'ixo/CreateEntity/UPLOAD_BODY_PAGE_CONTENT_IMAGE_REJECTED',
  // Image
  AddImagePageContentSection = 'ixo/CreateEntity/ADD_IMAGE_PAGE_CONTENT_SECTION',
  UpdateImagePageContent = 'ixo/CreateEntity/UPDATE_IMAGE_PAGE_CONTENT',
  UploadImagePageContentImage = 'ixo/CreateEntity/UPLOAD_IMAGE_PAGE_CONTENT_IMAGE',
  UploadImagePageContentImagePending = 'ixo/CreateEntity/UPLOAD_IMAGE_PAGE_CONTENT_IMAGE_PENDING',
  UploadImagePageContentImageSuccess = 'ixo/CreateEntity/UPLOAD_IMAGE_PAGE_CONTENT_IMAGE_FULFILLED',
  UploadImagePageContentImageFailure = 'ixo/CreateEntity/UPLOAD_IMAGE_PAGE_CONTENT_IMAGE_REJECTED',
  // Video
  AddVideoPageContentSection = 'ixo/CreateEntity/ADD_VIDEO_PAGE_CONTENT_SECTION',
  UpdateVideoPageContent = 'ixo/CreateEntity/UPDATE_VIDEO_PAGE_CONTENT',
  UploadVideoPageContentVideo = 'ixo/CreateEntity/UPLOAD_VIDEO_PAGE_CONTENT_VIDEO',
  UploadVideoPageContentVideoPending = 'ixo/CreateEntity/UPLOAD_VIDEO_PAGE_CONTENT_VIDEO_PENDING',
  UploadVideoPageContentVideoSuccess = 'ixo/CreateEntity/UPLOAD_VIDEO_PAGE_CONTENT_VIDEO_FULFILLED',
  UploadVideoPageContentVideoFailure = 'ixo/CreateEntity/UPLOAD_VIDEO_PAGE_CONTENT_VIDEO_REJECTED',
  // Profile
  AddProfilePageContentSection = 'ixo/CreateEntity/ADD_PROFILE_PAGE_CONTENT_SECTION',
  UpdateProfilePageContent = 'ixo/CreateEntity/UPDATE_PROFILE_PAGE_CONTENT',
  UploadProfilePageContentImage = 'ixo/CreateEntity/UPLOAD_PROFILE_PAGE_CONTENT_IMAGE',
  UploadProfilePageContentImagePending = 'ixo/CreateEntity/UPLOAD_PROFILE_PAGE_CONTENT_IMAGE_PENDING',
  UploadProfilePageContentImageSuccess = 'ixo/CreateEntity/UPLOAD_PROFILE_PAGE_CONTENT_IMAGE_FULFILLED',
  UploadProfilePageContentImageFailure = 'ixo/CreateEntity/UPLOAD_PROFILE_PAGE_CONTENT_IMAGE_REJECTED',
  // Table
  UpdateTablePageContent = 'ixo/CreateEntity/ADD_TABLE_PAGE_CONTENT',
  // Social
  UpdateSocialPageContent = 'ixo/CreateEntity/UPDATE_SOCIAL_PAGE_CONTENT',
  // Embedded
  AddEmbeddedPageContentSection = 'ixo/CreateEntity/ADD_EMBEDDED_PAGE_CONTENT_SECTION',
  UpdateEmbeddedPageContent = 'ixo/CreateEntity/UPDATE_EMBEDDED_PAGE_CONTENT',
}

export interface UpdateHeaderPageContentAction {
  type: typeof CreateEntityActions.UpdateHeaderPageContent
  payload: {
    title: string
    shortDescription: string
    imageDescription: string
    sdgs: string[]
    country: string
  }
}

export interface UploadHeaderPageContentImageAction {
  type: typeof CreateEntityActions.UploadHeaderPageContentImage
  payload: Promise<string>
}
