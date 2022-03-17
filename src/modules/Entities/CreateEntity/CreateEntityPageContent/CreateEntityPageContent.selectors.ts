import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { CreateEntityPageContentState } from './types'

export const selectPageContent = (
  state: RootState,
): CreateEntityPageContentState => state.createEntityPageContent

export const selectHeaderContent = createSelector(
  selectPageContent,
  (pageContent) => {
    return pageContent.header
  },
)

export const selectBodyContentSections = createSelector(
  selectPageContent,
  (pageContent) => {
    return Object.values(pageContent.body)
  },
)

export const selectImageContentSections = createSelector(
  selectPageContent,
  (pageContent) => {
    return Object.values(pageContent.images)
  },
)

export const selectProfileContentSections = createSelector(
  selectPageContent,
  (pageContent) => {
    return pageContent.profiles ? Object.values(pageContent.profiles) : []
  },
)

export const selectSocialContent = createSelector(
  selectPageContent,
  (pageContent) => {
    return pageContent.social
  },
)

export const selectEmbeddedContentSections = createSelector(
  selectPageContent,
  (pageContent) => {
    return Object.values(pageContent.embedded)
  },
)

export const selectLinkedResourcesSections = createSelector(
  selectPageContent,
  (pageContent) => {
    return Object.values(pageContent.linkedResources)
  },
)

export const selectValidation = createSelector(
  selectPageContent,
  (pageContent) => {
    return pageContent.validation
  },
)

export const selectValidationComplete = createSelector(
  selectBodyContentSections,
  selectImageContentSections,
  selectProfileContentSections,
  selectEmbeddedContentSections,
  selectValidation,
  (
    bodySections,
    imageSections,
    profileSections,
    embeddedSections,
    validation,
  ) => {
    // check if each section has had it's validation completed
    let validationComplete = true
    validationComplete = !!validation['header']
    validationComplete = validationComplete && !!validation['social']
    validationComplete =
      validationComplete &&
      bodySections.map((section) => section.id).every((id) => !!validation[id])
    validationComplete =
      validationComplete &&
      imageSections.map((section) => section.id).every((id) => !!validation[id])
    validationComplete =
      validationComplete &&
      profileSections
        .map((section) => section.id)
        .every((id) => !!validation[id])
    validationComplete =
      validationComplete &&
      embeddedSections
        .map((section) => section.id)
        .every((id) => !!validation[id])

    return validationComplete
  },
)

export const selectValidated = createSelector(
  selectBodyContentSections,
  selectImageContentSections,
  selectProfileContentSections,
  selectEmbeddedContentSections,
  selectValidationComplete,
  selectValidation,
  (
    bodySections,
    imageSections,
    profileSections,
    embeddedSections,
    validationComplete,
    validation,
  ) => {
    // check if each section has been validated successfully
    if (!validationComplete) {
      return false
    }

    let validated = true
    validated = validation['header'].validated
    validated = validated && validation['social'].validated
    validated =
      validated &&
      bodySections
        .map((section) => section.id)
        .every((id) => validation[id].validated)
    validated =
      validated &&
      imageSections
        .map((section) => section.id)
        .every((id) => validation[id].validated)
    validated =
      validated &&
      profileSections
        .map((section) => section.id)
        .every((id) => validation[id].validated)
    validated =
      validated &&
      embeddedSections
        .map((section) => section.id)
        .every((id) => validation[id].validated)

    return validated
  },
)
