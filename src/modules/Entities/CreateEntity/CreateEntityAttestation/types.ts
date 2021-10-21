/* eslint-disable @typescript-eslint/no-empty-interface */
import { Type, ControlType } from 'common/components/JsonForm/types'
import { Validation } from '../types'
// import { EntityClaimType } from 'modules/EntityClaims/types'

export interface ClaimInfo {
  title: string
  shortDescription: string
  // type: EntityClaimType
  type: string
}

export interface Question {
  id: string
  title: string
  description: string
  label: string
  required: boolean
  type: Type
  control: ControlType
  attributeType: string
  minItems?: number
  maxItems?: number
  values?: string[]
  itemValues?: string[]
  itemLabels?: string[]
  itemImages?: string[]
  placeholder?: string
  initialValue?: string
  inline?: boolean
  order: number
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

export interface QuestionCardBaseProps {
  title: string
  description: string
  label: string
  attributeType: string
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
  AddQRCodeScanQuestion = 'ixo/CreateEntityAttestation/ADD_QR_CODE_SCAN_QUESTION',
  UpdateQRCodeScanQuestion = 'ixo/CreateEntityAttestation/UPDATE_QR_CODE_SCAN_QUESTION',
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
  AddCheckBoxesQuestion = 'ixo/CreateEntityAttestation/ADD_CHECKBOXES_QUESTION',
  UpdateCheckBoxesQuestion = 'ixo/CreateEntityAttestation/UPDATE_CHECKBOXES_QUESTION',
  UpdateAnswerRequired = 'ixo/CreateEntityAttestation/UPDATE_ANSWER_REQUIRED',
  RemoveQuestion = 'ixo/CreateEntityAttestation/REMOVE_QUESTION',
  CopyQuestion = 'ixo/CreateEntityAttestation/COPY_QUESTION',
  MoveQuestion = 'ixo/CreateEntityAttestation/MOVE_QUESTION',
  Validated = 'ixo/CreateEntityAttestation/SET_VALIDATED',
  ValidationError = 'ixo/CreateEntityAttestation/VALIDATION_ERROR',
}

export interface UpdateClaimInfoAction {
  type: typeof CreateEntityAttestationActions.UpdateClaimInfo
  payload: {
    title: string
    shortDescription: string
    // type: EntityClaimType
    type: string
  }
}

interface AddQuestionActionPayload {
  id: string
  title: string
  description: string
  label: string
  attributeType: string
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
  attributeType: string
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
    attributeType: string
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
    attributeType: string
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
    attributeType: string
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
    attributeType: string
  }
}

export interface AddSingleDateSelectorQuestionAction
  extends AddQuestionAction<
    typeof CreateEntityAttestationActions.AddSingleDateSelectorQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
    required: boolean
    type: Type
    control: ControlType
  }
}

export interface UpdateSingleDateSelectorQuestionAction
  extends UpdateQuestionAction<
    typeof CreateEntityAttestationActions.UpdateSingleDateSelectorQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddDateRangeSelectorQuestionAction
  extends AddQuestionAction<
    typeof CreateEntityAttestationActions.AddDateRangeSelectorQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
    required: boolean
    type: Type
    control: ControlType
  }
}

export interface UpdateDateRangeSelectorQuestionAction
  extends UpdateQuestionAction<
    typeof CreateEntityAttestationActions.UpdateDateRangeSelectorQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddAvatarUploadQuestionAction
  extends AddQuestionAction<
    typeof CreateEntityAttestationActions.AddAvatarUploadQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
    required: boolean
    type: Type
    control: ControlType
  }
}

export interface UpdateAvatarUploadQuestionAction
  extends UpdateQuestionAction<
    typeof CreateEntityAttestationActions.UpdateAvatarUploadQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddImageUploadQuestionAction
  extends AddQuestionAction<
    typeof CreateEntityAttestationActions.AddImageUploadQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
    required: boolean
    type: Type
    control: ControlType
  }
}

export interface UpdateImageUploadQuestionAction
  extends UpdateQuestionAction<
    typeof CreateEntityAttestationActions.UpdateImageUploadQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddVideoUploadQuestionAction
  extends AddQuestionAction<
    typeof CreateEntityAttestationActions.AddVideoUploadQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
    required: boolean
    type: Type
    control: ControlType
  }
}

export interface UpdateVideoUploadQuestionAction
  extends UpdateQuestionAction<
    typeof CreateEntityAttestationActions.UpdateVideoUploadQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    attributeType: string
    label: string
  }
}

export interface AddAudioUploadQuestionAction
  extends AddQuestionAction<
    typeof CreateEntityAttestationActions.AddAudioUploadQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
    required: boolean
    type: Type
    control: ControlType
  }
}

export interface UpdateAudioUploadQuestionAction
  extends UpdateQuestionAction<
    typeof CreateEntityAttestationActions.UpdateAudioUploadQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddDocumentUploadQuestionAction
  extends AddQuestionAction<
    typeof CreateEntityAttestationActions.AddDocumentUploadQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
    required: boolean
    type: Type
    control: ControlType
  }
}

export interface UpdateDocumentUploadQuestionAction
  extends UpdateQuestionAction<
    typeof CreateEntityAttestationActions.UpdateDocumentUploadQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddLocationSelectorQuestionAction
  extends AddQuestionAction<
    typeof CreateEntityAttestationActions.AddLocationSelectorQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
    required: boolean
    type: Type
    control: ControlType
  }
}

export interface UpdateLocationSelectorQuestionAction
  extends UpdateQuestionAction<
    typeof CreateEntityAttestationActions.UpdateLocationSelectorQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddQRCodeQuestionAction
  extends AddQuestionAction<
    typeof CreateEntityAttestationActions.AddQRCodeQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
    required: boolean
    type: Type
    control: ControlType
    initialValue: string
  }
}

export interface UpdateQRCodeQuestionAction
  extends UpdateQuestionAction<
    typeof CreateEntityAttestationActions.UpdateQRCodeQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
    initialValue: string
  }
}

export interface AddQRCodeScanQuestionAction
  extends AddQuestionAction<
    typeof CreateEntityAttestationActions.AddQRCodeScanQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
    placeholder: string
    required: boolean
    type: Type
    control: ControlType
  }
}

export interface UpdateQRCodeScanQuestionAction
  extends UpdateQuestionAction<
    typeof CreateEntityAttestationActions.UpdateQRCodeScanQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddRatingQuestionAction
  extends AddQuestionAction<
    typeof CreateEntityAttestationActions.AddRatingQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
    required: boolean
    type: Type
    control: ControlType
    values: string[]
    inline: boolean
  }
}

export interface UpdateRatingQuestionAction
  extends UpdateQuestionAction<
    typeof CreateEntityAttestationActions.UpdateRatingQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
    values: string[]
  }
}

export interface AddCheckBoxesQuestionAction
  extends AddQuestionAction<
    typeof CreateEntityAttestationActions.AddCheckBoxesQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
    required: boolean
    type: Type
    control: ControlType
    itemValues: string[]
    itemLabels: string[]
  }
}

export interface UpdateCheckBoxesQuestionAction
  extends UpdateQuestionAction<
    typeof CreateEntityAttestationActions.UpdateCheckBoxesQuestion
  > {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
    itemValues: string[]
    itemLabels: string[]
    minItems: number
    maxItems: number
  }
}

export interface UpdateAnswerRequiredAction {
  type: typeof CreateEntityAttestationActions.UpdateAnswerRequired
  payload: {
    id: string
    required: boolean
  }
}

export interface RemoveQuestionAction {
  type: typeof CreateEntityAttestationActions.RemoveQuestion
  payload: {
    id: string
  }
}

export interface CopyQuestionAction {
  type: typeof CreateEntityAttestationActions.CopyQuestion
  payload: {
    idToCopy: string
    newId: string
  }
}

export interface MoveQuestionAction {
  type: typeof CreateEntityAttestationActions.MoveQuestion
  payload: {
    fromId: string
    toId: string
  }
}

export interface ValidatedAction {
  type: typeof CreateEntityAttestationActions.Validated
  payload: {
    identifier: string
  }
}

export interface ValidationErrorAction {
  type: typeof CreateEntityAttestationActions.ValidationError
  payload: {
    identifier: string
    errors: string[]
  }
}

export type CreateEntityAttestationActionTypes =
  | UpdateClaimInfoAction
  | AddShortTextQuestionAction
  | AddLongTextQuestionAction
  | UpdateShortTextQuestionAction
  | UpdateLongTextQuestionAction
  | AddSingleDateSelectorQuestionAction
  | UpdateSingleDateSelectorQuestionAction
  | AddDateRangeSelectorQuestionAction
  | UpdateDateRangeSelectorQuestionAction
  | AddAvatarUploadQuestionAction
  | UpdateAvatarUploadQuestionAction
  | AddImageUploadQuestionAction
  | UpdateImageUploadQuestionAction
  | AddVideoUploadQuestionAction
  | UpdateVideoUploadQuestionAction
  | AddAudioUploadQuestionAction
  | UpdateAudioUploadQuestionAction
  | AddDocumentUploadQuestionAction
  | UpdateDocumentUploadQuestionAction
  | AddLocationSelectorQuestionAction
  | UpdateLocationSelectorQuestionAction
  | AddQRCodeQuestionAction
  | UpdateQRCodeQuestionAction
  | AddQRCodeScanQuestionAction
  | UpdateQRCodeScanQuestionAction
  | AddRatingQuestionAction
  | UpdateRatingQuestionAction
  | AddCheckBoxesQuestionAction
  | UpdateCheckBoxesQuestionAction
  | UpdateAnswerRequiredAction
  | RemoveQuestionAction
  | CopyQuestionAction
  | MoveQuestionAction
  | ValidatedAction
  | ValidationErrorAction
