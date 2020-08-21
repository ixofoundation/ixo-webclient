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
  AddRatingQuestionAction,
  UpdateRatingQuestionAction,
  AddCheckBoxesQuestionAction,
  UpdateCheckBoxesQuestionAction,
} from './types'
import { Type, ControlType, FormData } from 'common/components/JsonForm/types'
import * as utils from './CreateEntityAttestation.utils'
import { RootState } from 'common/redux/types'
import * as attestationSelectors from './CreateEntityAttestation.selectors'

export const updateClaimInfo = (formData: FormData): UpdateClaimInfoAction => {
  const { title, shortDescription } = formData

  return {
    type: CreateEntityAttestationActions.UpdateClaimInfo,
    payload: {
      title,
      shortDescription,
    },
  }
}

export const addShortTextQuestion = (): AddShortTextQuestionAction => ({
  type: CreateEntityAttestationActions.AddShortTextQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: undefined,
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
  const { title, description, label } = formData

  return {
    type: CreateEntityAttestationActions.UpdateShortTextQuestion,
    payload: {
      id,
      title,
      description,
      label,
    },
  }
}

export const addLongTextQuestion = (): AddLongTextQuestionAction => ({
  type: CreateEntityAttestationActions.AddLongTextQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: undefined,
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
  const { title, description, label } = formData

  return {
    type: CreateEntityAttestationActions.UpdateLongTextQuestion,
    payload: {
      id,
      title,
      description,
      label,
    },
  }
}

export const addSingleDateSelectorQuestion = (): AddSingleDateSelectorQuestionAction => ({
  type: CreateEntityAttestationActions.AddSingleDateSelectorQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: undefined,
    required: true,
    type: Type.String,
    control: ControlType.SingleDateSelector,
  },
})

export const updateSingleDateSelectorQuestion = (
  id: string,
  formData: FormData,
): UpdateSingleDateSelectorQuestionAction => {
  const { title, description, label } = formData

  return {
    type: CreateEntityAttestationActions.UpdateSingleDateSelectorQuestion,
    payload: {
      id,
      title,
      description,
      label,
    },
  }
}

export const addDateRangeSelectorQuestion = (): AddDateRangeSelectorQuestionAction => ({
  type: CreateEntityAttestationActions.AddDateRangeSelectorQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: undefined,
    required: true,
    type: Type.String,
    control: ControlType.DateRangeSelector,
  },
})

export const updateDateRangeSelectorQuestion = (
  id: string,
  formData: FormData,
): UpdateDateRangeSelectorQuestionAction => {
  const { title, description, label } = formData

  return {
    type: CreateEntityAttestationActions.UpdateDateRangeSelectorQuestion,
    payload: {
      id,
      title,
      description,
      label,
    },
  }
}

export const addAvatarUploadQuestion = (): AddAvatarUploadQuestionAction => ({
  type: CreateEntityAttestationActions.AddAvatarUploadQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: undefined,
    required: true,
    type: Type.String,
    control: ControlType.AvatarUpload,
  },
})

export const updateAvatarUploadQuestion = (
  id: string,
  formData: FormData,
): UpdateAvatarUploadQuestionAction => {
  const { title, description, label } = formData

  return {
    type: CreateEntityAttestationActions.UpdateAvatarUploadQuestion,
    payload: {
      id,
      title,
      description,
      label,
    },
  }
}

export const addImageUploadQuestion = (): AddImageUploadQuestionAction => ({
  type: CreateEntityAttestationActions.AddImageUploadQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: undefined,
    required: true,
    type: Type.String,
    control: ControlType.ImageUpload,
  },
})

export const updateImageUploadQuestion = (
  id: string,
  formData: FormData,
): UpdateImageUploadQuestionAction => {
  const { title, description, label } = formData

  return {
    type: CreateEntityAttestationActions.UpdateImageUploadQuestion,
    payload: {
      id,
      title,
      description,
      label,
    },
  }
}

export const addVideoUploadQuestion = (): AddVideoUploadQuestionAction => ({
  type: CreateEntityAttestationActions.AddVideoUploadQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: undefined,
    required: true,
    type: Type.String,
    control: ControlType.VideoUpload,
  },
})

export const updateVideoUploadQuestion = (
  id: string,
  formData: FormData,
): UpdateVideoUploadQuestionAction => {
  const { title, description, label } = formData

  return {
    type: CreateEntityAttestationActions.UpdateVideoUploadQuestion,
    payload: {
      id,
      title,
      description,
      label,
    },
  }
}

export const addAudioUploadQuestion = (): AddAudioUploadQuestionAction => ({
  type: CreateEntityAttestationActions.AddAudioUploadQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: undefined,
    required: true,
    type: Type.String,
    control: ControlType.AudioUpload,
  },
})

export const updateAudioUploadQuestion = (
  id: string,
  formData: FormData,
): UpdateAudioUploadQuestionAction => {
  const { title, description, label } = formData

  return {
    type: CreateEntityAttestationActions.UpdateAudioUploadQuestion,
    payload: {
      id,
      title,
      description,
      label,
    },
  }
}

export const addDocumentUploadQuestion = (): AddDocumentUploadQuestionAction => ({
  type: CreateEntityAttestationActions.AddDocumentUploadQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: undefined,
    required: true,
    type: Type.String,
    control: ControlType.DocumentUpload,
  },
})

export const updateDocumentUploadQuestion = (
  id: string,
  formData: FormData,
): UpdateDocumentUploadQuestionAction => {
  const { title, description, label } = formData

  return {
    type: CreateEntityAttestationActions.UpdateDocumentUploadQuestion,
    payload: {
      id,
      title,
      description,
      label,
    },
  }
}

export const addLocationSelectorQuestion = (): AddLocationSelectorQuestionAction => ({
  type: CreateEntityAttestationActions.AddLocationSelectorQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: undefined,
    required: true,
    type: Type.String,
    control: ControlType.LocationSelector,
  },
})

export const updateLocationSelectorQuestion = (
  id: string,
  formData: FormData,
): UpdateLocationSelectorQuestionAction => {
  const { title, description, label } = formData

  return {
    type: CreateEntityAttestationActions.UpdateLocationSelectorQuestion,
    payload: {
      id,
      title,
      description,
      label,
    },
  }
}

export const addQRCodeQuestion = (): AddQRCodeQuestionAction => ({
  type: CreateEntityAttestationActions.AddQRCodeQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: undefined,
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
  const { title, description, label, initialValue } = formData

  return {
    type: CreateEntityAttestationActions.UpdateQRCodeQuestion,
    payload: {
      id,
      title,
      description,
      label,
      initialValue,
    },
  }
}

export const addRatingQuestion = (): AddRatingQuestionAction => ({
  type: CreateEntityAttestationActions.AddRatingQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: undefined,
    required: true,
    type: Type.Number,
    control: ControlType.Rating,
    values: undefined,
    inline: true,
  },
})

export const updateRatingQuestion = (
  id: string,
  formData: FormData,
): UpdateRatingQuestionAction => {
  const { title, description, label, scale } = formData

  const values = scale ? Array.from(Array(scale), (_, i) => i + 1) : undefined

  return {
    type: CreateEntityAttestationActions.UpdateRatingQuestion,
    payload: {
      id,
      title,
      description,
      label,
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
    label: undefined,
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
  const { title, description, label, itemValues, minItems, maxItems } = formData

  return {
    type: CreateEntityAttestationActions.UpdateCheckBoxesQuestion,
    payload: {
      id,
      title,
      description,
      label,
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

export const moveQuestion = (fromIndex: number, toIndex: number) => (
  dispatch: Dispatch,
  getState: () => RootState,
) => {
  const state = getState()
  const questions = attestationSelectors.selectQuestions(state)
  const fromId = questions[fromIndex].id
  const toId = questions[toIndex].id

  return dispatch({
    type: CreateEntityAttestationActions.MoveQuestion,
    payload: {
      fromId,
      toId,
    },
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
