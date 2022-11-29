import { Dispatch } from 'redux'
import {
  GetClaimAction,
  EvaluateClaimActions,
  ClearClaimAction,
  SaveCommentAction,
  UpdateStatusAction,
  MoveToNextStepAction,
  MoveToStepAction,
} from './evaluateClaim.types'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import keysafe from 'common/keysafe/keysafe'
import { ApiListedEntity } from 'common/api/blocksync-api/types/entities'
import { ApiResource } from 'common/api/blocksync-api/types/resource'
import { fromBase64 } from 'js-base64'
import * as Toast from 'common/utils/Toast'
import { RootState } from 'redux/types'
import { selectCellNodeEndpoint } from '../selectedEntity/selectedEntity.selectors'

export const clearClaim = (): ClearClaimAction => ({
  type: EvaluateClaimActions.ClearClaim,
})

export const getClaim =
  (claimId: string, projectDid: string, claimTemplateDid: string) =>
  (dispatch: Dispatch, getState: () => RootState): GetClaimAction => {
    const state = getState()
    const cellNodeEndpoint = selectCellNodeEndpoint(state)
    // Clear claim info before loading
    dispatch(clearClaim())

    const claimString = localStorage.getItem(claimId)
    const savedClaim = JSON.parse(claimString!)

    // if (savedClaim) {
    //   if (!savedClaim.stage) {
    //     savedClaim['stage'] = 'Analyse'
    //   }
    //   dispatch({
    //     type: EvaluateClaimActions.GetClaim,
    //     payload: savedClaim,
    //   })
    // } else {
    const ProjectDIDPayload: Record<string, any> = {
      projectDid: projectDid,
    }

    keysafe.requestSigning(
      JSON.stringify(ProjectDIDPayload),
      async (error: any, signature: any) => {
        if (error) {
          const { message } = error
          Toast.errorToast(message)
          return null
        }

        await blocksyncApi.claim
          .listClaimsForProject(ProjectDIDPayload, signature, cellNodeEndpoint!)
          .then((response: any) => {
            if (response.error) {
              const { message } = response.error
              Toast.errorToast(message)
              return null
            }

            let claimFound = response.result.filter((claim: any) => claim.txHash === claimId)

            claimFound = claimFound[claimFound.length - 1]

            let fetchedClaim

            if (savedClaim) {
              fetchedClaim = {
                ...claimFound,
                stage: 'Analyse',
                items: savedClaim.items,
              }
            } else {
              fetchedClaim = {
                ...claimFound,
                stage: 'Analyse',
                items: claimFound?.items.map((item: any) => ({
                  ...item,
                  evaluation: {
                    status: null, //  TODO: should be replaced with something
                    comments: '', //  TODO: should be replaced with something
                  },
                })),
              }
            }

            dispatch({
              type: EvaluateClaimActions.GetClaim,
              payload: fetchedClaim,
            })
          })
      },
      'base64',
    )
    // }

    const fetchTemplateEntity: Promise<ApiListedEntity> = blocksyncApi.project.getProjectByProjectDid(claimTemplateDid)

    const fetchContent = (key: string): Promise<ApiResource> =>
      blocksyncApi.project.fetchPublic(key, cellNodeEndpoint!) as Promise<ApiResource>

    fetchTemplateEntity.then((apiEntity: ApiListedEntity) => {
      return fetchContent(apiEntity.data.page.cid).then((resourceData: ApiResource) => {
        const attestation: any = JSON.parse(fromBase64(resourceData.data))
        dispatch({
          type: EvaluateClaimActions.GetClaimTemplate,
          payload: attestation.forms,
        })
      })
    })

    return null!
  }

export const saveComments = (itemId: any, comments: any): SaveCommentAction => ({
  type: EvaluateClaimActions.SaveComment,
  payload: {
    itemId,
    comments,
  },
})

export const updateStatus = (itemId: any, status: any): UpdateStatusAction => ({
  type: EvaluateClaimActions.UpdateStatus,
  payload: {
    itemId,
    status,
  },
})

export const moveToNextStep = (): MoveToNextStepAction => ({
  type: EvaluateClaimActions.MoveToNext,
})

export const moveToStep = (step: string): MoveToStepAction => ({
  type: EvaluateClaimActions.MoveToStep,
  payload: {
    step,
  },
})
