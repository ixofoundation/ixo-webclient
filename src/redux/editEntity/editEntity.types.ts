import { TEntityModel } from 'api/blocksync/types/entities'

export type EditEntityState = Partial<TEntityModel>

export enum EditEntityActions {
  SetEditedField = 'ixo/EditEntity/SET_EDITED_FIELD',
}

export interface SetEditedFieldAction {
  type: typeof EditEntityActions.SetEditedField
  payload: { key: string; data: any; merge: boolean }
}

export type EditEntityActionTypes = SetEditedFieldAction
