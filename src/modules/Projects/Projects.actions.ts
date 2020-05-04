import moment, { Moment } from 'moment'
import { Dispatch } from 'redux'
import {
  filterEntitiesCategoryTag,
  filterEntitiesDates,
  filterToggleFeaturedEntities,
  filterTogglePopularEntities,
  filterToggleUserEntities,
  resetEntitiesCategoryFilter,
  resetEntitiesDatesFilter,
  resetEntitiesFilters,
} from '../../common/modules/Entities/Entities.actions'
import {
  ProjectsActions,
  GetProjectsAction,
  FilterToggleUserProjectsAction,
  FilterToggleFeaturedProjectsAction,
  FilterTogglePopularProjectsAction,
  FilterProjectsDatesAction,
  ResetProjectsDatesFilterAction,
  FilterProjectsCategoryTagsAction,
  ResetProjectsCategoryFilterAction,
  ResetProjectsFiltersAction,
} from './types'
import blocksyncApi from '../../common/api/blocksync-api/blocksync-api'
import { RootState } from 'src/common/redux/types'

export const getProjects = () => (dispatch: Dispatch): GetProjectsAction => {
  return dispatch({
    type: ProjectsActions.GetProjects,
    payload: blocksyncApi.project.listProjects().then(response => {
      return (
        response
          // .filter(node => node.data.entityType === 'project') // TODO once we have the projects setup with entityType!
          .map(project => ({
            did: project.projectDid,
            userDid: project.data.createdBy,
            status: project.status,
            title: project.data.title,
            shortDescription: project.data.shortDescription,
            longDescription: project.data.longDescription,
            dateCreated: moment(project.data.createdOn),
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
            categories: project.data.ddoTags
              ? project.data.ddoTags.map(ddoTag => ({
                  name: ddoTag.category,
                  tags: ddoTag.tags,
                }))
              : [],
            data: project.data, // TEMP until project module not getting data from projects
          }))
      )
    }),
  })
}

export const filterToggleUserProjects = (
  userProjects: boolean,
): FilterToggleUserProjectsAction =>
  filterToggleUserEntities(
    ProjectsActions.FilterToggleUserProjects,
    userProjects,
  )

export const filterToggleFeaturedProjects = (
  featuredProjects: boolean,
): FilterToggleFeaturedProjectsAction =>
  filterToggleFeaturedEntities(
    ProjectsActions.FilterToggleFeaturedProjects,
    featuredProjects,
  )

export const filterTogglePopularProjects = (
  popularProjects: boolean,
): FilterTogglePopularProjectsAction =>
  filterTogglePopularEntities(
    ProjectsActions.FilterTogglePopularProjects,
    popularProjects,
  )

export const filterProjectDates = (
  dateFrom: Moment,
  dateTo: Moment,
): FilterProjectsDatesAction =>
  filterEntitiesDates(ProjectsActions.FilterDates, dateFrom, dateTo)

export const resetProjectsDatesFilter = (): ResetProjectsDatesFilterAction =>
  resetEntitiesDatesFilter(ProjectsActions.ResetDatesFilter)

export const filterProjectsCategoryTag = (category: string, tag: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
): FilterProjectsCategoryTagsAction =>
  filterEntitiesCategoryTag(
    ProjectsActions.FilterCategoryTag,
    category,
    tag,
  )(dispatch, getState)

export const resetProjectsCategoryFilter = (
  category: string,
): ResetProjectsCategoryFilterAction =>
  resetEntitiesCategoryFilter(ProjectsActions.ResetCategoryFilter, category)

export const resetProjectsFilters = (): ResetProjectsFiltersAction =>
  resetEntitiesFilters(ProjectsActions.ResetFilters)
