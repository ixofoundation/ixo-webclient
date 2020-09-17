import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { Entity } from './types'
import * as accountSelectors from '../../Account/Account.selectors'
import { Agent } from '../types'

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

export const selectEntityOwnerName = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.ownerName : null
  },
)

export const selectEntityOwnerLogo = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.ownerLogo : null
  },
)

export const selectEntityOwnerWebsite = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.ownerWebsite : null
  },
)

export const selectEntityOwnerMission = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.ownerMission : null
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

export const entityIsLoading = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return !entity
  },
)
