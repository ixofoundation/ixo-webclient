import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { EditEntityTemplateState } from './types'

export const selectTemplate = (state: RootState): EditEntityTemplateState =>
  state.editEntityTemplate

export const selectExistingEntity = createSelector(selectTemplate, (template) => {
  return template.existingEntity
})