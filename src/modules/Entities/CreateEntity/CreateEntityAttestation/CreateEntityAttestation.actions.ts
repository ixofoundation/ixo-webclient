import { Dispatch } from 'redux'
import { v4 as uuidv4 } from 'uuid'
import {
  UpdateClaimInfoAction,
  AddShortTextQuestionAction,
  AddLongTextQuestionAction,
  UpdateShortTextQuestionAction,
  UpdateLongTextQuestionAction,
  AddSingleDateSelectorQuestionAction,
  UpdateSingleDateSelectorQuestionAction,
  AddDateRangeSelectorQuestionAction,
  UpdateDateRangeSelectorQuestionAction,
  AddAudioUploadQuestionAction,
  AddAvatarUploadQuestionAction,
  AddDocumentUploadQuestionAction,
  AddImageUploadQuestionAction,
  AddVideoUploadQuestionAction,
  UpdateAudioUploadQuestionAction,
  UpdateAvatarUploadQuestionAction,
  UpdateDocumentUploadQuestionAction,
  UpdateImageUploadQuestionAction,
  UpdateVideoUploadQuestionAction,
  CreateEntityAttestationActions,
  UpdateAnswerRequiredAction,
  ValidatedAction,
  ValidationErrorAction,
  RemoveQuestionAction,
  CopyQuestionAction,
  AddLocationSelectorQuestionAction,
  UpdateLocationSelectorQuestionAction,
  AddQRCodeQuestionAction,
  UpdateQRCodeQuestionAction,
  AddQRCodeScanQuestionAction,
  UpdateQRCodeScanQuestionAction,
  AddRatingQuestionAction,
  UpdateRatingQuestionAction,
  AddCheckBoxesQuestionAction,
  UpdateCheckBoxesQuestionAction,
  MoveQuestionAction,
} from './types'
import { Type, ControlType, FormData } from 'common/components/JsonForm/types'
import * as utils from './CreateEntityAttestation.utils'
import { RootState } from 'common/redux/types'
import * as attestationSelectors from './CreateEntityAttestation.selectors'
import { moveObjectElement } from 'common/redux/utils'

export const updateClaimInfo = (formData: FormData): UpdateClaimInfoAction => {
  const { title, shortDescription, type } = formData

  return {
    type: CreateEntityAttestationActions.UpdateClaimInfo,
    payload: {
      title,
      shortDescription,
      type,
    },
  }
}

export const addShortTextQuestion = (): AddShortTextQuestionAction => ({
  type: CreateEntityAttestationActions.AddShortTextQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Short Answer',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.Text,
    placeholder: 'Start Typing here',
  },
})

export const updateShortTextQuestion = (
  id: string,
  formData: FormData,
): UpdateShortTextQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: CreateEntityAttestationActions.UpdateShortTextQuestion,
    payload: {
      id,
      title,
      description,
      label,
      attributeType,
    },
  }
}

export const addLongTextQuestion = (): AddLongTextQuestionAction => ({
  type: CreateEntityAttestationActions.AddLongTextQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Long Answer',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.TextArea,
    placeholder: 'Start Typing here',
  },
})

export const updateLongTextQuestion = (
  id: string,
  formData: FormData,
): UpdateLongTextQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: CreateEntityAttestationActions.UpdateLongTextQuestion,
    payload: {
      id,
      title,
      description,
      label,
      attributeType,
    },
  }
}

export const addSingleDateSelectorQuestion = (): AddSingleDateSelectorQuestionAction => ({
  type: CreateEntityAttestationActions.AddSingleDateSelectorQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    attributeType: undefined,
    label: 'Date',
    required: true,
    type: Type.String,
    control: ControlType.SingleDateSelector,
  },
})

export const updateSingleDateSelectorQuestion = (
  id: string,
  formData: FormData,
): UpdateSingleDateSelectorQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: CreateEntityAttestationActions.UpdateSingleDateSelectorQuestion,
    payload: {
      id,
      title,
      description,
      label,
      attributeType,
    },
  }
}

export const addDateRangeSelectorQuestion = (): AddDateRangeSelectorQuestionAction => ({
  type: CreateEntityAttestationActions.AddDateRangeSelectorQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Dates',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.DateRangeSelector,
  },
})

export const updateDateRangeSelectorQuestion = (
  id: string,
  formData: FormData,
): UpdateDateRangeSelectorQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: CreateEntityAttestationActions.UpdateDateRangeSelectorQuestion,
    payload: {
      id,
      title,
      description,
      label,
      attributeType,
    },
  }
}

export const addAvatarUploadQuestion = (): AddAvatarUploadQuestionAction => ({
  type: CreateEntityAttestationActions.AddAvatarUploadQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Select Avatar Image to Upload',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.AvatarUpload,
  },
})

export const updateAvatarUploadQuestion = (
  id: string,
  formData: FormData,
): UpdateAvatarUploadQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: CreateEntityAttestationActions.UpdateAvatarUploadQuestion,
    payload: {
      id,
      title,
      description,
      label,
      attributeType,
    },
  }
}

export const addImageUploadQuestion = (): AddImageUploadQuestionAction => ({
  type: CreateEntityAttestationActions.AddImageUploadQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Select Image to Upload',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.ImageUpload,
  },
})

export const updateImageUploadQuestion = (
  id: string,
  formData: FormData,
): UpdateImageUploadQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: CreateEntityAttestationActions.UpdateImageUploadQuestion,
    payload: {
      id,
      title,
      description,
      label,
      attributeType,
    },
  }
}

export const addVideoUploadQuestion = (): AddVideoUploadQuestionAction => ({
  type: CreateEntityAttestationActions.AddVideoUploadQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Select Video to Upload',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.VideoUpload,
  },
})

export const updateVideoUploadQuestion = (
  id: string,
  formData: FormData,
): UpdateVideoUploadQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: CreateEntityAttestationActions.UpdateVideoUploadQuestion,
    payload: {
      id,
      title,
      description,
      label,
      attributeType,
    },
  }
}

export const addAudioUploadQuestion = (): AddAudioUploadQuestionAction => ({
  type: CreateEntityAttestationActions.AddAudioUploadQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Select Audio Clip to Upload',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.AudioUpload,
  },
})

export const updateAudioUploadQuestion = (
  id: string,
  formData: FormData,
): UpdateAudioUploadQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: CreateEntityAttestationActions.UpdateAudioUploadQuestion,
    payload: {
      id,
      title,
      description,
      label,
      attributeType,
    },
  }
}

export const addDocumentUploadQuestion = (): AddDocumentUploadQuestionAction => ({
  type: CreateEntityAttestationActions.AddDocumentUploadQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Select Document to Upload',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.DocumentUpload,
  },
})

export const updateDocumentUploadQuestion = (
  id: string,
  formData: FormData,
): UpdateDocumentUploadQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: CreateEntityAttestationActions.UpdateDocumentUploadQuestion,
    payload: {
      id,
      title,
      description,
      label,
      attributeType,
    },
  }
}

export const addLocationSelectorQuestion = (): AddLocationSelectorQuestionAction => ({
  type: CreateEntityAttestationActions.AddLocationSelectorQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Location',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.LocationSelector,
  },
})

export const updateLocationSelectorQuestion = (
  id: string,
  formData: FormData,
): UpdateLocationSelectorQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: CreateEntityAttestationActions.UpdateLocationSelectorQuestion,
    payload: {
      id,
      title,
      description,
      label,
      attributeType,
    },
  }
}

export const addQRCodeQuestion = (): AddQRCodeQuestionAction => ({
  type: CreateEntityAttestationActions.AddQRCodeQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'QR Code',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.QRCode,
    initialValue: undefined,
  },
})

export const updateQRCodeQuestion = (
  id: string,
  formData: FormData,
): UpdateQRCodeQuestionAction => {
  const { title, description, label, initialValue, attributeType } = formData

  return {
    type: CreateEntityAttestationActions.UpdateQRCodeQuestion,
    payload: {
      id,
      title,
      description,
      label,
      attributeType,
      initialValue,
    },
  }
}

export const addQRCodeScanQuestion = (): AddQRCodeScanQuestionAction => ({
  type: CreateEntityAttestationActions.AddQRCodeScanQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Scan QR Code',
    attributeType: undefined,
    placeholder: 'Waiting for data...',
    required: true,
    type: Type.String,
    control: ControlType.QRCodeScan,
  },
})

export const updateQRCodeScanQuestion = (
  id: string,
  formData: FormData,
): UpdateQRCodeScanQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: CreateEntityAttestationActions.UpdateQRCodeScanQuestion,
    payload: {
      id,
      title,
      description,
      label,
      attributeType,
    },
  }
}

export const addRatingQuestion = (): AddRatingQuestionAction => ({
  type: CreateEntityAttestationActions.AddRatingQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Rating',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.Rating,
    values: undefined,
    inline: true,
  },
})

export const updateRatingQuestion = (
  id: string,
  formData: FormData,
): UpdateRatingQuestionAction => {
  const { title, description, label, scale, attributeType } = formData

  const values = scale
    ? Array.from(Array(scale), (_, i) => i + 1).map((i) => i.toString())
    : undefined

  return {
    type: CreateEntityAttestationActions.UpdateRatingQuestion,
    payload: {
      id,
      title,
      description,
      label,
      attributeType,
      values,
    },
  }
}

export const addCheckBoxesQuestion = (): AddCheckBoxesQuestionAction => ({
  type: CreateEntityAttestationActions.AddCheckBoxesQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Select Options',
    attributeType: undefined,
    required: true,
    type: Type.Array,
    control: ControlType.CheckBoxes,
    itemValues: [],
    itemLabels: [],
  },
})

export const updateCheckBoxesQuestion = (
  id: string,
  formData: FormData,
): UpdateCheckBoxesQuestionAction => {
  const {
    title,
    description,
    label,
    itemValues,
    minItems,
    maxItems,
    attributeType,
  } = formData

  return {
    type: CreateEntityAttestationActions.UpdateCheckBoxesQuestion,
    payload: {
      id,
      title,
      description,
      label,
      attributeType,
      itemValues,
      itemLabels: itemValues,
      minItems: utils.itemCountOrItemValuesLength(minItems, itemValues),
      maxItems: utils.itemCountOrItemValuesLength(maxItems, itemValues),
    },
  }
}

export const updateAnswerRequired = (
  id: string,
  required: boolean,
): UpdateAnswerRequiredAction => ({
  type: CreateEntityAttestationActions.UpdateAnswerRequired,
  payload: {
    id,
    required,
  },
})

export const removeQuestion = (id: string): RemoveQuestionAction => ({
  type: CreateEntityAttestationActions.RemoveQuestion,
  payload: {
    id,
  },
})

export const copyQuestion = (id: string): CopyQuestionAction => ({
  type: CreateEntityAttestationActions.CopyQuestion,
  payload: {
    idToCopy: id,
    newId: uuidv4(),
  },
})

export const moveQuestion = (srcId: string, dstId: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
): MoveQuestionAction => {
  const { createEntityAttestation } = getState()
  const { questions } = createEntityAttestation

  return dispatch({
    type: CreateEntityAttestationActions.MoveQuestion,
    payload: moveObjectElement(srcId, dstId, questions)
  })
}

export const validated = (identifier: string): ValidatedAction => ({
  type: CreateEntityAttestationActions.Validated,
  payload: {
    identifier,
  },
})

export const validationError = (
  identifier: string,
  errors: string[],
): ValidationErrorAction => ({
  type: CreateEntityAttestationActions.ValidationError,
  payload: {
    identifier,
    errors,
  },
})

export const importEntityAttestations = (payload: any) => {
  return {
    type: CreateEntityAttestationActions.ImportEntityAttestations,
    payload
  }
}