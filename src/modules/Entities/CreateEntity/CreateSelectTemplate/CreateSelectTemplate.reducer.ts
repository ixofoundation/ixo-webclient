import {
  CreateSelectTemplateActions,
  CreateSelectTemplateActionTypes,
  CreateSelectTemplateState,
} from './types'

export const initialState: CreateSelectTemplateState = {
  templateType: undefined,
}
export const reducer = (
  state = initialState,
  action: CreateSelectTemplateActionTypes,
): CreateSelectTemplateState => {
  switch (action.type) {
    case CreateSelectTemplateActions.UpdateTemplateType:
      return {
        ...state,
        templateType: action.payload.templateType,
      }
  }
  return state
}
