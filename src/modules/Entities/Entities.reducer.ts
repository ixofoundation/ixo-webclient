import {
  EntitiesState,
  EntitiesActions,
  EntitiesActionTypes,
  EntityType,
} from './types'
import { getInitialSelectedCategories } from './Entities.utils'

export const initialState: EntitiesState = {
  entityType: EntityType.Projects,
  entities: null,
  filter: {
    dateFrom: null,
    dateTo: null,
    categories: getInitialSelectedCategories(),
    userEntities: true,
    featuredEntities: false,
    popularEntities: false,
  },
}

export const reducer = (
  state = initialState,
  action: EntitiesActionTypes,
): EntitiesState => {
  switch (action.type) {
    case EntitiesActions.GetEntitiesSuccess:
      return {
        ...state,
        entities: action.payload,
      }
    case EntitiesActions.ChangeEntityType:
      return {
        ...state,
        entityType: action.payload.entityType,
        filter: {
          dateFrom: null,
          dateTo: null,
          userEntities: true,
          featuredEntities: false,
          popularEntities: false,
          categories: getInitialSelectedCategories(action.payload.entityType),
        },
      }
    case EntitiesActions.FilterToggleUserEntities:
      return {
        ...state,
        filter: {
          ...state.filter,
          userEntities: action.payload.userEntities,
          popularEntities: false,
          featuredEntities: false,
        },
      }
    case EntitiesActions.FilterToggleFeaturedEntities:
      return {
        ...state,
        filter: {
          ...state.filter,
          featuredEntities: action.payload.featuredEntities,
          userEntities: false,
          popularEntities: false,
        },
      }
    case EntitiesActions.FilterTogglePopularEntities:
      return {
        ...state,
        filter: {
          ...state.filter,
          popularEntities: action.payload.popularEntities,
          featuredEntities: false,
          userEntities: false,
        },
      }
    case EntitiesActions.FilterDates:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateFrom: action.payload.dateFrom,
          dateTo: action.payload.dateTo,
        },
      }
    case EntitiesActions.ResetDatesFilter:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateFrom: null,
          dateTo: null,
        },
      }
    case EntitiesActions.FilterCategoryTag:
      return {
        ...state,
        filter: {
          ...state.filter,
          categories: [
            ...state.filter.categories.filter(
              category => category.name !== action.payload.category,
            ),
            {
              name: action.payload.category,
              tags: [...action.payload.tags],
            },
          ],
        },
      }
    case EntitiesActions.ResetCategoryFilter:
      return {
        ...state,
        filter: {
          ...state.filter,
          categories: [
            ...state.filter.categories.filter(
              category => category.name !== action.payload.category,
            ),
            {
              name: action.payload.category,
              tags: [],
            },
          ],
        },
      }
    case EntitiesActions.ResetFilters:
      return {
        ...state,
        filter: {
          categories: getInitialSelectedCategories(state.entityType),
          dateFrom: null,
          dateTo: null,
          userEntities: true,
          featuredEntities: false,
          popularEntities: false,
        },
      }
  }

  return state
}
