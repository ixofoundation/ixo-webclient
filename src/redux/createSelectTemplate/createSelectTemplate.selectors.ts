import { RootState } from 'redux/store'
import { createSelector } from '@reduxjs/toolkit'
import { CreateSelectTemplateState } from './createSelectTemplate.types'

export const createSelectTemplate = (state: RootState): CreateSelectTemplateState => state.createSelectTemplate

export const selectTemplateType = createSelector(createSelectTemplate, (createTemplateType) => {
  return createTemplateType.templateType
})
