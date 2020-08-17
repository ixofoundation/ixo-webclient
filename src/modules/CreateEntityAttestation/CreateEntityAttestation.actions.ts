import { v4 as uuidv4 } from 'uuid'
import {
  UpdateClaimInfoAction,
  AddShortTextQuestionAction,
  AddLongTextQuestionAction,
  UpdateShortTextQuestionAction,
  UpdateLongTextQuestionAction,
  CreateEntityAttestationActions,
  UpdateAnswerRequiredAction,
} from './types'
import {
  Type,
  ControlType,
  FormData,
} from '../../common/components/JsonForm/types'

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
