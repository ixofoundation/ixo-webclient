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
  TEntityClaimModel,
  TEntityDDOTagModel,
  TDAOGroupModel,
  TProposalModel,
} from 'types/protocol'

export interface TCreateEntityModel {
  localisation: ELocalisation
  profile: TEntityMetadataModel
  creator: TEntityCreatorModel
  administrator: TEntityAdministratorModel
  ddoTags: TEntityDDOTagModel[]
  page: TEntityPageModel
  service: TEntityServiceModel[]
  claim: { [id: string]: TEntityClaimModel }
  linkedResource: { [id: string]: TEntityLinkedResourceModel }
  accordedRight: { [id: string]: TEntityAccordedRightModel }
  linkedEntity: { [id: string]: TEntityLinkedEntityModel }
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

  // extra
  stepNo: number
  breadCrumbs: { text: string; link?: string }[]
  title: string
  subtitle: string

  // for proposals
  redirectTo: string
}

export enum ECreateEntityActions {
  UpdateEntityType = 'ixo/create/entity/UPDATE_ENTITY_TYPE',
  ClearEntity = 'ixo/create/entity/CLEAR_ENTITY',
  GotoStep = 'ixo/create/entity/GOTO_STEP',
  UpdateBreadCrumbs = 'ixo/create/entity/UPDATE_BREAD_CRUMBS',
  UpdateTitle = 'ixo/create/entity/UPDATE_TITLE',
  UpdateSubtitle = 'ixo/create/entity/UPDATE_SUBTITLE',

  UpdateProfile = 'ixo/create/entity/UPDATE_PROFILE',
  UpdateCreator = 'ixo/create/entity/UPDATE_CREATOR',
  UpdateAdministrator = 'ixo/create/entity/UPDATE_ADMINISTRATOR',
  UpdateDDOTags = 'ixo/create/entity/UPDATE_DDOTAGS',
  UpdatePage = 'ixo/create/entity/UPDATE_PAGE',
  UpdateService = 'ixo/create/entity/UPDATE_SERVICE',
  UpdateClaim = 'ixo/create/entity/UPDATE_CLAIM',
  UpdateLinkedResource = 'ixo/create/entity/UPDATE_LINKED_RESOURCE',
  UpdateAccordedRight = 'ixo/create/entity/UPDATE_ACCORDED_RIGHT',
  UpdateLinkedEntity = 'ixo/create/entity/UPDATE_LINKED_ENTITY',
  AddAssetInstances = 'ixo/create/entity/ADD_ASSET_INSTANCES',
  UpdateAssetInstance = 'ixo/create/entity/UPDATE_ASSET_INSTANCE',
  RemoveAssetInstances = 'ixo/create/entity/REMOVE_ASSET_INSTANCES',
  UpdateLocalisation = 'ixo/create/entity/UPDATE_LOCALISATION',
  // for DAO
  UpdateDAOGroups = 'ixo/create/entity/UPDATE_DAO_GROUPS',
  UpdateDAOController = 'ixo/create/entity/UPDATE_DAO_CONTROLLER',
  // for Proposal
  UpdateProposal = 'ixo/create/entity/UPDATE_PROPOSAL',
  SetRedirectTo = 'ixo/create/entity/SET_REDIRECTTO',
}

export interface TUpdateEntityTypeAction {
  type: typeof ECreateEntityActions.UpdateEntityType
  payload: string
}
export interface TClearEntityAction {
  type: typeof ECreateEntityActions.ClearEntity
}
export interface TGotoStepAction {
  type: typeof ECreateEntityActions.GotoStep
  payload: number
}
export interface TUpdateBreadCrumbsAction {
  type: typeof ECreateEntityActions.UpdateBreadCrumbs
  payload: { text: string; link?: string }[]
}
export interface TUpdateTitleAction {
  type: typeof ECreateEntityActions.UpdateTitle
  payload: string
}
export interface TUpdateSubtitleAction {
  type: typeof ECreateEntityActions.UpdateSubtitle
  payload: string
}
export interface TUpdateProfileAction {
  type: typeof ECreateEntityActions.UpdateProfile
  payload: TEntityMetadataModel
}
export interface TUpdateCreatorAction {
  type: typeof ECreateEntityActions.UpdateCreator
  payload: TEntityCreatorModel
}
export interface TUpdateAdministratorAction {
  type: typeof ECreateEntityActions.UpdateAdministrator
  payload: TEntityAdministratorModel
}
export interface TUpdateDDOTagsAction {
  type: typeof ECreateEntityActions.UpdateDDOTags
  payload: TEntityDDOTagModel[]
}
export interface TUpdatePageAction {
  type: typeof ECreateEntityActions.UpdatePage
  payload: TEntityPageModel
}
export interface TUpdateServiceAction {
  type: typeof ECreateEntityActions.UpdateService
  payload: TEntityServiceModel[]
}
export interface TUpdateClaimAction {
  type: typeof ECreateEntityActions.UpdateClaim
  payload: { [id: string]: TEntityClaimModel }
}
export interface TUpdateLinkedResourceAction {
  type: typeof ECreateEntityActions.UpdateLinkedResource
  payload: { [id: string]: TEntityLinkedResourceModel }
}
export interface TUpdateAccordedRightAction {
  type: typeof ECreateEntityActions.UpdateAccordedRight
  payload: { [id: string]: TEntityAccordedRightModel }
}
export interface TUpdateLinkedEntityAction {
  type: typeof ECreateEntityActions.UpdateLinkedEntity
  payload: { [id: string]: TEntityLinkedEntityModel }
}
export interface TAddAssetInstancesAction {
  type: typeof ECreateEntityActions.AddAssetInstances
  payload: TCreateEntityModel[]
}
export interface TUpdateAssetInstanceAction {
  type: typeof ECreateEntityActions.UpdateAssetInstance
  payload: {
    id: number
    data: TCreateEntityModel
  }
}
export interface TRemoveAssetInstancesAction {
  type: typeof ECreateEntityActions.RemoveAssetInstances
}
export interface TUpdateLocalisationAction {
  type: typeof ECreateEntityActions.UpdateLocalisation
  payload: ELocalisation
}
export interface TUpdateDAOGroupsAction {
  type: typeof ECreateEntityActions.UpdateDAOGroups
  payload: { [id: string]: TDAOGroupModel }
}
export interface TUpdateDAOControllerAction {
  type: typeof ECreateEntityActions.UpdateDAOController
  payload: string
}
export interface TUpdateProposalAction {
  type: typeof ECreateEntityActions.UpdateProposal
  payload: TProposalModel
}

export interface TSetRedirectToAction {
  type: typeof ECreateEntityActions.SetRedirectTo
  payload: string
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
  | TAddAssetInstancesAction
  | TUpdateAssetInstanceAction
  | TRemoveAssetInstancesAction
  | TUpdateLocalisationAction
  | TUpdateDAOGroupsAction
  | TUpdateDAOControllerAction
  | TUpdateProposalAction
  | TSetRedirectToAction
