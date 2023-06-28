import { TEntityModel } from 'api/blocksync/types/entities'

export enum CurrentEntityActions {
  UpdateEntity = 'ixo/CurrentEntity/UPDATE_ENTITY',
  UpdateEntityResource = 'ixo/CurrentEntity/UPDATE_ENTITY_RESOURCE',
}

export interface UpdateEntityAction {
  type: typeof CurrentEntityActions.UpdateEntity
  payload: TEntityModel
}
export interface UpdateEntityResourceAction {
  type: typeof CurrentEntityActions.UpdateEntityResource
  payload: { key: string; data: any; merge: boolean }
}

export type CurrentEntityActionTypes = UpdateEntityAction | UpdateEntityResourceAction
