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
} from './types'
import { Dispatch } from 'redux'
import { RootState } from 'common/redux/types'
import keysafe from 'common/keysafe/keysafe'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { PDS_URL } from 'modules/Entities/types'
import * as submitEntityClaimSelectors from './SubmitEntityClaim.selectors'
import { ApiListedEntity } from 'common/api/blocksync-api/types/entities'
import { ApiResource } from 'common/api/blocksync-api/types/resource'
/* import { Attestation } from '../types' */
import { fromBase64 } from 'js-base64'
import { FormData } from 'common/components/JsonForm/types'
import claimTemplate from './claim_template.json'

export const clearClaimTemplate = (): ClearClaimTemplateAction => ({
  type: SubmitEntityClaimActions.ClearClaimTemplate,
})

export const getClaimTemplate = (templateDid: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
): GetClaimTemplateAction => {
  const { submitEntityClaim } = getState()

  if (submitEntityClaim && submitEntityClaim.templateDid === templateDid) {
    return null
  }

  dispatch(clearClaimTemplate())

  const fetchTemplateEntity: Promise<ApiListedEntity> = blocksyncApi.project.getProjectByProjectDid(
    templateDid,
  )

  const fetchContent = (key: string): Promise<ApiResource> =>
    blocksyncApi.project.fetchPublic(key, PDS_URL) as Promise<ApiResource>

  return dispatch({
    type: SubmitEntityClaimActions.GetClaimTemplate,
    payload: fetchTemplateEntity.then((apiEntity: ApiListedEntity) => {
      return fetchContent(apiEntity.data.page.cid).then(
        (resourceData: ApiResource) => {
          let attestation: any = JSON.parse(
            fromBase64(resourceData.data),
          )

          // For demo, let's use template.
          attestation = claimTemplate;

          return {
            templateDid,
            claimTitle: apiEntity.data.name,
            claimShortDescription: apiEntity.data.description,
            type: attestation.claimInfo.type,
            questions: attestation.forms,
          }
        },
      )
    }),
  })
}

export const saveAnswer = (formData: FormData) => (
  dispatch: Dispatch,
  getState: () => RootState,
): SaveAnswerAction => {
  if (!formData) {
    return null
  }

  const {
    submitEntityClaim: { questions, currentQuestionNo },
  } = getState()
  const questionForm = questions[currentQuestionNo - 1]

  const id = Object.keys(questionForm.schema.properties)[0]
  const control = questionForm.uiSchema[id]['ui:widget']

  if (control.includes('upload') && Object.keys(formData).length > 0) {
    return dispatch({
      type: SubmitEntityClaimActions.SaveAnswer,
      payload: blocksyncApi.project
        .createPublic(formData[id], PDS_URL)
        .then((response: any) => ({
          [id]: `${PDS_URL}public/${response.result}`,
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
    submitEntityClaim: { questions, currentQuestionNo, answersComplete },
  } = getState()
  const totalQuestions = questions.length

  if (
    answersComplete ||
    (newQuestionNumber <= totalQuestions &&
      newQuestionNumber < currentQuestionNo)
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

export const finaliseQuestions = (): FinaliseQuestionsAction => {
  return {
    type: SubmitEntityClaimActions.FinaliseQuestions,
  }
}

export const createEntityClaim = () => (
  dispatch: Dispatch,
  getState: () => RootState,
): CreateClaimSuccessAction | CreateClaimFailureAction => {
  dispatch({
    type: SubmitEntityClaimActions.CreateClaimStart,
  })

  const claimApiPayload = submitEntityClaimSelectors.selectClaimApiPayload(
    getState(),
  )

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
        .createClaim(claimApiPayload, signature, PDS_URL)
        .then((res) => {
          if (res.error) {
            return dispatch({
              type: SubmitEntityClaimActions.CreateClaimFailure,
              payload: {
                error: res.error.message,
              },
            })
          } else {
            return dispatch({
              type: SubmitEntityClaimActions.CreateClaimSuccess,
            })
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

  return null
}
