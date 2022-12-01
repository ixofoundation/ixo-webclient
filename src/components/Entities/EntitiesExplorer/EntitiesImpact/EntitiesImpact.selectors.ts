import { createSelector } from 'reselect'
import * as entitiesSelectors from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { ExplorerEntity } from 'redux/entitiesExplorer/entitiesExplorer.types'

export const selectEntitiesCountries = createSelector(
  entitiesSelectors.selectAllEntitiesByType,
  (entities: ExplorerEntity[]): string[] => {
    return entities && entities.length
      ? entities.map((entity) => {
          return entity.location
        })
      : []
  },
)

export const selectTotalServiceProvidersCount = createSelector(
  entitiesSelectors.selectAllEntitiesByType,
  (entities: ExplorerEntity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + (entity.serviceProvidersCount || 0)
        }, 0)
  },
)

export const selectTotalEvaluatorsCount = createSelector(
  entitiesSelectors.selectAllEntitiesByType,
  (entities: ExplorerEntity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + (entity.evaluatorsCount || 0)
        }, 0)
  },
)

export const selectTotalRequiredClaimsCount = createSelector(
  entitiesSelectors.selectAllEntitiesByType,
  (entities: ExplorerEntity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + (entity.requiredClaimsCount || 0)
        }, 0)
  },
)

export const selectTotalPendingClaimsCount = createSelector(
  entitiesSelectors.selectAllEntitiesByType,
  (entities: ExplorerEntity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + (entity.pendingClaimsCount || 0)
        }, 0)
  },
)

export const selectTotalSuccessfulClaimsCount = createSelector(
  entitiesSelectors.selectAllEntitiesByType,
  (entities: ExplorerEntity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + (entity.successfulClaimsCount || 0)
        }, 0)
  },
)

export const selectTotalRejectedClaimsCount = createSelector(
  entitiesSelectors.selectAllEntitiesByType,
  (entities: ExplorerEntity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + (entity.rejectedClaimsCount || 0)
        }, 0)
  },
)

export const selectTotalRemainingClaimsCount = createSelector(
  selectTotalRequiredClaimsCount,
  selectTotalSuccessfulClaimsCount,
  (totalClaimsRequired: number, totalClaimsSuccessful: number): number => totalClaimsRequired - totalClaimsSuccessful,
)
