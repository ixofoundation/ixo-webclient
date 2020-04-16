import { createSelector } from 'reselect'
import { RootState } from '../../common/redux/types'
import { ProjectsState } from './types'
import { Project } from '../project/types'

export const selectProjects = (state: RootState): ProjectsState =>
  state.projects

export const selectAllProjects = createSelector(
  selectProjects,
  (projects: ProjectsState): Project[] => {
    return projects.projects
  },
)
export const selectDateSortedProjects = createSelector(
  selectProjects,
  (projects: ProjectsState): Project[] => {
    return projects.projects && projects.projects.length
      ? projects.projects.sort((a, b) => {
          return (
            new Date(b.data.createdOn).getTime() -
            new Date(a.data.createdOn).getTime()
          )
        })
      : []
  },
)

export const selectProjectCountries = createSelector(
  selectProjects,
  (projects: ProjectsState): string[] => {
    return projects.projects && projects.projects.length
      ? projects.projects.map(project => {
          return project.data.projectLocation
        })
      : []
  },
)

export const selectClaimsAgents = createSelector(
  selectProjects,
  (projects: ProjectsState): any => {
    return !projects.projects
      ? []
      : {
          serviceProviders: projects.projects.reduce(
            (totalServiceProviders, project) => {
              return (
                totalServiceProviders + project.data.agentStats.serviceProviders
              )
            },
            0,
          ),
          evaluators: projects.projects.reduce((totalEvaluators, project) => {
            return totalEvaluators + project.data.agentStats.evaluators
          }, 0),
        }
  },
)

export const selectClaims = createSelector(
  selectProjects,
  (projects: ProjectsState): any => {
    return !projects.projects
      ? []
      : projects.projects.map(project => {
          return project.data.claims.filter(claim => {
            return claim
          })
        })
  },
)

export const selectTotalClaimsRequired = createSelector(
  selectProjects,
  (projects: ProjectsState): number => {
    return !projects.projects
      ? []
      : projects.projects.reduce((total, project) => {
          return total + project.data.requiredClaims
        }, 0)
  },
)
