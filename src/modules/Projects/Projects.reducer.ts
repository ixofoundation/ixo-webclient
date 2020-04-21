import { ProjectsState, ProjectsActionTypes, ProjectsActions } from './types'
import { getFilterSchema } from '../../instance-settings'

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
    categories: getFilterSchema().categories.map(schemaCategory => ({
      name: schemaCategory.name,
      tags: [],
    })),
    userProjectsOnly: false,
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
          userProjectsOnly: action.payload.userProjectsOnly,
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
