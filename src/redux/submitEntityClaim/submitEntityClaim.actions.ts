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
  GetClaimTemplateAction,
} from './submitEntityClaim.types'
import { Dispatch } from 'redux'
import { RootState } from 'redux/store'
import keysafe from 'lib/keysafe/keysafe'
import blocksyncApi from 'api/blocksync/blocksync'
import * as submitEntityClaimSelectors from './submitEntityClaim.selectors'
import { ApiListedEntity } from 'api/blocksync/types/entities'
import { ApiResource } from 'api/blocksync/types/resource'
/* import { Attestation } from '../types' */
import { fromBase64 } from 'js-base64'
import { FormData } from 'components/JsonForm/types'
import { selectCellNodeEndpoint } from 'redux/selectedEntity/selectedEntity.selectors'

export const clearClaimTemplate = (): ClearClaimTemplateAction => ({
  type: SubmitEntityClaimActions.ClearClaimTemplate,
})

export const getClaimTemplate =
  (templateDid: string, serviceEndpoint: string | undefined = undefined) =>
  (dispatch: Dispatch, getState: () => RootState): GetClaimTemplateAction => {
    const state = getState()
    const { submitEntityClaim } = state
    let cellNodeEndpoint = serviceEndpoint
    if (!cellNodeEndpoint) {
      cellNodeEndpoint = selectCellNodeEndpoint(state)
    }

    if (submitEntityClaim && submitEntityClaim.templateDid === templateDid) {
      return null!
    }

    dispatch(clearClaimTemplate())

    const fetchTemplateEntity: Promise<ApiListedEntity> = blocksyncApi.project.getProjectByProjectDid(templateDid)

    const fetchContent = (key: string): Promise<ApiResource> =>
      blocksyncApi.project.fetchPublic(key, cellNodeEndpoint!) as Promise<ApiResource>

    return dispatch({
      type: SubmitEntityClaimActions.GetClaimTemplate,
      payload: fetchTemplateEntity.then((apiEntity: ApiListedEntity) => {
        return fetchContent(apiEntity.data.page.cid).then((resourceData: ApiResource) => {
          const attestation: any = JSON.parse(fromBase64(resourceData.data))

          return {
            templateDid,
            claimTitle: apiEntity.data.name,
            claimShortDescription: apiEntity.data.description,
            type: attestation.claimInfo.type,
            questions: attestation.forms,
          }
        })
      }),
    })
  }

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
    const cellNodeEndpoint = selectCellNodeEndpoint(state)

    const questionForm = questions[currentQuestionNo - 1]

    const id = Object.keys(questionForm.schema.properties!)[0]
    const control = questionForm.uiSchema[id]['ui:widget']

    if (control.includes('upload') && Object.keys(formData).length > 0) {
      return dispatch({
        type: SubmitEntityClaimActions.SaveAnswer,
        payload: blocksyncApi.project.createPublic(formData[id], cellNodeEndpoint!).then((response: any) => ({
          [id]: `${cellNodeEndpoint}public/${response.result}`,
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

export const createEntityClaim =
  () =>
  (dispatch: Dispatch, getState: () => RootState): CreateClaimSuccessAction | CreateClaimFailureAction => {
    dispatch({
      type: SubmitEntityClaimActions.CreateClaimStart,
    })

    const state = getState()
    const cellNodeEndpoint = selectCellNodeEndpoint(state)

    const claimApiPayload = submitEntityClaimSelectors.selectClaimApiPayload(state)

    keysafe.requestSigning(
      JSON.stringify(claimApiPayload),
      (signError: any, signature: any): any => {
        if (signError) {
          return dispatch({
            type: SubmitEntityClaimActions.CreateClaimFailure,
            payload: {
              error: signError,
            },
          })
        }

        blocksyncApi.claim
          .createClaim(claimApiPayload, signature, cellNodeEndpoint!)
          .then((res) => {
            if (res.error) {
              return dispatch({
                type: SubmitEntityClaimActions.CreateClaimFailure,
                payload: {
                  error: res.error.message,
                },
              })
            } else {
              // TODO: should catch the real point when success on creating/submitting claim
              return setTimeout(() => {
                dispatch({
                  type: SubmitEntityClaimActions.CreateClaimSuccess,
                })
              }, 1000 * 10)
            }
          })
          .catch((error) => {
            return dispatch({
              type: SubmitEntityClaimActions.CreateClaimFailure,
              payload: {
                error: error.message,
              },
            })
          })
      },
      'base64',
    )

    return null!
  }
