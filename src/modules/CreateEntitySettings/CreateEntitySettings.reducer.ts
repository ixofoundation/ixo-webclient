import {
  CreateEntitySettingsActionTypes,
  CreateEntitySettingsActions,
  CreateEntitySettingsState,
} from './types'
import * as reduxUtils from '../../common/redux/utils'

export const initialState: CreateEntitySettingsState = {
  owner: {
    name: null,
    country: null,
    email: null,
    website: null,
    mission: null,
    identifier: null,
    credentialTokenId: null,
    imageDid: null,
    uploadingImage: false,
  },
  creator: {
    name: null,
    country: null,
    email: null,
    website: null,
    mission: null,
    identifier: null,
    matrixId: null,
    imageDid: null,
    uploadingImage: false,
  },
  status: {
    startDate: null,
    endDate: null,
    stage: null,
    status: null,
  },
  privacy: {
    entityView: null,
    pageView: null,
  },
  requiredCredentials: {},
  filters: {},
  displayCredentials: {},
}

export const reducer = (
  state = initialState,
  action: CreateEntitySettingsActionTypes,
): CreateEntitySettingsState => {
  switch (action.type) {
    case CreateEntitySettingsActions.UpdateOwner:
      return {
        ...state,
        owner: {
          ...state.owner,
          ...action.payload,
        },
      }
    case CreateEntitySettingsActions.UploadOwnerImagePending:
      return {
        ...state,
        owner: {
          ...state.owner,
          uploadingImage: true,
        },
      }
    case CreateEntitySettingsActions.UploadOwnerImageSuccess:
      return {
        ...state,
        owner: {
          ...state.owner,
          uploadingImage: false,
          imageDid: action.payload.did,
        },
      }
    case CreateEntitySettingsActions.UploadOwnerImageFailure:
      return {
        ...state,
        owner: {
          ...state.owner,
          uploadingImage: false,
        },
      }
    case CreateEntitySettingsActions.UpdateCreator:
      return {
        ...state,
        creator: {
          ...state.creator,
          ...action.payload,
        },
      }
    case CreateEntitySettingsActions.UploadCreatorImagePending:
      return {
        ...state,
        creator: {
          ...state.creator,
          uploadingImage: true,
        },
      }
    case CreateEntitySettingsActions.UploadCreatorImageSuccess:
      return {
        ...state,
        creator: {
          ...state.creator,
          uploadingImage: false,
          imageDid: action.payload.did,
        },
      }
    case CreateEntitySettingsActions.UploadCreatorImageFailure:
      return {
        ...state,
        creator: {
          ...state.creator,
          uploadingImage: false,
        },
      }
    case CreateEntitySettingsActions.UpdateStatus:
      return {
        ...state,
        status: action.payload,
      }
    case CreateEntitySettingsActions.UpdatePrivacy:
      return {
        ...state,
        privacy: action.payload,
      }
    case CreateEntitySettingsActions.AddRequiredCredentialSection:
      return {
        ...state,
        requiredCredentials: {
          ...state.requiredCredentials,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntitySettingsActions.RemoveRequiredCredentialSection:
      return {
        ...state,
        requiredCredentials: reduxUtils.omitKey(
          state.requiredCredentials,
          action.payload.id,
        ),
      }
    case CreateEntitySettingsActions.UpdateRequiredCredential:
      return {
        ...state,
        requiredCredentials: {
          ...state.requiredCredentials,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntitySettingsActions.AddFilterSection:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntitySettingsActions.RemoveFilterSection:
      return {
        ...state,
        filters: reduxUtils.omitKey(state.filters, action.payload.id),
      }
    case CreateEntitySettingsActions.UpdateFilter:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntitySettingsActions.AddDisplayCredentialSection:
      return {
        ...state,
        displayCredentials: {
          ...state.displayCredentials,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntitySettingsActions.RemoveDisplayCredentialSection:
      return {
        ...state,
        displayCredentials: reduxUtils.omitKey(
          state.displayCredentials,
          action.payload.id,
        ),
      }
    case CreateEntitySettingsActions.UpdateDisplayCredential:
      return {
        ...state,
        displayCredentials: {
          ...state.displayCredentials,
          ...{ [action.payload.id]: action.payload },
        },
      }
  }

  return state
}
