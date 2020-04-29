import { ProjectsState, ProjectsActionTypes, ProjectsActions } from './types'
import filterSchema from './components/ProjectsFilter/ProjectsFilter.schema.json'

export const initialState: ProjectsState = {
  projects: null,
  filter: {
    dateFrom: null,
    dateTo: null,
    categories: filterSchema.ddoTags.map(ddoCategory => ({
      name: ddoCategory.name,
      tags:
        ddoCategory.selectedTags && ddoCategory.selectedTags.length
          ? [...ddoCategory.selectedTags]
          : [],
    })),
    userEntities: true,
    featuredEntities: false,
    popularEntities: false,
  },
}

export const reducer = (
  state = initialState,
  action: ProjectsActionTypes,
): ProjectsState => {
  switch (action.type) {
    case ProjectsActions.GetProjectsSuccess:
      return {
        ...state,
        projects: action.payload,
      }
    case ProjectsActions.FilterToggleUserProjects:
      return {
        ...state,
        filter: {
          ...state.filter,
          userEntities: action.payload.userEntities,
          popularEntities: false,
          featuredEntities: false,
        },
      }
    case ProjectsActions.FilterToggleFeaturedProjects:
      return {
        ...state,
        filter: {
          ...state.filter,
          featuredEntities: action.payload.featuredEntities,
          userEntities: false,
          popularEntities: false,
        },
      }
    case ProjectsActions.FilterTogglePopularProjects:
      return {
        ...state,
        filter: {
          ...state.filter,
          popularEntities: action.payload.popularEntities,
          featuredEntities: false,
          userEntities: false,
        },
      }
    case ProjectsActions.FilterDates:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateFrom: action.payload.dateFrom,
          dateTo: action.payload.dateTo,
        },
      }
    case ProjectsActions.ResetDatesFilter:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateFrom: null,
          dateTo: null,
        },
      }
    case ProjectsActions.FilterCategoryTag:
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
    case ProjectsActions.ResetCategoryFilter:
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
    case ProjectsActions.ResetFilters:
      return {
        ...state,
        filter: {
          ...initialState.filter,
        },
      }
  }

  return state
}
