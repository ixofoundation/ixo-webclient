import { Moment } from 'moment'
import { createSelector } from 'reselect'
import {
  ExplorerEntity,
  EntitiesExplorerState,
  Filter,
  DDOTagCategory,
} from './types'
import { EntityType } from '../types'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { RootState } from 'common/redux/types'
import { Schema as FilterSchema } from './components/EntitiesFilter/schema/types'
import { entityTypeMap } from '../strategy-map'

const formatDate = (date: Moment): string => date.format("D MMM \\'YY")

export const selectEntitiesState = (state: RootState): EntitiesExplorerState =>
  state.entities

export const selectAllEntitiesByType = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): ExplorerEntity[] => {
    return entitiesState.entities
      ? entitiesState.entities.filter(
          (entity) => entity.type === entitiesState.selectedEntitiesType,
        )
      : null
  },
)

export const selectAllTemplateEntities = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): ExplorerEntity[] => {
    return entitiesState.entities
      ? entitiesState.entities
          .filter((entity) => entity.type === EntityType.Template)
          .sort((a, b) => {
            return b.dateCreated.unix() - a.dateCreated.unix()
          })
      : null
  },
)

export const selectEntitiesFilter = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): Filter => {
    return entitiesState.filter
  },
)

export const selectSelectedEntitiesType = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): EntityType => {
    return entitiesState.selectedEntitiesType
  },
)

export const selectedFilteredEntities = createSelector(
  selectAllEntitiesByType,
  selectEntitiesFilter,
  accountSelectors.selectUserDid,
  (
    entities: ExplorerEntity[],
    filter: Filter,
    userDid: string,
  ): ExplorerEntity[] => {
    // all entities
    let entitiesToFilter = entities && entities.length ? entities : []

    // filter by current user's entities
    if (filter.userEntities) {
      entitiesToFilter = entitiesToFilter.filter(
        (entity) =>
          entity.creatorDid === userDid ||
          entity.agentDids.some((agentDid) => agentDid === userDid),
      )
    }

    // TODO - featured and popular

    // filter by date created and be sure to remove any times from the dates
    if (filter.dateFrom && filter.dateTo) {
      entitiesToFilter = entitiesToFilter.filter(
        (entity) =>
          entity.dateCreated.startOf('day') >= filter.dateFrom &&
          entity.dateCreated.startOf('day') <= filter.dateTo,
      )
    }

    // filter by categories
    if (filter.ddoTags.length > 0) {
      filter.ddoTags.forEach((category) => {
        if (category.tags.length > 0) {
          category.tags.forEach((tag) => {
            entitiesToFilter = entitiesToFilter.filter((entity) =>
              entity.ddoTags.some(
                (entityCategory) =>
                  entityCategory.name === category.name &&
                  entityCategory.tags.includes(tag),
              ),
            )
          })
        }
      })
    }

    // filter by query
    if (filter.query) {
      const lowerCaseQuery = filter.query.toLowerCase()
      entitiesToFilter = entitiesToFilter.filter((entity) => {
        let filtered = false
        if (entity.name) {
          filtered = filtered || entity.name.toLowerCase().includes(lowerCaseQuery)
        }
        if (entity.description) {
          filtered = filtered || entity.description.toLowerCase().includes(lowerCaseQuery)
        }
        if (entity.goal) {
          filtered = filtered || entity.goal.toLowerCase().includes(lowerCaseQuery)
        }

        return filtered
      })
    }

    // filter by sector
    if (filter.sector) {
      entitiesToFilter = entitiesToFilter.filter((entity) =>
        entity.ddoTags.some(
          (entityCategory) =>
            entityCategory.name === 'Sector' &&
            entityCategory.tags.includes(filter.sector),
        ),
      )
    }

    // sort the result
    entitiesToFilter = entitiesToFilter.sort((a, b) => {
      return b.dateCreated.unix() - a.dateCreated.unix()
    })

    return entitiesToFilter
  },
)

export const selectAllEntitiesCount = createSelector(
  selectAllEntitiesByType,
  (entities: ExplorerEntity[]): number => {
    return !entities ? 0 : entities.length
  },
)

export const selectUserEntitiesCount = createSelector(
  selectAllEntitiesByType,
  accountSelectors.selectUserDid,
  (entities: ExplorerEntity[], userDid: string): number => {
    return !entities
      ? 0
      : entities.filter(
          (entity) =>
            entity.creatorDid === userDid ||
            entity.agentDids.some((agentDid) => agentDid === userDid),
        ).length
  },
)

export const selectFilteredEntitiesCount = createSelector(
  selectedFilteredEntities,
  (entities: ExplorerEntity[]): number => {
    return !entities ? 0 : entities.length
  },
)

export const selectIsLoadingEntities = createSelector(
  selectAllEntitiesByType,
  (entities: ExplorerEntity[]): boolean => {
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
  (filter: Filter): DDOTagCategory[] => {
    return filter.ddoTags
  },
)

export const selectFilterSector = createSelector(
  selectEntitiesFilter,
  (filter: Filter): string => {
    return filter.sector
  },
)

export const selectFilterCategoriesSummary = createSelector(
  selectFilterCategories,
  (categories: DDOTagCategory[]): string => {
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

export const selectFilterSchema = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): FilterSchema => {
    return entityTypeMap[entitiesState.selectedEntitiesType].filterSchema
  },
)
