import { createSelector } from 'reselect'
import { RootState } from 'src/common/redux/types'
import { Entity } from '../Entities/types'

export const selectSelectedEntity = (state: RootState): Entity =>
  state.selectedEntity

export const selectEntityDid = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity.did
  },
)

export const selectEntityTitle = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity.title
  },
)

export const selectEntityType = createSelector(
  selectSelectedEntity,
  (entity: Entity) => {
    return entity.entityType
  },
)

// TODO - other selectors here when needed
