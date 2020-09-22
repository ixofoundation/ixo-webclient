import { Dispatch } from 'redux'
import moment from 'moment'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import {
  SelectedEntityActions,
  GetEntityAction,
  ClearEntityAction,
} from './types'
import { RootState } from 'common/redux/types'
import { ApiListedEntity } from 'common/api/blocksync-api/types/entities'
import { PDS_URL, FundSource } from '../types'
import { PageContent } from 'common/api/blocksync-api/types/page-content'
import { Attestation } from 'modules/EntityClaims/types'
import { ApiResource } from 'common/api/blocksync-api/types/resource'
import { fromBase64 } from 'js-base64'

export const clearEntity = (): ClearEntityAction => ({
  type: SelectedEntityActions.ClearEntity,
})

export const getEntity = (did: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
): GetEntityAction => {
  const { selectedEntity } = getState()

  if (selectedEntity && selectedEntity.did === did) {
    return null
  }

  dispatch(clearEntity())

  const fetchEntity: Promise<ApiListedEntity> = blocksyncApi.project.getProjectByProjectDid(
    did,
  )

  const fetchContent = (key: string): Promise<ApiResource> =>
    blocksyncApi.project.fetchPublic(key, PDS_URL) as Promise<ApiResource>

  return dispatch({
    type: SelectedEntityActions.GetEntity,
    payload: fetchEntity.then((apiEntity: ApiListedEntity) => {
      return fetchContent(apiEntity.data.page.cid).then(
        (resourceData: ApiResource) => {
          const content: PageContent | Attestation = JSON.parse(
            fromBase64(resourceData.data),
          )

          const claimToUse = apiEntity.data.entityClaims
            ? apiEntity.data.entityClaims.items[0]
            : undefined

          const alphabondToUse = apiEntity.data.funding.items.find(
            (fund) => fund['@type'] === FundSource.Alphabond,
          )

          return {
            did: apiEntity.projectDid,
            type: apiEntity.data['@type'],
            creatorDid: apiEntity.data.createdBy,
            status: apiEntity.status,
            name: apiEntity.data.name,
            description: apiEntity.data.description,
            dateCreated: moment(apiEntity.data.createdOn),
            creatorName: apiEntity.data.creator.displayName,
            creatorLogo: apiEntity.data.creator.logo,
            creatorMission: apiEntity.data.creator.mission,
            creatorWebsite: apiEntity.data.creator.website,
            location: apiEntity.data.location,
            image: apiEntity.data.image,
            logo: apiEntity.data.logo,
            serviceProvidersCount: apiEntity.data.agentStats.serviceProviders,
            serviceProvidersPendingCount:
              apiEntity.data.agentStats.serviceProvidersPending,
            evaluatorsCount: apiEntity.data.agentStats.evaluators,
            evaluatorsPendingCount: apiEntity.data.agentStats.evaluatorsPending,
            goal: claimToUse ? claimToUse.goal : undefined,
            requiredClaimsCount: claimToUse ? claimToUse.targetMin : undefined,
            pendingClaimsCount: claimToUse
              ? apiEntity.data.claims.filter((claim) => claim.status === '0')
                  .length
              : undefined,
            successfulClaimsCount: claimToUse
              ? apiEntity.data.claimStats.currentSuccessful
              : undefined,
            rejectedClaimsCount: claimToUse
              ? apiEntity.data.claimStats.currentRejected
              : undefined,
            agents: apiEntity.data.agents,
            sdgs: apiEntity.data.sdgs,
            bondDid: alphabondToUse ? alphabondToUse.id : undefined,
            content,
          }
        },
      )
    }),
  })
}

/*
        .catch((result: Error) => {
          Toast.errorToast(result.message, ErrorTypes.goBack)
          this.gettingProjectData = false
        })
*/
