import {
  CreateEntityPageContentState,
  CreateEntityPageContentActionTypes,
  CreateEntityPageContentActions,
} from './types'
import * as reduxUtils from '../../common/redux/utils'

export const initialState: CreateEntityPageContentState = {
  header: {
    title: undefined,
    shortDescription: undefined,
    imageDescription: undefined,
    sdgs: [],
    company: undefined,
    country: undefined,
    fileSrc: undefined,
    uploading: false,
  },
  body: {},
  images: {},
  videos: {},
  profiles: {},
  social: {
    linkedInUrl: undefined,
    facebookUrl: undefined,
    twitterUrl: undefined,
    discourseUrl: undefined,
    instagramUrl: undefined,
    telegramUrl: undefined,
    githubUrl: undefined,
    otherUrl: undefined,
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
          uploading: true,
        },
      }
    case CreateEntityPageContentActions.UploadHeaderContentImageSuccess:
      return {
        ...state,
        header: {
          ...state.header,
          uploading: false,
          fileSrc: action.payload.fileSrc,
        },
      }
    case CreateEntityPageContentActions.UploadHeaderContentImageFailure:
      return {
        ...state,
        header: {
          ...state.header,
          uploading: false,
        },
      }
    case CreateEntityPageContentActions.AddBodySection:
      return {
        ...state,
        body: {
          ...state.body,
          ...{
            [action.payload.id]: {
              ...action.payload,
              title: undefined,
              content: undefined,
              uploading: false,
              fileSrc: undefined,
            },
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
              ...state.body[action.payload.id],
              ...action.payload,
              uploading: false,
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
              uploading: true,
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
              fileSrc: action.payload.fileSrc,
              uploading: false,
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
              uploading: false,
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
            [action.payload.id]: {
              ...action.payload,
              title: undefined,
              content: undefined,
              imageDescription: undefined,
              uploading: false,
              fileSrc: undefined,
            },
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
              ...state.images[action.payload.id],
              ...action.payload,
              uploading: false,
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
              uploading: true,
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
              fileSrc: action.payload.fileSrc,
              uploading: false,
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
              uploading: false,
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
            [action.payload.id]: {
              ...action.payload,
              uploading: false,
              title: undefined,
              content: undefined,
              fileSrc: undefined,
            },
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
              ...state.videos[action.payload.id],
              ...action.payload,
              uploading: false,
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
              uploading: true,
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
              fileSrc: action.payload.fileSrc,
              uploading: false,
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
              uploading: false,
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
            [action.payload.id]: {
              ...action.payload,
              name: undefined,
              position: undefined,
              linkedInUrl: undefined,
              twitterUrl: undefined,
              uploading: false,
              fileSrc: undefined,
            },
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
              ...state.profiles[action.payload.id],
              ...action.payload,
              uploading: false,
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
              uploading: true,
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
              fileSrc: action.payload.fileSrc,
              uploading: false,
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
              uploading: false,
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
          ...{
            [action.payload.id]: {
              ...action.payload,
              title: undefined,
              urls: [],
            },
          },
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
