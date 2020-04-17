import { createSelector } from 'reselect'
import { RootState } from '../../common/redux/types'
import { ProjectsState } from './types'
import { Project } from './types'

export const selectProjectsState = (state: RootState): ProjectsState =>
  state.projects

export const selectAllProjects = createSelector(
  selectProjectsState,
  (projects: ProjectsState): Project[] => {
    return projects.projects
  },
)

export const selectedFilteredProjects = createSelector(
  selectAllProjects,
  (projects: Project[]): Project[] => {
    return projects && projects.length
      ? projects.sort((a, b) => {
          return (
            new Date(b.dateCreated).getTime() -
            new Date(a.dateCreated).getTime()
          )
        })
      : []
  },
)

export const selectProjectCountries = createSelector(
  selectAllProjects,
  (projects: Project[]): string[] => {
    return projects && projects.length
      ? projects.map(project => {
          return project.country
        })
      : []
  },
)

export const selectTotalServiceProvidersCount = createSelector(
  selectAllProjects,
  (projects: Project[]): number => {
    return !projects
      ? 0
      : projects.reduce((total, project) => {
          return total + project.serviceProvidersCount
        }, 0)
  },
)

export const selectTotalEvaluatorsCount = createSelector(
  selectAllProjects,
  (projects: Project[]): number => {
    return !projects
      ? 0
      : projects.reduce((total, project) => {
          return total + project.evaluatorsCount
        }, 0)
  },
)

export const selectTotalRequiredClaimsCount = createSelector(
  selectAllProjects,
  (projects: Project[]): number => {
    return !projects
      ? 0
      : projects.reduce((total, project) => {
          return total + project.requiredClaimsCount
        }, 0)
  },
)

export const selectTotalSuccessfulClaimsCount = createSelector(
  selectAllProjects,
  (projects: Project[]): number => {
    return !projects
      ? 0
      : projects.reduce((total, project) => {
          return total + project.successfulClaimsCount
        }, 0)
  },
)

/* export const selectTotalPendingClaimsCount = createSelector(
  selectAllProjects,
  (projects: Project[]): number => {
    return !projects
      ? 0
      : projects.reduce((total, project) => {
          return total + project.pendingClaimsCount
        }, 0)
  },
) */

export const selectTotalRejectedClaimsCount = createSelector(
  selectAllProjects,
  (projects: Project[]): number => {
    return !projects
      ? 0
      : projects.reduce((total, project) => {
          return total + project.rejectedClaimsCount
        }, 0)
  },
)

export const selectTotalRemainingClaimsCount = createSelector(
  selectTotalRequiredClaimsCount,
  selectTotalSuccessfulClaimsCount,
  (totalClaimsRequired: number, totalClaimsSuccessful: number): number =>
    totalClaimsRequired - totalClaimsSuccessful,
)
