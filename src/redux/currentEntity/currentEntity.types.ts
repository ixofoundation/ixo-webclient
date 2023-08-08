import { TEntityModel } from 'types/entities'

export enum CurrentEntityActions {
  UpdateEntity = 'ixo/CurrentEntity/UPDATE_ENTITY',
  UpdateEntityResource = 'ixo/CurrentEntity/UPDATE_ENTITY_RESOURCE',
  ClearEntity = 'ixo/CurrentEntity/CLEAR_ENTITY',
}

export interface UpdateEntityAction {
  type: typeof CurrentEntityActions.UpdateEntity
  payload: TEntityModel
}
export interface UpdateEntityResourceAction {
  type: typeof CurrentEntityActions.UpdateEntityResource
  payload: { key: string; data: any; merge: boolean }
}

export interface ClearEntityAction {
  type: typeof CurrentEntityActions.ClearEntity
}

export type CurrentEntityActionTypes = UpdateEntityAction | UpdateEntityResourceAction | ClearEntityAction
