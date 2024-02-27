import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  updateBreadCrumbsAction,
  updateRecipientDidAction,
  updateSubtitleAction,
  updateTitleAction,
} from 'redux/transferEntity/transferEntity.actions'
import {
  selectTransferEntityBreadCrumbs,
  selectTransferEntityRecipientDid,
  selectTransferEntitySubtitle,
  selectTransferEntityTitle,
} from 'redux/transferEntity/transferEntity.selectors'

export function useTransferEntityState() {
  const dispatch = useAppDispatch()

  const breadCrumbs: { text: string; link?: string }[] = useAppSelector(selectTransferEntityBreadCrumbs)
  const title: string = useAppSelector(selectTransferEntityTitle)
  const subtitle: string = useAppSelector(selectTransferEntitySubtitle)
  const recipientDid: string = useAppSelector(selectTransferEntityRecipientDid)

  const updateBreadCrumbs = (breadCrumbs: { text: string; link?: string }[]): void => {
    dispatch(updateBreadCrumbsAction(breadCrumbs))
  }
  const updateTitle = (title: string): void => {
    dispatch(updateTitleAction(title))
  }
  const updateSubtitle = (subtitle: string): void => {
    dispatch(updateSubtitleAction(subtitle))
  }
  const updateRecipientDid = (recipientDid: string): void => {
    dispatch(updateRecipientDidAction(recipientDid))
  }

  return {
    breadCrumbs,
    title,
    subtitle,
    recipientDid,
    updateBreadCrumbs,
    updateTitle,
    updateSubtitle,
    updateRecipientDid,
  }
}
