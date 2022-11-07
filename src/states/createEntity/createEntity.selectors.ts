import { RootState } from 'common/redux/types'
import { createSelector } from 'reselect'
import { TEntityMetadataModel, TEntityCreatorModel } from 'types'
import { TCreateEntityState } from './createEntity.types'

export const selectCreateEntity = (state: RootState): TCreateEntityState =>
  state.newEntity

export const selectCreateEntityType = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): string => createEntity.entityType,
)

export const selectCreateEntityStepNo = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): number => createEntity.stepNo,
)

export const selectCreateEntityMetadata = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityMetadataModel =>
    createEntity.metadata,
)

export const selectCreateEntityCreator = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityCreatorModel =>
    createEntity.creator,
)
