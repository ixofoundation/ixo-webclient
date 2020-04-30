import { EntitiesState, EntitiesActions } from './types'

export function reducer<TEntity>(
  initialState: EntitiesState<TEntity>,
  entityKey: string,
): any {
  return (state = initialState, action: any): EntitiesState<TEntity> => {
    switch (action.type) {
      case `${entityKey}${EntitiesActions.GetEntitiesSuccess}`:
        return {
          ...state,
          entities: action.payload,
        }
      case `${entityKey}${EntitiesActions.FilterToggleUserEntities}`:
        return {
          ...state,
          filter: {
            ...state.filter,
            userEntities: action.payload.userEntities,
            popularEntities: false,
            featuredEntities: false,
          },
        }
      case `${entityKey}${EntitiesActions.FilterToggleFeaturedEntities}`:
        return {
          ...state,
          filter: {
            ...state.filter,
            featuredEntities: action.payload.featuredEntities,
            userEntities: false,
            popularEntities: false,
          },
        }
      case `${entityKey}${EntitiesActions.FilterTogglePopularEntities}`:
        return {
          ...state,
          filter: {
            ...state.filter,
            popularEntities: action.payload.popularEntities,
            featuredEntities: false,
            userEntities: false,
          },
        }
      case `${entityKey}${EntitiesActions.FilterDates}`:
        return {
          ...state,
          filter: {
            ...state.filter,
            dateFrom: action.payload.dateFrom,
            dateTo: action.payload.dateTo,
          },
        }
      case `${entityKey}${EntitiesActions.ResetDatesFilter}`:
        return {
          ...state,
          filter: {
            ...state.filter,
            dateFrom: null,
            dateTo: null,
          },
        }
      case `${entityKey}${EntitiesActions.FilterCategoryTag}`:
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
      case `${entityKey}${EntitiesActions.ResetCategoryFilter}`:
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
      case `${entityKey}${EntitiesActions.ResetFilters}`:
        return {
          ...state,
          filter: {
            ...initialState.filter,
          },
        }
    }

    return state
  }
}
