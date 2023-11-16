import { TEntityModel } from 'types/entities'
import { EditEntityActions, EditEntityActionTypes } from './editEntity.types'

const initialState: TEntityModel = {} as any

export const reducer = (state = initialState, action: EditEntityActionTypes): TEntityModel => {
  switch (action.type) {
    case EditEntityActions.SetEditedField: {
      const { key, data, merge } = action.payload
      if (merge) {
        if (Array.isArray(state[key])) {
          return {
            ...state,
            [key]: Object.values({ ...Object.fromEntries(state[key].map((v: any) => [v.id, v])), ...data }).filter(
              (v) => !!v,
            ),
          }
        } else {
          return { ...state, [key]: { ...(state[key] ?? {}), ...data } }
        }
      } else {
        return { ...state, [key]: data }
      }
    }
    case EditEntityActions.SetEditEntity: {
      return { ...state, ...action.payload }
    }
    default:
      return { ...state }
  }
}
