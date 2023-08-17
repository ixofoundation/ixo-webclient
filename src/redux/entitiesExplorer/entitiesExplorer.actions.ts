import { Dispatch } from 'redux'
import {
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
  GetEntitiesAction,
  UpdateEntityByIdAction,
  GetCollectionsAction,
} from './entitiesExplorer.types'
import { RootState } from 'redux/store'
import { SchemaGitUrl } from 'constants/chains'
import Axios from 'axios'
import { TEntityDDOTagModel } from 'types/entities'
import { BlockSyncService } from 'services/blocksync'
import { apiEntityToEntity } from 'utils/entities'

const bsService = new BlockSyncService()

const filterCondition = (entity: any) =>
  (entity.relayerNode === process.env.REACT_APP_RELAYER_NODE || entity.id === process.env.REACT_APP_RELAYER_NODE) &&
  // entity.entityVerified === true &&
  !entity.type.includes('asset')

export const getAllEntities =
  () =>
  (dispatch: Dispatch, getState: () => RootState): GetEntitiesAction => {
    const {
      entities: { entities },
      account: { cwClient },
    } = getState()
    return dispatch({
      type: EntitiesExplorerActions.GetEntities,
      payload: bsService.entity.getAllEntities().then((apiEntities: any[]) => {
        return apiEntities.filter(filterCondition).map((entity) => {
          const { id } = entity
          apiEntityToEntity({ entity, cwClient }, (key, value, merge = false) => {
            dispatch({
              type: EntitiesExplorerActions.GetIndividualEntity,
              payload: { id, key, data: value, merge },
            })
          })
          return { ...(entities && entities[id] ? entities[id] : {}), ...entity }
        })
      }),
    })
  }

export const getCollectionsAction =
  () =>
  (dispatch: Dispatch): GetCollectionsAction => {
    return dispatch({
      type: EntitiesExplorerActions.GetCollections,
      payload: bsService.entity.getCollections().then((apiCollections: any[]) => {
        return apiCollections
      }),
    })
  }

export const updateEntityById =
  (entityId: string) =>
  (dispatch: Dispatch, getState: () => RootState): UpdateEntityByIdAction => {
    const {
      account: { cwClient },
    } = getState()
    return dispatch({
      type: EntitiesExplorerActions.UpdateEntityById,
      payload: bsService.entity.getEntityById(entityId).then((entity: any) => {
        if (filterCondition(entity)) {
          const { id } = entity
          apiEntityToEntity({ entity, cwClient }, (key, value, merge = false) => {
            dispatch({
              type: EntitiesExplorerActions.GetIndividualEntity,
              payload: { id, key, data: value, merge },
            })
          })
          return entity
        }
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
