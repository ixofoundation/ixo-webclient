import { RootState } from 'redux/types'
import { createSelector } from 'reselect'
import { CreateSelectTemplateState } from './createSelectTemplate.types'

export const createSelectTemplate = (state: RootState): CreateSelectTemplateState => state.createSelectTemplate

export const selectTemplateType = createSelector(createSelectTemplate, (createTemplateType) => {
  return createTemplateType.templateType
})
