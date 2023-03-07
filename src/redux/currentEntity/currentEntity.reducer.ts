import { CurrentEntityActions, CurrentEntityActionTypes, CurrentEntity } from './currentEntity.types'

const initialState: CurrentEntity = {
  // from entity
  did: '',
  type: '',
  status: 0,
  relayerNode: '',
  credentials: [],
  entityVerified: false,
  metadata: {},

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

  // extracted payloads
  profile: undefined,
  creator: undefined,
  administrator: undefined,
  page: undefined,
  tags: [],
}

export const reducer = (state = initialState, action: CurrentEntityActionTypes): CurrentEntity => {
  switch (action.type) {
    case CurrentEntityActions.UpdateEntity:
      return action.payload
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
