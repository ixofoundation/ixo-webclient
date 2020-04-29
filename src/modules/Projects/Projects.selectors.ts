import { Moment } from 'moment'
import { createSelector } from 'reselect'
import { RootState } from '../../common/redux/types'
import { ProjectsState } from './types'
import { Project, Filter, Category } from './types'
import * as accountSelectors from '../Account/Account.selectors'

const formatDate = (date: Moment): string => date.format("D MMM \\'YY")

export const selectProjectsState = (state: RootState): ProjectsState =>
  state.projects

export const selectAllProjects = createSelector(
  selectProjectsState,
  (projects: ProjectsState): Project[] => {
    return projects.projects
  },
)

export const selectProjectsFilter = createSelector(
  selectProjectsState,
  (projects: ProjectsState): Filter => {
    return projects.filter
  },
)

export const selectedFilteredProjects = createSelector(
  selectAllProjects,
  selectProjectsFilter,
  accountSelectors.selectUserDid,
  (projects: Project[], filter: Filter, userDid: string): Project[] => {
    // all projects
    let projectsToFilter = projects && projects.length ? projects : []

    // filter by current user's projects
    if (filter.userProjects) {
      projectsToFilter = projectsToFilter.filter(
        project =>
          project.userDid === userDid ||
          project.agentDids.some(agentDid => agentDid === userDid),
      )
    }

    // TODO - featured and popular

    // filter by date created and be sure to remove any times from the dates
    if (filter.dateFrom && filter.dateTo) {
      projectsToFilter = projectsToFilter.filter(
        project =>
          project.dateCreated.startOf('day') >= filter.dateFrom &&
          project.dateCreated.startOf('day') <= filter.dateTo,
      )
    }

    // filter by categories
    if (filter.categories.length > 0) {
      filter.categories.forEach(category => {
        if (category.tags.length > 0) {
          category.tags.forEach(tag => {
            projectsToFilter = projectsToFilter.filter(project =>
              project.categories.some(
                projectCategory =>
                  projectCategory.name === category.name &&
                  projectCategory.tags.includes(tag),
              ),
            )
          })
        }
      })
    }

    // sort the result
    projectsToFilter = projectsToFilter.sort((a, b) => {
      return b.dateCreated.unix() - a.dateCreated.unix()
    })

    return projectsToFilter
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

export const selectAllProjectsCount = createSelector(
  selectAllProjects,
  (projects: Project[]): number => {
    return !projects ? 0 : projects.length
  },
)

export const selectUserProjectsCount = createSelector(
  selectAllProjects,
  accountSelectors.selectUserDid,
  (projects: Project[], userDid: string): number => {
    return !projects
      ? 0
      : projects.filter(
          project =>
            project.userDid === userDid ||
            project.agentDids.some(agentDid => agentDid === userDid),
        ).length
  },
)

export const selectFilteredProjectsCount = createSelector(
  selectedFilteredProjects,
  (projects: Project[]): number => {
    return !projects ? 0 : projects.length
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

export const selectTotalPendingClaimsCount = createSelector(
  selectAllProjects,
  (projects: Project[]): number => {
    return !projects
      ? 0
      : projects.reduce((total, project) => {
          return total + project.pendingClaimsCount
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

export const selectIsLoadingProjects = createSelector(
  selectAllProjects,
  (projects: Project[]): boolean => {
    return projects === null
  },
)

export const selectFilterDateFrom = createSelector(
  selectProjectsFilter,
  (filter: Filter): Moment => {
    return filter.dateFrom
  },
)

export const selectFilterDateTo = createSelector(
  selectProjectsFilter,
  (filter: Filter): Moment => {
    return filter.dateTo
  },
)

export const selectFilterDateFromFormatted = createSelector(
  selectFilterDateFrom,
  (dateFrom: Moment): string => {
    return dateFrom ? formatDate(dateFrom) : null
  },
)

export const selectFilterDateToFormatted = createSelector(
  selectFilterDateTo,
  (dateTo: Moment): string => {
    return dateTo ? formatDate(dateTo) : null
  },
)

export const selectFilterDateSummary = createSelector(
  selectFilterDateFromFormatted,
  selectFilterDateToFormatted,
  (dateFromFormatted: string, dateToFormatted: string): string => {
    if (dateFromFormatted || dateToFormatted) {
      return `${dateFromFormatted ? dateFromFormatted : 'Select'} - ${
        dateToFormatted ? dateToFormatted : 'Select'
      }`
    }
    return 'Dates'
  },
)

export const selectFilterCategories = createSelector(
  selectProjectsFilter,
  (filter: Filter): Category[] => {
    return filter.categories
  },
)

export const selectFilterCategoriesSummary = createSelector(
  selectFilterCategories,
  (categories: Category[]): string => {
    const totalFilters = categories.reduce((total, category) => {
      return total + category.tags.length
    }, 0)

    return totalFilters > 0 ? `Filters - ${totalFilters}` : 'Filters'
  },
)

export const selectFilterUserProjects = createSelector(
  selectProjectsFilter,
  (filter: Filter): boolean => {
    return filter.userProjects
  },
)

export const selectFilterFeaturedProjects = createSelector(
  selectProjectsFilter,
  (filter: Filter): boolean => {
    return filter.featuredProjects
  },
)

export const selectFilterPopularProjects = createSelector(
  selectProjectsFilter,
  (filter: Filter): boolean => {
    return filter.popularProjects
  },
)

export const selectTotalRemainingClaimsCount = createSelector(
  selectTotalRequiredClaimsCount,
  selectTotalSuccessfulClaimsCount,
  (totalClaimsRequired: number, totalClaimsSuccessful: number): number =>
    totalClaimsRequired - totalClaimsSuccessful,
)
