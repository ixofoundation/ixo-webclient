import {
  SubmitEntityClaimState,
  SubmitEntityClaimActionTypes,
  SubmitEntityClaimActions,
} from './types'

export const initialState: SubmitEntityClaimState = null

export const reducer = (
  state = initialState,
  action: SubmitEntityClaimActionTypes,
): SubmitEntityClaimState => {
  switch (action.type) {
    case SubmitEntityClaimActions.GetClaimTemplateSuccess:
      return {
        ...action.payload,
        currentQuestionNo: 1,
        answers: undefined,
        savingAnswer: false,
        answersComplete: false,
        sending: false,
        sent: false,
        error: null,
      }
    case SubmitEntityClaimActions.ClearClaimTemplate:
      return null
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
