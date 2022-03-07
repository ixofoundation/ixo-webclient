import {
  Entity,
  SelectedEntityActions,
  SelectedEntityActionTypes,
} from './types'

export const initialState: Entity = null

export const reducer = (
  state = initialState,
  action: SelectedEntityActionTypes,
): any => {
  switch (action.type) {
    case SelectedEntityActions.GetEntitySuccess:
      return action.payload
    case SelectedEntityActions.ClearEntity:
      return null
    case SelectedEntityActions.GetEntityBond:
      return {
        ...state,
        bondDid: action.bondDid,
      }
    case SelectedEntityActions.UpdateEntityClaims:
      return {
        ...state,
        entityClaims: action.entityClaims,
      }
  }

  return state
}
