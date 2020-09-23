import {
  SubmitEntityClaimState,
  SubmitEntityClaimActionTypes,
  SubmitEntityClaimActions,
} from './types'
import tempClaimData from './temp_claim_data.json'
import { QuestionForm } from '../types'
import { EntityClaimType } from '../types'

const {
  forms,
  claimInfo: { title, shortDescription, type },
} = tempClaimData

export const initialState: SubmitEntityClaimState = {
  claimTitle: title,
  claimShortDescription: shortDescription,
  type: type as EntityClaimType,
  questions: forms as QuestionForm[],
  currentQuestionNo: 1,
  answers: undefined,
  savingAnswer: false,
  answersComplete: false,
  sending: false,
  sent: false,
  error: null,
}

export const reducer = (
  state = initialState,
  action: SubmitEntityClaimActionTypes,
): SubmitEntityClaimState => {
  switch (action.type) {
    case SubmitEntityClaimActions.SaveAnswerPending:
      return {
        ...state,
        savingAnswer: true,
      }
    case SubmitEntityClaimActions.SaveAnswerSuccess:
      return {
        ...state,
        answers: {
          ...state.answers,
          ...action.payload,
        },
        savingAnswer: false,
      }
    case SubmitEntityClaimActions.SaveAnswerFailure:
      return {
        ...state,
        savingAnswer: false,
      }
    case SubmitEntityClaimActions.GoToPreviousQuestion:
      return {
        ...state,
        currentQuestionNo: action.payload.previousQuestionNo,
      }
    case SubmitEntityClaimActions.GoToNextQuestion:
      return {
        ...state,
        currentQuestionNo: action.payload.nextQuestionNo,
      }
    case SubmitEntityClaimActions.GoToQuestionNumber:
      return {
        ...state,
        currentQuestionNo: action.payload.questionNo,
      }
    case SubmitEntityClaimActions.FinaliseQuestions:
      return {
        ...state,
        answersComplete: true,
      }
  }

  return state
}
