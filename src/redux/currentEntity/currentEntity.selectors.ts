import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { CurrentEntity } from './currentEntity.types'

export const selectCurrentEntity = (state: RootState): CurrentEntity => state.currentEntity

export const selectEntityType = createSelector(selectCurrentEntity, (entity: CurrentEntity) => {
  return entity.entityType
})
