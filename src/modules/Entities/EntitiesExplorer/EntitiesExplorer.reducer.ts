import {
  EntitiesExplorerState,
  EntitiesExplorerActions,
  EntitiesActionTypes,
} from './types'
import { EntityType } from '../types'
import { getInitialSelectedCategories } from '../Entities.utils'
import { AccountActions, AccountActionTypes } from 'modules/Account/types'

export const initialState: EntitiesExplorerState = {
  selectedEntitiesType: EntityType.Project,
  entities: null,
  entityConfig: null,
  filter: {
    dateFrom: null,
    dateTo: null,
    // ddoTags: getInitialSelectedCategories(),
    ddoTags: [],
    userEntities: false,
    featuredEntities: true,
    popularEntities: false,
    sector: null,
    query: ''
  },
}

export const reducer = (
  state = initialState,
  action: EntitiesActionTypes | AccountActionTypes,
): EntitiesExplorerState => {
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
    case EntitiesExplorerActions.GetEntitiesSuccess:
      return {
        ...state,
        entities: action.payload,
      }
    case EntitiesExplorerActions.GetEntityConfigSuccess:
      return {
        ...state,
        entityConfig: action.payload,
      }
    case EntitiesExplorerActions.ChangeEntitiesType:
      return {
        ...state,
        selectedEntitiesType: action.payload.type,
        filter: {
          ...state.filter,
          dateFrom: null,
          dateTo: null,
          ddoTags: getInitialSelectedCategories(state.entityConfig[action.payload.type]),
        },
      }
    case EntitiesExplorerActions.FilterToggleUserEntities:
      return {
        ...state,
        filter: {
          ...state.filter,
          userEntities: action.payload.userEntities,
          popularEntities: false,
          featuredEntities: false,
        },
      }
    case EntitiesExplorerActions.FilterToggleFeaturedEntities:
      return {
        ...state,
        filter: {
          ...state.filter,
          featuredEntities: action.payload.featuredEntities,
          userEntities: false,
          popularEntities: false,
        },
      }
    case EntitiesExplorerActions.FilterTogglePopularEntities:
      return {
        ...state,
        filter: {
          ...state.filter,
          popularEntities: action.payload.popularEntities,
          featuredEntities: false,
          userEntities: false,
        },
      }
    case EntitiesExplorerActions.FilterDates:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateFrom: action.payload.dateFrom,
          dateTo: action.payload.dateTo,
        },
      }
    case EntitiesExplorerActions.ResetDatesFilter:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateFrom: null,
          dateTo: null,
        },
      }
    case EntitiesExplorerActions.FilterCategoryTag:
    case EntitiesExplorerActions.FilterAddCategoryTag:
      return {
        ...state,
        filter: {
          ...state.filter,
          ddoTags: [
            ...state.filter.ddoTags.filter(
              (category) => category.name !== action.payload.category,
            ),
            {
              name: action.payload.category,
              tags: [...action.payload.tags],
            },
          ],
        },
      }
    case EntitiesExplorerActions.FilterDDOCategories:
      return {
        ...state,
        filter: {
          ...state.filter,
          ddoTags: action.payload.ddoTags,
        },
      }
    case EntitiesExplorerActions.ResetCategoryFilter:
      return {
        ...state,
        filter: {
          ...state.filter,
          ddoTags: [
            ...state.filter.ddoTags.filter(
              (category) => category.name !== action.payload.category,
            ),
            {
              name: action.payload.category,
              tags: [],
            },
          ],
        },
      }
    case EntitiesExplorerActions.ResetSectorFilter:
      return {
        ...state,
        filter: {
          ...state.filter,
          sector: '',
        },
      }
    case EntitiesExplorerActions.FilterSector:
      return {
        ...state,
        filter: {
          ...state.filter,
          sector: action.payload.sector,
        },
      }
    case EntitiesExplorerActions.ResetFilters:
      return {
        ...state,
        filter: {
          ...state.filter,
          ddoTags: getInitialSelectedCategories(state.entityConfig[state.selectedEntitiesType]),
          dateFrom: null,
          dateTo: null,
        },
      }
    case EntitiesExplorerActions.FilterQuery:
      return {
        ...state,
        filter: {
          ...state.filter,
          query: action.payload.query,
        },
      }
  }

  return state
}
