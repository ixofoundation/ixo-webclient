import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { Entity } from '../types'

export const selectSelectedEntity = (state: RootState): Entity =>
  state.selectedEntity

export const selectEntityDid = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.did : null
  },
)

export const selectEntityTitle = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.title : null
  },
)

export const selectEntityType = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity ? entity.entityType : null
  },
)

export const entityIsLoading = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return !entity
  },
)

// TODO - other selectors here when needed
