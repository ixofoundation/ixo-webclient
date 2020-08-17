import {
  CreateEntityAttestationState,
  CreateEntityAttestationActionTypes,
  CreateEntityAttestationActions,
} from './types'
import * as reduxUtils from 'common/redux/utils'

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
            [action.payload.id]: action.payload,
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
            [action.payload.id]: action.payload,
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
        questions: reduxUtils.omitKey(state.questions, action.payload.id),
      }
    case CreateEntityAttestationActions.CopyQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.newId]: {
              ...state.questions[action.payload.idToCopy],
              id: action.payload.newId,
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
