import {
  DocumentStoreUploadState,
  DocumentStoreUploadActionTypes,
  DocumentStoreUploadActions,
} from './types'

export const initialState: DocumentStoreUploadState = {
  key: null,
  uploading: false,
}

export const reducer = (
  state = initialState,
  action: DocumentStoreUploadActionTypes,
): DocumentStoreUploadState => {
  switch (action.type) {
    case DocumentStoreUploadActions.UploadDocumentPending:
      return { key: null, uploading: true }
    case DocumentStoreUploadActions.UploadDocumentSuccess:
      return { key: action.payload, uploading: false }
    case DocumentStoreUploadActions.UploadDocumentFailure:
      return initialState
  }

  return state
}
