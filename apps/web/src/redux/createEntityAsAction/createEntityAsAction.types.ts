import { AccordedRight, LinkedEntity, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityServiceModel,
  TEntityAdministratorModel,
  TEntityPageModel,
  TEntityClaimModel,
  TEntityDDOTagModel,
  TDAOGroupModel,
  TProposalModel,
} from 'types/entities'
import { ELocalisation, TQuestion } from 'types/protocol'

export interface TCreateEntityModel {
  localisation: ELocalisation
  profile: TEntityMetadataModel
  creator: TEntityCreatorModel
  administrator: TEntityAdministratorModel
  ddoTags: TEntityDDOTagModel[]
  page: TEntityPageModel
  service: TEntityServiceModel[]
  claim: { [id: string]: TEntityClaimModel }
  linkedResource: { [id: string]: LinkedResource }
  accordedRight: { [id: string]: AccordedRight[] }
  linkedEntity: { [id: string]: LinkedEntity }

  startDate?: string
  endDate?: string
}

export interface TCreateEntityState extends TCreateEntityModel {
  entityType: string

  // for Asset
  assetInstances?: TCreateEntityModel[] // TODO: for nfts?

  // for DAO
  daoGroups?: { [id: string]: TDAOGroupModel }
  daoController?: string

  // for Proposal
  proposal?: TProposalModel

  // for Claim
  claimQuestions?: {
    [id: string]: TQuestion
  }
  questionJSON?: any

  // extra
  stepNo: number
  breadCrumbs: { text: string; link?: string }[]
  title: string
  subtitle: string
}

export enum ECreateEntityAsActionActions {
  UpdateEntityType = 'ixo/create/entityAsAction/UPDATE_ENTITY_TYPE',
  ClearEntity = 'ixo/create/entityAsAction/CLEAR_ENTITY',
  GotoStep = 'ixo/create/entityAsAction/GOTO_STEP',
  UpdateBreadCrumbs = 'ixo/create/entityAsAction/UPDATE_BREAD_CRUMBS',
  UpdateTitle = 'ixo/create/entityAsAction/UPDATE_TITLE',
  UpdateSubtitle = 'ixo/create/entityAsAction/UPDATE_SUBTITLE',

  UpdateProfile = 'ixo/create/entityAsAction/UPDATE_PROFILE',
  UpdateCreator = 'ixo/create/entityAsAction/UPDATE_CREATOR',
  UpdateAdministrator = 'ixo/create/entityAsAction/UPDATE_ADMINISTRATOR',
  UpdateDDOTags = 'ixo/create/entityAsAction/UPDATE_DDOTAGS',
  UpdatePage = 'ixo/create/entityAsAction/UPDATE_PAGE',
  UpdateService = 'ixo/create/entityAsAction/UPDATE_SERVICE',
  UpdateClaim = 'ixo/create/entityAsAction/UPDATE_CLAIM',
  UpdateLinkedResource = 'ixo/create/entityAsAction/UPDATE_LINKED_RESOURCE',
  UpdateAccordedRight = 'ixo/create/entityAsAction/UPDATE_ACCORDED_RIGHT',
  UpdateLinkedEntity = 'ixo/create/entityAsAction/UPDATE_LINKED_ENTITY',
  AddAssetInstances = 'ixo/create/entityAsAction/ADD_ASSET_INSTANCES',
  UpdateAssetInstance = 'ixo/create/entityAsAction/UPDATE_ASSET_INSTANCE',
  RemoveAssetInstances = 'ixo/create/entityAsAction/REMOVE_ASSET_INSTANCES',
  UpdateLocalisation = 'ixo/create/entityAsAction/UPDATE_LOCALISATION',
  UpdateStartEndDate = 'ixo/create/entityAsAction/UPDATE_START_END_DATE',
  // for DAO
  UpdateDAOGroups = 'ixo/create/entityAsAction/UPDATE_DAO_GROUPS',
  UpdateDAOController = 'ixo/create/entityAsAction/UPDATE_DAO_CONTROLLER',
  // for Proposal
  UpdateProposal = 'ixo/create/entityAsAction/UPDATE_PROPOSAL',
  // for Claim
  UpdateClaimQuestions = 'ixo/create/entityAsAction/UPDATE_CLAIM_QUESTIONS',
  UpdateQuestionJSON = 'ixo/create/entityAsAction/UPDATE_QUESTION_JSON',
}

export interface TUpdateEntityTypeAction {
  type: typeof ECreateEntityAsActionActions.UpdateEntityType
  payload: string
}
export interface TClearEntityAction {
  type: typeof ECreateEntityAsActionActions.ClearEntity
}
export interface TGotoStepAction {
  type: typeof ECreateEntityAsActionActions.GotoStep
  payload: number
}
export interface TUpdateBreadCrumbsAction {
  type: typeof ECreateEntityAsActionActions.UpdateBreadCrumbs
  payload: { text: string; link?: string }[]
}
export interface TUpdateTitleAction {
  type: typeof ECreateEntityAsActionActions.UpdateTitle
  payload: string
}
export interface TUpdateSubtitleAction {
  type: typeof ECreateEntityAsActionActions.UpdateSubtitle
  payload: string
}
export interface TUpdateProfileAction {
  type: typeof ECreateEntityAsActionActions.UpdateProfile
  payload: TEntityMetadataModel
}
export interface TUpdateCreatorAction {
  type: typeof ECreateEntityAsActionActions.UpdateCreator
  payload: TEntityCreatorModel
}
export interface TUpdateAdministratorAction {
  type: typeof ECreateEntityAsActionActions.UpdateAdministrator
  payload: TEntityAdministratorModel
}
export interface TUpdateDDOTagsAction {
  type: typeof ECreateEntityAsActionActions.UpdateDDOTags
  payload: TEntityDDOTagModel[]
}
export interface TUpdatePageAction {
  type: typeof ECreateEntityAsActionActions.UpdatePage
  payload: TEntityPageModel
}
export interface TUpdateServiceAction {
  type: typeof ECreateEntityAsActionActions.UpdateService
  payload: TEntityServiceModel[]
}
export interface TUpdateClaimAction {
  type: typeof ECreateEntityAsActionActions.UpdateClaim
  payload: { [id: string]: TEntityClaimModel }
}
export interface TUpdateLinkedResourceAction {
  type: typeof ECreateEntityAsActionActions.UpdateLinkedResource
  payload: { [id: string]: LinkedResource }
}
export interface TUpdateAccordedRightAction {
  type: typeof ECreateEntityAsActionActions.UpdateAccordedRight
  payload: { [id: string]: AccordedRight[] }
}
export interface TUpdateLinkedEntityAction {
  type: typeof ECreateEntityAsActionActions.UpdateLinkedEntity
  payload: { [id: string]: LinkedEntity }
}
export interface TUpdateStartEndDateAction {
  type: typeof ECreateEntityAsActionActions.UpdateStartEndDate
  payload: { startDate: string; endDate: string }
}
export interface TAddAssetInstancesAction {
  type: typeof ECreateEntityAsActionActions.AddAssetInstances
  payload: TCreateEntityModel[]
}
export interface TUpdateAssetInstanceAction {
  type: typeof ECreateEntityAsActionActions.UpdateAssetInstance
  payload: {
    id: number
    data: TCreateEntityModel
  }
}
export interface TRemoveAssetInstancesAction {
  type: typeof ECreateEntityAsActionActions.RemoveAssetInstances
}
export interface TUpdateLocalisationAction {
  type: typeof ECreateEntityAsActionActions.UpdateLocalisation
  payload: ELocalisation
}
export interface TUpdateDAOGroupsAction {
  type: typeof ECreateEntityAsActionActions.UpdateDAOGroups
  payload: { [id: string]: TDAOGroupModel }
}
export interface TUpdateDAOControllerAction {
  type: typeof ECreateEntityAsActionActions.UpdateDAOController
  payload: string
}
export interface TUpdateProposalAction {
  type: typeof ECreateEntityAsActionActions.UpdateProposal
  payload: TProposalModel
}
export interface TUpdateClaimQuestionsAction {
  type: typeof ECreateEntityAsActionActions.UpdateClaimQuestions
  payload: {
    [id: string]: TQuestion
  }
}
export interface TUpdateQuestionJSONAction {
  type: typeof ECreateEntityAsActionActions.UpdateQuestionJSON
  payload: any
}

export type TCreateEntityActionTypes =
  | TUpdateEntityTypeAction
  | TClearEntityAction
  | TGotoStepAction
  | TUpdateBreadCrumbsAction
  | TUpdateTitleAction
  | TUpdateSubtitleAction
  | TUpdateProfileAction
  | TUpdateCreatorAction
  | TUpdateAdministratorAction
  | TUpdateDDOTagsAction
  | TUpdatePageAction
  | TUpdateServiceAction
  | TUpdateClaimAction
  | TUpdateLinkedResourceAction
  | TUpdateAccordedRightAction
  | TUpdateLinkedEntityAction
  | TUpdateStartEndDateAction
  | TAddAssetInstancesAction
  | TUpdateAssetInstanceAction
  | TRemoveAssetInstancesAction
  | TUpdateLocalisationAction
  | TUpdateDAOGroupsAction
  | TUpdateDAOControllerAction
  | TUpdateProposalAction
  | TUpdateClaimQuestionsAction
  | TUpdateQuestionJSONAction