import { RootState } from 'redux/store'
import { createSelector } from '@reduxjs/toolkit'
import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityServiceModel,
  ELocalisation,
  TEntityAdministratorModel,
  TEntityPageModel,
  TEntityClaimModel,
  TEntityDDOTagModel,
  TDAOGroupModel,
  TProposalModel,
  TQuestion,
} from 'types/protocol'
import { TCreateEntityState, TCreateEntityModel } from './createEntity.types'
import { AccordedRight, LinkedEntity, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'

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

export const selectCreateEntityProfile = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TEntityMetadataModel => createEntity.profile,
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
  (createEntity: TCreateEntityState): { [id: string]: TEntityClaimModel } => createEntity.claim ?? {},
)

export const selectCreateEntityLinkedResource = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): { [id: string]: LinkedResource } => createEntity.linkedResource ?? {},
)

export const selectCreateEntityAccordedRight = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): { [id: string]: AccordedRight } => createEntity.accordedRight ?? {},
)

export const selectCreateEntityLinkedEntity = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): { [id: string]: LinkedEntity } => createEntity.linkedEntity ?? {},
)

export const selectCreateEntityAssetInstances = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): TCreateEntityModel[] => createEntity.assetInstances ?? [],
)

export const selectCreateEntityLocalisation = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): ELocalisation => createEntity.localisation,
)

export const selectCreateEntityStartDate = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): string => createEntity.startDate || '',
)

export const selectCreateEntityEndDate = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): string => createEntity.endDate || '',
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

// for Claim
export const selectCreateEntityClaimQuestions = createSelector(
  selectCreateEntity,
  (createEntity: TCreateEntityState): { [id: string]: TQuestion } => createEntity.claimQuestions ?? {},
)
