import { Moment } from 'moment'
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
} from './types'
import { RootState } from 'common/redux/types'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { mapApiEntityToEntity } from '../Entities.utils'

export const getEntities = () => (dispatch: Dispatch): GetEntitiesAction => {
  return dispatch({
    type: EntitiesExplorerActions.GetEntities,
    payload: blocksyncApi.project.listProjects().then((response) => {
      return response.map((apiEntity) => mapApiEntityToEntity(apiEntity))
    }),
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
