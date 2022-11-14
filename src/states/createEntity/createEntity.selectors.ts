import { RootState } from 'common/redux/types'
import { createSelector } from 'reselect'
import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityTagsModel,
  TEntityServiceModel,
  TEntityPaymentModel,
  TEntityLiquidityModel,
  TEntityClaimModel,
  TEntityLinkedResourceModel,
} from 'types'
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

export const selectCreateEntityTags = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityTagsModel => createEntity.tags,
)

export const selectCreateEntityServices = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityServiceModel[] =>
    createEntity.services ?? [],
)

export const selectCreateEntityPayments = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityPaymentModel[] =>
    createEntity.payments ?? [],
)

export const selectCreateEntityLiquidity = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityLiquidityModel[] =>
    createEntity.liquidity ?? [],
)

export const selectCreateEntityClaims = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): { [id: string]: TEntityClaimModel } =>
    createEntity.claims ?? {},
)

export const selectCreateEntityLinkedResources = createSelector(
  selectCreateEntity,
  (
    createEntity: TCreateEntityState,
  ): { [id: string]: TEntityLinkedResourceModel } =>
    createEntity.linkedResources ?? {},
)
