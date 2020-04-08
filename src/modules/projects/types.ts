export type ProjectsState = {
  projects: any
}

export enum ProjectsActions {
  GetProjects = 'ixo/projects/GET_PROJECTS',
}

export interface GetProjectsAction {
  type: typeof ProjectsActions.GetProjects
  payload: {
    projects: any
  }
}

export type ProjectsActionTypes = GetProjectsAction
