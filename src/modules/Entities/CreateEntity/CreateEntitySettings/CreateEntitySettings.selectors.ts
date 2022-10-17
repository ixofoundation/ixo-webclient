import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { CreateEntitySettingsState } from './types'

export const selectSettings = (state: RootState): CreateEntitySettingsState =>
  state.createEntitySettings

export const selectOwner = createSelector(selectSettings, (settings) => {
  return settings.owner
})

export const selectCreator = createSelector(
  selectSettings,
  (settings) => settings.creator,
)

export const selectStatus = createSelector(
  selectSettings,
  (settings) => settings.status,
)

export const selectTermsOfUse = createSelector(
  selectSettings,
  (settings) => settings.termsOfUse,
)

export const selectHeadlineTemplateId = createSelector(
  selectSettings,
  (settings) => settings.headlineTemplateId,
)

export const selectVersion = createSelector(
  selectSettings,
  (settings) => settings.version,
)

export const selectPrivacy = createSelector(
  selectSettings,
  (settings) => settings.privacy,
)

export const selectRequiredCredentials = createSelector(
  selectSettings,
  (settings) => Object.values(settings.requiredCredentials),
)

export const selectFilters = createSelector(
  selectSettings,
  (settings) => settings.filters,
)

export const selectDisplayCredentials = createSelector(
  selectSettings,
  (settings) => Object.values(settings.displayCredentials),
)

export const selectValidation = createSelector(
  selectSettings,
  (settings) => settings.validation,
)

export const selectEmbeddedAnalytics = createSelector(
  selectSettings,
  (settings) => {
    return Object.values(settings.embeddedAnalytics)
  },
)

export const selectValidationComplete = createSelector(
  // selectRequiredCredentials,
  selectDisplayCredentials,
  selectValidation,
  (displayCredentials, validation) => {
    // check if each section has had it's validation completed

    // TODO filters

    let validationComplete = true
    validationComplete = !!validation['owner']
    validationComplete = validationComplete && !!validation['creator']
    validationComplete = validationComplete && !!validation['status']
    // validationComplete = validationComplete && !!validation['termsofuse']
    validationComplete = validationComplete && !!validation['version']
    // validationComplete = validationComplete && !!validation['privacy']
    // validationComplete =
    //   validationComplete &&
    //   requiredCredentials
    //     .map((section) => section.id)
    //     .every((id) => !!validation[id])
    validationComplete =
      validationComplete &&
      displayCredentials
        .map((section) => section.id)
        .every((id) => !!validation[id])

    if (validation['headline']) {
      validationComplete =
        validationComplete && validation['headline'].validated
    }

    return validationComplete
  },
)

export const selectValidated = createSelector(
  // selectRequiredCredentials,
  selectDisplayCredentials,
  selectValidationComplete,
  selectValidation,
  // selectHeadlineTemplateId,
  (displayCredentials, validationComplete, validation) => {
    // check if each section has been validated successfully
    if (!validationComplete) {
      return false
    }

    // TODO filters

    let validated = true
    validated = validation['owner'].validated
    validated = validated && validation['creator'].validated
    validated = validated && validation['status'].validated
    // validated = validated && validation['termsofuse'].validated
    validated = validated && validation['version'].validated
    // validated = validated && validation['privacy'].validated
    // validated =
    //   validated &&
    //   requiredCredentials
    //     .map((section) => section.id)
    //     .every((id) => validation[id].validated)
    validated =
      validated &&
      displayCredentials
        .map((section) => section.id)
        .every((id) => validation[id].validated)

    // validated = validated && !!headlineTemplateId
    return validated
  },
)
