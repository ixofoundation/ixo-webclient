import { Moment } from 'moment'
import { Agent, EntityType } from '../types'

export interface Entity {
  name: string
  description: string
  type: EntityType
  did: string
  creatorDid: string
  dateCreated: Moment
  bondDid: string
  ownerName: string
  ownerLogo: string
  ownerWebsite: string
  ownerMission: string
  status: string
  image: string
  logo: string
  location: string
  sdgs: string[]
  goal: string
  requiredClaimsCount: number
  successfulClaimsCount: number
  pendingClaimsCount: number
  rejectedClaimsCount: number
  evaluatorsCount: number
  evaluatorsPendingCount: number
  serviceProvidersCount: number
  serviceProvidersPendingCount: number
  agents: Agent[]
  content: any // TODO - define interface
}

export enum SelectedEntityActions {
  GetEntity = 'ixo/Entity/GET_ENTITY',
  GetEntitySuccess = 'ixo/Entity/GET_ENTITY_FULFILLED',
  GetEntityPending = 'ixo/Entity/GET_ENTITY_PENDING',
  GetEntityFailure = 'ixo/Entity/GET_ENTITY_REJECTED',
  ClearEntity = 'ixo/Entity/CLEAR_ENTITY',
}

export interface GetEntityAction {
  type: typeof SelectedEntityActions.GetEntity
  payload: Promise<Entity>
}

export interface GetEntitySuccessAction {
  type: typeof SelectedEntityActions.GetEntitySuccess
  payload: Entity
}

export interface ClearEntityAction {
  type: typeof SelectedEntityActions.ClearEntity
}

export type SelectedEntityActionTypes =
  | GetEntityAction
  | GetEntitySuccessAction
  | ClearEntityAction
