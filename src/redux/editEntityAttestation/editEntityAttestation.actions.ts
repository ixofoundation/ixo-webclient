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
  EditEntityAttestationActions,
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
  ImportEntityAttestationsAction,
} from './editEntityAttestation.types'
import { Type, ControlType, FormData } from 'common/components/JsonForm/types'
import * as utils from './editEntityAttestation.utils'
import { RootState } from 'redux/types'
import * as attestationSelectors from './editEntityAttestation.selectors'

export const updateClaimInfo = (formData: FormData): UpdateClaimInfoAction => {
  const { title, shortDescription, type } = formData

  return {
    type: EditEntityAttestationActions.UpdateClaimInfo,
    payload: {
      title,
      shortDescription,
      type,
    },
  }
}

export const addShortTextQuestion = (): AddShortTextQuestionAction => ({
  type: EditEntityAttestationActions.AddShortTextQuestion,
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
  } as any,
})

export const updateShortTextQuestion = (id: string, formData: FormData): UpdateShortTextQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: EditEntityAttestationActions.UpdateShortTextQuestion,
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
  type: EditEntityAttestationActions.AddLongTextQuestion,
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
  } as any,
})

export const updateLongTextQuestion = (id: string, formData: FormData): UpdateLongTextQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: EditEntityAttestationActions.UpdateLongTextQuestion,
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
  type: EditEntityAttestationActions.AddSingleDateSelectorQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    attributeType: undefined,
    label: 'Date',
    required: true,
    type: Type.String,
    control: ControlType.SingleDateSelector,
  } as any,
})

export const updateSingleDateSelectorQuestion = (
  id: string,
  formData: FormData,
): UpdateSingleDateSelectorQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: EditEntityAttestationActions.UpdateSingleDateSelectorQuestion,
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
  type: EditEntityAttestationActions.AddDateRangeSelectorQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Dates',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.DateRangeSelector,
  } as any,
})

export const updateDateRangeSelectorQuestion = (
  id: string,
  formData: FormData,
): UpdateDateRangeSelectorQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: EditEntityAttestationActions.UpdateDateRangeSelectorQuestion,
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
  type: EditEntityAttestationActions.AddAvatarUploadQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Select Avatar Image to Upload',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.AvatarUpload,
  } as any,
})

export const updateAvatarUploadQuestion = (id: string, formData: FormData): UpdateAvatarUploadQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: EditEntityAttestationActions.UpdateAvatarUploadQuestion,
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
  type: EditEntityAttestationActions.AddImageUploadQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Select Image to Upload',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.ImageUpload,
  } as any,
})

export const updateImageUploadQuestion = (id: string, formData: FormData): UpdateImageUploadQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: EditEntityAttestationActions.UpdateImageUploadQuestion,
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
  type: EditEntityAttestationActions.AddVideoUploadQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Select Video to Upload',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.VideoUpload,
  } as any,
})

export const updateVideoUploadQuestion = (id: string, formData: FormData): UpdateVideoUploadQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: EditEntityAttestationActions.UpdateVideoUploadQuestion,
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
  type: EditEntityAttestationActions.AddAudioUploadQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Select Audio Clip to Upload',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.AudioUpload,
  } as any,
})

export const updateAudioUploadQuestion = (id: string, formData: FormData): UpdateAudioUploadQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: EditEntityAttestationActions.UpdateAudioUploadQuestion,
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
  type: EditEntityAttestationActions.AddDocumentUploadQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Select Document to Upload',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.DocumentUpload,
  } as any,
})

export const updateDocumentUploadQuestion = (id: string, formData: FormData): UpdateDocumentUploadQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: EditEntityAttestationActions.UpdateDocumentUploadQuestion,
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
  type: EditEntityAttestationActions.AddLocationSelectorQuestion,
  payload: {
    id: uuidv4(),
    title: undefined,
    description: undefined,
    label: 'Location',
    attributeType: undefined,
    required: true,
    type: Type.String,
    control: ControlType.LocationSelector,
  } as any,
})

export const updateLocationSelectorQuestion = (
  id: string,
  formData: FormData,
): UpdateLocationSelectorQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: EditEntityAttestationActions.UpdateLocationSelectorQuestion,
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
  type: EditEntityAttestationActions.AddQRCodeQuestion,
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
  } as any,
})

export const updateQRCodeQuestion = (id: string, formData: FormData): UpdateQRCodeQuestionAction => {
  const { title, description, label, initialValue, attributeType } = formData

  return {
    type: EditEntityAttestationActions.UpdateQRCodeQuestion,
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
  type: EditEntityAttestationActions.AddQRCodeScanQuestion,
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
  } as any,
})

export const updateQRCodeScanQuestion = (id: string, formData: FormData): UpdateQRCodeScanQuestionAction => {
  const { title, description, label, attributeType } = formData

  return {
    type: EditEntityAttestationActions.UpdateQRCodeScanQuestion,
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
  type: EditEntityAttestationActions.AddRatingQuestion,
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
  } as any,
})

export const updateRatingQuestion = (id: string, formData: FormData): UpdateRatingQuestionAction => {
  const { title, description, label, scale, attributeType } = formData

  const values = scale ? Array.from(Array(scale), (_, i) => i + 1).map((i) => i.toString()) : undefined

  return {
    type: EditEntityAttestationActions.UpdateRatingQuestion,
    payload: {
      id,
      title,
      description,
      label,
      attributeType,
      values,
    } as any,
  }
}

export const addCheckBoxesQuestion = (): AddCheckBoxesQuestionAction => ({
  type: EditEntityAttestationActions.AddCheckBoxesQuestion,
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
  } as any,
})

export const updateCheckBoxesQuestion = (id: string, formData: FormData): UpdateCheckBoxesQuestionAction => {
  const { title, description, label, itemValues, minItems, maxItems, attributeType } = formData

  return {
    type: EditEntityAttestationActions.UpdateCheckBoxesQuestion,
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

export const updateAnswerRequired = (id: string, required: boolean): UpdateAnswerRequiredAction => ({
  type: EditEntityAttestationActions.UpdateAnswerRequired,
  payload: {
    id,
    required,
  },
})

export const removeQuestion = (id: string): RemoveQuestionAction => ({
  type: EditEntityAttestationActions.RemoveQuestion,
  payload: {
    id,
  },
})

export const copyQuestion = (id: string): CopyQuestionAction => ({
  type: EditEntityAttestationActions.CopyQuestion,
  payload: {
    idToCopy: id,
    newId: uuidv4(),
  },
})

export const moveQuestion =
  (id: string, toIndex: number) =>
  (dispatch: Dispatch, getState: () => RootState): MoveQuestionAction => {
    const state = getState()
    const questions = attestationSelectors.selectQuestions(state)
    const fromId = id
    const toId = questions[toIndex].id

    return dispatch({
      type: EditEntityAttestationActions.MoveQuestion,
      payload: {
        fromId,
        toId,
      },
    })
  }

export const validated = (identifier: string): ValidatedAction => ({
  type: EditEntityAttestationActions.Validated,
  payload: {
    identifier,
  },
})

export const validationError = (identifier: string, errors: string[]): ValidationErrorAction => ({
  type: EditEntityAttestationActions.ValidationError,
  payload: {
    identifier,
    errors,
  },
})

export const importEntityAttestations = (payload: any): ImportEntityAttestationsAction => {
  return {
    type: EditEntityAttestationActions.ImportEntityAttestations,
    payload,
  }
}
