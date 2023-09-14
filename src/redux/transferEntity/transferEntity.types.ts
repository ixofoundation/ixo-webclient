import { TEntityModel } from 'types/entities'

export interface TTransferEntityState {
  breadCrumbs: { text: string; link?: string }[]
  title: string
  subtitle: string

  selectedEntity: TEntityModel | undefined
  recipientDid: string
}

export enum ETransferEntityActions {
  UpdateBreadCrumbs = 'ixo/transfer/entity/UPDATE_BREAD_CRUMBS',
  UpdateTitle = 'ixo/transfer/entity/UPDATE_TITLE',
  UpdateSubtitle = 'ixo/transfer/entity/UPDATE_SUBTITLE',
  UpdateSelectedEntity = 'ixo/transfer/entity/UPDATE_SELECTED_ENTITY',
  UpdateRecipientDid = 'ixo/transfer/entity/UPDATE_RECIPIENTDID',
}

export interface TUpdateBreadCrumbsAction {
  type: typeof ETransferEntityActions.UpdateBreadCrumbs
  payload: { text: string; link?: string }[]
}
export interface TUpdateTitleAction {
  type: typeof ETransferEntityActions.UpdateTitle
  payload: string
}
export interface TUpdateSubtitleAction {
  type: typeof ETransferEntityActions.UpdateSubtitle
  payload: string
}
export interface TUpdateSelectedEntityAction {
  type: typeof ETransferEntityActions.UpdateSelectedEntity
  payload: TEntityModel
}
export interface TUpdateRecipientDidAction {
  type: typeof ETransferEntityActions.UpdateRecipientDid
  payload: string
}

export type TTransferEntityActionTypes =
  | TUpdateBreadCrumbsAction
  | TUpdateTitleAction
  | TUpdateSubtitleAction
  | TUpdateSelectedEntityAction
  | TUpdateRecipientDidAction
