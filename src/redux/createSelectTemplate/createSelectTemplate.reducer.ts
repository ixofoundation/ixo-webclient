import {
  CreateSelectTemplateActions,
  CreateSelectTemplateActionTypes,
  CreateSelectTemplateState,
} from './createSelectTemplate.types'

export const initialState: CreateSelectTemplateState = {
  templateType: undefined,
}
export const reducer = (state = initialState, action: CreateSelectTemplateActionTypes): CreateSelectTemplateState => {
  switch (action.type) {
    case CreateSelectTemplateActions.UpdateTemplateType:
      return {
        ...state,
        templateType: action.payload.templateType,
      }
    default:
      return state
  }
}
