import { EntitiesExplorerState, EntitiesExplorerActions, EntitiesActionTypes } from './entitiesExplorer.types'
// import { EntityType } from 'types/entities'
import { getDefaultSelectedViewCategory, getInitialSelectedCategories, getInitialSelectedSectors } from 'utils/entities'
import { AccountActions, AccountActionTypes } from 'redux/account/account.types'

export const initialState: EntitiesExplorerState = {
  selectedEntitiesType: 'Project',
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
    query: '',
    itemOffset: 0, //  for pagination
  },
} as any

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
          itemOffset: 0,
        },
      }
    case EntitiesExplorerActions.GetEntitiesSuccess:
      return {
        ...state,
        entities: action.payload,
      }
    case EntitiesExplorerActions.GetIndividualEntity: {
      const { did } = action.payload
      return {
        ...state,
        entities: state.entities.map((entity) => (entity.did !== did ? entity : { ...entity, ...action.payload })),
      }
    }
    case EntitiesExplorerActions.GetEntityConfigSuccess: {
      const entityConfig = action.payload
      const filterView = getDefaultSelectedViewCategory(entityConfig[state.selectedEntitiesType])

      return {
        ...state,
        entityConfig,
        filter: {
          ...state.filter,
          ...filterView,
          sector: getInitialSelectedSectors(entityConfig[state.selectedEntitiesType]),
        },
      }
    }
    case EntitiesExplorerActions.ChangeEntitiesType: {
      const filterView = getDefaultSelectedViewCategory(state.entityConfig[action.payload.type])
      return {
        ...state,
        selectedEntitiesType: action.payload.type,
        filter: {
          ...state.filter,
          ...filterView,
          dateFrom: null,
          dateTo: null,
          ddoTags: getInitialSelectedCategories(state.entityConfig[action.payload.type]),
          sector: getInitialSelectedSectors(state.entityConfig[action.payload.type]),
          itemOffset: 0,
        },
      }
    }
    case EntitiesExplorerActions.FilterToggleUserEntities:
      return {
        ...state,
        filter: {
          ...state.filter,
          userEntities: action.payload.userEntities,
          popularEntities: false,
          featuredEntities: false,
          itemOffset: 0,
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
          itemOffset: 0,
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
          itemOffset: 0,
        },
      }
    case EntitiesExplorerActions.FilterDates:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateFrom: action.payload.dateFrom,
          dateTo: action.payload.dateTo,
          itemOffset: 0,
        },
      }
    case EntitiesExplorerActions.ResetDatesFilter:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateFrom: null,
          dateTo: null,
          itemOffset: 0,
        } as any,
      }
    case EntitiesExplorerActions.FilterCategoryTag:
    case EntitiesExplorerActions.FilterAddCategoryTag:
      return {
        ...state,
        filter: {
          ...state.filter,
          ddoTags: [
            ...state.filter.ddoTags.filter((category) => category.category !== action.payload.category),
            {
              category: action.payload.category,
              tags: [...action.payload.tags],
            },
          ],
          itemOffset: 0,
        },
      }
    case EntitiesExplorerActions.FilterDDOCategories:
      return {
        ...state,
        filter: {
          ...state.filter,
          ddoTags: action.payload.ddoTags,
          itemOffset: 0,
        },
      }
    case EntitiesExplorerActions.ResetCategoryFilter:
      return {
        ...state,
        filter: {
          ...state.filter,
          ddoTags: [
            ...state.filter.ddoTags.filter((category) => category.category !== action.payload.category),
            {
              category: action.payload.category,
              tags: [],
            },
          ],
          itemOffset: 0,
        },
      }
    case EntitiesExplorerActions.ResetSectorFilter:
      return {
        ...state,
        filter: {
          ...state.filter,
          sector: '',
          itemOffset: 0,
        },
      }
    case EntitiesExplorerActions.FilterSector:
      return {
        ...state,
        filter: {
          ...state.filter,
          sector: action.payload.sector,
          itemOffset: 0,
        },
      }
    case EntitiesExplorerActions.ResetFilters: {
      const filterView = getDefaultSelectedViewCategory(state.entityConfig[state.selectedEntitiesType])
      return {
        ...state,
        filter: {
          ...state.filter,
          ...filterView,
          ddoTags: getInitialSelectedCategories(state.entityConfig[state.selectedEntitiesType]),
          dateFrom: null,
          dateTo: null,
          itemOffset: 0,
        },
      }
    }
    case EntitiesExplorerActions.FilterQuery:
      return {
        ...state,
        filter: {
          ...state.filter,
          query: action.payload.query,
          itemOffset: 0,
        },
      }
    case EntitiesExplorerActions.FilterItemOffset:
      return {
        ...state,
        filter: {
          ...state.filter,
          itemOffset: action.payload,
        },
      }
  }

  return state
}
