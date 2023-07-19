import { EditEntityState, EditEntityActionTypes, EditEntityActions } from './editEntity.types'

export const initialState: EditEntityState = {
  step: 1,
  entityType: null,
  editing: false,
  edited: false,
  error: null,
  entityDid: null,
} as any

export const reducer = (state = initialState, action: EditEntityActionTypes): EditEntityState => {
  switch (action.type) {
    case EditEntityActions.GoToStep:
      return {
        ...state,
        step: action.payload.step,
        editing: false,
        edited: false,
        error: null,
      } as any
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
      } as any
    case EditEntityActions.EditEntitySuccess:
      return {
        ...state,
        editing: false,
        edited: true,
        error: null,
        entityDid: null,
      } as any
    case EditEntityActions.EditEntityFailure:
      return {
        ...state,
        editing: false,
        error: action.payload.error,
      }
  }

  return state
}
