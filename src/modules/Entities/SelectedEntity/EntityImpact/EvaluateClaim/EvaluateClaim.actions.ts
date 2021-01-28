import { Dispatch } from "redux";
import {
  GetClaimAction,
  EvaluateClaimActions,
  ClearClaimAction
} from './types'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { PDS_URL } from 'modules/Entities/types'
import keysafe from 'common/keysafe/keysafe'
import { ApiListedEntity } from 'common/api/blocksync-api/types/entities'
import { ApiResource } from 'common/api/blocksync-api/types/resource'
import { fromBase64 } from 'js-base64'

export const clearClaim = (): ClearClaimAction => ({
  type: EvaluateClaimActions.ClearClaim,
})

export const getClaim = (claimId: string, projectDid: string, claimTemplateDid: string) => (
  dispatch: Dispatch
): GetClaimAction => {
  // Clear claim info before loading
  dispatch(clearClaim())

  const ProjectDIDPayload: Record<string, any> = {
    projectDid: projectDid,
  }

  keysafe.requestSigning(
    JSON.stringify(ProjectDIDPayload),
    async (error, signature) => {
      if (!error) {
        await blocksyncApi.claim.listClaimsForProject(
          ProjectDIDPayload,
          signature,
          PDS_URL
          )
          .then((response: any) => {
            if (response.error) {
              return null;
            } else {
              const claimFound = response.result.filter(
                claim => claim.txHash === claimId
              )


              dispatch({
                type: EvaluateClaimActions.GetClaim,
                payload: claimFound[claimFound.length - 1]
              })
            }
          })
      }
      return null
    },
    'base64',
  )

  const fetchTemplateEntity: Promise<ApiListedEntity> = blocksyncApi.project.getProjectByProjectDid(
    claimTemplateDid,
  )

  const fetchContent = (key: string): Promise<ApiResource> =>
    blocksyncApi.project.fetchPublic(key, PDS_URL) as Promise<ApiResource>

  fetchTemplateEntity.then((apiEntity: ApiListedEntity) => {
    return fetchContent(apiEntity.data.page.cid).then(
      (resourceData: ApiResource) => {
        const attestation: any = JSON.parse(
          fromBase64(resourceData.data),
        )

        dispatch({
          type: EvaluateClaimActions.GetClaimTemplate,
          payload: attestation.forms
        })
      },
    )
  })

  return null
}