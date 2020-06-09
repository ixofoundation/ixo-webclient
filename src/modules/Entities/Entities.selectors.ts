import { Moment } from 'moment'
import { createSelector } from 'reselect'
import { Entity, EntitiesState } from './types'
import { Filter, Category, EntityType } from './types'
import * as accountSelectors from '../Account/Account.selectors'
import { RootState } from 'src/common/redux/types'
import { Schema as FilterSchema } from './components/EntitiesFilter/schema/types'
import { strategyMap } from './strategy-map'

const formatDate = (date: Moment): string => date.format("D MMM \\'YY")

export const selectEntitiesState = (state: RootState): EntitiesState =>
  state.entities

export const selectAllEntitiesByType = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesState): Entity[] => {
    return entitiesState.entities
      ? entitiesState.entities.filter(
          entity => entity.entityType === entitiesState.selectedEntitiesType,
        )
      : null
  },
)

export const selectEntitiesFilter = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesState): Filter => {
    return entitiesState.filter
  },
)

export const selectSelectedEntitiesType = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesState): EntityType => {
    return entitiesState.selectedEntitiesType
  },
)

export const selectedFilteredEntities = createSelector(
  selectAllEntitiesByType,
  selectEntitiesFilter,
  accountSelectors.selectUserDid,
  (entities: Entity[], filter: Filter, userDid: string): Entity[] => {
    // all entities
    let entitiesToFilter = entities && entities.length ? entities : []

    // filter by current user's entities
    if (filter.userEntities) {
      entitiesToFilter = entitiesToFilter.filter(
        entity =>
          entity.userDid === userDid ||
          entity.agentDids.some(agentDid => agentDid === userDid),
      )
    }

    // TODO - featured and popular

    // filter by date created and be sure to remove any times from the dates
    if (filter.dateFrom && filter.dateTo) {
      entitiesToFilter = entitiesToFilter.filter(
        entity =>
          entity.dateCreated.startOf('day') >= filter.dateFrom &&
          entity.dateCreated.startOf('day') <= filter.dateTo,
      )
    }

    // filter by categories
    if (filter.categories.length > 0) {
      filter.categories.forEach(category => {
        if (category.tags.length > 0) {
          category.tags.forEach(tag => {
            entitiesToFilter = entitiesToFilter.filter(entity =>
              entity.categories.some(
                entityCategory =>
                  entityCategory.name === category.name &&
                  entityCategory.tags.includes(tag),
              ),
            )
          })
        }
      })
    }

    // sort the result
    entitiesToFilter = entitiesToFilter.sort((a, b) => {
      return b.dateCreated.unix() - a.dateCreated.unix()
    })

    return entitiesToFilter
  },
)

export const selectEntitiesCountries = createSelector(
  selectAllEntitiesByType,
  (entities: Entity[]): string[] => {
    return entities && entities.length
      ? entities.map(entity => {
          return entity.country
        })
      : []
  },
)

export const selectAllEntitiesCount = createSelector(
  selectAllEntitiesByType,
  (entities: Entity[]): number => {
    return !entities ? 0 : entities.length
  },
)

export const selectUserEntitiesCount = createSelector(
  selectAllEntitiesByType,
  accountSelectors.selectUserDid,
  (entities: Entity[], userDid: string): number => {
    return !entities
      ? 0
      : entities.filter(
          entity =>
            entity.userDid === userDid ||
            entity.agentDids.some(agentDid => agentDid === userDid),
        ).length
  },
)

export const selectFilteredEntitiesCount = createSelector(
  selectedFilteredEntities,
  (entities: Entity[]): number => {
    return !entities ? 0 : entities.length
  },
)

export const selectTotalServiceProvidersCount = createSelector(
  selectAllEntitiesByType,
  (entities: Entity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + entity.serviceProvidersCount
        }, 0)
  },
)

export const selectTotalEvaluatorsCount = createSelector(
  selectAllEntitiesByType,
  (entities: Entity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + entity.evaluatorsCount
        }, 0)
  },
)

export const selectTotalRequiredClaimsCount = createSelector(
  selectAllEntitiesByType,
  (entities: Entity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + entity.requiredClaimsCount
        }, 0)
  },
)

export const selectTotalPendingClaimsCount = createSelector(
  selectAllEntitiesByType,
  (entities: Entity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + entity.pendingClaimsCount
        }, 0)
  },
)

export const selectTotalSuccessfulClaimsCount = createSelector(
  selectAllEntitiesByType,
  (entities: Entity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + entity.successfulClaimsCount
        }, 0)
  },
)

export const selectTotalRejectedClaimsCount = createSelector(
  selectAllEntitiesByType,
  (entities: Entity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + entity.rejectedClaimsCount
        }, 0)
  },
)

export const selectIsLoadingEntities = createSelector(
  selectAllEntitiesByType,
  (entities: Entity[]): boolean => {
    return entities === null
  },
)

export const selectFilterDateFrom = createSelector(
  selectEntitiesFilter,
  (filter: Filter): Moment => {
    return filter.dateFrom
  },
)

export const selectFilterDateTo = createSelector(
  selectEntitiesFilter,
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
  selectEntitiesFilter,
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

export const selectFilterUserEntities = createSelector(
  selectEntitiesFilter,
  (filter: Filter): boolean => {
    return filter.userEntities
  },
)

export const selectFilterFeaturedEntities = createSelector(
  selectEntitiesFilter,
  (filter: Filter): boolean => {
    return filter.featuredEntities
  },
)

export const selectFilterPopularEntities = createSelector(
  selectEntitiesFilter,
  (filter: Filter): boolean => {
    return filter.popularEntities
  },
)

export const selectTotalRemainingClaimsCount = createSelector(
  selectTotalRequiredClaimsCount,
  selectTotalSuccessfulClaimsCount,
  (totalClaimsRequired: number, totalClaimsSuccessful: number): number =>
    totalClaimsRequired - totalClaimsSuccessful,
)

export const selectFilterSchema = createSelector(
  selectSelectedEntitiesType,
  (entityType: EntityType): FilterSchema => {
    return strategyMap[entityType].filterSchema
  },
)
