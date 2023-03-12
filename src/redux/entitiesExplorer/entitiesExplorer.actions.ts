import moment, { Moment } from 'moment'
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
  DDOTagCategory,
  FilterCategoryTagAction,
  FilterSectorAction,
  FilterQueryAction,
  GetEntityConfigAction,
  FilterItemOffsetAction,
} from './entitiesExplorer.types'
import { RootState } from 'redux/store'
import blocksyncApi from 'api/blocksync/blocksync'
import { SchemaGitUrl } from 'constants/chains'
import { ApiListedEntity } from 'api/blocksync/types/entities'
import Axios from 'axios'
import { getHeadlineClaimInfo } from 'utils/claims'
import { EntityList, GetEntityIidDocument } from 'lib/protocol'
import { toTitleCase } from 'utils/formatters'
import { extractLinkedResource } from 'utils/entities'
import { IidDocument } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { fromTimestamp } from 'utils/conversions'

export const getEntities =
  () =>
  (dispatch: Dispatch): GetEntitiesAction => {
    return dispatch({
      type: EntitiesExplorerActions.GetEntities,
      // Temp
      payload: blocksyncApi.project
        .listProjects()
        .then((apiEntities: any[]) => {
          return apiEntities
            .map((apiEntity: any) => ({
              ...apiEntity,
              data: JSON.parse(apiEntity.data),
            }))
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

export const getEntities1 =
  () =>
  (dispatch: Dispatch): GetEntitiesAction => {
    return dispatch({
      type: EntitiesExplorerActions.GetEntities,
      payload: EntityList({}).then(({ entities }) => {
        return entities.map((entity) => {
          const { id, type, status, startDate, endDate, relayerNode, metadata } = entity

          GetEntityIidDocument({ id })
            .then((iidDocument: IidDocument) => {
              const { linkedResource } = iidDocument
              console.log({ linkedResource })
              extractLinkedResource(linkedResource).then((extractedResources) => {
                console.log({ id, linkedResource, extractedResources })
                extractedResources.forEach((extractedResources) => {
                  const key = Object.keys(extractedResources)[0]
                  const payload: any = { did: id }
                  console.log({ key })
                  switch (key) {
                    case 'profile': {
                      const { name, description, location, image, logo } = extractedResources[key]
                      payload.name = name
                      payload.description = description
                      payload.image = image
                      payload.logo = logo
                      payload.location = location
                      break
                    }
                    case 'creator': {
                      const { displayName, id, logo } = extractedResources[key]
                      payload.creatorDid = id
                      payload.creatorName = displayName
                      payload.creatorLogo = logo
                      break
                    }
                    case 'ddoTags': {
                      const ddoTags = extractedResources[key]
                      payload.ddoTags = ddoTags
                      break
                    }
                    default:
                      break
                  }
                  dispatch({
                    type: EntitiesExplorerActions.GetIndividualEntity,
                    payload,
                  })
                })
              })
            })
            .catch(console.error)

          return {
            did: id,
            type: toTitleCase(type),
            status,
            startDate,
            endDate,
            relayerNode,
            ddoTags: [],
            version: metadata?.versionId,
            dateCreated: metadata?.created ? moment(fromTimestamp(metadata?.created)) : undefined,
          }
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

export const filterDates = (dateFrom: Moment, dateTo: Moment): FilterDatesAction => ({
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
      (filterCategory) => filterCategory.name === category && filterCategory.tags.includes(tag),
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

    const currentCategoryTags = state.entities.filter.ddoTags.find(
      (filterCategory) => filterCategory.name === category,
    )!.tags

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

export const filterCategories = (categories: DDOTagCategory[]): FilterDDOCategoriesAction => ({
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
