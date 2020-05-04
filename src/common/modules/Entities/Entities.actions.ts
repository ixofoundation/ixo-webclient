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

export function filterToggleUserEntities<TAction extends string>(
  type: TAction,
  userEntities: boolean,
): FilterToggleUserEntitiesAction<TAction> {
  return {
    type,
    payload: {
      userEntities,
    },
  }
}

export function filterToggleFeaturedEntities<TAction extends string>(
  type: TAction,
  featuredEntities: boolean,
): FilterToggleFeaturedEntitiesAction<TAction> {
  return {
    type,
    payload: {
      featuredEntities,
    },
  }
}

export function filterTogglePopularEntities<TAction extends string>(
  type: TAction,
  popularEntities: boolean,
): FilterTogglePopularEntitiesAction<TAction> {
  return {
    type,
    payload: {
      popularEntities,
    },
  }
}

export function filterEntitiesDates<TAction extends string>(
  type: TAction,
  dateFrom: Moment,
  dateTo: Moment,
): FilterEntitiesDatesAction<TAction> {
  return {
    type,
    payload: {
      dateFrom,
      dateTo,
    },
  }
}

export function resetEntitiesDatesFilter<TAction extends string>(
  type: TAction,
): ResetEntitiesDatesFilterAction<TAction> {
  return {
    type,
    payload: {},
  }
}

export function filterEntitiesCategoryTag<TAction extends string>(
  type: TAction,
  category: string,
  tag: string,
) {
  return (
    dispatch: Dispatch,
    getState: () => RootState,
  ): FilterEntitiesCategoryTagsAction<TAction> => {
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

export function resetEntitiesCategoryFilter<TAction extends string>(
  type: TAction,
  category: string,
): ResetEntitiesCategoryFilterAction<TAction> {
  return {
    type,
    payload: { category },
  }
}

export function resetEntitiesFilters<TAction extends string>(
  type: TAction,
): ResetEntitiesFiltersAction<TAction> {
  return {
    type,
    payload: {},
  }
}
