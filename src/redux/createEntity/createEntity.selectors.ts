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
  TEntityAdministratorModel,
  TEntityPageModel,
  TEntityClaimModel1,
  TEntityDDOTagModel,
  TDAOGroupModel,
  TProposalModel,
} from 'types/protocol'
import { TCreateEntityState, TCreateEntityModel } from './createEntity.types'

export const selectCreateEntity = (state: RootState): TCreateEntityState => state.newEntity

export const selectCreateEntityType = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): string => createEntity.entityType,
)

export const selectCreateEntityStepNo = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): number => createEntity.stepNo,
)

export const selectCreateEntityBreadCrumbs = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): { text: string; link?: string }[] => createEntity.breadCrumbs ?? [],
)

export const selectCreateEntityTitle = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): string => createEntity.title ?? '',
)

export const selectCreateEntitySubtitle = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): string => createEntity.subtitle ?? '',
)

export const selectCreateEntityMetadata = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityMetadataModel => createEntity.metadata,
)

export const selectCreateEntityCreator = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityCreatorModel => createEntity.creator,
)

export const selectCreateEntityAdministrator = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityAdministratorModel => createEntity.administrator,
)

export const selectCreateEntityDDOTags = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityDDOTagModel[] => createEntity.ddoTags,
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

export const selectCreateEntityAssetInstances = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TCreateEntityModel[] => createEntity.assetInstances ?? [],
)

export const selectCreateEntityLocalisation = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): ELocalisation => createEntity.localisation,
)

// for DAO
export const selectCreateEntityDAOGroups = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): { [id: string]: TDAOGroupModel } => createEntity.daoGroups ?? {},
)

export const selectCreateEntityDAOController = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): string => createEntity.daoController ?? '',
)

// for Proposal
export const selectCreateEntityProposal = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TProposalModel => createEntity.proposal ?? {},
)
