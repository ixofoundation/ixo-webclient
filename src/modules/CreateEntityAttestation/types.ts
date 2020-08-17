/* eslint-disable @typescript-eslint/no-empty-interface */
import { Type, ControlType } from '../../common/components/JsonForm/types'
import { Validation } from '../CreateEntity/types'

export interface ClaimInfo {
  title: string
  shortDescription: string
}

export interface Question {
  id: string
  title: string
  description: string
  label: string
  required: boolean
  type: Type
  control: ControlType
  minItems?: number
  maxItems?: number
  values?: any[]
  itemValues?: string[]
  itemLabels?: string[]
  itemImages?: string[]
  placeholder?: string
  initialValue?: string
  inline?: boolean
}

export interface CreateEntityAttestationState {
  claimInfo: ClaimInfo
  questions: {
    [id: string]: Question
  }
  validation: {
    [identifier: string]: Validation
  }
}

export enum CreateEntityAttestationActions {
  UpdateClaimInfo = 'ixo/CreateEntityAttestation/UPDATE_CLAIM_INFO',
  AddShortTextQuestion = 'ixo/CreateEntityAttestation/ADD_SHOR_TTEXT_QUESTION',
  UpdateShortTextQuestion = 'ixo/CreateEntityAttestation/UPDATE_SHORT_TEXT_QUESTION',
  AddLongTextQuestion = 'ixo/CreateEntityAttestation/ADD_LONG_TEXT_QUESTION',
  UpdateLongTextQuestion = 'ixo/CreateEntityAttestation/UPDATE_LONG_TEXT_QUESTION',
  AddRatingQuestion = 'ixo/CreateEntityAttestation/ADD_RATING_QUESTION',
  UpdateRatingQuestion = 'ixo/CreateEntityAttestation/UPDATE_RATING_QUESTION',
  AddSingleDateSelectorQuestion = 'ixo/CreateEntityAttestation/ADD_SINGLE_DATE_SELECTOR_QUESTION',
  UpdateSingleDateSelectorQuestion = 'ixo/CreateEntityAttestation/UPDATE_SINGLE_DATE_SELECTOR_QUESTION',
  AddDateRangeSelectorQuestion = 'ixo/CreateEntityAttestation/ADD_DATE_RANGE_SELECTOR_QUESTION',
  UpdateDateRangeSelectorQuestion = 'ixo/CreateEntityAttestation/UPDATE_DATE_RANGE_SELECTOR_QUESTION',
  AddLocationSelectorQuestion = 'ixo/CreateEntityAttestation/ADD_LOCATION_SELECTOR_QUESTION',
  UpdateLocationSelectorQuestion = 'ixo/CreateEntityAttestation/UPDATE_LOCATION_SELECTOR_QUESTION',
  AddQRCodeQuestion = 'ixo/CreateEntityAttestation/ADD_QR_CODE_QUESTION',
  UpdateQRCodeQuestion = 'ixo/CreateEntityAttestation/UPDATE_QR_CODE_QUESTION',
  AddAvatarUploadQuestion = 'ixo/CreateEntityAttestation/ADD_AVATAR_UPLOAD_QUESTION',
  UpdateAvatarUploadQuestion = 'ixo/CreateEntityAttestation/UPDATE_AVATAR_UPLOAD_QUESTION',
  AddImageUploadQuestion = 'ixo/CreateEntityAttestation/ADD_IMAGE_UPLOAD_QUESTION',
  UpdateImageUploadQuestion = 'ixo/CreateEntityAttestation/UPDATE_IMAGE_UPLOAD_QUESTION',
  AddVideoUploadQuestion = 'ixo/CreateEntityAttestation/ADD_VIDEO_UPLOAD_QUESTION',
  UpdateVideoUploadQuestion = 'ixo/CreateEntityAttestation/UPDATE_VIDEO_UPLOAD_QUESTION',
  AddAudioUploadQuestion = 'ixo/CreateEntityAttestation/ADD_AUDIO_UPLOAD_QUESTION',
  UpdateAudioUploadQuestion = 'ixo/CreateEntityAttestation/UPDATE_AUDIO_UPLOAD_QUESTION',
  AddDocumentUploadQuestion = 'ixo/CreateEntityAttestation/ADD_DOCUMENT_UPLOAD_QUESTION',
  UpdateDocumentUploadQuestion = 'ixo/CreateEntityAttestation/UPDATE_DOCUMENT_UPLOAD_QUESTION',
  UpdateAnswerRequired = 'ixo/CreateEntityAttestation/UPDATE_ANSWER_REQUIRED',
  RemoveQuestion = 'ixo/CreateEntityAttestation/REMOVE_QUESTION',
}

export interface UpdateClaimInfoAction {
  type: typeof CreateEntityAttestationActions.UpdateClaimInfo
  payload: {
    title: string
    shortDescription: string
  }
}

interface AddQuestionActionPayload {
  id: string
  title: string
  description: string
  label: string
  required: boolean
  type: Type
  control: ControlType
}

interface AddQuestionAction<T> {
  type: T
  payload: AddQuestionActionPayload
}

interface UpdateQuestionActionPayload {
  id: string
  title: string
  description: string
  label: string
}

interface UpdateQuestionAction<T> {
  type: T
  payload: UpdateQuestionActionPayload
}

export interface AddShortTextQuestionAction
  extends AddQuestionAction<
    typeof CreateEntityAttestationActions.AddShortTextQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    required: boolean
    type: Type
    control: ControlType
    placeholder: string
  }
}

export interface UpdateShortTextQuestionAction
  extends UpdateQuestionAction<
    typeof CreateEntityAttestationActions.UpdateShortTextQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
  }
}

export interface AddLongTextQuestionAction
  extends AddQuestionAction<
    typeof CreateEntityAttestationActions.AddLongTextQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    required: boolean
    type: Type
    control: ControlType
    placeholder: string
  }
}

export interface UpdateLongTextQuestionAction
  extends UpdateQuestionAction<
    typeof CreateEntityAttestationActions.UpdateLongTextQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
  }
}

export interface UpdateAnswerRequiredAction {
  type: typeof CreateEntityAttestationActions.UpdateAnswerRequired
  payload: {
    id: string
    required: boolean
  }
}

export type CreateEntityAttestationActionTypes =
  | UpdateClaimInfoAction
  | AddShortTextQuestionAction
  | AddLongTextQuestionAction
  | UpdateShortTextQuestionAction
  | UpdateLongTextQuestionAction
  | UpdateAnswerRequiredAction
