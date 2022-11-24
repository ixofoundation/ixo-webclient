import { FormData } from 'common/components/JsonForm/types'
import { CreateSelectTemplateActions, UpdateTemplateTypeAction } from './types'

export const updateTemplateType = (formData: FormData): UpdateTemplateTypeAction => ({
  type: CreateSelectTemplateActions.UpdateTemplateType,
  payload: { templateType: formData.templateType },
})
