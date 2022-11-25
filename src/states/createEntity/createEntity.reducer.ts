import { ELocalisation } from 'types'
import { ECreateEntityActions, TCreateEntityActionTypes, TCreateEntityState } from './createEntity.types'

export const initialState: TCreateEntityState = {
  entityType: undefined,
  metadata: undefined,
  creator: undefined,
  controller: undefined,
  tags: undefined,
  service: [],
  payments: [],
  liquidity: [],
  claims: {},
  linkedResource: {},
  entityClassDid: undefined,
  assetClassDid: undefined,
  assetInstances: [],
  page: undefined,

  localisation: ELocalisation.EN,
  stepNo: 1,
} as any

export const reducer = (state = initialState, action: TCreateEntityActionTypes): TCreateEntityState => {
  switch (action.type) {
    case ECreateEntityActions.UpdateEntityType:
      return { ...state, entityType: action.payload }
    case ECreateEntityActions.GotoStep:
      return { ...state, stepNo: action.payload }
    case ECreateEntityActions.UpdateMetadata:
      return { ...state, metadata: action.payload }
    case ECreateEntityActions.UpdateCreator:
      return { ...state, creator: action.payload }
    case ECreateEntityActions.UpdateController:
      return { ...state, controller: action.payload }
    case ECreateEntityActions.UpdateTags:
      return { ...state, tags: action.payload }
    case ECreateEntityActions.UpdateService:
      return { ...state, service: action.payload }
    case ECreateEntityActions.UpdatePayments:
      return { ...state, payments: action.payload }
    case ECreateEntityActions.UpdateLiquidity:
      return { ...state, liquidity: action.payload }
    case ECreateEntityActions.UpdateClaims:
      return { ...state, claims: action.payload }
    case ECreateEntityActions.UpdateLinkedResource:
      return { ...state, linkedResource: action.payload }
    case ECreateEntityActions.UpdateEntityClassDid:
      return { ...state, entityClassDid: action.payload }
    case ECreateEntityActions.UpdateAssetClassDid:
      return { ...state, assetClassDid: action.payload }
    case ECreateEntityActions.AddAssetInstances:
      return {
        ...state,
        assetInstances: (state.assetInstances ?? []).concat(action.payload),
      }
    case ECreateEntityActions.UpdateAssetInstance:
      return {
        ...state,
        assetInstances: [...(state.assetInstances as any)].map((instance, index) =>
          index === action.payload.id ? action.payload.data : instance,
        ),
      }
    case ECreateEntityActions.RemoveAssetInstances:
      return { ...state, assetInstances: [] }
    case ECreateEntityActions.UpdateLocalisation:
      return { ...state, localisation: action.payload }
    case ECreateEntityActions.UpdatePage:
      return { ...state, page: action.payload }
    default:
      return state
  }
}
