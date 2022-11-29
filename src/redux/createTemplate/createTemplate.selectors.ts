import { createSelector } from 'reselect'
import { RootState } from 'redux/types'
import { CreateEntityTemplateState } from './createTemplate.types'

export const selectTemplate = (state: RootState): CreateEntityTemplateState => state.createEntityTemplate

export const selectExistingEntity = createSelector(selectTemplate, (template) => {
  return template.existingEntity
})

export const selectAssociatedTemplates = createSelector(selectTemplate, (template) => {
  try {
    return Object.values(template?.associatedTemplates)
  } catch {
    return []
  }
})

export const selectAlphaBondInfo = createSelector(selectTemplate, (template) => {
  return template.alphaBondInfo
})

export const selectCreatedBondDid = createSelector(selectAlphaBondInfo, (alphaBondInfo) => {
  return alphaBondInfo.bondDid
})

export const selectValidation = createSelector(selectTemplate, (template) => template.validation)

export const selectValidationComplete = createSelector(
  selectAssociatedTemplates,
  selectValidation,
  (associatedTemplates, validation) => {
    // check if each section has had it's validation completed

    let validationComplete = true
    validationComplete = !!validation['existingentity']
    validationComplete =
      validationComplete &&
      associatedTemplates
        .map((section) => section.id)
        .every((id) => {
          return !!validation[id]
        })
    return validationComplete
  },
)

export const selectValidated = createSelector(
  selectAssociatedTemplates,
  selectValidationComplete,
  selectValidation,
  (associatedTemplates, validationComplete, validation) => {
    // check if each section has been validated successfully
    if (!validationComplete) {
      return false
    }

    let validated = true
    validated = validation['existingentity'].validated
    validated = validated && associatedTemplates.map((section) => section.id).every((id) => validation[id].validated)
    return validated
  },
)
