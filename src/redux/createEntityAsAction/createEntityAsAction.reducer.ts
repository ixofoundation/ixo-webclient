import { NodeType, PDS_URL, TEntityServiceModel } from 'types/entities'
import { ELocalisation } from 'types/protocol'
import { ECreateEntityAsActionActions, TCreateEntityActionTypes, TCreateEntityState } from './createEntityAsAction.types'

export const initialIpfsService: TEntityServiceModel = {
  id: '{id}#ipfs',
  type: NodeType.Ipfs,
  serviceEndpoint: 'https://ipfs.io/ipfs',
}

export const initialCellnodeService: TEntityServiceModel = {
  id: '{id}#cellnode',
  type: NodeType.CellNode,
  serviceEndpoint: PDS_URL!,
}

export const initialState: TCreateEntityState = {
  entityType: undefined,
  profile: undefined,
  creator: undefined,
  administrator: undefined,
  ddoTags: [],
  page: undefined,
  service: [initialCellnodeService, initialIpfsService],
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
  questionJSON: { pages: [] },

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
    case ECreateEntityAsActionActions.UpdateEntityType: {
      const entityType = action.payload
      const ls = localStorage.getItem(`ixo.create.entityAsAction.${entityType}`)
      const savedState = JSON.parse(ls!)

      return {
        stepNo: initialState.stepNo,
        entityType: action.payload,
        service: [initialCellnodeService, initialIpfsService],
        ...savedState,
      }
    }
    case ECreateEntityAsActionActions.ClearEntity: {
      updatedState = initialState
      break
    }
    case ECreateEntityAsActionActions.GotoStep:
      updatedState = { ...state, stepNo: action.payload }
      break
    case ECreateEntityAsActionActions.UpdateBreadCrumbs:
      updatedState = { ...state, breadCrumbs: action.payload }
      break
    case ECreateEntityAsActionActions.UpdateLocalisation:
      updatedState = { ...state, localisation: action.payload }
      break
    case ECreateEntityAsActionActions.UpdateTitle:
      updatedState = { ...state, title: action.payload }
      break
    case ECreateEntityAsActionActions.UpdateSubtitle:
      updatedState = { ...state, subtitle: action.payload }
      break
    case ECreateEntityAsActionActions.UpdateProfile:
      updatedState = { ...state, profile: action.payload }
      break
    case ECreateEntityAsActionActions.UpdateCreator:
      updatedState = { ...state, creator: action.payload }
      break
    case ECreateEntityAsActionActions.UpdateAdministrator:
      updatedState = { ...state, administrator: action.payload }
      break
    case ECreateEntityAsActionActions.UpdateDDOTags:
      updatedState = { ...state, ddoTags: action.payload }
      break
    case ECreateEntityAsActionActions.UpdatePage:
      updatedState = { ...state, page: action.payload }
      break
    case ECreateEntityAsActionActions.UpdateService:
      if (action.payload.some((item) => item.type === NodeType.Ipfs)) {
        updatedState = { ...state, service: action.payload }
      } else {
        updatedState = { ...state, service: [...state.service, ...action.payload] }
      }
      break
    case ECreateEntityAsActionActions.UpdateClaim:
      updatedState = { ...state, claim: action.payload }
      break
    case ECreateEntityAsActionActions.UpdateLinkedResource:
      updatedState = { ...state, linkedResource: action.payload }
      break
    case ECreateEntityAsActionActions.UpdateAccordedRight:
      updatedState = { ...state, accordedRight: action.payload }
      break
    case ECreateEntityAsActionActions.UpdateLinkedEntity:
      updatedState = { ...state, linkedEntity: action.payload }
      break
    case ECreateEntityAsActionActions.UpdateStartEndDate:
      updatedState = { ...state, ...action.payload }
      break

    // for Asset
    case ECreateEntityAsActionActions.AddAssetInstances:
      updatedState = {
        ...state,
        assetInstances: (state.assetInstances ?? []).concat(action.payload),
      }
      break
    case ECreateEntityAsActionActions.UpdateAssetInstance:
      updatedState = {
        ...state,
        assetInstances: [...(state.assetInstances as any)].map((instance, index) =>
          index === action.payload.id ? action.payload.data : instance,
        ),
      }
      break
    case ECreateEntityAsActionActions.RemoveAssetInstances:
      updatedState = { ...state, assetInstances: [] }
      break

    // for DAO
    case ECreateEntityAsActionActions.UpdateDAOGroups:
      updatedState = { ...state, daoGroups: action.payload }
      break
    case ECreateEntityAsActionActions.UpdateDAOController:
      updatedState = { ...state, daoController: action.payload }
      break

    // for Proposal
    case ECreateEntityAsActionActions.UpdateProposal:
      updatedState = { ...state, proposal: action.payload }
      break

    // for Claim
    case ECreateEntityAsActionActions.UpdateClaimQuestions:
      updatedState = { ...state, claimQuestions: action.payload }
      break
    case ECreateEntityAsActionActions.UpdateQuestionJSON:
      updatedState = { ...state, questionJSON: action.payload }
      break

    default:
      return state
  }

  if (state.entityType) {
    localStorage.setItem(`ixo.create.entityAsAction.${state.entityType}`, JSON.stringify(updatedState))
  }

  return updatedState
}
