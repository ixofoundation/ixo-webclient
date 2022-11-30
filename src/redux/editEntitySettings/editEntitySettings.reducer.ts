import {
  EditEntitySettingsActionTypes,
  EditEntitySettingsActions,
  EditEntitySettingsState,
} from './editEntitySettings.types'
import { EditEntityActionTypes, EditEntityActions } from '../editEntity/editEntity.types'
import { omitKey } from 'utils'

export const initialState: EditEntitySettingsState = {
  creator: {
    displayName: undefined,
    location: undefined,
    email: undefined,
    website: undefined,
    mission: undefined,
    creatorId: undefined,
    credential: undefined,
    fileSrc: undefined,
    uploading: false,
  },
  owner: {
    displayName: undefined,
    location: undefined,
    email: undefined,
    website: undefined,
    mission: undefined,
    ownerId: undefined,
    fileSrc: undefined,
    uploading: false,
  },
  status: {
    startDate: undefined,
    endDate: undefined,
    stage: undefined,
    status: undefined,
  },
  version: {
    versionNumber: undefined,
    effectiveDate: undefined,
    notes: undefined,
  },
  termsOfUse: {
    type: undefined,
    paymentTemplateId: undefined,
  },
  privacy: {
    entityView: undefined,
    pageView: undefined,
  },
  requiredCredentials: {},
  filters: {},
  displayCredentials: {},
  validation: {},
  headlineTemplateId: undefined,
  embeddedAnalytics: {},
} as any

export const reducer = (
  state = initialState,
  action: EditEntitySettingsActionTypes | EditEntityActionTypes,
): EditEntitySettingsState => {
  switch (action.type) {
    case EditEntitySettingsActions.UpdateOwner:
      return {
        ...state,
        owner: {
          ...state.owner,
          ...action.payload,
        },
      }
    case EditEntitySettingsActions.UploadOwnerImagePending:
      return {
        ...state,
        owner: {
          ...state.owner,
          uploading: true,
        },
      }
    case EditEntitySettingsActions.UploadOwnerImageSuccess:
      return {
        ...state,
        owner: {
          ...state.owner,
          uploading: false,
          fileSrc: action.payload.fileSrc,
        },
      }
    case EditEntitySettingsActions.UploadOwnerImageFailure:
      return {
        ...state,
        owner: {
          ...state.owner,
          uploading: false,
        },
      }
    case EditEntitySettingsActions.UpdateCreator:
      return {
        ...state,
        creator: {
          ...state.creator,
          ...action.payload,
        },
      }
    case EditEntitySettingsActions.UploadCreatorImagePending:
      return {
        ...state,
        creator: {
          ...state.creator,
          uploading: true,
        },
      }
    case EditEntitySettingsActions.UploadCreatorImageSuccess:
      return {
        ...state,
        creator: {
          ...state.creator,
          uploading: false,
          fileSrc: action.payload.fileSrc,
        },
      }
    case EditEntitySettingsActions.UploadCreatorImageFailure:
      return {
        ...state,
        creator: {
          ...state.creator,
          uploading: false,
        },
      }
    case EditEntitySettingsActions.UpdateStatus:
      return {
        ...state,
        status: action.payload,
      }
    case EditEntitySettingsActions.UpdatePrivacy:
      return {
        ...state,
        privacy: action.payload,
      }
    case EditEntitySettingsActions.UpdateVersion:
      return {
        ...state,
        version: action.payload,
      }
    case EditEntitySettingsActions.UpdateTermsOfUse:
      return {
        ...state,
        termsOfUse: action.payload,
      }
    case EditEntitySettingsActions.AddRequiredCredentialSection:
      return {
        ...state,
        requiredCredentials: {
          ...state.requiredCredentials,
          ...{
            [action.payload.id]: {
              ...action.payload,
              credential: undefined,
              issuer: undefined,
            },
          },
        } as any,
      }
    case EditEntitySettingsActions.RemoveRequiredCredentialSection:
      return {
        ...state,
        requiredCredentials: omitKey(state.requiredCredentials, action.payload.id),
      }
    case EditEntitySettingsActions.UpdateRequiredCredential:
      return {
        ...state,
        requiredCredentials: {
          ...state.requiredCredentials,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case EditEntitySettingsActions.UpdateFilters:
      return {
        ...state,
        filters: action.payload,
      }
    case EditEntitySettingsActions.AddDisplayCredentialSection:
      return {
        ...state,
        displayCredentials: {
          ...state.displayCredentials,
          ...{
            [action.payload.id]: {
              ...action.payload,
              credential: undefined,
              badge: undefined,
            },
          },
        } as any,
      }
    case EditEntitySettingsActions.RemoveDisplayCredentialSection:
      return {
        ...state,
        displayCredentials: omitKey(state.displayCredentials, action.payload.id),
      }
    case EditEntitySettingsActions.UpdateDisplayCredential:
      return {
        ...state,
        displayCredentials: {
          ...state.displayCredentials,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case EditEntitySettingsActions.Validated:
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
    case EditEntitySettingsActions.UpdateHeadlineMetric:
      return {
        ...state,
        headlineTemplateId: action.payload.headlineTemplateId,
      }
    case EditEntitySettingsActions.ValidationError:
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
    case EditEntitySettingsActions.AddAnalyticsSection:
      return {
        ...state,
        embeddedAnalytics: {
          ...state.embeddedAnalytics,
          ...{
            [action.payload.id]: {
              ...action.payload,
              title: undefined,
              urls: [],
            },
          },
        } as any,
      }
    case EditEntitySettingsActions.UpdateAnalyticsContent:
      return {
        ...state,
        embeddedAnalytics: {
          ...state.embeddedAnalytics,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case EditEntitySettingsActions.RemoveAnalyticsSection:
      return {
        ...state,
        embeddedAnalytics: omitKey(state.embeddedAnalytics, action.payload.id),
      }
    case EditEntitySettingsActions.ImportEntitySettings:
      return {
        ...state,
        ...action.payload,
      }
    case EditEntityActions.NewEntity:
    case EditEntityActions.EditEntitySuccess:
      return initialState
  }

  return state
}
