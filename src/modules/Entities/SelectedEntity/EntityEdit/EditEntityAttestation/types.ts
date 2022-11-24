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

export interface EditEntityAttestationState {
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

export enum EditEntityAttestationActions {
  UpdateClaimInfo = 'ixo/EditEntityAttestation/UPDATE_CLAIM_INFO',
  AddShortTextQuestion = 'ixo/EditEntityAttestation/ADD_SHOR_TTEXT_QUESTION',
  UpdateShortTextQuestion = 'ixo/EditEntityAttestation/UPDATE_SHORT_TEXT_QUESTION',
  AddLongTextQuestion = 'ixo/EditEntityAttestation/ADD_LONG_TEXT_QUESTION',
  UpdateLongTextQuestion = 'ixo/EditEntityAttestation/UPDATE_LONG_TEXT_QUESTION',
  AddRatingQuestion = 'ixo/EditEntityAttestation/ADD_RATING_QUESTION',
  UpdateRatingQuestion = 'ixo/EditEntityAttestation/UPDATE_RATING_QUESTION',
  AddSingleDateSelectorQuestion = 'ixo/EditEntityAttestation/ADD_SINGLE_DATE_SELECTOR_QUESTION',
  UpdateSingleDateSelectorQuestion = 'ixo/EditEntityAttestation/UPDATE_SINGLE_DATE_SELECTOR_QUESTION',
  AddDateRangeSelectorQuestion = 'ixo/EditEntityAttestation/ADD_DATE_RANGE_SELECTOR_QUESTION',
  UpdateDateRangeSelectorQuestion = 'ixo/EditEntityAttestation/UPDATE_DATE_RANGE_SELECTOR_QUESTION',
  AddLocationSelectorQuestion = 'ixo/EditEntityAttestation/ADD_LOCATION_SELECTOR_QUESTION',
  UpdateLocationSelectorQuestion = 'ixo/EditEntityAttestation/UPDATE_LOCATION_SELECTOR_QUESTION',
  AddQRCodeQuestion = 'ixo/EditEntityAttestation/ADD_QR_CODE_QUESTION',
  UpdateQRCodeQuestion = 'ixo/EditEntityAttestation/UPDATE_QR_CODE_QUESTION',
  AddQRCodeScanQuestion = 'ixo/EditEntityAttestation/ADD_QR_CODE_SCAN_QUESTION',
  UpdateQRCodeScanQuestion = 'ixo/EditEntityAttestation/UPDATE_QR_CODE_SCAN_QUESTION',
  AddAvatarUploadQuestion = 'ixo/EditEntityAttestation/ADD_AVATAR_UPLOAD_QUESTION',
  UpdateAvatarUploadQuestion = 'ixo/EditEntityAttestation/UPDATE_AVATAR_UPLOAD_QUESTION',
  AddImageUploadQuestion = 'ixo/EditEntityAttestation/ADD_IMAGE_UPLOAD_QUESTION',
  UpdateImageUploadQuestion = 'ixo/EditEntityAttestation/UPDATE_IMAGE_UPLOAD_QUESTION',
  AddVideoUploadQuestion = 'ixo/EditEntityAttestation/ADD_VIDEO_UPLOAD_QUESTION',
  UpdateVideoUploadQuestion = 'ixo/EditEntityAttestation/UPDATE_VIDEO_UPLOAD_QUESTION',
  AddAudioUploadQuestion = 'ixo/EditEntityAttestation/ADD_AUDIO_UPLOAD_QUESTION',
  UpdateAudioUploadQuestion = 'ixo/EditEntityAttestation/UPDATE_AUDIO_UPLOAD_QUESTION',
  AddDocumentUploadQuestion = 'ixo/EditEntityAttestation/ADD_DOCUMENT_UPLOAD_QUESTION',
  UpdateDocumentUploadQuestion = 'ixo/EditEntityAttestation/UPDATE_DOCUMENT_UPLOAD_QUESTION',
  AddCheckBoxesQuestion = 'ixo/EditEntityAttestation/ADD_CHECKBOXES_QUESTION',
  UpdateCheckBoxesQuestion = 'ixo/EditEntityAttestation/UPDATE_CHECKBOXES_QUESTION',
  UpdateAnswerRequired = 'ixo/EditEntityAttestation/UPDATE_ANSWER_REQUIRED',
  RemoveQuestion = 'ixo/EditEntityAttestation/REMOVE_QUESTION',
  CopyQuestion = 'ixo/EditEntityAttestation/COPY_QUESTION',
  MoveQuestion = 'ixo/EditEntityAttestation/MOVE_QUESTION',
  Validated = 'ixo/EditEntityAttestation/SET_VALIDATED',
  ValidationError = 'ixo/EditEntityAttestation/VALIDATION_ERROR',
  ImportEntityAttestations = 'ixo/EditEntityAttestation/IMPORT_ENTITY_ATTESTATIONS',
}

export interface UpdateClaimInfoAction {
  type: typeof EditEntityAttestationActions.UpdateClaimInfo
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
  extends AddQuestionAction<typeof EditEntityAttestationActions.AddShortTextQuestion> {
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
  extends UpdateQuestionAction<typeof EditEntityAttestationActions.UpdateShortTextQuestion> {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddLongTextQuestionAction
  extends AddQuestionAction<typeof EditEntityAttestationActions.AddLongTextQuestion> {
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
  extends UpdateQuestionAction<typeof EditEntityAttestationActions.UpdateLongTextQuestion> {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddSingleDateSelectorQuestionAction
  extends AddQuestionAction<typeof EditEntityAttestationActions.AddSingleDateSelectorQuestion> {
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
  extends UpdateQuestionAction<typeof EditEntityAttestationActions.UpdateSingleDateSelectorQuestion> {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddDateRangeSelectorQuestionAction
  extends AddQuestionAction<typeof EditEntityAttestationActions.AddDateRangeSelectorQuestion> {
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
  extends UpdateQuestionAction<typeof EditEntityAttestationActions.UpdateDateRangeSelectorQuestion> {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddAvatarUploadQuestionAction
  extends AddQuestionAction<typeof EditEntityAttestationActions.AddAvatarUploadQuestion> {
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
  extends UpdateQuestionAction<typeof EditEntityAttestationActions.UpdateAvatarUploadQuestion> {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddImageUploadQuestionAction
  extends AddQuestionAction<typeof EditEntityAttestationActions.AddImageUploadQuestion> {
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
  extends UpdateQuestionAction<typeof EditEntityAttestationActions.UpdateImageUploadQuestion> {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddVideoUploadQuestionAction
  extends AddQuestionAction<typeof EditEntityAttestationActions.AddVideoUploadQuestion> {
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
  extends UpdateQuestionAction<typeof EditEntityAttestationActions.UpdateVideoUploadQuestion> {
  payload: {
    id: string
    title: string
    description: string
    attributeType: string
    label: string
  }
}

export interface AddAudioUploadQuestionAction
  extends AddQuestionAction<typeof EditEntityAttestationActions.AddAudioUploadQuestion> {
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
  extends UpdateQuestionAction<typeof EditEntityAttestationActions.UpdateAudioUploadQuestion> {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddDocumentUploadQuestionAction
  extends AddQuestionAction<typeof EditEntityAttestationActions.AddDocumentUploadQuestion> {
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
  extends UpdateQuestionAction<typeof EditEntityAttestationActions.UpdateDocumentUploadQuestion> {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddLocationSelectorQuestionAction
  extends AddQuestionAction<typeof EditEntityAttestationActions.AddLocationSelectorQuestion> {
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
  extends UpdateQuestionAction<typeof EditEntityAttestationActions.UpdateLocationSelectorQuestion> {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddQRCodeQuestionAction
  extends AddQuestionAction<typeof EditEntityAttestationActions.AddQRCodeQuestion> {
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
  extends UpdateQuestionAction<typeof EditEntityAttestationActions.UpdateQRCodeQuestion> {
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
  extends AddQuestionAction<typeof EditEntityAttestationActions.AddQRCodeScanQuestion> {
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
  extends UpdateQuestionAction<typeof EditEntityAttestationActions.UpdateQRCodeScanQuestion> {
  payload: {
    id: string
    title: string
    description: string
    label: string
    attributeType: string
  }
}

export interface AddRatingQuestionAction
  extends AddQuestionAction<typeof EditEntityAttestationActions.AddRatingQuestion> {
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
  extends UpdateQuestionAction<typeof EditEntityAttestationActions.UpdateRatingQuestion> {
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
  extends AddQuestionAction<typeof EditEntityAttestationActions.AddCheckBoxesQuestion> {
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
  extends UpdateQuestionAction<typeof EditEntityAttestationActions.UpdateCheckBoxesQuestion> {
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
  type: typeof EditEntityAttestationActions.UpdateAnswerRequired
  payload: {
    id: string
    required: boolean
  }
}

export interface RemoveQuestionAction {
  type: typeof EditEntityAttestationActions.RemoveQuestion
  payload: {
    id: string
  }
}

export interface CopyQuestionAction {
  type: typeof EditEntityAttestationActions.CopyQuestion
  payload: {
    idToCopy: string
    newId: string
  }
}

export interface MoveQuestionAction {
  type: typeof EditEntityAttestationActions.MoveQuestion
  payload: {
    fromId: string
    toId: string
  }
}

export interface ValidatedAction {
  type: typeof EditEntityAttestationActions.Validated
  payload: {
    identifier: string
  }
}

export interface ValidationErrorAction {
  type: typeof EditEntityAttestationActions.ValidationError
  payload: {
    identifier: string
    errors: string[]
  }
}

export interface ImportEntityAttestationsAction {
  type: typeof EditEntityAttestationActions.ImportEntityAttestations
  payload: any
}

export type EditEntityAttestationActionTypes =
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
  | ImportEntityAttestationsAction
