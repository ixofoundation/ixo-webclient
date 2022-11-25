import { createSelector } from 'reselect'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { Entity } from 'modules/Entities/SelectedEntity/types'

export const selectEntityClaims = createSelector(entitySelectors.selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.claims : []
})
