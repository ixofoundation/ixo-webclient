import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { ExplorerEntity } from '../EntitiesExplorer/types'

export const selectSelectedEntity = (state: RootState): ExplorerEntity =>
  state.selectedEntity

export const selectEntityDid = createSelector(
  selectSelectedEntity,
  (entity: ExplorerEntity) => {
    return entity ? entity.did : null
  },
)

export const selectEntityTitle = createSelector(
  selectSelectedEntity,
  (entity: ExplorerEntity) => {
    return entity ? entity.name : null
  },
)

export const selectEntityType = createSelector(
  selectSelectedEntity,
  (entity: ExplorerEntity) => {
    return entity ? entity.type : null
  },
)

export const entityIsLoading = createSelector(
  selectSelectedEntity,
  (entity: ExplorerEntity) => {
    return !entity
  },
)

// TODO - other selectors here when needed
