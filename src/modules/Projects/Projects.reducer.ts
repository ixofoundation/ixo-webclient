import { ProjectsState, ProjectsActionTypes, ProjectsActions } from './types'

export const initialState: ProjectsState = {
  projects: null,
}

export const reducer = (
  state = initialState,
  action: ProjectsActionTypes,
): ProjectsState => {
  switch (action.type) {
    case ProjectsActions.GetProjectsSuccess:
      return {
        ...state,
        projects: action.payload.projects,
      }
  }

  return state
}
