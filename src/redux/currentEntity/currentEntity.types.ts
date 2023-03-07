import {
  AccordedRight,
  Context,
  LinkedClaim,
  LinkedEntity,
  LinkedResource,
  Service,
  VerificationMethod,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import {
  TEntityAdministratorModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityPageModel,
  TEntityProfileModel,
} from 'types/protocol'

export type CurrentEntity = {
  did: string
  type: string
  status: number
  relayerNode: string
  credentials: unknown[] // TODO:
  entityVerified: boolean
  metadata?: unknown // TODO:

  context: Context[]
  controller: string[]
  service: Service[]
  verificationMethod: VerificationMethod[]
  authentication: string[]
  assertionMethod: unknown[]
  keyAgreement: unknown[]
  capabilityInvocation: unknown[]
  capabilityDelegation: unknown[]
  linkedResource: LinkedResource[]
  linkedClaim: LinkedClaim[]
  accordedRight: AccordedRight[]
  linkedEntity: LinkedEntity[]
  alsoKnownAs: string

  profile?: TEntityProfileModel
  creator?: TEntityCreatorModel
  administrator?: TEntityAdministratorModel
  page?: TEntityPageModel
  tags?: TEntityDDOTagModel[]
}

export enum CurrentEntityActions {
  UpdateEntity = 'ixo/CurrentEntity/UPDATE_ENTITY',
  UpdateEntityProfile = 'ixo/CurrentEntity/UPDATE_ENTITY_PROFILE',
  UpdateEntityCreator = 'ixo/CurrentEntity/UPDATE_ENTITY_CREATOR',
  UpdateEntityAdministrator = 'ixo/CurrentEntity/UPDATE_ENTITY_ADMINISTRATOR',
  UpdateEntityPage = 'ixo/CurrentEntity/UPDATE_ENTITY_PAGE',
  UpdateEntityTags = 'ixo/CurrentEntity/UPDATE_ENTITY_TAGS',
}

export interface UpdateEntityAction {
  type: typeof CurrentEntityActions.UpdateEntity
  payload: CurrentEntity
}
export interface UpdateEntityProfileAction {
  type: typeof CurrentEntityActions.UpdateEntityProfile
  payload: TEntityProfileModel
}
export interface UpdateEntityCreatorAction {
  type: typeof CurrentEntityActions.UpdateEntityCreator
  payload: TEntityCreatorModel
}
export interface UpdateEntityAdministratorAction {
  type: typeof CurrentEntityActions.UpdateEntityAdministrator
  payload: TEntityAdministratorModel
}
export interface UpdateEntityPageAction {
  type: typeof CurrentEntityActions.UpdateEntityPage
  payload: TEntityPageModel
}
export interface UpdateEntityTagsAction {
  type: typeof CurrentEntityActions.UpdateEntityTags
  payload: TEntityDDOTagModel[]
}

export type CurrentEntityActionTypes =
  | UpdateEntityAction
  | UpdateEntityProfileAction
  | UpdateEntityCreatorAction
  | UpdateEntityAdministratorAction
  | UpdateEntityPageAction
  | UpdateEntityTagsAction
