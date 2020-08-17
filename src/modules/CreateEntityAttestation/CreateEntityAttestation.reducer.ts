import {
  CreateEntityAttestationState,
  CreateEntityAttestationActionTypes,
  CreateEntityAttestationActions,
} from './types'
import * as reduxUtils from 'common/redux/utils'
import * as utils from './CreateEntityAttestation.utils'

export const initialState: CreateEntityAttestationState = {
  claimInfo: {
    title: undefined,
    shortDescription: undefined,
  },
  questions: {},
  validation: {},
}

export const reducer = (
  state = initialState,
  action: CreateEntityAttestationActionTypes,
): CreateEntityAttestationState => {
  switch (action.type) {
    case CreateEntityAttestationActions.UpdateClaimInfo:
      return {
        ...state,
        claimInfo: action.payload,
      }
    case CreateEntityAttestationActions.AddShortTextQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...action.payload,
              order: utils.orderForNewQuestion(state.questions),
            },
          },
        },
      }
    case CreateEntityAttestationActions.UpdateShortTextQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...state.questions[action.payload.id],
              ...action.payload,
            },
          },
        },
      }
    case CreateEntityAttestationActions.AddLongTextQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...action.payload,
              order: utils.orderForNewQuestion(state.questions),
            },
          },
        },
      }
    case CreateEntityAttestationActions.UpdateLongTextQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...state.questions[action.payload.id],
              ...action.payload,
            },
          },
        },
      }
    case CreateEntityAttestationActions.AddSingleDateSelectorQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...action.payload,
              order: utils.orderForNewQuestion(state.questions),
            },
          },
        },
      }
    case CreateEntityAttestationActions.UpdateSingleDateSelectorQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...state.questions[action.payload.id],
              ...action.payload,
            },
          },
        },
      }
    case CreateEntityAttestationActions.AddDateRangeSelectorQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...action.payload,
              order: utils.orderForNewQuestion(state.questions),
            },
          },
        },
      }
    case CreateEntityAttestationActions.UpdateDateRangeSelectorQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...state.questions[action.payload.id],
              ...action.payload,
            },
          },
        },
      }
    case CreateEntityAttestationActions.AddAvatarUploadQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...action.payload,
              order: utils.orderForNewQuestion(state.questions),
            },
          },
        },
      }
    case CreateEntityAttestationActions.UpdateAvatarUploadQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...state.questions[action.payload.id],
              ...action.payload,
            },
          },
        },
      }
    case CreateEntityAttestationActions.AddImageUploadQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...action.payload,
              order: utils.orderForNewQuestion(state.questions),
            },
          },
        },
      }
    case CreateEntityAttestationActions.UpdateImageUploadQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...state.questions[action.payload.id],
              ...action.payload,
            },
          },
        },
      }
    case CreateEntityAttestationActions.AddVideoUploadQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...action.payload,
              order: utils.orderForNewQuestion(state.questions),
            },
          },
        },
      }
    case CreateEntityAttestationActions.UpdateVideoUploadQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...state.questions[action.payload.id],
              ...action.payload,
            },
          },
        },
      }
    case CreateEntityAttestationActions.AddAudioUploadQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...action.payload,
              order: utils.orderForNewQuestion(state.questions),
            },
          },
        },
      }
    case CreateEntityAttestationActions.UpdateAudioUploadQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...state.questions[action.payload.id],
              ...action.payload,
            },
          },
        },
      }
    case CreateEntityAttestationActions.AddDocumentUploadQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...action.payload,
              order: utils.orderForNewQuestion(state.questions),
            },
          },
        },
      }
    case CreateEntityAttestationActions.UpdateDocumentUploadQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...state.questions[action.payload.id],
              ...action.payload,
            },
          },
        },
      }
    case CreateEntityAttestationActions.AddLocationSelectorQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...action.payload,
              order: utils.orderForNewQuestion(state.questions),
            },
          },
        },
      }
    case CreateEntityAttestationActions.UpdateLocationSelectorQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...state.questions[action.payload.id],
              ...action.payload,
            },
          },
        },
      }
    case CreateEntityAttestationActions.UpdateAnswerRequired:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: {
              ...state.questions[action.payload.id],
              required: action.payload.required,
            },
          },
        },
      }
    case CreateEntityAttestationActions.RemoveQuestion:
      return {
        ...state,
        questions: utils.questionsWithIncrementedOrder(
          state.questions[action.payload.id].order + 1,
          -1,
          reduxUtils.omitKey(state.questions, action.payload.id),
        ),
      }
    case CreateEntityAttestationActions.CopyQuestion:
      return {
        ...state,
        questions: {
          ...utils.questionsWithIncrementedOrder(
            state.questions[action.payload.idToCopy].order + 1,
            1,
            state.questions,
          ),
          ...{
            [action.payload.newId]: {
              ...state.questions[action.payload.idToCopy],
              id: action.payload.newId,
              order: state.questions[action.payload.idToCopy].order + 1,
            },
          },
        },
      }
    case CreateEntityAttestationActions.Validated:
      return {
        ...state,
        validation: {
          ...state.validation,
          ...{
            [action.payload.identifier]: {
              identifier: action.payload.identifier,
              validated: true,
              errors: [],
            },
          },
        },
      }
    case CreateEntityAttestationActions.ValidationError:
      return {
        ...state,
        validation: {
          ...state.validation,
          ...{
            [action.payload.identifier]: {
              identifier: action.payload.identifier,
              validated: false,
              errors: action.payload.errors,
            },
          },
        },
      }
  }

  return state
}
