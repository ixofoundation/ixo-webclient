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
  TDeedModel,
} from 'types/protocol'

export interface TEntityModel {
  localisation: ELocalisation
  metadata: TEntityMetadataModel
  creator: TEntityCreatorModel
  administrator: TEntityAdministratorModel
  ddoTags: TEntityDDOTagModel[]
  page: TEntityPageModel
  service: TEntityServiceModel[]
  claim: { [id: string]: TEntityClaimModel1 }
  linkedResource: { [id: string]: TEntityLinkedResourceModel }
  accordedRight: { [id: string]: TEntityAccordedRightModel }
  linkedEntity: { [id: string]: TEntityLinkedEntityModel }
}

export interface TCreateEntityState extends TEntityModel {
  entityType: string

  // for Asset
  assetInstances?: TEntityModel[] // TODO: for nfts?

  // for DAO
  daoGroups?: { [id: string]: TDAOGroupModel }
  daoController?: string

  // for Deed
  deed?: TDeedModel

  // extra
  stepNo: number
  breadCrumbs: { text: string; link?: string }[]
  title: string
  subtitle: string
}

export enum ECreateEntityActions {
  UpdateEntityType = 'ixo/create/entity/UPDATE_ENTITY_TYPE',
  GotoStep = 'ixo/create/entity/GOTO_STEP',
  UpdateBreadCrumbs = 'ixo/create/entity/UPDATE_BREAD_CRUMBS',
  UpdateTitle = 'ixo/create/entity/UPDATE_TITLE',
  UpdateSubtitle = 'ixo/create/entity/UPDATE_SUBTITLE',

  UpdateMetadata = 'ixo/create/entity/UPDATE_METADATA',
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
  // for Deed
  UpdateDeed = 'ixo/create/entity/UPDATE_DEED',
}

export interface TUpdateEntityTypeAction {
  type: typeof ECreateEntityActions.UpdateEntityType
  payload: string
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
export interface TUpdateMetaDataAction {
  type: typeof ECreateEntityActions.UpdateMetadata
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
  payload: { [id: string]: TEntityClaimModel1 }
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
  payload: TEntityModel[]
}
export interface TUpdateAssetInstanceAction {
  type: typeof ECreateEntityActions.UpdateAssetInstance
  payload: {
    id: number
    data: TEntityModel
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
export interface TUpdateDeedAction {
  type: typeof ECreateEntityActions.UpdateDeed
  payload: TDeedModel
}

export type TCreateEntityActionTypes =
  | TUpdateEntityTypeAction
  | TGotoStepAction
  | TUpdateBreadCrumbsAction
  | TUpdateTitleAction
  | TUpdateSubtitleAction
  | TUpdateMetaDataAction
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
  | TUpdateDeedAction
