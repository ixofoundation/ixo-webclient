import {
  SubmitEntityClaimState,
  SubmitEntityClaimActionTypes,
  SubmitEntityClaimActions,
} from './types'

export const initialState: SubmitEntityClaimState = {
  questions: [],
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
  }

  return state
}
