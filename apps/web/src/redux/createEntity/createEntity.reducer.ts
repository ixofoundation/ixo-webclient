import { NodeType, TEntityServiceModel } from 'types/entities'
import { ELocalisation } from 'types/protocol'
import { ECreateEntityActions, TCreateEntityActionTypes, TCreateEntityState } from './createEntity.types'

export const initialIpfsService: TEntityServiceModel = {
  id: '{id}#ipfs',
  type: NodeType.Ipfs,
  serviceEndpoint: 'https://ipfs.io/ipfs',
}

export const initialState: TCreateEntityState = {
  entityType: undefined,
  profile: undefined,
  creator: undefined,
  administrator: undefined,
  ddoTags: [],
  page: undefined,
  service: [initialIpfsService],
  claim: undefined,
  linkedResource: {},
  accordedRight: {},
  linkedEntity: {},

  // for DAO
  daoGroups: {},
  daoController: '',

  // for Proposal
  proposal: undefined,

  // for Asset
  assetClassDid: undefined,
  assetInstances: [],

  // for Claim
  claimQuestions: {},
  claimQuestionJSON: { pages: [] },

  // extra
  localisation: ELocalisation.EN,
  stepNo: 1,
  breadCrumbs: [{ text: 'Protocol', link: '/create/entity' }],
  title: '',
  subtitle: '',
} as any

export const reducer = (state = initialState, action: TCreateEntityActionTypes): TCreateEntityState => {
  let updatedState
  switch (action.type) {
    case ECreateEntityActions.UpdateEntityType: {
      const entityType = action.payload
      const ls = localStorage.getItem(`ixo.create.entity.${entityType}`)
      const savedState = JSON.parse(ls!)

      return {
        stepNo: initialState.stepNo,
        entityType: action.payload,
        service: [initialIpfsService],
        ...savedState,
      }
    }
    case ECreateEntityActions.ClearEntity: {
      updatedState = initialState
      break
    }
    case ECreateEntityActions.GotoStep:
      updatedState = { ...state, stepNo: action.payload }
      break
    case ECreateEntityActions.UpdateBreadCrumbs:
      updatedState = { ...state, breadCrumbs: action.payload }
      break
    case ECreateEntityActions.UpdateLocalisation:
      updatedState = { ...state, localisation: action.payload }
      break
    case ECreateEntityActions.UpdateTitle:
      updatedState = { ...state, title: action.payload }
      break
    case ECreateEntityActions.UpdateSubtitle:
      updatedState = { ...state, subtitle: action.payload }
      break
    case ECreateEntityActions.UpdateProfile:
      updatedState = { ...state, profile: action.payload }
      break
    case ECreateEntityActions.UpdateCreator:
      updatedState = { ...state, creator: action.payload }
      break
    case ECreateEntityActions.UpdateAdministrator:
      updatedState = { ...state, administrator: action.payload }
      break
    case ECreateEntityActions.UpdateDDOTags:
      updatedState = { ...state, ddoTags: action.payload }
      break
    case ECreateEntityActions.UpdatePage:
      updatedState = { ...state, page: action.payload }
      break
    case ECreateEntityActions.UpdateService:
      if (action.payload.some((item) => item.type === NodeType.Ipfs)) {
        updatedState = { ...state, service: action.payload }
      } else {
        updatedState = { ...state, service: [...state.service, ...action.payload] }
      }
      break
    case ECreateEntityActions.UpdateClaim:
      updatedState = { ...state, claim: action.payload }
      break
    case ECreateEntityActions.UpdateLinkedResource:
      updatedState = { ...state, linkedResource: action.payload }
      break
    case ECreateEntityActions.UpdateAccordedRight:
      updatedState = { ...state, accordedRight: action.payload }
      break
    case ECreateEntityActions.UpdateLinkedEntity:
      updatedState = { ...state, linkedEntity: action.payload }
      break
    case ECreateEntityActions.UpdateStartEndDate:
      updatedState = { ...state, ...action.payload }
      break

    // for Asset
    case ECreateEntityActions.AddAssetInstances:
      updatedState = {
        ...state,
        assetInstances: (state.assetInstances ?? []).concat(action.payload),
      }
      break
    case ECreateEntityActions.UpdateAssetInstance:
      updatedState = {
        ...state,
        assetInstances: [...(state.assetInstances as any)].map((instance, index) =>
          index === action.payload.id ? action.payload.data : instance,
        ),
      }
      break
    case ECreateEntityActions.RemoveAssetInstances:
      updatedState = { ...state, assetInstances: [] }
      break

    // for DAO
    case ECreateEntityActions.UpdateDAOGroups:
      updatedState = { ...state, daoGroups: action.payload }
      break
    case ECreateEntityActions.UpdateDAOController:
      updatedState = { ...state, daoController: action.payload }
      break

    // for Proposal
    case ECreateEntityActions.UpdateProposal:
      updatedState = { ...state, proposal: action.payload }
      break

    // for Claim
    case ECreateEntityActions.UpdateClaimQuestions:
      updatedState = { ...state, claimQuestions: action.payload }
      break
    case ECreateEntityActions.UpdateClaimQuestionJSON:
      updatedState = { ...state, claimQuestionJSON: action.payload }
      break

    default:
      return state
  }

  if (state.entityType) {
    localStorage.setItem(`ixo.create.entity.${state.entityType}`, JSON.stringify(updatedState))
  }

  return updatedState
}
