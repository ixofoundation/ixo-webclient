import {
  SubmitEntityClaimState,
  SubmitEntityClaimActionTypes,
  SubmitEntityClaimActions,
} from './types'
import tempQuestions from './temp_questions.json'

export const initialState: SubmitEntityClaimState = {
  questions: tempQuestions,
  currentQuestionNo: 1,
  answers: [],
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
    case SubmitEntityClaimActions.SaveAnswer:
      return {
        ...state,
        answers: [
          ...(state.answers.filter(
            answer => answer.questionId !== action.payload.answer.questionId,
          ) || []),
          action.payload.answer,
        ],
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
  }

  return state
}
