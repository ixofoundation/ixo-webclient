import { Moment } from 'moment'
import { Dispatch } from 'redux'
import {
  FilterToggleUserEntitiesAction,
  FilterToggleFeaturedEntitiesAction,
  FilterTogglePopularEntitiesAction,
  FilterEntitiesDatesAction,
  ResetEntitiesDatesFilterAction,
  FilterEntitiesCategoryTagsAction,
  ResetEntitiesCategoryFilterAction,
  ResetEntitiesFiltersAction,
} from './types'
import { RootState } from 'src/common/redux/types'

export function filterToggleUserEntities<T extends string>(
  type: T,
  userEntities: boolean,
): FilterToggleUserEntitiesAction<T> {
  return {
    type,
    payload: {
      userEntities,
    },
  }
}

export function filterToggleFeaturedEntities<T extends string>(
  type: T,
  featuredEntities: boolean,
): FilterToggleFeaturedEntitiesAction<T> {
  return {
    type,
    payload: {
      featuredEntities,
    },
  }
}

export function filterTogglePopularEntities<T extends string>(
  type: T,
  popularEntities: boolean,
): FilterTogglePopularEntitiesAction<T> {
  return {
    type,
    payload: {
      popularEntities,
    },
  }
}

export function filterEntitiesDates<T extends string>(
  type: T,
  dateFrom: Moment,
  dateTo: Moment,
): FilterEntitiesDatesAction<T> {
  return {
    type,
    payload: {
      dateFrom,
      dateTo,
    },
  }
}

export function resetEntitiesDatesFilter<T extends string>(
  type: T,
): ResetEntitiesDatesFilterAction<T> {
  return {
    type,
    payload: {},
  }
}

export function filterEntitiesCategoryTag<T extends string>(
  type: T,
  category: string,
  tag: string,
) {
  return (
    dispatch: Dispatch,
    getState: () => RootState,
  ): FilterEntitiesCategoryTagsAction<T> => {
    const state = getState()

    const currentCategoryTags = state.projects.filter.categories.find(
      filterCategory => filterCategory.name === category,
    ).tags

    const newCategoryTags = currentCategoryTags.includes(tag)
      ? [...currentCategoryTags.filter(val => val !== tag)]
      : [...currentCategoryTags, tag]

    return dispatch({
      type,
      payload: {
        category,
        tags: newCategoryTags,
      },
    })
  }
}

export function resetEntitiesCategoryFilter<T extends string>(
  type: T,
  category: string,
): ResetEntitiesCategoryFilterAction<T> {
  return {
    type,
    payload: { category },
  }
}

export function resetEntitiesFilters<T extends string>(
  type: T,
): ResetEntitiesFiltersAction<T> {
  return {
    type,
    payload: {},
  }
}
