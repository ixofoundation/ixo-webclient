import { Moment } from 'moment'
import { createSelector } from 'reselect'
import { Entity, EntitiesState } from './types'
import { Filter, Category } from './types'
import * as accountSelectors from '../../../modules/Account/Account.selectors'
import { RootState } from 'src/common/redux/types'

const formatDate = (date: Moment): string => date.format("D MMM \\'YY")

export function selectEntitiesState<TEntity extends Entity>(key: string) {
  return (state: RootState): EntitiesState<TEntity> => state[key]
}

export function selectAllEntities<TEntity extends Entity>(key: string): any {
  return createSelector(
    selectEntitiesState<TEntity>(key),
    (entitiesState: EntitiesState<TEntity>): TEntity[] => {
      return entitiesState.entities
    },
  )
}

export function selectEntitiesFilter<TEntity extends Entity>(key: string): any {
  return createSelector(
    selectEntitiesState<TEntity>(key),
    (entitiesState: EntitiesState<TEntity>): Filter => {
      return entitiesState.filter
    },
  )
}

export function selectedFilteredEntities<TTEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectAllEntities<TTEntity>(key),
    selectEntitiesFilter<TTEntity>(key),
    accountSelectors.selectUserDid,
    (entities: TTEntity[], filter: Filter, userDid: string): TTEntity[] => {
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
}

export function selectEntitiesCountries<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectAllEntities<TEntity>(key),
    (entities: TEntity[]): string[] => {
      return entities && entities.length
        ? entities.map(entity => {
            return entity.country
          })
        : []
    },
  )
}

export function selectAllEntitiesCount<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectAllEntities<TEntity>(key),
    (entities: TEntity[]): number => {
      return !entities ? 0 : entities.length
    },
  )
}

export function selectUserEntitiesCount<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectAllEntities<TEntity>(key),
    accountSelectors.selectUserDid,
    (entities: TEntity[], userDid: string): number => {
      return !entities
        ? 0
        : entities.filter(
            entity =>
              entity.userDid === userDid ||
              entity.agentDids.some(agentDid => agentDid === userDid),
          ).length
    },
  )
}

export function selectFilteredEntitiesCount<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectedFilteredEntities<TEntity>(key),
    (entities: TEntity[]): number => {
      return !entities ? 0 : entities.length
    },
  )
}

export function selectTotalServiceProvidersCount<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectAllEntities<TEntity>(key),
    (entities: TEntity[]): number => {
      return !entities
        ? 0
        : entities.reduce((total, entity) => {
            return total + entity.serviceProvidersCount
          }, 0)
    },
  )
}

export function selectTotalEvaluatorsCount<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectAllEntities<TEntity>(key),
    (entities: TEntity[]): number => {
      return !entities
        ? 0
        : entities.reduce((total, entity) => {
            return total + entity.evaluatorsCount
          }, 0)
    },
  )
}

export function selectTotalRequiredClaimsCount<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectAllEntities<TEntity>(key),
    (entities: TEntity[]): number => {
      return !entities
        ? 0
        : entities.reduce((total, entity) => {
            return total + entity.requiredClaimsCount
          }, 0)
    },
  )
}

export function selectTotalPendingClaimsCount<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectAllEntities<TEntity>(key),
    (entities: TEntity[]): number => {
      return !entities
        ? 0
        : entities.reduce((total, entity) => {
            return total + entity.pendingClaimsCount
          }, 0)
    },
  )
}

export function selectTotalSuccessfulClaimsCount<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectAllEntities<TEntity>(key),
    (entities: TEntity[]): number => {
      return !entities
        ? 0
        : entities.reduce((total, entity) => {
            return total + entity.successfulClaimsCount
          }, 0)
    },
  )
}

export function selectTotalRejectedClaimsCount<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectAllEntities<TEntity>(key),
    (entities: TEntity[]): number => {
      return !entities
        ? 0
        : entities.reduce((total, entity) => {
            return total + entity.rejectedClaimsCount
          }, 0)
    },
  )
}

export function selectIsLoadingEntities<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectAllEntities<TEntity>(key),
    (entities: Entity[]): boolean => {
      return entities === null
    },
  )
}

export function selectFilterDateFrom<TEntity extends Entity>(key: string): any {
  return createSelector(
    selectEntitiesFilter<TEntity>(key),
    (filter: Filter): Moment => {
      return filter.dateFrom
    },
  )
}

export function selectFilterDateTo<TEntity extends Entity>(key: string): any {
  return createSelector(
    selectEntitiesFilter<TEntity>(key),
    (filter: Filter): Moment => {
      return filter.dateTo
    },
  )
}

export function selectFilterDateFromFormatted<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectFilterDateFrom<TEntity>(key),
    (dateFrom: Moment): string => {
      return dateFrom ? formatDate(dateFrom) : null
    },
  )
}

export function selectFilterDateToFormatted<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectFilterDateTo<TEntity>(key),
    (dateTo: Moment): string => {
      return dateTo ? formatDate(dateTo) : null
    },
  )
}

export function selectFilterDateSummary<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectFilterDateFromFormatted<TEntity>(key),
    selectFilterDateToFormatted<TEntity>(key),
    (dateFromFormatted: string, dateToFormatted: string): string => {
      if (dateFromFormatted || dateToFormatted) {
        return `${dateFromFormatted ? dateFromFormatted : 'Select'} - ${
          dateToFormatted ? dateToFormatted : 'Select'
        }`
      }
      return 'Dates'
    },
  )
}

export function selectFilterCategories<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectEntitiesFilter<TEntity>(key),
    (filter: Filter): Category[] => {
      return filter.categories
    },
  )
}

export function selectFilterCategoriesSummary<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectFilterCategories<TEntity>(key),
    (categories: Category[]): string => {
      const totalFilters = categories.reduce((total, category) => {
        return total + category.tags.length
      }, 0)

      return totalFilters > 0 ? `Filters - ${totalFilters}` : 'Filters'
    },
  )
}

export function selectFilterUserEntities<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectEntitiesFilter<TEntity>(key),
    (filter: Filter): boolean => {
      return filter.userEntities
    },
  )
}

export function selectFilterFeaturedEntities<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectEntitiesFilter<TEntity>(key),
    (filter: Filter): boolean => {
      return filter.featuredEntities
    },
  )
}

export function selectFilterPopularEntities<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectEntitiesFilter<TEntity>(key),
    (filter: Filter): boolean => {
      return filter.popularEntities
    },
  )
}

export function selectTotalRemainingClaimsCount<TEntity extends Entity>(
  key: string,
): any {
  return createSelector(
    selectTotalRequiredClaimsCount<TEntity>(key),
    selectTotalSuccessfulClaimsCount<TEntity>(key),
    (totalClaimsRequired: number, totalClaimsSuccessful: number): number =>
      totalClaimsRequired - totalClaimsSuccessful,
  )
}
