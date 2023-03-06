export type CurrentEntity = {
  entityType: string
}

export enum CurrentEntityActions {
  UpdateEntity = 'ixo/CurrentEntity/UPDATE_ENTITY',
}

export interface UpdateEntityAction {
  type: typeof CurrentEntityActions.UpdateEntity
  payload: CurrentEntity
}

export type CurrentEntityActionTypes = UpdateEntityAction
