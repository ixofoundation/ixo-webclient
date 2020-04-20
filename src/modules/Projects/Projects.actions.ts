import { Dispatch } from 'redux'
import { ProjectsActions, GetProjectsAction } from './types'
import blocksyncApi from '../../common/api/blocksync-api/blocksync-api'

export const getProjects = () => (dispatch: Dispatch): GetProjectsAction => {
  return dispatch({
    type: ProjectsActions.GetProjects,
    payload: blocksyncApi.project.listProjects().then(response => {
      return response.map(project => ({
        projectDid: project.projectDid,
        userDid: project.data.createdBy,
        status: project.status,
        title: project.data.title,
        shortDescription: project.data.shortDescription,
        longDescription: project.data.longDescription,
        dateCreated: project.data.createdOn,
        ownerName: project.data.ownerName,
        country: project.data.projectLocation,
        impactAction: project.data.impactAction,
        imageUrl: `${project.data.serviceEndpoint}public/${project.data.imageLink}`,
        serviceProvidersCount: project.data.agentStats.serviceProviders,
        evaluatorsCount: project.data.agentStats.evaluators,
        requiredClaimsCount: project.data.requiredClaims,
        pendingClaimsCount: [project.data.claims].filter(
          claim => claim.status === '0',
        ).length, // due to pendingClaims not existing in the claimStats we have to look in the claims itself!
        successfulClaimsCount: project.data.claimStats.currentSuccessful,
        rejectedClaimsCount: project.data.claimStats.currentRejected,
        agentDids: project.data.agents.map(agent => agent.did),
        sdgs: project.data.sdgs,
        data: project.data, // TEMP until project module not getting data from projects
      }))
    }),
  })
}
