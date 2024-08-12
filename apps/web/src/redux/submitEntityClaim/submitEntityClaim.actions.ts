import {
  SaveAnswerAction,
  SubmitEntityClaimActions,
  GoToPreviousQuestionAction,
  GoToNextQuestionAction,
  GoToQuestionNumberAction,
  FinaliseQuestionsAction,
  CreateClaimSuccessAction,
  CreateClaimFailureAction,
  ClearClaimTemplateAction,
} from './submitEntityClaim.types'
import { Dispatch } from 'redux'
import { RootState } from 'redux/store'
import { FormData } from 'components/JsonForm/types'
import { customQueries } from '@ixo/impactxclient-sdk'
import { chainNetwork } from 'hooks/configs'

export const clearClaimTemplate = (): ClearClaimTemplateAction => ({
  type: SubmitEntityClaimActions.ClearClaimTemplate,
})

export const saveAnswer =
  (formData: FormData) =>
  (dispatch: Dispatch, getState: () => RootState): SaveAnswerAction => {
    if (!formData) {
      return null!
    }

    const state = getState()
    const {
      submitEntityClaim: { questions, currentQuestionNo },
    } = state

    const questionForm = questions[currentQuestionNo - 1]

    const id = Object.keys(questionForm.schema.properties!)[0]
    const control = questionForm.uiSchema[id]['ui:widget']

    if (control.includes('upload') && Object.keys(formData).length > 0) {
      return dispatch({
        type: SubmitEntityClaimActions.SaveAnswer,
        payload: customQueries.cellnode
          .uploadPublicDoc(
            formData[id].match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1],
            formData[id],
            undefined,
            chainNetwork,
          )
          .then((response: any) => ({
            [id]: response.url,
          })),
      })
    }

    return dispatch({
      type: SubmitEntityClaimActions.SaveAnswer,
      payload: Promise.resolve({ [id]: formData[id] }),
    })
  }

export const goToPreviousQuestion =
  () =>
  (dispatch: Dispatch, getState: () => RootState): GoToPreviousQuestionAction => {
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

    return null!
  }

export const goToNextQuestion =
  () =>
  (dispatch: Dispatch, getState: () => RootState): GoToNextQuestionAction => {
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

    return null!
  }

export const goToQuestionNumber =
  (newQuestionNumber: number) =>
  (dispatch: Dispatch, getState: () => RootState): GoToQuestionNumberAction => {
    const {
      submitEntityClaim: { questions, currentQuestionNo, answersComplete },
    } = getState()
    const totalQuestions = questions.length

    if (answersComplete || (newQuestionNumber <= totalQuestions && newQuestionNumber < currentQuestionNo)) {
      return dispatch({
        type: SubmitEntityClaimActions.GoToQuestionNumber,
        payload: {
          questionNo: newQuestionNumber,
        },
      })
    }

    return null!
  }

export const finaliseQuestions = (): FinaliseQuestionsAction => {
  return {
    type: SubmitEntityClaimActions.FinaliseQuestions,
  }
}

export const createEntityClaim = () => (dispatch: Dispatch) => {
  dispatch({
    type: SubmitEntityClaimActions.CreateClaimStart,
  })

  // const state = getState()
  // const cellNodeEndpoint = selectCellNodeEndpoint(state)

  // const claimApiPayload = submitEntityClaimSelectors.selectClaimApiPayload(state)

  // keysafe.requestSigning(
  //   JSON.stringify(claimApiPayload),
  //   (signError: any, signature: any): any => {
  //     if (signError) {
  //       return dispatch({
  //         type: SubmitEntityClaimActions.CreateClaimFailure,
  //         payload: {
  //           error: signError,
  //         },
  //       })
  //     }

  //     blocksyncApi.claim
  //       .createClaim(claimApiPayload, signature, cellNodeEndpoint!)
  //       .then((res) => {
  //         if (res.error) {
  //           return dispatch({
  //             type: SubmitEntityClaimActions.CreateClaimFailure,
  //             payload: {
  //               error: res.error.message,
  //             },
  //           })
  //         } else {
  //           // TODO: should catch the real point when success on creating/submitting claim
  //           return setTimeout(() => {
  //             dispatch({
  //               type: SubmitEntityClaimActions.CreateClaimSuccess,
  //             })
  //           }, 1000 * 10)
  //         }
  //       })
  //       .catch((error) => {
  //         return dispatch({
  //           type: SubmitEntityClaimActions.CreateClaimFailure,
  //           payload: {
  //             error: error.message,
  //           },
  //         })
  //       })
  //   },
  //   'base64',
  // )

  return null!
}
