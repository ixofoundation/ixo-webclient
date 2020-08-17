import {
  CreateEntityAttestationState,
  CreateEntityAttestationActionTypes,
  CreateEntityAttestationActions,
} from './types';

export const initialState: CreateEntityAttestationState = {
  claimInfo: {
    title: undefined,
    shortDescription: undefined,
  },
  questions: {},
  validation: {},
};

export const reducer = (
  state = initialState,
  action: CreateEntityAttestationActionTypes,
): CreateEntityAttestationState => {
  switch (action.type) {
    case CreateEntityAttestationActions.UpdateClaimInfo:
      return {
        ...state,
        claimInfo: action.payload,
      };
    case CreateEntityAttestationActions.AddShortTextQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: action.payload,
          },
        },
      };
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
      };
    case CreateEntityAttestationActions.AddLongTextQuestion:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...{
            [action.payload.id]: action.payload,
          },
        },
      };
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
      };
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
      };
  }

  return state;
};
