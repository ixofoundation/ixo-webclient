import { Dispatch } from 'redux'
import blocksyncApi from '../../api/blocksync-api/blocksync-api'
import { UploadDocumentActionType, DocumentStoreUploadActions } from './types'

export const uploadDocument = (fileData: string, pdsUrl: string) => (
  dispatch: Dispatch,
): UploadDocumentActionType => {
  return dispatch({
    type: DocumentStoreUploadActions.UploadDocument,
    payload: blocksyncApi.project
      .createPublic(fileData, pdsUrl)
      .then((response: any) => response.result),
  })
}
