import {
  ECreateEntityActions,
  TCreateEntityActionTypes,
  TCreateEntityState,
} from './createEntity.types'

export const initialState: TCreateEntityState = {
  entityType: undefined,
  metadata: undefined,
  creator: undefined,
  tags: undefined,
  services: [],
  payments: [],
  liquidity: [],

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
    case ECreateEntityActions.UpdateCreator:
      return { ...state, creator: action.payload }
    case ECreateEntityActions.UpdateTags:
      return { ...state, tags: action.payload }
    case ECreateEntityActions.UpdateServices:
      return { ...state, services: action.payload }
    case ECreateEntityActions.UpdatePayments:
      return { ...state, payments: action.payload }
    case ECreateEntityActions.UpdateLiquidity:
      return { ...state, liquidity: action.payload }
    default:
      return state
  }
}
