import React, { useEffect } from 'react'
import moment from 'moment'
import Axios from 'axios'
import useSWR from 'swr'
import { useDispatch } from 'react-redux'
import { EntitiesExplorerActions } from 'modules/Entities/EntitiesExplorer/types'
import { ApiListedEntity } from 'common/api/blocksync-api/types/entities'
import { getHeadlineClaimInfo } from 'common/utils/claims.utils'

const fetcher = (url): Promise<any> =>
  Axios.get(process.env.REACT_APP_BLOCK_SYNC_URL + url).then((res) => res.data)

const EntitiesService: React.FC = (): JSX.Element => {
  const dispatch = useDispatch()
  const { data, error } = useSWR(`/api/project/listProjects`, fetcher, {
    refreshInterval: 1000 * 10,  //  per 10 secs
  })

  useEffect(() => {
    if (data) {
      dispatch({
        type: EntitiesExplorerActions.GetEntitiesSWR,
        payload: data
          .filter((entity) => !!entity.data['@type'])
          .map((apiEntity: ApiListedEntity) => {
            const { claimToUse, successful, pending, rejected, disputed } =
              getHeadlineClaimInfo(apiEntity)
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
              location: apiEntity.data.location,
              goal: claimToUse ? claimToUse.goal : undefined,
              image: apiEntity.data.image,
              logo: apiEntity.data.logo,
              serviceProvidersCount: apiEntity.data.agentStats.serviceProviders,
              evaluatorsCount: apiEntity.data.agentStats.evaluators,
              requiredClaimsCount: claimToUse ? claimToUse.targetMax : 0,
              pendingClaimsCount: pending, // due to pendingClaims not existing in the claimStats we have to look in the claims itself!
              successfulClaimsCount: successful,
              rejectedClaimsCount: rejected,
              disputedClaimsCount: disputed,
              agentDids: apiEntity.data.agents.map((agent) => agent.did),
              sdgs: apiEntity.data.sdgs,
              ddoTags: apiEntity.data.ddoTags
                ? apiEntity.data.ddoTags.map((ddoTag) => ({
                    name: ddoTag.category,
                    tags: ddoTag.tags,
                  }))
                : [],
              termsType: apiEntity.data.terms
                ? apiEntity.data.terms['@type']
                : undefined,
              badges: apiEntity.data.displayCredentials.items.map(
                (dc) => dc.badge,
              ),
              version: apiEntity.data.version.versionNumber,
              claims: apiEntity.data.claims,
              entityClaims: apiEntity.data.entityClaims,
              linkedEntities: apiEntity.data.linkedEntities,
              funding: apiEntity.data.funding,
              liquidity: apiEntity.data.liquidity,
            }
          }),
      })
    }
    // eslint-disable-next-line
  }, [data])

  useEffect(() => {
    if (error) {
      console.error('Entities.Service', error)
    }
  }, [error])

  return null
}

export default EntitiesService
