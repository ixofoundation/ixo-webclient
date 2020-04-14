import { Dispatch } from 'redux'
import { ProjectsActions, GetProjectsAction } from './types'
import blocksyncApi from '../../common/api/blocksync-api/blocksync-api'

export const getProjects = () => (dispatch: Dispatch): GetProjectsAction => {
  return dispatch({
    type: ProjectsActions.GetProjects,
    payload: blocksyncApi.project.listProjects().then(response => ({
      projects: response,
    })),
  })
}
