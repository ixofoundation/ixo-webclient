import {
  EditEntityState,
  EditEntityActionTypes,
  EditEntityActions,
} from './types'

export const initialState: EditEntityState = {
  step: 1,
  entityType: null,
  editing: false,
  edited: false,
  error: null,
  entityDid: null,
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
        editing: false,
        edited: false,
        error: null,
      }
    case EditEntityActions.NewEntity:
      return {
        ...initialState,
        entityType: action.payload.entityType,
        entityDid: action.payload.entityDid,
      }
    case EditEntityActions.EditEntityStart:
      return {
        ...state,
        editing: true,
        error: null,
      }
    case EditEntityActions.EditEntitySuccess:
      return {
        ...state,
        editing: false,
        edited: true,
        error: null,
        entityDid: null,
      }
    case EditEntityActions.EditEntityFailure:
      return {
        ...state,
        editing: false,
        error: action.payload.error,
      }
  }

  return state
}
