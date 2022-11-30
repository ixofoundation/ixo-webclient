import { v4 as uuidv4 } from 'uuid'
import { Dispatch } from 'redux'
import blocksyncApi from 'api/blocksync/blocksync'
import {
  EditEntitySettingsActions,
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
} from './editEntitySettings.types'
import { FormData } from 'common/components/JsonForm/types'
import { RootState } from 'redux/types'
import { selectCellNodeEndpoint } from '../selectedEntity/selectedEntity.selectors'

export const updateCreator =
  (formData: FormData) =>
  (dispatch: Dispatch, getState: () => RootState): UpdateCreatorAction | UploadCreatorImageAction => {
    const { displayName, location, email, website, mission, creatorId, credential, fileSrc } = formData

    const state = getState()
    const cellNodeEndpoint = selectCellNodeEndpoint(state)

    if (fileSrc && fileSrc.startsWith('data:')) {
      return dispatch({
        type: EditEntitySettingsActions.UploadCreatorImage,
        payload: blocksyncApi.project.createPublic(fileSrc, cellNodeEndpoint!).then((response: any) => ({
          fileSrc: `${cellNodeEndpoint}public/${response.result}`,
        })),
      })
    }

    return dispatch({
      type: EditEntitySettingsActions.UpdateCreator,
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

export const updateOwner =
  (formData: FormData) =>
  (dispatch: Dispatch, getState: () => RootState): UpdateOwnerAction | UploadOwnerImageAction => {
    const { displayName, location, email, website, mission, ownerId, fileSrc } = formData

    const state = getState()
    const cellNodeEndpoint = selectCellNodeEndpoint(state)

    if (fileSrc && fileSrc.startsWith('data:')) {
      return dispatch({
        type: EditEntitySettingsActions.UploadOwnerImage,
        payload: blocksyncApi.project.createPublic(fileSrc, cellNodeEndpoint!).then((response: any) => ({
          fileSrc: `${cellNodeEndpoint}public/${response.result}`,
        })),
      })
    }

    return dispatch({
      type: EditEntitySettingsActions.UpdateOwner,
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
    type: EditEntitySettingsActions.UpdateStatus,
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
    type: EditEntitySettingsActions.UpdateVersion,
    payload: {
      versionNumber,
      effectiveDate,
      notes,
    },
  }
}

export const updateTermsOfUse = (formData: FormData): UpdateTermsOfUseAction => {
  const { type, paymentTemplateId } = formData

  return {
    type: EditEntitySettingsActions.UpdateTermsOfUse,
    payload: {
      type,
      paymentTemplateId,
    },
  }
}

export const updateHeadlineMetric = (formData: FormData): UpdateHeadlineMetricAction => {
  const { headlineTemplateId } = formData

  return {
    type: EditEntitySettingsActions.UpdateHeadlineMetric,
    payload: {
      headlineTemplateId,
    },
  }
}

export const updatePrivacy = (formData: FormData): UpdatePrivacyAction => {
  const { pageView, entityView } = formData

  return {
    type: EditEntitySettingsActions.UpdatePrivacy,
    payload: {
      pageView,
      entityView,
    },
  }
}

export const addRequiredCredentialSection = (): AddRequiredCredentialSectionAction => {
  return {
    type: EditEntitySettingsActions.AddRequiredCredentialSection,
    payload: {
      id: uuidv4(),
    },
  }
}

export const removeRequiredCredentialSection = (id: string): RemoveRequiredCredentialSectionAction => {
  return {
    type: EditEntitySettingsActions.RemoveRequiredCredentialSection,
    payload: {
      id,
    },
  }
}

export const updateRequiredCredential = (id: string, formData: FormData): UpdateRequiredCredentialAction => {
  const { credential, issuer } = formData

  return {
    type: EditEntitySettingsActions.UpdateRequiredCredential,
    payload: {
      id,
      credential,
      issuer,
    },
  }
}

export const updateFilters = (formData: FormData): UpdateFiltersAction => {
  return {
    type: EditEntitySettingsActions.UpdateFilters,
    payload: formData,
  }
}

export const addDisplayCredentialSection = (): AddDisplayCredentialSectionAction => {
  return {
    type: EditEntitySettingsActions.AddDisplayCredentialSection,
    payload: {
      id: uuidv4(),
    },
  }
}

export const removeDisplayCredentialSection = (id: string): RemoveDisplayCredentialSectionAction => {
  return {
    type: EditEntitySettingsActions.RemoveDisplayCredentialSection,
    payload: {
      id,
    },
  }
}

export const updateDisplayCredential = (id: string, formData: FormData): UpdateDisplayCredentialAction => {
  const { credential, badge } = formData

  return {
    type: EditEntitySettingsActions.UpdateDisplayCredential,
    payload: {
      id,
      credential,
      badge,
    },
  }
}

export const validated = (identifier: string): ValidatedAction => ({
  type: EditEntitySettingsActions.Validated,
  payload: {
    identifier,
  },
})

export const validationError = (identifier: string, errors: string[]): ValidationErrorAction => ({
  type: EditEntitySettingsActions.ValidationError,
  payload: {
    identifier,
    errors,
  },
})

export const addAnalyticsSection = (): AddAnalyticsSectionAction => ({
  type: EditEntitySettingsActions.AddAnalyticsSection,
  payload: {
    id: uuidv4(),
  },
})

export const updateAnalyticsContent = (id: string, formData: FormData): UpdateAnalyticsContentAction => {
  const { title, urls } = formData

  return {
    type: EditEntitySettingsActions.UpdateAnalyticsContent,
    payload: {
      id,
      title,
      urls: urls.split('|'),
    },
  }
}

export const removeAnalyticsSection = (id: string): RemoveAnalyticsSectionAction => ({
  type: EditEntitySettingsActions.RemoveAnalyticsSection,
  payload: {
    id,
  },
})

export const importEntitySettings = (payload: any): ImportEntitySettingsAction => ({
  type: EditEntitySettingsActions.ImportEntitySettings,
  payload,
})
