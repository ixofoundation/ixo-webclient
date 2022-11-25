import { EditEntityAttestationState, EditEntityAttestationActionTypes, EditEntityAttestationActions } from './types'
import { EditEntityActionTypes, EditEntityActions } from '../types'
import * as reduxUtils from 'common/redux/utils'
import * as utils from './EditEntityAttestation.utils'

export const initialState: EditEntityAttestationState = {
  claimInfo: {
    title: undefined,
    shortDescription: undefined,
    type: undefined,
  },
  questions: {},
  validation: {},
} as any

export const reducer = (
  state = initialState,
  action: EditEntityAttestationActionTypes | EditEntityActionTypes,
): EditEntityAttestationState => {
  switch (action.type) {
    case EditEntityAttestationActions.UpdateClaimInfo:
      return {
        ...state,
        claimInfo: action.payload,
      }
    case EditEntityAttestationActions.AddShortTextQuestion:
    case EditEntityAttestationActions.AddLongTextQuestion:
    case EditEntityAttestationActions.AddSingleDateSelectorQuestion:
    case EditEntityAttestationActions.AddDateRangeSelectorQuestion:
    case EditEntityAttestationActions.AddAvatarUploadQuestion:
    case EditEntityAttestationActions.AddImageUploadQuestion:
    case EditEntityAttestationActions.AddVideoUploadQuestion:
    case EditEntityAttestationActions.AddAudioUploadQuestion:
    case EditEntityAttestationActions.AddDocumentUploadQuestion:
    case EditEntityAttestationActions.AddLocationSelectorQuestion:
    case EditEntityAttestationActions.AddQRCodeQuestion:
    case EditEntityAttestationActions.AddQRCodeScanQuestion:
    case EditEntityAttestationActions.AddRatingQuestion:
    case EditEntityAttestationActions.AddCheckBoxesQuestion:
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
    case EditEntityAttestationActions.UpdateShortTextQuestion:
    case EditEntityAttestationActions.UpdateLongTextQuestion:
    case EditEntityAttestationActions.UpdateSingleDateSelectorQuestion:
    case EditEntityAttestationActions.UpdateDateRangeSelectorQuestion:
    case EditEntityAttestationActions.UpdateAvatarUploadQuestion:
    case EditEntityAttestationActions.UpdateImageUploadQuestion:
    case EditEntityAttestationActions.UpdateVideoUploadQuestion:
    case EditEntityAttestationActions.UpdateAudioUploadQuestion:
    case EditEntityAttestationActions.UpdateDocumentUploadQuestion:
    case EditEntityAttestationActions.UpdateLocationSelectorQuestion:
    case EditEntityAttestationActions.UpdateQRCodeQuestion:
    case EditEntityAttestationActions.UpdateQRCodeScanQuestion:
    case EditEntityAttestationActions.UpdateRatingQuestion:
    case EditEntityAttestationActions.UpdateCheckBoxesQuestion:
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

    case EditEntityAttestationActions.UpdateAnswerRequired:
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
    case EditEntityAttestationActions.RemoveQuestion:
      return {
        ...state,
        questions: utils.questionsWithIncrementedOrder(
          state.questions[action.payload.id].order + 1,
          -1,
          reduxUtils.omitKey(state.questions, action.payload.id),
        ),
      }
    case EditEntityAttestationActions.CopyQuestion:
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
    case EditEntityAttestationActions.MoveQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.payload.fromId]: {
            ...state.questions[action.payload.fromId],
            order: state.questions[action.payload.toId].order,
          },
          [action.payload.toId]: {
            ...state.questions[action.payload.toId],
            order: state.questions[action.payload.fromId].order,
          },
        },
      }
    case EditEntityAttestationActions.Validated:
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
    case EditEntityAttestationActions.ValidationError:
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
    case EditEntityAttestationActions.ImportEntityAttestations:
      return {
        ...state,
        ...action.payload,
      }
    case EditEntityActions.NewEntity:
    case EditEntityActions.EditEntitySuccess:
      return initialState
  }

  return state
}
