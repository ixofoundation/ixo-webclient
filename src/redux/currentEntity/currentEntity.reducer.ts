import { TEntityModel } from 'types/entities'
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
  owner: '',
  profile: undefined,
  creator: undefined,
  administrator: undefined,
  page: [],
  tags: [],
}

export const reducer = (state = initialState, action: CurrentEntityActionTypes): TEntityModel => {
  switch (action.type) {
    case CurrentEntityActions.UpdateEntity: {
      return action.payload
    }
    case CurrentEntityActions.UpdateEntityResource: {
      const { key, data, merge } = action.payload
      if (merge) {
        return { ...state, [key]: { ...state[key], ...data } }
      } else {
        return { ...state, [key]: data }
      }
    }
    case CurrentEntityActions.ClearEntity:
      return initialState
    default:
      return { ...state }
  }
}
