import moment, { Moment } from 'moment'
import { Dispatch } from 'redux'
import { EntityType } from '../types'
import {
  GetEntitiesAction,
  ChangeEntitiesTypeAction,
  FilterToggleUserEntitiesAction,
  FilterToggleFeaturedEntitiesAction,
  FilterTogglePopularEntitiesAction,
  FilterDatesAction,
  ResetDatesFilterAction,
  FilterAddCategoryTagAction,
  ResetCategoryFilterAction,
  ResetSectorFilterAction,
  ResetFiltersAction,
  EntitiesExplorerActions,
  FilterDDOCategoriesAction,
  DDOTagCategory,
  FilterCategoryTagAction,
  FilterSectorAction,
  FilterQueryAction,
  GetEntityConfigAction,
  FilterItemOffsetAction,
} from './types'
import { RootState } from 'common/redux/types'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { SchemaGitUrl } from 'common/utils/constants'
import { ApiListedEntity } from 'common/api/blocksync-api/types/entities'
import Axios from 'axios'
import { getHeadlineClaimInfo } from 'common/utils/claims.utils'

export const getEntities = () => (dispatch: Dispatch): GetEntitiesAction => {
  return dispatch({
    type: EntitiesExplorerActions.GetEntities,
    // Temp
    payload: blocksyncApi.project
      .listProjects()
      .then((apiEntities: ApiListedEntity[]) => {
        return apiEntities
          .filter((entity) => !!entity.data['@type'])
          .map((apiEntity: ApiListedEntity) => ({
            ...apiEntity,
            data: {
              ...apiEntity.data,
              creator: {
                ...apiEntity.data.creator,
                logo:
                  apiEntity?.data?.creator?.logo?.replace(
                    'pds_pandora.ixo.world',
                    'cellnode-pandora.ixo.earth',
                  ) ?? '',
              },
              image:
                apiEntity?.data?.image?.replace(
                  'pds_pandora.ixo.world',
                  'cellnode-pandora.ixo.earth',
                ) ?? '',
              logo:
                apiEntity?.data?.logo?.replace(
                  'pds_pandora.ixo.world',
                  'cellnode-pandora.ixo.earth',
                ) ?? '',
            },
          }))
          .map((apiEntity: ApiListedEntity) => {
            const {
              claimToUse,
              successful,
              pending,
              rejected,
              disputed,
            } = getHeadlineClaimInfo(apiEntity)

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
          })
      })
      .catch((e) => {
        console.log('getEntities', e)
        return []
      }),
  })
}

export const getEntityConfig = () => (
  dispatch: Dispatch,
): GetEntityConfigAction => {
  return dispatch({
    type: EntitiesExplorerActions.GetEntityConfig,
    payload: Axios.get(SchemaGitUrl).then((response) => response.data),
  })
}

export const changeEntitiesType = (
  type: EntityType,
): ChangeEntitiesTypeAction => ({
  type: EntitiesExplorerActions.ChangeEntitiesType,
  payload: {
    type,
  },
})

export const filterToggleUserEntities = (
  userEntities: boolean,
): FilterToggleUserEntitiesAction => ({
  type: EntitiesExplorerActions.FilterToggleUserEntities,
  payload: {
    userEntities,
  },
})

export const filterToggleFeaturedEntities = (
  featuredEntities: boolean,
): FilterToggleFeaturedEntitiesAction => ({
  type: EntitiesExplorerActions.FilterToggleFeaturedEntities,
  payload: {
    featuredEntities,
  },
})

export const filterTogglePopularEntities = (
  popularEntities: boolean,
): FilterTogglePopularEntitiesAction => ({
  type: EntitiesExplorerActions.FilterTogglePopularEntities,
  payload: {
    popularEntities,
  },
})

export const filterDates = (
  dateFrom: Moment,
  dateTo: Moment,
): FilterDatesAction => ({
  type: EntitiesExplorerActions.FilterDates,
  payload: {
    dateFrom,
    dateTo,
  },
})

export const resetDatesFilter = (): ResetDatesFilterAction => ({
  type: EntitiesExplorerActions.ResetDatesFilter,
})

export const filterCategoryTag = (category: string, tag: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
): FilterCategoryTagAction => {
  const state = getState()

  const isCurrentlySelected = state.entities.filter.ddoTags.find(
    (filterCategory) =>
      filterCategory.name === category && filterCategory.tags.includes(tag),
  )

  return dispatch({
    type: EntitiesExplorerActions.FilterCategoryTag,
    payload: {
      category,
      tags: isCurrentlySelected ? [] : [tag],
    },
  })
}

export const filterAddCategoryTag = (category: string, tag: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
): FilterAddCategoryTagAction => {
  const state = getState()

  const currentCategoryTags = state.entities.filter.ddoTags.find(
    (filterCategory) => filterCategory.name === category,
  ).tags

  const newCategoryTags = currentCategoryTags.includes(tag)
    ? [...currentCategoryTags.filter((val) => val !== tag)]
    : [...currentCategoryTags, tag]

  return dispatch({
    type: EntitiesExplorerActions.FilterAddCategoryTag,
    payload: {
      category,
      tags: newCategoryTags,
    },
  })
}

export const filterEntitiesQuery = (query: string): FilterQueryAction => ({
  type: EntitiesExplorerActions.FilterQuery,
  payload: { query },
})

export const filterCategories = (
  categories: DDOTagCategory[],
): FilterDDOCategoriesAction => ({
  type: EntitiesExplorerActions.FilterDDOCategories,
  payload: { ddoTags: categories },
})
export const filterSector = (sector: string): FilterSectorAction => ({
  type: EntitiesExplorerActions.FilterSector,
  payload: { sector },
})

export const filterItemOffset = (
  itemOffset: number,
): FilterItemOffsetAction => ({
  type: EntitiesExplorerActions.FilterItemOffset,
  payload: itemOffset,
})

export const resetCategoryFilter = (
  category: string,
): ResetCategoryFilterAction => ({
  type: EntitiesExplorerActions.ResetCategoryFilter,
  payload: { category },
})

export const resetSectorFilter = (): ResetSectorFilterAction => ({
  type: EntitiesExplorerActions.ResetSectorFilter,
})

export const resetFilters = (): ResetFiltersAction => ({
  type: EntitiesExplorerActions.ResetFilters,
})
