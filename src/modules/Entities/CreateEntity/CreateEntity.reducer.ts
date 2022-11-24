import { CreateEntityState, CreateEntityActionTypes, CreateEntityActions } from './types'

export const initialState: CreateEntityState = {
  step: 1,
  entityType: null,
  creating: false,
  created: false,
  error: null,

  selectedTemplateType: undefined, //  for CreateSelectTemplate.container
} as any

export const reducer = (state = initialState, action: CreateEntityActionTypes): CreateEntityState => {
  switch (action.type) {
    case CreateEntityActions.GoToStep:
      return {
        ...state,
        step: action.payload.step,
      }
    case CreateEntityActions.NewEntity:
      return {
        ...initialState,
        entityType: action.payload.entityType,
      }
    case CreateEntityActions.CreateEntityStart:
      return {
        ...state,
        creating: true,
        error: null,
      } as any
    case CreateEntityActions.CreateEntitySuccess:
      return {
        ...state,
        creating: false,
        created: true,
        error: null,
      } as any
    case CreateEntityActions.CreateEntityFailure:
      return {
        ...state,
        creating: false,
        error: action.payload.error,
      }

    case CreateEntityActions.UpdateSelectedTemplateType:
      return {
        ...state,
        selectedTemplateType: action.payload,
      }
  }

  return state
}
