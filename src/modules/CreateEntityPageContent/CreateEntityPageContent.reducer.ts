import {
  PageContentState,
  CreateEntityPageContentActionTypes,
  CreateEntityPageContentActions,
} from './types'

export const initialState: PageContentState = {
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
    facebookInUrl: null,
    twitterInUrl: null,
    discourseInUrl: null,
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
): PageContentState => {
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
            [action.payload.id]: {
              ...state.body[action.payload.id],
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
  }

  return state
}
