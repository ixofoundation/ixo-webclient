import {
  SaveAnswerAction,
  SubmitEntityClaimActions,
  GoToPreviousQuestionAction,
  GoToNextQuestionAction,
  GoToQuestionNumberAction,
} from './types'
import { Dispatch } from 'redux'
import { RootState } from 'src/common/redux/types'
import blocksyncApi from '../../common/api/blocksync-api/blocksync-api'

export const saveAnswer = (formData: FormData) => (
  dispatch: Dispatch,
  getState: () => RootState,
): SaveAnswerAction => {
  const {
    submitEntityClaim: { questions, currentQuestionNo },
    selectedEntity: { pdsUrl },
  } = getState()
  const formControl = questions[currentQuestionNo - 1]
  const { control, id } = formControl

  if (control.includes('upload')) {
    return dispatch({
      type: SubmitEntityClaimActions.SaveAnswer,
      payload: blocksyncApi.project
        .createPublic(formData[id], pdsUrl)
        .then((response: any) => ({
          [id]: `${pdsUrl}public/${response.result}`,
        })),
    })
  }

  return dispatch({
    type: SubmitEntityClaimActions.SaveAnswer,
    payload: Promise.resolve({ [id]: formData[id] }),
  })
}

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
    submitEntityClaim: { questions, currentQuestionNo },
  } = getState()
  const totalQuestions = questions.length

  if (
    newQuestionNumber <= totalQuestions &&
    newQuestionNumber < currentQuestionNo
  ) {
    return dispatch({
      type: SubmitEntityClaimActions.GoToQuestionNumber,
      payload: {
        questionNo: newQuestionNumber,
      },
    })
  }

  return null
}
