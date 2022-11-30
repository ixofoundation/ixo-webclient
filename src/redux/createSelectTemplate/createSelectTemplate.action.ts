import { FormData } from 'components/JsonForm/types'
import { CreateSelectTemplateActions, UpdateTemplateTypeAction } from './createSelectTemplate.types'

export const updateTemplateType = (formData: FormData): UpdateTemplateTypeAction => ({
  type: CreateSelectTemplateActions.UpdateTemplateType,
  payload: { templateType: formData.templateType },
})
