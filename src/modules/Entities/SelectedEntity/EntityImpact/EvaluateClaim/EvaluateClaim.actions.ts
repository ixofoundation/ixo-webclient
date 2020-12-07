import { Dispatch } from "redux";
import {
  GetClaimAction,
  SingleClaimActions
} from './types'
import keysafe from 'common/keysafe/keysafe'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { PDS_URL } from 'modules/Entities/types'
import { EntityClaimStatus } from 'modules/Entities/SelectedEntity/EntityImpact/EntityClaims/types'

export const getClaim = (claimId: string, projectDid: string) => (
  dispatch: Dispatch
): GetClaimAction => {
  console.log('ggggggggggggggggggggg');
  const ProjectDIDPayload: Record<string, any> = {
    projectDid: projectDid,
  }

  keysafe.requestSigning(
    JSON.stringify(ProjectDIDPayload),
    (error, signature) => {
      if (!error) {
        blocksyncApi.claim.listClaimsForProject(
          ProjectDIDPayload,
          signature,
          PDS_URL
          )
          .then((response: any) => {
            console.log('gggggggggggggggg', response)
            if (response.error) {
              console.log(response.error)
            } else {
              const claimFound = response.result.filter(
                claim => claim.txHash === claimId
              )
              console.log('ffffffffffffffff', response)

              return claimFound;
            }
          })

        return dispatch({
          type: SingleClaimActions.GetClaim,
          payload: {

          }
        })
      }
      return null
    },
    'base64',
  )

  return null
}