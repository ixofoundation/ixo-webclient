import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { CreateEntityTemplateState } from './types'

export const selectTemplate = (state: RootState): CreateEntityTemplateState =>
  state.createEntityTemplate

export const selectExistingEntity = createSelector(selectTemplate, (template) => {
  return template.existingEntity
})