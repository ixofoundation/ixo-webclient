import { LatLng } from 'common/components/Widgets/WorldMap/WorldMap'
import { isoCountriesLatLng } from 'lib/countries'
import { createSelector } from 'reselect'
import * as selectedEntitySelectors from '../../../../redux/selectedEntity/selectedEntity.selectors'
import { Entity } from '../../../../redux/selectedEntity/selectedEntity.types'

export const selectGoal = createSelector(selectedEntitySelectors.selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.goal : null
})

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

export const selectDisputedClaimsCount = createSelector(
  selectedEntitySelectors.selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.disputedClaimsCount : null
  },
)

export const selectTotalClaimsCount = createSelector(selectedEntitySelectors.selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.claims.length : 0
})

export const selectEvaluatorsCount = createSelector(selectedEntitySelectors.selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.evaluatorsCount : null
})

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

export const selectRemainingClaimsCount = createSelector(
  selectRequiredClaimsCount,
  selectSuccessfulClaimsCount,
  selectPendingClaimsCount,
  selectRejectedClaimsCount,
  selectDisputedClaimsCount,
  (totalClaimsCount, successfulClaimsCount, pendingClaimsCount, rejectedClaimsCount, disputedClaimsCount) => {
    return (
      totalClaimsCount! - successfulClaimsCount! - pendingClaimsCount! - rejectedClaimsCount! - disputedClaimsCount!
    )
  },
)

export const selectLatLng = createSelector(selectedEntitySelectors.selectEntityLocation, (location) => {
  const latLng = isoCountriesLatLng[location!]
  if (latLng) {
    return new LatLng(latLng.lat, latLng.lng)
  }

  return new LatLng(0, 0)
})
