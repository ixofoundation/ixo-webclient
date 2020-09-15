import { Moment } from 'moment'
import { ExplorerEntity } from '../EntitiesExplorer/types'
import { EntityType } from '../types'

export interface Entity {
  name: string
  description: string
  type: EntityType
  did: string
  creatorDid: string
  dateCreated: Moment
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
  payload: Promise<ExplorerEntity>
}

export interface GetEntitySuccessAction {
  type: typeof SelectedEntityActions.GetEntitySuccess
  payload: ExplorerEntity
}

export interface ClearEntityAction {
  type: typeof SelectedEntityActions.ClearEntity
}

export type SelectedEntityActionTypes =
  | GetEntityAction
  | GetEntitySuccessAction
  | ClearEntityAction
