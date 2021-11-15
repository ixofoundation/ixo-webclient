import {
  EditEntityState,
  EditEntityActionTypes,
  EditEntityActions,
} from './types'

export const initialState: EditEntityState = {
  step: 1,
  entityType: null,
  creating: false,
  created: false,
  error: null,
}

export const reducer = (
  state = initialState,
  action: EditEntityActionTypes,
): EditEntityState => {
  switch (action.type) {
    case EditEntityActions.GoToStep:
      return {
        ...state,
        step: action.payload.step,
      }
    case EditEntityActions.NewEntity:
      return {
        ...initialState,
        entityType: action.payload.entityType,
      }
    case EditEntityActions.EditEntityStart:
      return {
        ...state,
        creating: true,
        error: null,
      }
    case EditEntityActions.EditEntitySuccess:
      return {
        ...state,
        creating: false,
        created: true,
        error: null,
      }
    case EditEntityActions.EditEntityFailure:
      return {
        ...state,
        creating: false,
        error: action.payload.error,
      }
  }

  return state
}
