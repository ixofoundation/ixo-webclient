import { createSelector } from 'reselect'
import { RootState } from '../../common/redux/types'
import { CreateEntityState } from './types'

export const selectCreateEntity = (state: RootState): CreateEntityState =>
  state.createEntity

export const selectStep = createSelector(
  selectCreateEntity,
  (createEntity: CreateEntityState) => createEntity.step,
)

export const selectEntityType = createSelector(
  selectCreateEntity,
  (createEntity: CreateEntityState) => createEntity.entityType,
)
