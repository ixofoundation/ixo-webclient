import { RootState } from 'common/redux/types'
import { createSelector } from 'reselect'
import { CreateSelectTemplateState } from './types'

export const createSelectTemplate = (state: RootState): CreateSelectTemplateState => state.createSelectTemplate

export const selectTemplateType = createSelector(createSelectTemplate, (createTemplateType) => {
  return createTemplateType.templateType
})
