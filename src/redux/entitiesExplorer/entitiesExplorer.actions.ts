import moment from 'moment'
import { Dispatch } from 'redux'
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
  FilterCategoryTagAction,
  FilterSectorAction,
  FilterQueryAction,
  GetEntityConfigAction,
  FilterItemOffsetAction,
  GetEntities2Action,
} from './entitiesExplorer.types'
import { RootState } from 'redux/store'
import blocksyncApi from 'api/blocksync/blocksync'
import { SchemaGitUrl } from 'constants/chains'
import { ApiListedEntity } from 'api/blocksync/types/entities'
import Axios from 'axios'
import { getHeadlineClaimInfo } from 'utils/claims'
import { TEntityDDOTagModel } from 'types/protocol'
import { BlockSyncService } from 'services/blocksync'
import { apiEntityToEntity } from 'utils/entities'

const bsService = new BlockSyncService()

export const getEntities =
  () =>
  (dispatch: Dispatch): GetEntitiesAction => {
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
                    apiEntity.data.creator?.logo?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth') ?? '',
                },
                image: apiEntity.data.image?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth') ?? '',
                logo: apiEntity.data.logo?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth') ?? '',
              },
            }))
            .map((apiEntity: ApiListedEntity) => {
              const { claimToUse, successful, pending, rejected, disputed } = getHeadlineClaimInfo(apiEntity)

              return {
                goal: claimToUse ? claimToUse.goal : undefined,
                serviceProvidersCount: apiEntity.data.agentStats?.serviceProviders,
                evaluatorsCount: apiEntity.data.agentStats?.evaluators,
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
                termsType: apiEntity.data.terms ? apiEntity.data.terms['@type'] : undefined,
                badges: apiEntity.data.displayCredentials.items.map((dc) => dc.badge),
                claims: apiEntity.data.claims,
                entityClaims: apiEntity.data.entityClaims,
                linkedEntities: apiEntity.data.linkedEntities,
                funding: apiEntity.data.funding,
                liquidity: apiEntity.data.liquidity,

                // in common
                did: apiEntity.projectDid,
                type: apiEntity.data['@type'],
                status: apiEntity.status,
                dateCreated: moment(parseInt(apiEntity.data.createdOn.$date.$numberLong)),
                version: apiEntity.data.version.versionNumber,

                // profile
                name: apiEntity.data.name,
                description: apiEntity.data.description,
                image: apiEntity.data.image,
                logo: apiEntity.data.logo,
                location: apiEntity.data.location,

                // creator
                creatorDid: apiEntity.data.createdBy,
                creatorName: apiEntity.data.creator.displayName,
                creatorLogo: apiEntity.data.creator.logo,
              }
            })
        })
        .catch((e) => {
          console.log('getEntities', e)
          return []
        }),
    }) as any
  }

export const getAllEntities =
  () =>
  (dispatch: Dispatch, getState: () => RootState): GetEntities2Action => {
    const {
      entities: { entities2 },
      account: { cwClient },
    } = getState()
    return dispatch({
      type: EntitiesExplorerActions.GetEntities2,
      payload: bsService.entity.getAllEntities().then((entities: any[]) => {
        return entities
          ?.filter(
            (entity) =>
              entity.relayerNode === process.env.REACT_APP_RELAYER_NODE ||
              entity.id === process.env.REACT_APP_RELAYER_NODE,
          )
          .map((entity) => {
            const { id } = entity
            apiEntityToEntity({ entity, cwClient }, (key, value, merge = false) => {
              dispatch({
                type: EntitiesExplorerActions.GetIndividualEntity2,
                payload: { id, key, data: value, merge },
              })
            })
            return { ...(entities2 && entities2[id] ? entities2[id] : {}), ...entity }
          })
      }),
    })
  }

/**
 * @deprecated
 * @param entityType
 * @returns
 */
export const getEntitiesByType =
  (entityType: string) =>
  (dispatch: Dispatch, getState: () => RootState): GetEntities2Action => {
    const {
      entities: { entities2 },
      account: { cwClient },
    } = getState()
    return dispatch({
      type: EntitiesExplorerActions.GetEntities2,
      payload: bsService.entity.getEntitiesByType(entityType).then((entities: any[]) => {
        return entities
          ?.filter(
            (entity) =>
              entity.relayerNode === process.env.REACT_APP_RELAYER_NODE ||
              entity.id === process.env.REACT_APP_RELAYER_NODE,
          )
          .map((entity) => {
            const { id } = entity
            apiEntityToEntity({ entity, cwClient }, (key, value, merge = false) => {
              dispatch({
                type: EntitiesExplorerActions.GetIndividualEntity2,
                payload: { id, key, data: value, merge },
              })
            })
            return { ...(entities2 && entities2[id] ? entities2[id] : {}), ...entity }
          })
      }),
    })
  }

export const getEntityConfig =
  () =>
  (dispatch: Dispatch): GetEntityConfigAction => {
    return dispatch({
      type: EntitiesExplorerActions.GetEntityConfig,
      payload: Axios.get(SchemaGitUrl!).then((response) => response.data),
    })
  }

export const changeEntitiesType = (type: string): ChangeEntitiesTypeAction => ({
  type: EntitiesExplorerActions.ChangeEntitiesType,
  payload: {
    type,
  },
})

export const filterToggleUserEntities = (userEntities: boolean): FilterToggleUserEntitiesAction => ({
  type: EntitiesExplorerActions.FilterToggleUserEntities,
  payload: {
    userEntities,
  },
})

export const filterToggleFeaturedEntities = (featuredEntities: boolean): FilterToggleFeaturedEntitiesAction => ({
  type: EntitiesExplorerActions.FilterToggleFeaturedEntities,
  payload: {
    featuredEntities,
  },
})

export const filterTogglePopularEntities = (popularEntities: boolean): FilterTogglePopularEntitiesAction => ({
  type: EntitiesExplorerActions.FilterTogglePopularEntities,
  payload: {
    popularEntities,
  },
})

export const filterDates = (dateFrom: string, dateTo: string): FilterDatesAction => ({
  type: EntitiesExplorerActions.FilterDates,
  payload: {
    dateFrom,
    dateTo,
  },
})

export const resetDatesFilter = (): ResetDatesFilterAction => ({
  type: EntitiesExplorerActions.ResetDatesFilter,
})

export const filterCategoryTag =
  (category: string, tag: string) =>
  (dispatch: Dispatch, getState: () => RootState): FilterCategoryTagAction => {
    const state = getState()

    const isCurrentlySelected = state.entities.filter.ddoTags.find(
      (filterCategory) => filterCategory.category === category && filterCategory.tags.includes(tag),
    )

    return dispatch({
      type: EntitiesExplorerActions.FilterCategoryTag,
      payload: {
        category,
        tags: isCurrentlySelected ? [] : [tag],
      },
    })
  }

export const filterAddCategoryTag =
  (category: string, tag: string) =>
  (dispatch: Dispatch, getState: () => RootState): FilterAddCategoryTagAction => {
    const state = getState()

    const currentCategoryTags =
      state.entities.filter.ddoTags.find((filterCategory) => filterCategory.category === category)?.tags ?? []

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

export const filterCategories = (categories: TEntityDDOTagModel[]): FilterDDOCategoriesAction => ({
  type: EntitiesExplorerActions.FilterDDOCategories,
  payload: { ddoTags: categories },
})
export const filterSector = (sector: string): FilterSectorAction => ({
  type: EntitiesExplorerActions.FilterSector,
  payload: { sector },
})

export const filterItemOffset = (itemOffset: number): FilterItemOffsetAction => ({
  type: EntitiesExplorerActions.FilterItemOffset,
  payload: itemOffset,
})

export const resetCategoryFilter = (category: string): ResetCategoryFilterAction => ({
  type: EntitiesExplorerActions.ResetCategoryFilter,
  payload: { category },
})

export const resetSectorFilter = (): ResetSectorFilterAction => ({
  type: EntitiesExplorerActions.ResetSectorFilter,
})

export const resetFilters = (): ResetFiltersAction => ({
  type: EntitiesExplorerActions.ResetFilters,
})
