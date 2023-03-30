import { TEntityModel } from 'api/blocksync/types/entities'
import { CurrentEntityActions, CurrentEntityActionTypes } from './currentEntity.types'

const initialState: TEntityModel = {
  // from entity
  id: '',
  type: '',
  status: 0,
  relayerNode: '',
  credentials: [],
  entityVerified: false,
  metadata: undefined,

  // from iidDocument
  context: [],
  controller: [],
  service: [],
  verificationMethod: [],
  authentication: [],
  assertionMethod: [],
  keyAgreement: [],
  capabilityInvocation: [],
  capabilityDelegation: [],
  linkedResource: [],
  linkedClaim: [],
  accordedRight: [],
  linkedEntity: [],
  alsoKnownAs: '',
  accounts: [],

  // extracted payloads
  profile: undefined,
  creator: undefined,
  administrator: undefined,
  page: [],
  tags: [],
}

export const reducer = (state = initialState, action: CurrentEntityActionTypes): TEntityModel => {
  switch (action.type) {
    case CurrentEntityActions.UpdateEntity: {
      if (state.id === action.payload.id) {
        return { ...state }
      }
      return action.payload
    }
    case CurrentEntityActions.UpdateEntityProfile:
      return { ...state, profile: action.payload }
    case CurrentEntityActions.UpdateEntityCreator:
      return { ...state, creator: action.payload }
    case CurrentEntityActions.UpdateEntityAdministrator:
      return { ...state, administrator: action.payload }
    case CurrentEntityActions.UpdateEntityPage:
      return { ...state, page: action.payload }
    case CurrentEntityActions.UpdateEntityTags:
      return { ...state, tags: action.payload }
    default:
      return { ...state }
  }
}
