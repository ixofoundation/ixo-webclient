import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { EditEntityTemplateState } from './editTemplates.types'

export const selectTemplate = (state: RootState): EditEntityTemplateState => state.editEntityTemplate

export const selectExistingEntity = createSelector(selectTemplate, (template) => {
  return template.existingEntity
})
