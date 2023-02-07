import { SelectedEntityActions, SelectedEntityActionTypes, Entity } from './selectedEntity.types'

export const initialState: Entity = {} as Entity

export const reducer = (state = initialState, action: SelectedEntityActionTypes): any => {
  switch (action.type) {
    case SelectedEntityActions.GetEntitySuccess:
      return { ...state, ...action.payload }
    case SelectedEntityActions.GetEntityClaimsSuccess:
      return {
        ...state,
        claims: action.payload,
      }
    case SelectedEntityActions.ClearEntity:
      return null
    case SelectedEntityActions.GetEntityBond:
      return {
        ...state,
        bondDid: action.bondDid,
      }
    case SelectedEntityActions.UpdateEntityBondDetail:
      return {
        ...state,
        bondDetail: action.payload,
      }
    case SelectedEntityActions.GetEntityClaimsFailure:
    case SelectedEntityActions.GetEntityFailure:
      return {
        ...state,
        error: action.payload,
      }
    case SelectedEntityActions.UpdateEntityAddress:
      return {
        ...state,
        address: action.payload,
      }
    /**
     * FIXME:
     * @temp
     */
    case SelectedEntityActions.UpdateEntityType:
      return {
        ...state,
        type: action.payload,
      }
    default:
      return { ...state }
  }
}
