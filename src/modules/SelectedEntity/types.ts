import { Entity } from '../Entities/types';

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
  | ClearEntityAction;
