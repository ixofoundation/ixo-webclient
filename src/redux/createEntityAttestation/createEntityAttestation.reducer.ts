import {
  CreateEntityAttestationState,
  CreateEntityAttestationActionTypes,
  CreateEntityAttestationActions,
} from './createEntityAttestation.types'
import { CreateEntityActionTypes, CreateEntityActions } from '../createEntityOld/createEntity.types'
import { omitKey } from 'utils'
import * as utils from './createEntityAttestation.utils'

export const initialState: CreateEntityAttestationState = {
  claimInfo: {
    title: undefined,
    shortDescription: undefined,
    type: undefined,
    feature: undefined,
    reliability: undefined,
    userGuide: undefined,
    reference: undefined,
    keywords: undefined,
  } as any,
  questions: {},
  validation: {},
}

export const reducer = (
  state = initialState,
  action: CreateEntityAttestationActionTypes | CreateEntityActionTypes,
): CreateEntityAttestationState => {
  switch (action.type) {
    case CreateEntityAttestationActions.UpdateClaimInfo:
      return {
        ...state,
        claimInfo: action.payload,
      }
    case CreateEntityAttestationActions.AddShortTextQuestion:
    case CreateEntityAttestationActions.AddLongTextQuestion:
    case CreateEntityAttestationActions.AddSingleDateSelectorQuestion:
    case CreateEntityAttestationActions.AddDateRangeSelectorQuestion:
    case CreateEntityAttestationActions.AddAvatarUploadQuestion:
    case CreateEntityAttestationActions.AddImageUploadQuestion:
    case CreateEntityAttestationActions.AddVideoUploadQuestion:
    case CreateEntityAttestationActions.AddAudioUploadQuestion:
    case CreateEntityAttestationActions.AddDocumentUploadQuestion:
    case CreateEntityAttestationActions.AddLocationSelectorQuestion:
    case CreateEntityAttestationActions.AddQRCodeQuestion:
    case CreateEntityAttestationActions.AddQRCodeScanQuestion:
    case CreateEntityAttestationActions.AddRatingQuestion:
    case CreateEntityAttestationActions.AddCheckBoxesQuestion:
    case CreateEntityAttestationActions.AddCurrencyQuestion:
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
    case CreateEntityAttestationActions.UpdateLongTextQuestion:
    case CreateEntityAttestationActions.UpdateSingleDateSelectorQuestion:
    case CreateEntityAttestationActions.UpdateDateRangeSelectorQuestion:
    case CreateEntityAttestationActions.UpdateAvatarUploadQuestion:
    case CreateEntityAttestationActions.UpdateImageUploadQuestion:
    case CreateEntityAttestationActions.UpdateVideoUploadQuestion:
    case CreateEntityAttestationActions.UpdateAudioUploadQuestion:
    case CreateEntityAttestationActions.UpdateDocumentUploadQuestion:
    case CreateEntityAttestationActions.UpdateLocationSelectorQuestion:
    case CreateEntityAttestationActions.UpdateQRCodeQuestion:
    case CreateEntityAttestationActions.UpdateQRCodeScanQuestion:
    case CreateEntityAttestationActions.UpdateRatingQuestion:
    case CreateEntityAttestationActions.UpdateCheckBoxesQuestion:
    case CreateEntityAttestationActions.UpdateCurrencyQuestion:
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
          omitKey(state.questions, action.payload.id),
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
    case CreateEntityAttestationActions.MoveQuestion:
      return {
        ...state,
        questions: action.payload,
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
    case CreateEntityAttestationActions.ImportEntityAttestations:
      return {
        ...state,
        ...action.payload,
      }
    case CreateEntityActions.NewEntity:
    case CreateEntityActions.CreateEntitySuccess:
    case CreateEntityActions.ClearEntity:
      return initialState
  }

  return state
}
