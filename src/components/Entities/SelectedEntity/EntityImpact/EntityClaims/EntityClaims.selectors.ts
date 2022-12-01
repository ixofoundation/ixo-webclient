import { createSelector } from 'reselect'
import * as entitySelectors from 'redux/selectedEntity/selectedEntity.selectors'
import { Entity } from 'redux/selectedEntity/selectedEntity.types'

export const selectEntityClaims = createSelector(entitySelectors.selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.claims : []
})
