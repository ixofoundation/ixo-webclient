import { ProjectsState, ProjectsActionTypes, ProjectsActions } from './types'
import { schema } from '../Projects/components/ProjectsFilter/schema'

/*
initialCategorySelections = this.props.schema.categories.map(category => ({
    category: category.name,
    tags:
      category.selectedTags && category.selectedTags.length
        ? [...category.selectedTags]
        : [],
  })) */

export const initialState: ProjectsState = {
  projects: null,
  filter: {
    dateFrom: null,
    dateTo: null,
    categories: schema.categories.map(category => ({
      name: category.name,
      tags:
        category.selectedTags && category.selectedTags.length
          ? [...category.selectedTags]
          : [],
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
          categories: [],
          dateFrom: null,
          dateTo: null,
          userProjectsOnly: false,
        },
      }
  }

  return state
}
