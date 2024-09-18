import {
  ETransferEntityActions,
  TUpdateBreadCrumbsAction,
  TUpdateRecipientDidAction,
  TUpdateSubtitleAction,
  TUpdateTitleAction,
} from './transferEntity.types'

export const updateBreadCrumbsAction = (breadCrumbs: { text: string; link?: string }[]): TUpdateBreadCrumbsAction => ({
  type: ETransferEntityActions.UpdateBreadCrumbs,
  payload: breadCrumbs,
})

export const updateTitleAction = (title: string): TUpdateTitleAction => ({
  type: ETransferEntityActions.UpdateTitle,
  payload: title,
})

export const updateSubtitleAction = (subtitle: string): TUpdateSubtitleAction => ({
  type: ETransferEntityActions.UpdateSubtitle,
  payload: subtitle,
})

export const updateRecipientDidAction = (recipientDid: string): TUpdateRecipientDidAction => ({
  type: ETransferEntityActions.UpdateRecipientDid,
  payload: recipientDid,
})
