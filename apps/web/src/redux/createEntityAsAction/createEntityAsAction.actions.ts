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
  ECreateEntityAsActionActions,
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
} from './createEntityAsAction.types'

export const updateEntityTypeAction = (entityType: string): TUpdateEntityTypeAction => ({
  type: ECreateEntityAsActionActions.UpdateEntityType,
  payload: entityType,
})

export const clearEntityAction = (): TClearEntityAction => ({
  type: ECreateEntityAsActionActions.ClearEntity,
})

export const gotoStepAction = (no: number): TGotoStepAction => ({
  type: ECreateEntityAsActionActions.GotoStep,
  payload: no,
})

export const updateBreadCrumbsAction = (breadCrumbs: { text: string; link?: string }[]): TUpdateBreadCrumbsAction => ({
  type: ECreateEntityAsActionActions.UpdateBreadCrumbs,
  payload: breadCrumbs,
})

export const updateTitleAction = (title: string): TUpdateTitleAction => ({
  type: ECreateEntityAsActionActions.UpdateTitle,
  payload: title,
})

export const updateSubtitleAction = (subtitle: string): TUpdateSubtitleAction => ({
  type: ECreateEntityAsActionActions.UpdateSubtitle,
  payload: subtitle,
})

export const updateProfileAction = (profile: TEntityMetadataModel): TUpdateProfileAction => ({
  type: ECreateEntityAsActionActions.UpdateProfile,
  payload: profile,
})

export const updateCreatorAction = (creator: TEntityCreatorModel): TUpdateCreatorAction => ({
  type: ECreateEntityAsActionActions.UpdateCreator,
  payload: creator,
})

export const updateAdministratorAction = (administrator: TEntityAdministratorModel): TUpdateAdministratorAction => ({
  type: ECreateEntityAsActionActions.UpdateAdministrator,
  payload: administrator,
})

export const updateDDOTagsAction = (ddoTags: TEntityDDOTagModel[]): TUpdateDDOTagsAction => ({
  type: ECreateEntityAsActionActions.UpdateDDOTags,
  payload: ddoTags,
})

export const updatePageAction = (page: TEntityPageModel): TUpdatePageAction => ({
  type: ECreateEntityAsActionActions.UpdatePage,
  payload: page,
})

export const updateServiceAction = (services: TEntityServiceModel[]): TUpdateServiceAction => ({
  type: ECreateEntityAsActionActions.UpdateService,
  payload: services,
})

export const updateClaimAction = (claim: { [id: string]: TEntityClaimModel }): TUpdateClaimAction => ({
  type: ECreateEntityAsActionActions.UpdateClaim,
  payload: claim,
})

export const updateLinkedResourceAction = (linkedResource: {
  [id: string]: LinkedResource
}): TUpdateLinkedResourceAction => ({
  type: ECreateEntityAsActionActions.UpdateLinkedResource,
  payload: linkedResource,
})

export const updateAccordedRightAction = (accordedRight: {
  [id: string]: AccordedRight
}): TUpdateAccordedRightAction => ({
  type: ECreateEntityAsActionActions.UpdateAccordedRight,
  payload: accordedRight,
})

export const updateLinkedEntityAction = (linkedEntity: { [id: string]: LinkedEntity }): TUpdateLinkedEntityAction => ({
  type: ECreateEntityAsActionActions.UpdateLinkedEntity,
  payload: linkedEntity,
})

export const updateStartEndDateAction = (startDate: string, endDate: string): TUpdateStartEndDateAction => ({
  type: ECreateEntityAsActionActions.UpdateStartEndDate,
  payload: { startDate, endDate },
})

export const addAssetInstancesAction = (instances: TCreateEntityModel[]): TAddAssetInstancesAction => ({
  type: ECreateEntityAsActionActions.AddAssetInstances,
  payload: instances,
})

export const updateAssetInstanceAction = (id: number, instance: TCreateEntityModel): TUpdateAssetInstanceAction => ({
  type: ECreateEntityAsActionActions.UpdateAssetInstance,
  payload: { id, data: instance },
})

export const removeAssetInstancesAction = (): TRemoveAssetInstancesAction => ({
  type: ECreateEntityAsActionActions.RemoveAssetInstances,
})

export const updateLocalisationAction = (localisation: ELocalisation): TUpdateLocalisationAction => ({
  type: ECreateEntityAsActionActions.UpdateLocalisation,
  payload: localisation,
})

// for DAO
export const updateDAOGroupsAction = (daoGroups: { [id: string]: TDAOGroupModel }): TUpdateDAOGroupsAction => ({
  type: ECreateEntityAsActionActions.UpdateDAOGroups,
  payload: daoGroups,
})

export const updateDAOControllerAction = (controller: string): TUpdateDAOControllerAction => ({
  type: ECreateEntityAsActionActions.UpdateDAOController,
  payload: controller,
})

// for Proposal
export const updateProposalAction = (proposal: TProposalModel): TUpdateProposalAction => ({
  type: ECreateEntityAsActionActions.UpdateProposal,
  payload: proposal,
})

// for Claim
export const updateClaimQuestionsAction = (claimQuestions: {
  [id: string]: TQuestion
}): TUpdateClaimQuestionsAction => ({
  type: ECreateEntityAsActionActions.UpdateClaimQuestions,
  payload: claimQuestions,
})
export const updateQuestionJSONAction = (questionJSON: any): TUpdateQuestionJSONAction => ({
  type: ECreateEntityAsActionActions.UpdateQuestionJSON,
  payload: questionJSON,
})