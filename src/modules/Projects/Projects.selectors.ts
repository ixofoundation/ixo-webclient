import * as entitySelectors from '../../common/modules/Entities/Entities.selectors'
import { Project } from './types'

const KEY = 'projects'

export const selectProjectsState = entitySelectors.selectEntitiesState<Project>(
  KEY,
)

export const selectAllProjects = entitySelectors.selectAllEntities<Project>(KEY)

export const selectProjectsFilter = entitySelectors.selectEntitiesFilter<
  Project
>(KEY)

export const selectedFilteredProjects = entitySelectors.selectedFilteredEntities<
  Project
>(KEY)

export const selectProjectCountries = entitySelectors.selectEntitiesCountries<
  Project
>(KEY)

export const selectAllProjectsCount = entitySelectors.selectAllEntitiesCount<
  Project
>(KEY)

export const selectUserProjectsCount = entitySelectors.selectUserEntitiesCount<
  Project
>(KEY)

export const selectFilteredProjectsCount = entitySelectors.selectFilteredEntitiesCount<
  Project
>(KEY)

export const selectTotalServiceProvidersCount = entitySelectors.selectTotalServiceProvidersCount<
  Project
>(KEY)

export const selectTotalEvaluatorsCount = entitySelectors.selectTotalEvaluatorsCount<
  Project
>(KEY)

export const selectTotalRequiredClaimsCount = entitySelectors.selectTotalRequiredClaimsCount<
  Project
>(KEY)

export const selectTotalPendingClaimsCount = entitySelectors.selectTotalPendingClaimsCount<
  Project
>(KEY)

export const selectTotalSuccessfulClaimsCount = entitySelectors.selectTotalSuccessfulClaimsCount<
  Project
>(KEY)

export const selectTotalRejectedClaimsCount = entitySelectors.selectTotalRejectedClaimsCount<
  Project
>(KEY)

export const selectIsLoadingProjects = entitySelectors.selectIsLoadingEntities<
  Project
>(KEY)

export const selectFilterDateFrom = entitySelectors.selectFilterDateFrom<
  Project
>(KEY)

export const selectFilterDateTo = entitySelectors.selectFilterDateTo<Project>(
  KEY,
)

export const selectFilterDateFromFormatted = entitySelectors.selectFilterDateFromFormatted<
  Project
>(KEY)

export const selectFilterDateToFormatted = entitySelectors.selectFilterDateToFormatted<
  Project
>(KEY)

export const selectFilterDateSummary = entitySelectors.selectFilterDateSummary<
  Project
>(KEY)

export const selectFilterCategories = entitySelectors.selectFilterCategories<
  Project
>(KEY)

export const selectFilterCategoriesSummary = entitySelectors.selectFilterCategoriesSummary<
  Project
>(KEY)

export const selectFilterUserProjects = entitySelectors.selectFilterUserEntities<
  Project
>(KEY)

export const selectFilterFeaturedProjects = entitySelectors.selectFilterFeaturedEntities<
  Project
>(KEY)

export const selectFilterPopularProjects = entitySelectors.selectFilterPopularEntities<
  Project
>(KEY)

export const selectTotalRemainingClaimsCount = entitySelectors.selectTotalRemainingClaimsCount<
  Project
>(KEY)
