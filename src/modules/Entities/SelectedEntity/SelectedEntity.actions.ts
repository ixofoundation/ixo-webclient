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
import { FundSource, PDS_URL } from '../types'
import { ApiPageContent } from 'common/api/blocksync-api/types/page-content'
import { ApiAttestation } from 'common/api/blocksync-api/types/attestation'

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

  const fetchContent = (
    key: string,
  ): Promise<ApiPageContent | ApiAttestation> =>
    blocksyncApi.project.fetchPublic(key, PDS_URL) as Promise<
      ApiPageContent | ApiAttestation
    >

  return dispatch({
    type: SelectedEntityActions.GetEntity,
    payload: fetchEntity.then((apiEntity: ApiListedEntity) =>
      fetchContent(apiEntity.data.page.cid).then(
        (apiPageContent: ApiPageContent | ApiAttestation) => {
          const claimToUse = apiEntity.data.claims
            ? apiEntity.data.claims.items[0]
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
            ownerName: apiEntity.data.owner.displayName,
            ownerLogo: apiEntity.data.owner.logo,
            ownerMission: apiEntity.data.owner.mission,
            ownerWebsite: apiEntity.data.owner.website,
            location: apiEntity.data.location,
            image: apiEntity.data.image,
            logo: apiEntity.data.logo,
            serviceProvidersCount: apiEntity.data.agentStats.serviceProviders,
            serviceProvidersPendingCount:
              apiEntity.data.agentStats.serviceProvidersPending,
            evaluatorsCount: apiEntity.data.agentStats.evaluators,
            evaluatorsPendingCount: apiEntity.data.agentStats.evaluatorsPending,
            requiredClaimsCount: claimToUse ? claimToUse.targetMin : undefined,
            pendingClaimsCount: claimToUse ? 3 : undefined, // TODO - get actual value when this is available
            successfulClaimsCount: claimToUse
              ? apiEntity.data.claimStats.currentSuccessful
              : undefined,
            rejectedClaimsCount: claimToUse
              ? apiEntity.data.claimStats.currentRejected
              : undefined,
            agents: apiEntity.data.agents,
            sdgs: apiEntity.data.sdgs,
            bondDid: alphabondToUse ? alphabondToUse.id : undefined,
            content: apiPageContent,
          }
        },
      ),
    ),
  })
}
