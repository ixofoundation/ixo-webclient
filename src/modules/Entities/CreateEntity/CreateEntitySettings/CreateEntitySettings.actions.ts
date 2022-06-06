import { v4 as uuidv4 } from 'uuid'
import { Dispatch } from 'redux'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
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
  UpdateRequiredCredentialAction,
  UpdateDisplayCredentialAction,
  UpdateFiltersAction,
  ValidatedAction,
  ValidationErrorAction,
  UpdateVersionAction,
  UpdateTermsOfUseAction,
  UpdateHeadlineMetricAction,
  UpdateAnalyticsContentAction,
  RemoveAnalyticsSectionAction,
  AddAnalyticsSectionAction,
  ImportEntitySettingsAction,
} from './types'
import { FormData } from 'common/components/JsonForm/types'

export const updateCreator = (formData: FormData) => (
  dispatch: Dispatch,
): UpdateCreatorAction | UploadCreatorImageAction => {
  const {
    displayName,
    location,
    email,
    website,
    mission,
    creatorId,
    credential,
    fileSrc,
  } = formData
  const cellNodeEndpoint = process.env.REACT_APP_PDS_URL

  if (fileSrc && fileSrc.startsWith('data:')) {
    return dispatch({
      type: CreateEntitySettingsActions.UploadCreatorImage,
      payload: blocksyncApi.project
        .createPublic(fileSrc, cellNodeEndpoint)
        .then((response: any) => ({
          fileSrc: `${cellNodeEndpoint}public/${response.result}`,
        })),
    })
  }

  return dispatch({
    type: CreateEntitySettingsActions.UpdateCreator,
    payload: {
      displayName,
      location,
      email,
      website,
      mission,
      creatorId,
      credential,
    },
  })
}

export const updateOwner = (formData: FormData) => (
  dispatch: Dispatch,
): UpdateOwnerAction | UploadOwnerImageAction => {
  const {
    displayName,
    location,
    email,
    website,
    mission,
    ownerId,
    fileSrc,
  } = formData
  const cellNodeEndpoint = process.env.REACT_APP_PDS_URL

  if (fileSrc && fileSrc.startsWith('data:')) {
    return dispatch({
      type: CreateEntitySettingsActions.UploadOwnerImage,
      payload: blocksyncApi.project
        .createPublic(fileSrc, cellNodeEndpoint)
        .then((response: any) => ({
          fileSrc: `${cellNodeEndpoint}public/${response.result}`,
        })),
    })
  }

  return dispatch({
    type: CreateEntitySettingsActions.UpdateOwner,
    payload: {
      displayName,
      location,
      email,
      website,
      mission,
      ownerId,
      fileSrc,
    },
  })
}
export const updateStatus = (formData: FormData): UpdateStatusAction => {
  const { dates, stage, status } = formData

  return {
    type: CreateEntitySettingsActions.UpdateStatus,
    payload: {
      startDate: dates ? dates.split('|')[0] : undefined,
      endDate: dates ? dates.split('|')[1] : undefined,
      stage,
      status,
    },
  }
}

export const updateVersion = (formData: FormData): UpdateVersionAction => {
  const { versionNumber, effectiveDate, notes } = formData

  return {
    type: CreateEntitySettingsActions.UpdateVersion,
    payload: {
      versionNumber,
      effectiveDate,
      notes,
    },
  }
}

export const updateTermsOfUse = (
  formData: FormData,
): UpdateTermsOfUseAction => {
  const { type, paymentTemplateId } = formData

  return {
    type: CreateEntitySettingsActions.UpdateTermsOfUse,
    payload: {
      type,
      paymentTemplateId,
    },
  }
}

export const updateHeadlineMetric = (
  formData: FormData,
): UpdateHeadlineMetricAction => {
  const { headlineTemplateId } = formData

  return {
    type: CreateEntitySettingsActions.UpdateHeadlineMetric,
    payload: {
      headlineTemplateId,
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

export const updateFilters = (formData: FormData): UpdateFiltersAction => {
  return {
    type: CreateEntitySettingsActions.UpdateFilters,
    payload: formData,
  }
}

export const addDisplayCredentialSection = (): AddDisplayCredentialSectionAction => {
  return {
    type: CreateEntitySettingsActions.AddDisplayCredentialSection,
    payload: {
      id: uuidv4(),
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

export const validated = (identifier: string): ValidatedAction => ({
  type: CreateEntitySettingsActions.Validated,
  payload: {
    identifier,
  },
})

export const validationError = (
  identifier: string,
  errors: string[],
): ValidationErrorAction => ({
  type: CreateEntitySettingsActions.ValidationError,
  payload: {
    identifier,
    errors,
  },
})

export const addAnalyticsSection = (): AddAnalyticsSectionAction => ({
  type: CreateEntitySettingsActions.AddAnalyticsSection,
  payload: {
    id: uuidv4(),
  },
})

export const updateAnalyticsContent = (
  id: string,
  formData: FormData,
): UpdateAnalyticsContentAction => {
  const { title, urls } = formData

  return {
    type: CreateEntitySettingsActions.UpdateAnalyticsContent,
    payload: {
      id,
      title,
      urls: urls.split('|'),
    },
  }
}

export const removeAnalyticsSection = (
  id: string,
): RemoveAnalyticsSectionAction => ({
  type: CreateEntitySettingsActions.RemoveAnalyticsSection,
  payload: {
    id,
  },
})

export const importEntitySettings = (
  payload: any,
): ImportEntitySettingsAction => ({
  type: CreateEntitySettingsActions.ImportEntitySettings,
  payload,
})
