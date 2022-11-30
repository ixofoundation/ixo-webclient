import { Attestation } from 'modules/EntityClaims/types'
import { Moment } from 'moment'
import { Agent, EntityType, NodeType, LinkedResourceType } from '../../modules/Entities/types'
import { EntityClaim } from 'modules/Entities/SelectedEntity/EntityImpact/EntityClaims/types'

export interface PageContent {
  header: PageContentHeader
  body: PageContentBodySection[]
  images: PageContentImage[]
  profiles: PageContentProfile[]
  social: PageContentSocial
  embedded: PageContentEmbedded[]
}

export interface PageContentHeader {
  image: string
  title: string
  shortDescription: string
  brand: string
  location: string
  sdgs: string[]
  imageDescription: string
  logo: string
}

export interface PageContentBodySection {
  title: string
  content: string
  image: string
}

export interface PageContentImage {
  title: string
  content: string
  image: string
  imageDescription: string
}

export interface PageContentProfile {
  name: string
  position: string
  linkedInUrl: string
  twitterUrl: string
  image: string
}

export interface PageContentSocial {
  linkedInUrl: string
  facebookUrl: string
  twitterUrl: string
  discourseUrl: string
  instagramUrl: string
  telegramUrl: string
  githubUrl: string
  otherUrl: string
}

export interface PageContentEmbedded {
  title: string
  urls: string[]
}

export interface RelatedEntity {
  ['@type']: string
  id: string
}

export interface Entity {
  name: string
  description: string
  type: EntityType
  did: string
  creatorDid: string
  dateCreated: Moment
  bondDid?: string
  creatorName: string
  creatorLogo: string
  creatorWebsite: string
  creatorMission: string
  status: string
  image: string
  logo: string
  location: string
  sdgs: string[]
  goal: string
  claimTemplateId: string
  requiredClaimsCount: number
  disputedClaimsCount: number
  successfulClaimsCount: number
  pendingClaimsCount: number
  rejectedClaimsCount: number
  evaluatorsCount: number
  evaluatorsPendingCount: number
  serviceProvidersCount: number
  serviceProvidersPendingCount: number
  agents: Agent[]
  content: PageContent | Attestation
  entityClaims: any
  claims: EntityClaim[]
  embeddedAnalytics?: PageContentEmbedded[]
  linkedEntities?: RelatedEntity[]
  nodeDid?: string
  ddoTags?: {
    category: string
    tags: string[]
  }[]
  linkedResources: {
    ['@type']: LinkedResourceType
    id: string
    name: string
    description: string
    path: string
  }[]
  nodes: {
    ['@context']: string
    items: { ['@type']: NodeType; id: string; serviceEndpoint: string }[]
  }
  error?: string
  address?: string
}

export enum SelectedEntityActions {
  GetEntity = 'ixo/Entity/GET_ENTITY',
  GetEntitySuccess = 'ixo/Entity/GET_ENTITY_FULFILLED',
  GetEntityPending = 'ixo/Entity/GET_ENTITY_PENDING',
  GetEntityFailure = 'ixo/Entity/GET_ENTITY_REJECTED',
  ClearEntity = 'ixo/Entity/CLEAR_ENTITY',
  UpdateProjectStatus = 'ixo/Project/UPDATE_STATUS',
  GetEntityBond = 'ixo/Entity/GET_ENTITY_BOND',
  GetEntityBondState = 'ixo/Entity/GET_ENTITY_BOND_STATE',
  GetEntityClaims = 'ixo/Entity/GET_ENTITY_CLAIMS',
  GetEntityClaimsSuccess = 'ixo/Entity/GET_ENTITY_CLAIMS_FULFILLED',
  GetEntityClaimsPending = 'ixo/Entity/GET_ENTITY_CLAIMS_PENDING',
  GetEntityClaimsFailure = 'ixo/Entity/GET_ENTITY_CLAIMS_REJECTED',
  UpdateEntityAddress = 'ixo/Entity/UPDATE_ENTITY_ADDRESS',
}

export interface GetEntityAction {
  type: typeof SelectedEntityActions.GetEntity
  payload: Promise<Entity>
}

export interface GetEntitySuccessAction {
  type: typeof SelectedEntityActions.GetEntitySuccess
  payload: Entity
}

export interface GetEntityFailureAction {
  type: typeof SelectedEntityActions.GetEntityFailure
  payload: string
}

export interface ClearEntityAction {
  type: typeof SelectedEntityActions.ClearEntity
}

export interface UpdateProjectStatusAction {
  type: typeof SelectedEntityActions.UpdateProjectStatus
}

export interface GetEntityBondAction {
  type: typeof SelectedEntityActions.GetEntityBond
  bondDid: Promise<string>
}

export interface GetEntityClaimsAction {
  type: typeof SelectedEntityActions.GetEntityClaims
  payload: Promise<EntityClaim[]>
}

export interface GetEntityClaimsSuccessAction {
  type: typeof SelectedEntityActions.GetEntityClaimsSuccess
  payload: EntityClaim[]
}

export interface GetEntityClaimsFailureAction {
  type: typeof SelectedEntityActions.GetEntityClaimsFailure
  payload: string
}

export interface UpdateEntityAddressAction {
  type: typeof SelectedEntityActions.UpdateEntityAddress
  payload: string
}

export type SelectedEntityActionTypes =
  | GetEntityAction
  | GetEntitySuccessAction
  | GetEntityFailureAction
  | ClearEntityAction
  | GetEntityBondAction
  | GetEntityClaimsAction
  | GetEntityClaimsSuccessAction
  | GetEntityClaimsFailureAction
  | UpdateEntityAddressAction
