import { v4 as uuidv4 } from 'uuid'
import { Dispatch } from 'redux'
import blocksyncApi from '../../common/api/blocksync-api/blocksync-api'
import {
  CreateEntitySettingsActions,
  UpdateOwnerAction,
  UpdateCreatorAction,
  UploadOwnerImageAction,
  UploadCreatorImageAction,
  UpdateStatusAction,
  UpdatePrivacyAction,
  AddRequiredCredentialSectionAction,
  RemoveRequiredCredentialSectionAction,
  AddDisplayCredentialSectionAction,
  RemoveDisplayCredentialSectionAction,
  AddFilterSectionAction,
  RemoveFilterSectionAction,
  UpdateRequiredCredentialAction,
  UpdateDisplayCredentialAction,
  UpdateFilterAction,
} from './types'
import { FormData } from 'src/common/components/JsonForm/types'

const PDS_URL = process.env.REACT_APP_PDS_URL

export const updateOwner = (formData: FormData): UpdateOwnerAction => {
  const {
    name,
    country,
    email,
    website,
    mission,
    identifier,
    credentialTokenId,
  } = formData

  return {
    type: CreateEntitySettingsActions.UpdateOwner,
    payload: {
      name,
      country,
      email,
      website,
      mission,
      identifier,
      credentialTokenId,
    },
  }
}

export const uploadOwnerImage = (base64ImageData: string) => (
  dispatch: Dispatch,
): UploadOwnerImageAction => {
  return dispatch({
    type: CreateEntitySettingsActions.UploadOwnerImage,
    payload: blocksyncApi.project
      .createPublic(base64ImageData, PDS_URL)
      .then((response: any) => ({ did: response.result })),
  })
}

export const updateCreator = (formData: FormData): UpdateCreatorAction => {
  const {
    name,
    country,
    email,
    website,
    mission,
    identifier,
    matrixId,
  } = formData

  return {
    type: CreateEntitySettingsActions.UpdateCreator,
    payload: {
      name,
      country,
      email,
      website,
      mission,
      identifier,
      matrixId,
    },
  }
}

export const uploadCreatorImage = (base64ImageData: string) => (
  dispatch: Dispatch,
): UploadCreatorImageAction => {
  return dispatch({
    type: CreateEntitySettingsActions.UploadCreatorImage,
    payload: blocksyncApi.project
      .createPublic(base64ImageData, PDS_URL)
      .then((response: any) => ({ did: response.result })),
  })
}

export const updateStatus = (formData: FormData): UpdateStatusAction => {
  const { dates, stage, status } = formData
  const dateParts = dates.split('|')

  return {
    type: CreateEntitySettingsActions.UpdateStatus,
    payload: {
      startDate: dateParts[0],
      endDate: dateParts[1],
      stage,
      status,
    },
  }
}

export const updatePrivacy = (formData: FormData): UpdatePrivacyAction => {
  const { pageView, entityView } = formData

  return {
    type: CreateEntitySettingsActions.UpdatePrivacy,
    payload: {
      pageView,
      entityView,
    },
  }
}

export const addRequiredCredentialSection = (): AddRequiredCredentialSectionAction => {
  return {
    type: CreateEntitySettingsActions.AddRequiredCredentialSection,
    payload: {
      id: uuidv4(),
      credential: null,
      issuer: null,
    },
  }
}

export const removeRequiredCredentialSection = (
  id: string,
): RemoveRequiredCredentialSectionAction => {
  return {
    type: CreateEntitySettingsActions.RemoveRequiredCredentialSection,
    payload: {
      id,
    },
  }
}

export const updateRequiredCredential = (
  id: string,
  formData: FormData,
): UpdateRequiredCredentialAction => {
  const { credential, issuer } = formData

  return {
    type: CreateEntitySettingsActions.UpdateRequiredCredential,
    payload: {
      id,
      credential,
      issuer,
    },
  }
}

export const addFilterSection = (): AddFilterSectionAction => {
  return {
    type: CreateEntitySettingsActions.AddFilterSection,
    payload: {
      id: uuidv4(),
      name: null,
      tags: [],
    },
  }
}

export const removeFilterSection = (id: string): RemoveFilterSectionAction => {
  return {
    type: CreateEntitySettingsActions.RemoveFilterSection,
    payload: {
      id,
    },
  }
}

export const updateFilter = (
  id: string,
  formData: FormData,
): UpdateFilterAction => {
  const { name, tags } = formData

  return {
    type: CreateEntitySettingsActions.UpdateFilter,
    payload: {
      id,
      name,
      tags,
    },
  }
}

export const addDisplayCredentialSection = (): AddDisplayCredentialSectionAction => {
  return {
    type: CreateEntitySettingsActions.AddDisplayCredentialSection,
    payload: {
      id: uuidv4(),
      credential: null,
      badge: null,
    },
  }
}

export const removeDisplayCredentialSection = (
  id: string,
): RemoveDisplayCredentialSectionAction => {
  return {
    type: CreateEntitySettingsActions.RemoveDisplayCredentialSection,
    payload: {
      id,
    },
  }
}

export const updateDisplayCredential = (
  id: string,
  formData: FormData,
): UpdateDisplayCredentialAction => {
  const { credential, badge } = formData

  return {
    type: CreateEntitySettingsActions.UpdateDisplayCredential,
    payload: {
      id,
      credential,
      badge,
    },
  }
}
