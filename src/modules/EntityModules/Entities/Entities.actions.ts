import { Moment } from 'moment'
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
  EntitiesActions,
  EntityType,
  FilterCategoriesAction,
  Category,
  FilterCategoryTagAction,
  FilterSectorAction,
} from './types'
import { RootState } from 'common/redux/types'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { mapApiEntityToEntity } from './Entities.utils'

export const getEntities = () => (dispatch: Dispatch): GetEntitiesAction => {
  return dispatch({
    type: EntitiesActions.GetEntities,
    payload: blocksyncApi.project.listProjects().then((response) => {
      return response
        .filter(
          (p) =>
            p.projectDid === 'did:ixo:SHd1eLeN2gg3eWnNXLSvw4' ||
            p.projectDid === 'did:ixo:7u8t5WsgBrbRo9USKo7Hhe', // TEMP until new entities are live
        )
        .map((apiEntity) => mapApiEntityToEntity(apiEntity))
    }),
  })
}

export const changeEntitiesType = (
  entityType: EntityType,
): ChangeEntitiesTypeAction => ({
  type: EntitiesActions.ChangeEntitiesType,
  payload: {
    entityType,
  },
})

export const filterToggleUserEntities = (
  userEntities: boolean,
): FilterToggleUserEntitiesAction => ({
  type: EntitiesActions.FilterToggleUserEntities,
  payload: {
    userEntities,
  },
})

export const filterToggleFeaturedEntities = (
  featuredEntities: boolean,
): FilterToggleFeaturedEntitiesAction => ({
  type: EntitiesActions.FilterToggleFeaturedEntities,
  payload: {
    featuredEntities,
  },
})

export const filterTogglePopularEntities = (
  popularEntities: boolean,
): FilterTogglePopularEntitiesAction => ({
  type: EntitiesActions.FilterTogglePopularEntities,
  payload: {
    popularEntities,
  },
})

export const filterDates = (
  dateFrom: Moment,
  dateTo: Moment,
): FilterDatesAction => ({
  type: EntitiesActions.FilterDates,
  payload: {
    dateFrom,
    dateTo,
  },
})

export const resetDatesFilter = (): ResetDatesFilterAction => ({
  type: EntitiesActions.ResetDatesFilter,
})

export const filterCategoryTag = (category: string, tag: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
): FilterCategoryTagAction => {
  const state = getState()

  const isCurrentlySelected = state.entities.filter.categories.find(
    (filterCategory) =>
      filterCategory.name === category && filterCategory.tags.includes(tag),
  )

  return dispatch({
    type: EntitiesActions.FilterCategoryTag,
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

  const currentCategoryTags = state.entities.filter.categories.find(
    (filterCategory) => filterCategory.name === category,
  ).tags

  const newCategoryTags = currentCategoryTags.includes(tag)
    ? [...currentCategoryTags.filter((val) => val !== tag)]
    : [...currentCategoryTags, tag]

  return dispatch({
    type: EntitiesActions.FilterAddCategoryTag,
    payload: {
      category,
      tags: newCategoryTags,
    },
  })
}

export const filterCategories = (
  categories: Category[],
): FilterCategoriesAction => ({
  type: EntitiesActions.FilterCategories,
  payload: { categories },
})
export const filterSector = (sector: string): FilterSectorAction => ({
  type: EntitiesActions.FilterSector,
  payload: { sector },
})

export const resetCategoryFilter = (
  category: string,
): ResetCategoryFilterAction => ({
  type: EntitiesActions.ResetCategoryFilter,
  payload: { category },
})

export const resetSectorFilter = (): ResetSectorFilterAction => ({
  type: EntitiesActions.ResetSectorFilter,
})

export const resetFilters = (): ResetFiltersAction => ({
  type: EntitiesActions.ResetFilters,
})
