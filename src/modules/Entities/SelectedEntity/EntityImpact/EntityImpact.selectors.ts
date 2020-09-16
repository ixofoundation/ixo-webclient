import { createSelector } from 'reselect'
import * as selectedEntitySelectors from '../SelectedEntity.selectors'
import { Entity } from '../types'

export const selectRequiredClaimsCount = createSelector(
  selectedEntitySelectors.selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.requiredClaimsCount : null
  },
)

export const selectSuccessfulClaimsCount = createSelector(
  selectedEntitySelectors.selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.successfulClaimsCount : null
  },
)

export const selectPendingClaimsCount = createSelector(
  selectedEntitySelectors.selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.pendingClaimsCount : null
  },
)

export const selectRejectedClaimsCount = createSelector(
  selectedEntitySelectors.selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.rejectedClaimsCount : null
  },
)

export const selectEvaluatorsCount = createSelector(
  selectedEntitySelectors.selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.evaluatorsCount : null
  },
)

export const selectEvaluatorsPendingCount = createSelector(
  selectedEntitySelectors.selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.evaluatorsPendingCount : null
  },
)

export const selectServiceProvidersCount = createSelector(
  selectedEntitySelectors.selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.serviceProvidersCount : null
  },
)

export const selectServiceProvidersPendingCount = createSelector(
  selectedEntitySelectors.selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.serviceProvidersPendingCount : null
  },
)
