import {
  EntitiesState,
  EntitiesActions,
  EntitiesActionTypes,
  EntityType,
} from './types'
import { getInitialSelectedCategories } from './Entities.utils'
import { AccountActions, AccountActionTypes } from 'modules/Account/types'

export const initialState: EntitiesState = {
  selectedEntitiesType: EntityType.Project,
  entities: null,
  filter: {
    dateFrom: null,
    dateTo: null,
    categories: getInitialSelectedCategories(),
    userEntities: false,
    featuredEntities: true,
    popularEntities: false,
    sector: null,
  },
}

export const reducer = (
  state = initialState,
  action: EntitiesActionTypes | AccountActionTypes,
): EntitiesState => {
  switch (action.type) {
    case AccountActions.Login:
      return {
        ...state,
        filter: {
          ...state.filter,
          userEntities: true,
          popularEntities: false,
          featuredEntities: false,
        },
      }
    case EntitiesActions.GetEntitiesSuccess:
      return {
        ...state,
        entities: action.payload,
      }
    case EntitiesActions.ChangeEntitiesType:
      return {
        ...state,
        selectedEntitiesType: action.payload.entityType,
        filter: {
          ...state.filter,
          dateFrom: null,
          dateTo: null,
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
    case EntitiesActions.FilterAddCategoryTag:
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
    case EntitiesActions.FilterCategories:
      return {
        ...state,
        filter: {
          ...state.filter,
          categories: action.payload.categories,
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
    case EntitiesActions.ResetSectorFilter:
      return {
        ...state,
        filter: {
          ...state.filter,
          sector: '',
        },
      }
    case EntitiesActions.FilterSector:
      return {
        ...state,
        filter: {
          ...state.filter,
          sector: action.payload.sector,
        },
      }
    case EntitiesActions.ResetFilters:
      return {
        ...state,
        filter: {
          ...state.filter,
          categories: getInitialSelectedCategories(state.selectedEntitiesType),
          dateFrom: null,
          dateTo: null,
        },
      }
  }

  return state
}
