import { EditEntityActions, EditEntityActionTypes, EditEntityState } from './editEntity.types'

const initialState: EditEntityState = {}

export const reducer = (state = initialState, action: EditEntityActionTypes): EditEntityState => {
  switch (action.type) {
    case EditEntityActions.SetEditedField: {
      const { key, data, merge } = action.payload
      if (merge) {
        return { ...state, [key]: { ...(state[key] ?? {}), ...data } }
      } else {
        return { ...state, [key]: data }
      }
    }
    default:
      return { ...state }
  }
}
