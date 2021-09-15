import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { Entity } from './types'
import { EntityType } from '../types'

export const selectSelectedEntity = (state: RootState): Entity =>
  state.selectedEntity

export const selectEntityDid = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.did : null
  },
)

export const selectEntityType = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.type : null
  },
)

export const selectEntityName = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.name : null
  },
)

export const selectEntityDescription = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.description : null
  },
)

export const selectEntityCreator = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.creatorDid : null
  },
)

export const selectEntityDateCreated = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.dateCreated : null
  },
)

export const selectEntityCreatorName = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.creatorName : null
  },
)

export const selectEntityCreatorLogo = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.creatorLogo : null
  },
)

export const selectEntityCreatorWebsite = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.creatorWebsite : null
  },
)

export const selectEntityCreatorMission = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.creatorMission : null
  },
)

export const selectEntityStatus = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.status : null
  },
)

export const selectEntityImage = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.image : null
  },
)

export const selectEntityLogo = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.logo : null
  },
)

export const selectEntityLocation = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.location : null
  },
)

export const selectEntitySdgs = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.sdgs : []
  },
)

export const selectEntityBondDid = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.bondDid : null
  },
)

export const selectEntityAgents = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.agents : []
  },
)

export const selectEntityClaimTemplateId = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.claimTemplateId : undefined
  },
)

export const entityIsLoading = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return !entity
  },
)

export const selectEntityAnalytics = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity && entity.embeddedAnalytics ? entity.embeddedAnalytics : []
  },
)

export const selectEntityLinkedEntities = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity && entity.linkedEntities ? entity.linkedEntities : []
  },
)

export const selectEntityInvestmentDid = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    if (entity && entity.linkedEntities) {
      const linkedInvestment = entity.linkedEntities.find((entity) => {
        return entity['@type'] === EntityType.Investment
      })

      if (linkedInvestment) {
        return linkedInvestment.id
      }
    }

    return null
  },
)