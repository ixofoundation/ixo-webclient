export interface ProjectsState {
  projects: any
}

export enum ProjectsActions {
  GetProjects = 'ixo/Projects/GET_PROJECTS',
  GetProjectsSuccess = 'ixo/Projects/GET_PROJECTS_FULFILLED',
  GetProjectsPending = 'ixo/Projects/GET_PROJECTS_PENDING',
  GetProjectsFailure = 'ixo/Projects/GET_PROJECTS_REJECTED',
}

export interface GetProjectsAction {
  type: typeof ProjectsActions.GetProjects
  payload: Promise<any>
}

export interface GetProjectsSuccessAction {
  type: typeof ProjectsActions.GetProjectsSuccess
  payload: {
    projects: any
  }
}

export type ProjectsActionTypes = GetProjectsAction | GetProjectsSuccessAction
