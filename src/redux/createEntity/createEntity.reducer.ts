import { ELocalisation } from 'types/protocol'
import { ECreateEntityActions, TCreateEntityActionTypes, TCreateEntityState } from './createEntity.types'

export const initialState: TCreateEntityState = {
  entityType: undefined,
  metadata: undefined,
  profile: {},
  creator: undefined,
  controller: undefined,
  tags: undefined,
  ddoTags: [],
  page: undefined,
  service: [],
  claim: undefined,
  linkedResource: {},
  accordedRight: {},
  linkedEntity: {},

  // for DAO
  daoGroups: {},

  entityClassDid: undefined,
  assetClassDid: undefined,
  assetInstances: [],

  localisation: ELocalisation.EN,
  stepNo: 1,
} as any

export const reducer = (state = initialState, action: TCreateEntityActionTypes): TCreateEntityState => {
  switch (action.type) {
    case ECreateEntityActions.UpdateEntityType:
      return { ...state, entityType: action.payload }
    case ECreateEntityActions.GotoStep:
      return { ...state, stepNo: action.payload }
    case ECreateEntityActions.UpdateProfile:
      return { ...state, profile: action.payload }
    case ECreateEntityActions.UpdateMetadata:
      return { ...state, metadata: action.payload }
    case ECreateEntityActions.UpdateCreator:
      return { ...state, creator: action.payload }
    case ECreateEntityActions.UpdateController:
      return { ...state, controller: action.payload }
    case ECreateEntityActions.UpdateTags:
      return { ...state, tags: action.payload }
    case ECreateEntityActions.UpdateDDOTags:
      return { ...state, ddoTags: action.payload }
    case ECreateEntityActions.UpdatePage:
      return { ...state, page: action.payload }
    case ECreateEntityActions.UpdateService:
      return { ...state, service: action.payload }
    case ECreateEntityActions.UpdateClaim:
      return { ...state, claim: action.payload }
    case ECreateEntityActions.UpdateLinkedResource:
      return { ...state, linkedResource: action.payload }
    case ECreateEntityActions.UpdateAccordedRight:
      return { ...state, accordedRight: action.payload }
    case ECreateEntityActions.UpdateLinkedEntity:
      return { ...state, linkedEntity: action.payload }
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
    // for DAO
    case ECreateEntityActions.UpdateDAOGroups:
      return { ...state, daoGroups: action.payload }
    default:
      return state
  }
}
