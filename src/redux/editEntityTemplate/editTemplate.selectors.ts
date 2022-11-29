import { createSelector } from 'reselect'
import { RootState } from 'redux/types'
import { EditEntityTemplateState } from './editTemplates.types'

export const selectTemplate = (state: RootState): EditEntityTemplateState => state.editEntityTemplate

export const selectExistingEntity = createSelector(selectTemplate, (template) => {
  return template.existingEntity
})
