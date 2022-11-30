import {
  EditEntityPageContentState,
  EditEntityPageContentActionTypes,
  EditEntityPageContentActions,
} from './editEntityPageContent.types'
import { EditEntityActionTypes, EditEntityActions } from '../editEntity/editEntity.types'
import { omitKey } from 'utils'

export const initialState: EditEntityPageContentState = {
  header: {
    title: undefined,
    shortDescription: undefined,
    imageDescription: undefined,
    sdgs: [],
    brand: undefined,
    location: undefined,
    headerFileSrc: undefined,
    headerFileUploading: false,
    logoFileSrc: undefined,
    logoFileUploading: false,
  },
  body: {},
  images: {},
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
  validation: {},
} as any

export const reducer = (
  state = initialState,
  action: EditEntityPageContentActionTypes | EditEntityActionTypes,
): EditEntityPageContentState => {
  switch (action.type) {
    case EditEntityPageContentActions.UpdateHeaderContent:
      return {
        ...state,
        header: {
          ...state.header,
          ...action.payload,
        },
      }
    case EditEntityPageContentActions.UploadHeaderContentImagePending:
      return {
        ...state,
        header: {
          ...state.header,
          headerFileUploading: true,
        },
      }
    case EditEntityPageContentActions.UploadHeaderContentImageSuccess:
      return {
        ...state,
        header: {
          ...state.header,
          headerFileUploading: false,
          headerFileSrc: action.payload.headerFileSrc,
        },
      }
    case EditEntityPageContentActions.UploadHeaderContentImageFailure:
      return {
        ...state,
        header: {
          ...state.header,
          headerFileUploading: false,
        },
      }
    case EditEntityPageContentActions.UploadHeaderContentLogoPending:
      return {
        ...state,
        header: {
          ...state.header,
          logoFileUploading: true,
        },
      }
    case EditEntityPageContentActions.UploadHeaderContentLogoSuccess:
      return {
        ...state,
        header: {
          ...state.header,
          logoFileUploading: false,
          logoFileSrc: action.payload.logoFileSrc,
        },
      }
    case EditEntityPageContentActions.UploadHeaderContentLogoFailure:
      return {
        ...state,
        header: {
          ...state.header,
          logoFileUploading: false,
        },
      }
    case EditEntityPageContentActions.AddBodySection:
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
        } as any,
      }
    case EditEntityPageContentActions.RemoveBodySection:
      return {
        ...state,
        body: omitKey(state.body, action.payload.id),
      }
    case EditEntityPageContentActions.UpdateBodyContent:
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
    case EditEntityPageContentActions.UploadBodyContentImagePending:
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
    case EditEntityPageContentActions.UploadBodyContentImageSuccess:
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
    case EditEntityPageContentActions.UploadBodyContentImageFailure:
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
    case EditEntityPageContentActions.AddImageSection:
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
        } as any,
      }
    case EditEntityPageContentActions.RemoveImageSection:
      return {
        ...state,
        images: omitKey(state.images, action.payload.id),
      }
    case EditEntityPageContentActions.UpdateImageContent:
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
    case EditEntityPageContentActions.UploadImageContentImagePending:
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
    case EditEntityPageContentActions.UploadImageContentImageSuccess:
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
    case EditEntityPageContentActions.UploadImageContentImageFailure:
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
    case EditEntityPageContentActions.AddProfileSection:
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
        } as any,
      }
    case EditEntityPageContentActions.RemoveProfileSection:
      return {
        ...state,
        profiles: omitKey(state.profiles, action.payload.id),
      }
    case EditEntityPageContentActions.UpdateProfileContent:
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
    case EditEntityPageContentActions.UploadProfileContentImagePending:
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
    case EditEntityPageContentActions.UploadProfileContentImageSuccess:
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
    case EditEntityPageContentActions.UploadProfileContentImageFailure:
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
    case EditEntityPageContentActions.UpdateSocialContent:
      return {
        ...state,
        social: {
          ...state.social,
          ...action.payload,
        },
      }
    case EditEntityPageContentActions.AddEmbeddedSection:
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
        } as any,
      }
    case EditEntityPageContentActions.RemoveEmbeddedSection:
      return {
        ...state,
        embedded: omitKey(state.embedded, action.payload.id),
      }
    case EditEntityPageContentActions.UpdateEmbeddedContent:
      return {
        ...state,
        embedded: {
          ...state.embedded,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case EditEntityPageContentActions.Validated:
      return {
        ...state,
        validation: {
          ...state.validation,
          ...{
            [action.payload.identifier]: {
              identifier: action.payload.identifier,
              validated: true,
              errors: [],
            },
          },
        },
      }
    case EditEntityPageContentActions.ImportEntityPageContent:
      return {
        ...state,
        ...action.payload,
      }
    case EditEntityPageContentActions.ValidationError:
      return {
        ...state,
        validation: {
          ...state.validation,
          ...{
            [action.payload.identifier]: {
              identifier: action.payload.identifier,
              validated: false,
              errors: action.payload.errors,
            },
          },
        },
      }
    case EditEntityActions.NewEntity:
    case EditEntityActions.EditEntitySuccess:
      return initialState
    case EditEntityPageContentActions.OrderEntityPageContent:
      return action.payload
  }

  return state
}
