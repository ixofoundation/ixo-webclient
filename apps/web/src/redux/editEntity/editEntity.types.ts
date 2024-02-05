import { TEntityModel } from 'types/entities'

export enum EditEntityActions {
  SetEditedField = 'ixo/EditEntity/SET_EDITED_FIELD',
  SetEditEntity = 'ixo/EditEntity/SET_EDIT_ENTITY',
}

export interface SetEditedFieldAction {
  type: typeof EditEntityActions.SetEditedField
  payload: { key: string; data: any; merge: boolean }
}

export interface SetEditEntityAction {
  type: typeof EditEntityActions.SetEditEntity
  payload: TEntityModel
}

export type EditEntityActionTypes = SetEditedFieldAction | SetEditEntityAction
