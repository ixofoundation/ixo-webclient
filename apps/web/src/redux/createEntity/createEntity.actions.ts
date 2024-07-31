import { AccordedRight, LinkedEntity, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import {
  TDAOGroupModel,
  TProposalModel,
  TEntityClaimModel,
  TEntityAdministratorModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityMetadataModel,
  TEntityPageModel,
  TEntityServiceModel,
} from 'types/entities'
import { ELocalisation, TQuestion } from 'types/protocol'
import {
  ECreateEntityActions,
  TAddAssetInstancesAction,
  TCreateEntityModel,
  TGotoStepAction,
  TRemoveAssetInstancesAction,
  TUpdateAccordedRightAction,
  TUpdateAssetInstanceAction,
  TUpdateBreadCrumbsAction,
  TUpdateClaimAction,
  TUpdateAdministratorAction,
  TUpdateCreatorAction,
  TUpdateDAOControllerAction,
  TUpdateDAOGroupsAction,
  TUpdateDDOTagsAction,
  TUpdateProposalAction,
  TUpdateEntityTypeAction,
  TUpdateLinkedEntityAction,
  TUpdateLinkedResourceAction,
  TUpdateLocalisationAction,
  TUpdateProfileAction,
  TUpdatePageAction,
  TUpdateServiceAction,
  TUpdateSubtitleAction,
  TUpdateTitleAction,
  TClearEntityAction,
  TUpdateClaimQuestionsAction,
  TUpdateStartEndDateAction,
  TUpdateQuestionJSONAction,
  TUpdateProtocolIdAction,
} from './createEntity.types'

export const updateEntityTypeAction = (entityType: string): TUpdateEntityTypeAction => ({
  type: ECreateEntityActions.UpdateEntityType,
  payload: entityType,
})

export const clearEntityAction = (): TClearEntityAction => ({
  type: ECreateEntityActions.ClearEntity,
})

export const gotoStepAction = (no: number): TGotoStepAction => ({
  type: ECreateEntityActions.GotoStep,
  payload: no,
})

export const updateBreadCrumbsAction = (breadCrumbs: { text: string; link?: string }[]): TUpdateBreadCrumbsAction => ({
  type: ECreateEntityActions.UpdateBreadCrumbs,
  payload: breadCrumbs,
})

export const updateTitleAction = (title: string): TUpdateTitleAction => ({
  type: ECreateEntityActions.UpdateTitle,
  payload: title,
})

export const updateSubtitleAction = (subtitle: string): TUpdateSubtitleAction => ({
  type: ECreateEntityActions.UpdateSubtitle,
  payload: subtitle,
})

export const updateProfileAction = (profile: TEntityMetadataModel): TUpdateProfileAction => ({
  type: ECreateEntityActions.UpdateProfile,
  payload: profile,
})

export const updateCreatorAction = (creator: TEntityCreatorModel): TUpdateCreatorAction => ({
  type: ECreateEntityActions.UpdateCreator,
  payload: creator,
})

export const updateAdministratorAction = (administrator: TEntityAdministratorModel): TUpdateAdministratorAction => ({
  type: ECreateEntityActions.UpdateAdministrator,
  payload: administrator,
})

export const updateDDOTagsAction = (ddoTags: TEntityDDOTagModel[]): TUpdateDDOTagsAction => ({
  type: ECreateEntityActions.UpdateDDOTags,
  payload: ddoTags,
})

export const updatePageAction = (page: TEntityPageModel): TUpdatePageAction => ({
  type: ECreateEntityActions.UpdatePage,
  payload: page,
})

export const updateServiceAction = (services: TEntityServiceModel[]): TUpdateServiceAction => ({
  type: ECreateEntityActions.UpdateService,
  payload: services,
})

export const updateClaimAction = (claim: { [id: string]: TEntityClaimModel }): TUpdateClaimAction => ({
  type: ECreateEntityActions.UpdateClaim,
  payload: claim,
})

export const updateLinkedResourceAction = (linkedResource: {
  [id: string]: LinkedResource
}): TUpdateLinkedResourceAction => ({
  type: ECreateEntityActions.UpdateLinkedResource,
  payload: linkedResource,
})

export const updateAccordedRightAction = (accordedRight: {
  [id: string]: AccordedRight
}): TUpdateAccordedRightAction => ({
  type: ECreateEntityActions.UpdateAccordedRight,
  payload: accordedRight,
})

export const updateLinkedEntityAction = (linkedEntity: { [id: string]: LinkedEntity }): TUpdateLinkedEntityAction => ({
  type: ECreateEntityActions.UpdateLinkedEntity,
  payload: linkedEntity,
})

export const updateStartEndDateAction = (startDate: string, endDate: string): TUpdateStartEndDateAction => ({
  type: ECreateEntityActions.UpdateStartEndDate,
  payload: { startDate, endDate },
})

export const addAssetInstancesAction = (instances: TCreateEntityModel[]): TAddAssetInstancesAction => ({
  type: ECreateEntityActions.AddAssetInstances,
  payload: instances,
})

export const updateAssetInstanceAction = (id: number, instance: TCreateEntityModel): TUpdateAssetInstanceAction => ({
  type: ECreateEntityActions.UpdateAssetInstance,
  payload: { id, data: instance },
})

export const removeAssetInstancesAction = (): TRemoveAssetInstancesAction => ({
  type: ECreateEntityActions.RemoveAssetInstances,
})

export const updateLocalisationAction = (localisation: ELocalisation): TUpdateLocalisationAction => ({
  type: ECreateEntityActions.UpdateLocalisation,
  payload: localisation,
})

// for DAO
export const updateDAOGroupsAction = (daoGroups: { [id: string]: TDAOGroupModel }): TUpdateDAOGroupsAction => ({
  type: ECreateEntityActions.UpdateDAOGroups,
  payload: daoGroups,
})

export const updateDAOControllerAction = (controller: string): TUpdateDAOControllerAction => ({
  type: ECreateEntityActions.UpdateDAOController,
  payload: controller,
})

// for Proposal
export const updateProposalAction = (proposal: TProposalModel): TUpdateProposalAction => ({
  type: ECreateEntityActions.UpdateProposal,
  payload: proposal,
})

// for Claim
export const updateClaimQuestionsAction = (claimQuestions: {
  [id: string]: TQuestion
}): TUpdateClaimQuestionsAction => ({
  type: ECreateEntityActions.UpdateClaimQuestions,
  payload: claimQuestions,
})
export const updateQuestionJSONAction = (questionJSON: any): TUpdateQuestionJSONAction => ({
  type: ECreateEntityActions.UpdateQuestionJSON,
  payload: questionJSON,
})

export const updateProtocolIdAction = (protocolId: string): TUpdateProtocolIdAction => ({
  type: ECreateEntityActions.UpdateProtocolId,
  payload: protocolId,
})