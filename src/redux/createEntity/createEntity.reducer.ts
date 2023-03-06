import { ELocalisation } from 'types/protocol'
import { ECreateEntityActions, TCreateEntityActionTypes, TCreateEntityState } from './createEntity.types'

export const initialState: TCreateEntityState = {
  entityType: undefined,
  metadata: undefined,
  creator: undefined,
  administrator: undefined,
  ddoTags: [],
  page: undefined,
  service: [],
  claim: undefined,
  linkedResource: {},
  accordedRight: {},
  linkedEntity: {},

  entityClassDid: undefined,

  // for DAO
  daoGroups: {},
  daoController: '',

  // for Deed
  deed: undefined,

  // for Asset
  assetClassDid: undefined,
  assetInstances: [],

  // extra
  localisation: ELocalisation.EN,
  stepNo: 1,
  breadCrumbs: [{ text: 'Protocol', link: '/create/entity' }],
  title: '',
  subtitle: '',
} as any

export const reducer = (state = initialState, action: TCreateEntityActionTypes): TCreateEntityState => {
  switch (action.type) {
    case ECreateEntityActions.UpdateEntityType:
      return { ...state, entityType: action.payload }
    case ECreateEntityActions.GotoStep:
      return { ...state, stepNo: action.payload }
    case ECreateEntityActions.UpdateBreadCrumbs:
      return { ...state, breadCrumbs: action.payload }
    case ECreateEntityActions.UpdateTitle:
      return { ...state, title: action.payload }
    case ECreateEntityActions.UpdateSubtitle:
      return { ...state, subtitle: action.payload }
    case ECreateEntityActions.UpdateMetadata:
      return { ...state, metadata: action.payload }
    case ECreateEntityActions.UpdateCreator:
      return { ...state, creator: action.payload }
    case ECreateEntityActions.UpdateAdministrator:
      return { ...state, administrator: action.payload }
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
    case ECreateEntityActions.UpdateDAOController:
      return { ...state, daoController: action.payload }

    // for Deed
    case ECreateEntityActions.UpdateDeed:
      return { ...state, deed: action.payload }

    case ECreateEntityActions.Initialize:
      return initialState
    default:
      return state
  }
}
