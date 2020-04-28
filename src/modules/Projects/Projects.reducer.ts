import { ProjectsState, ProjectsActionTypes, ProjectsActions } from './types'
import filterSchema from './components/ProjectsFilter/ProjectsFilter.schema.json'

// TODO when tags are all sorted and returning from api
// set the tags property of the categories to below
/* 
schemaCategory.selectedTags && schemaCategory.selectedTags.length
          ? [...schemaCategory.selectedTags]
          : [], 
*/

export const initialState: ProjectsState = {
  projects: null,
  filter: {
    dateFrom: null,
    dateTo: null,
    categories: filterSchema.ddoTags.map(ddoCategory => ({
      name: ddoCategory.name,
      tags: [],
    })),
    userProjects: true,
    featuredProjects: false,
    popularProjects: false,
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
          userProjects: action.payload.userProjects,
          popularProjects: false,
          featuredProjects: false,
        },
      }
    case ProjectsActions.FilterToggleFeaturedProjects:
      return {
        ...state,
        filter: {
          ...state.filter,
          featuredProjects: action.payload.featuredProjects,
          userProjects: false,
          popularProjects: false,
        },
      }
    case ProjectsActions.FilterTogglePopularProjects:
      return {
        ...state,
        filter: {
          ...state.filter,
          popularProjects: action.payload.popularProjects,
          featuredProjects: false,
          userProjects: false,
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
