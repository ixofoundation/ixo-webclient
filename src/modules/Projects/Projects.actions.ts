import moment, { Moment } from 'moment'
import { Dispatch } from 'redux'
import {
  ProjectsActions,
  GetProjectsAction,
  FilterToggleUserProjectsAction,
  FilterDatesAction,
  ResetDatesFilterAction,
  FilterCategoryTagsAction,
  ResetCategoryFilterAction,
  ResetFiltersAction,
} from './types'
import blocksyncApi from '../../common/api/blocksync-api/blocksync-api'
import { RootState } from 'src/common/redux/types'

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
    }),
  })
}

export const filterToggleUserProjects = (
  userProjectsOnly: boolean,
): FilterToggleUserProjectsAction => ({
  type: ProjectsActions.FilterToggleUserProjects,
  payload: {
    userProjectsOnly,
  },
})

export const filterDates = (
  dateFrom: Moment,
  dateTo: Moment,
): FilterDatesAction => ({
  type: ProjectsActions.FilterDates,
  payload: {
    dateFrom,
    dateTo,
  },
})

export const resetDatesFilter = (): ResetDatesFilterAction => ({
  type: ProjectsActions.ResetDatesFilter,
})

export const filterCategoryTag = (category: string, tag: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
): FilterCategoryTagsAction => {
  const state = getState()

  const currentCategoryTags = state.projects.filter.categories.find(
    filterCategory => filterCategory.name === category,
  ).tags

  const newCategoryTags = currentCategoryTags.includes(tag)
    ? [...currentCategoryTags.filter(val => val !== tag)]
    : [...currentCategoryTags, tag]

  return dispatch({
    type: ProjectsActions.FilterCategoryTag,
    payload: {
      category,
      tags: newCategoryTags,
    },
  })
}

export const resetCategoryFilter = (
  category: string,
): ResetCategoryFilterAction => ({
  type: ProjectsActions.ResetCategoryFilter,
  payload: { category },
})

export const resetFilters = (): ResetFiltersAction => ({
  type: ProjectsActions.ResetFilters,
})
