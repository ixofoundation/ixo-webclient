import { ProjectsActions, GetProjectsAction } from './types'
import blocksyncApi from '../../common/api/blocksync-api/blocksync-api'

export const getProjects = (projects): GetProjectsAction => ({
  type: ProjectsActions.GetProjects,
  payload: {
    projects,
  },
})

export const fetchProjects = () => {
  return (dispatch): void => {
    blocksyncApi.project
      .listProjects()
      .then((response: any) => response)
      .then(projects => dispatch(getProjects(projects)))
  }
}
