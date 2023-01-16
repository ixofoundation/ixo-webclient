import { RootState } from 'redux/store'
import { createSelector } from '@reduxjs/toolkit'
import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityServiceModel,
  TEntityLinkedResourceModel,
  ELocalisation,
  TEntityAccordedRightModel,
  TEntityLinkedEntityModel,
  TEntityControllerModel,
  TEntityTagsModel,
  TEntityPageModel,
  TEntityClaimModel1,
} from 'types/protocol'
import { TCreateEntityState, TEntityModel } from './createEntity.types'

export const selectCreateEntity = (state: RootState): TCreateEntityState => state.newEntity

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
  (createEntity: TCreateEntityState): TEntityMetadataModel => createEntity.metadata,
)

export const selectCreateEntityCreator = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityCreatorModel => createEntity.creator,
)

export const selectCreateEntityController = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityControllerModel => createEntity.controller,
)

export const selectCreateEntityTags = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityTagsModel => createEntity.tags,
)

export const selectCreateEntityPage = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityPageModel => createEntity.page,
)

export const selectCreateEntityService = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityServiceModel[] => createEntity.service ?? [],
)

export const selectCreateEntityClaim = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): { [id: string]: TEntityClaimModel1 } => createEntity.claim ?? {},
)

export const selectCreateEntityLinkedResource = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): { [id: string]: TEntityLinkedResourceModel } => createEntity.linkedResource ?? {},
)

export const selectCreateEntityAccordedRight = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): { [id: string]: TEntityAccordedRightModel } => createEntity.accordedRight ?? {},
)

export const selectCreateEntityLinkedEntity = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): { [id: string]: TEntityLinkedEntityModel } => createEntity.linkedEntity ?? {},
)

export const selectCreateEntityEntityClassDid = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): string => createEntity.entityClassDid,
)

export const selectCreateEntityAssetClassDid = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): string => createEntity.assetClassDid!,
)

export const selectCreateEntityAssetInstances = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityModel[] => createEntity.assetInstances ?? [],
)

export const selectCreateEntityLocalisation = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): ELocalisation => createEntity.localisation,
)
