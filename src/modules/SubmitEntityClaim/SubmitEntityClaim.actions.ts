import {
  SaveAnswerAction,
  SubmitEntityClaimActions,
  GoToPreviousQuestionAction,
  GoToNextQuestionAction,
  GoToQuestionNumberAction,
} from './types'
import { Dispatch } from 'redux'
import { RootState } from 'src/common/redux/types'

export const saveAnswer = (answer: any): SaveAnswerAction => ({
  type: SubmitEntityClaimActions.SaveAnswer,
  payload: {
    answer,
  },
})

export const goToPreviousQuestion = () => (
  dispatch: Dispatch,
  getState: () => RootState,
): GoToPreviousQuestionAction => {
  const {
    submitEntityClaim: { currentQuestionNo },
  } = getState()

  if (currentQuestionNo > 1) {
    return dispatch({
      type: SubmitEntityClaimActions.GoToPreviousQuestion,
      payload: {
        previousQuestionNo: currentQuestionNo - 1,
      },
    })
  }

  return null
}

export const goToNextQuestion = () => (
  dispatch: Dispatch,
  getState: () => RootState,
): GoToNextQuestionAction => {
  const {
    submitEntityClaim: { questions, currentQuestionNo },
  } = getState()
  const totalQuestions = questions.length

  if (currentQuestionNo < totalQuestions) {
    return dispatch({
      type: SubmitEntityClaimActions.GoToNextQuestion,
      payload: {
        nextQuestionNo: currentQuestionNo + 1,
      },
    })
  }

  return null
}

export const goToQuestionNumber = (newQuestionNumber: number) => (
  dispatch: Dispatch,
  getState: () => RootState,
): GoToQuestionNumberAction => {
  const {
    submitEntityClaim: { questions },
  } = getState()
  const totalQuestions = questions.length

  if (newQuestionNumber <= totalQuestions) {
    return dispatch({
      type: SubmitEntityClaimActions.GoToQuestionNumber,
      payload: {
        questionNo: newQuestionNumber,
      },
    })
  }

  return null
}
