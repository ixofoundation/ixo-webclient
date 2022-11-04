import {
  ECreateEntityActions,
  TCreateEntityActionTypes,
  TCreateEntityState,
} from './createEntity.types'

export const initialState: TCreateEntityState = {
  entityType: undefined,
  metadata: undefined,

  stepNo: 1,
}

export const reducer = (
  state = initialState,
  action: TCreateEntityActionTypes,
): TCreateEntityState => {
  switch (action.type) {
    case ECreateEntityActions.UpdateEntityType:
      return { ...state, entityType: action.payload }
    case ECreateEntityActions.GotoStep:
      return { ...state, stepNo: action.payload }
    case ECreateEntityActions.UpdateMetadata:
      return { ...state, metadata: action.payload }
    default:
      return state
  }
}
