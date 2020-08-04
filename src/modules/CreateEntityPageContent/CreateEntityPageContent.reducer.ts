import {
  CreateEntityPageContentState,
  CreateEntityPageContentActionTypes,
  CreateEntityPageContentActions,
} from './types'
import * as reduxUtils from '../../common/redux/utils'

export const initialState: CreateEntityPageContentState = {
  header: {
    title: null,
    shortDescription: null,
    imageDescription: null,
    sdgs: [],
    company: null,
    country: null,
    imageDid: null,
    uploadingImage: false,
  },
  body: {},
  images: {},
  videos: {},
  profiles: {},
  social: {
    linkedInUrl: null,
    facebookUrl: null,
    twitterUrl: null,
    discourseUrl: null,
    instagramUrl: null,
    telegramUrl: null,
    githubUrl: null,
    otherUrl: null,
  },
  embedded: {},
}

export const reducer = (
  state = initialState,
  action: CreateEntityPageContentActionTypes,
): CreateEntityPageContentState => {
  switch (action.type) {
    case CreateEntityPageContentActions.UpdateHeaderContent:
      return {
        ...state,
        header: {
          ...state.header,
          ...action.payload,
        },
      }
    case CreateEntityPageContentActions.UploadHeaderContentImagePending:
      return {
        ...state,
        header: {
          ...state.header,
          uploadingImage: true,
        },
      }
    case CreateEntityPageContentActions.UploadHeaderContentImageSuccess:
      return {
        ...state,
        header: {
          ...state.header,
          uploadingImage: false,
          imageDid: action.payload.did,
        },
      }
    case CreateEntityPageContentActions.UploadHeaderContentImageFailure:
      return {
        ...state,
        header: {
          ...state.header,
          uploadingImage: false,
        },
      }
    case CreateEntityPageContentActions.AddBodySection:
      return {
        ...state,
        body: {
          ...state.body,
          ...{
            [action.payload.id]: { ...action.payload, uploadingImage: false },
          },
        },
      }
    case CreateEntityPageContentActions.RemoveBodySection:
      return {
        ...state,
        body: reduxUtils.omitKey(state.body, action.payload.id),
      }
    case CreateEntityPageContentActions.UpdateBodyContent:
      return {
        ...state,
        body: {
          ...state.body,
          ...{
            [action.payload.id]: {
              ...action.payload,
              imageDid: state.body[action.payload.id].imageDid,
              uploadingImage: false,
            },
          },
        },
      }
    case CreateEntityPageContentActions.UploadBodyContentImagePending:
      return {
        ...state,
        body: {
          ...state.body,
          ...{
            [action.meta.id]: {
              ...state.body[action.meta.id],
              uploadingImage: true,
            },
          },
        },
      }
    case CreateEntityPageContentActions.UploadBodyContentImageSuccess:
      return {
        ...state,
        body: {
          ...state.body,
          ...{
            [action.payload.id]: {
              ...state.body[action.payload.id],
              imageDid: action.payload.did,
              uploadingImage: false,
            },
          },
        },
      }
    case CreateEntityPageContentActions.UploadBodyContentImageFailure:
      return {
        ...state,
        body: {
          ...state.body,
          ...{
            [action.payload.id]: {
              ...state.body[action.payload.id],
              uploadingImage: false,
            },
          },
        },
      }
    case CreateEntityPageContentActions.AddImageSection:
      return {
        ...state,
        images: {
          ...state.images,
          ...{
            [action.payload.id]: { ...action.payload, uploadingImage: false },
          },
        },
      }
    case CreateEntityPageContentActions.RemoveImageSection:
      return {
        ...state,
        images: reduxUtils.omitKey(state.images, action.payload.id),
      }
    case CreateEntityPageContentActions.UpdateImageContent:
      return {
        ...state,
        images: {
          ...state.images,
          ...{
            [action.payload.id]: {
              ...action.payload,
              imageDid: state.images[action.payload.id].imageDid,
              uploadingImage: false,
            },
          },
        },
      }
    case CreateEntityPageContentActions.UploadImageContentImagePending:
      return {
        ...state,
        images: {
          ...state.images,
          ...{
            [action.meta.id]: {
              ...state.images[action.meta.id],
              uploadingImage: true,
            },
          },
        },
      }
    case CreateEntityPageContentActions.UploadImageContentImageSuccess:
      return {
        ...state,
        images: {
          ...state.images,
          ...{
            [action.payload.id]: {
              ...state.images[action.payload.id],
              imageDid: action.payload.did,
              uploadingImage: false,
            },
          },
        },
      }
    case CreateEntityPageContentActions.UploadImageContentImageFailure:
      return {
        ...state,
        images: {
          ...state.images,
          ...{
            [action.payload.id]: {
              ...state.images[action.payload.id],
              uploadingImage: false,
            },
          },
        },
      }
    case CreateEntityPageContentActions.AddVideoSection:
      return {
        ...state,
        videos: {
          ...state.videos,
          ...{
            [action.payload.id]: { ...action.payload, uploadingVideo: false },
          },
        },
      }
    case CreateEntityPageContentActions.RemoveVideoSection:
      return {
        ...state,
        videos: reduxUtils.omitKey(state.videos, action.payload.id),
      }
    case CreateEntityPageContentActions.UpdateVideoContent:
      return {
        ...state,
        videos: {
          ...state.videos,
          ...{
            [action.payload.id]: {
              ...action.payload,
              videoDid: state.videos[action.payload.id].videoDid,
              uploadingVideo: false,
            },
          },
        },
      }
    case CreateEntityPageContentActions.UploadVideoContentVideoPending:
      return {
        ...state,
        videos: {
          ...state.videos,
          ...{
            [action.meta.id]: {
              ...state.videos[action.meta.id],
              uploadingVideo: true,
            },
          },
        },
      }
    case CreateEntityPageContentActions.UploadVideoContentVideoSuccess:
      return {
        ...state,
        videos: {
          ...state.videos,
          ...{
            [action.payload.id]: {
              ...state.videos[action.payload.id],
              videoDid: action.payload.did,
              uploadingVideo: false,
            },
          },
        },
      }
    case CreateEntityPageContentActions.UploadVideoContentVideoFailure:
      return {
        ...state,
        videos: {
          ...state.videos,
          ...{
            [action.payload.id]: {
              ...state.videos[action.payload.id],
              uploadingVideo: false,
            },
          },
        },
      }
    case CreateEntityPageContentActions.AddProfileSection:
      return {
        ...state,
        profiles: {
          ...state.profiles,
          ...{
            [action.payload.id]: { ...action.payload, uploadingImage: false },
          },
        },
      }
    case CreateEntityPageContentActions.RemoveProfileSection:
      return {
        ...state,
        profiles: reduxUtils.omitKey(state.profiles, action.payload.id),
      }
    case CreateEntityPageContentActions.UpdateProfileContent:
      return {
        ...state,
        profiles: {
          ...state.profiles,
          ...{
            [action.payload.id]: {
              ...action.payload,
              imageDid: state.profiles[action.payload.id].imageDid,
              uploadingImage: false,
            },
          },
        },
      }
    case CreateEntityPageContentActions.UploadProfileContentImagePending:
      return {
        ...state,
        profiles: {
          ...state.profiles,
          ...{
            [action.meta.id]: {
              ...state.profiles[action.meta.id],
              uploadingImage: true,
            },
          },
        },
      }
    case CreateEntityPageContentActions.UploadProfileContentImageSuccess:
      return {
        ...state,
        profiles: {
          ...state.profiles,
          ...{
            [action.payload.id]: {
              ...state.profiles[action.payload.id],
              imageDid: action.payload.did,
              uploadingImage: false,
            },
          },
        },
      }
    case CreateEntityPageContentActions.UploadProfileContentImageFailure:
      return {
        ...state,
        profiles: {
          ...state.profiles,
          ...{
            [action.payload.id]: {
              ...state.profiles[action.payload.id],
              uploadingImage: false,
            },
          },
        },
      }
    case CreateEntityPageContentActions.UpdateSocialContent:
      return {
        ...state,
        social: {
          ...state.social,
          ...action.payload,
        },
      }
    case CreateEntityPageContentActions.AddEmbeddedSection:
      return {
        ...state,
        embedded: {
          ...state.embedded,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityPageContentActions.RemoveEmbeddedSection:
      return {
        ...state,
        embedded: reduxUtils.omitKey(state.embedded, action.payload.id),
      }
    case CreateEntityPageContentActions.UpdateEmbeddedContent:
      return {
        ...state,
        embedded: {
          ...state.embedded,
          ...{ [action.payload.id]: action.payload },
        },
      }
  }

  return state
}
