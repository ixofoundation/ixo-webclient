export interface DocumentStoreUploadState {
  uploading: boolean
  key: string
}

export enum DocumentStoreUploadActions {
  UploadDocument = 'ixo/DocumentStoreUpload/UPLOAD_DOCUMENT',
  UploadDocumentPending = 'ixo/DocumentStoreUpload/UPLOAD_DOCUMENT_PENDING',
  UploadDocumentSuccess = 'ixo/DocumentStoreUpload/UPLOAD_DOCUMENT_FULFILLED',
  UploadDocumentFailure = 'ixo/DocumentStoreUpload/UPLOAD_DOCUMENT_REJECTED',
}

export interface UploadDocumentActionType {
  type: typeof DocumentStoreUploadActions.UploadDocument
  payload: Promise<any>
}

export interface UploadDocumentPendingActionType {
  type: typeof DocumentStoreUploadActions.UploadDocumentPending
}

export interface UploadDocumentSuccessActionType {
  type: typeof DocumentStoreUploadActions.UploadDocument
}

export interface UploadDocumentFailureActionType {
  type: typeof DocumentStoreUploadActions.UploadDocumentFailure
}

export type DocumentStoreUploadActionTypes =
  | UploadDocumentActionType
  | UploadDocumentPendingActionType
  | UploadDocumentSuccessActionType
  | UploadDocumentFailureActionType
