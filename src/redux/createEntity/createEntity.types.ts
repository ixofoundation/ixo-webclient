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
  TEntityProfileModel,
  TEntityDDOTagModel,
  TDAOGroupModel,
} from 'types/protocol'

export interface TEntityModel {
  localisation: ELocalisation
  /**
   * @deprecated
   */
  metadata: TEntityMetadataModel
  creator: TEntityCreatorModel
  controller: TEntityControllerModel
  /**
   * @deprecated
   */
  tags: TEntityTagsModel
  ddoTags: TEntityDDOTagModel[]
  page: TEntityPageModel
  service: TEntityServiceModel[]
  profile: TEntityProfileModel
  claim: { [id: string]: TEntityClaimModel1 }
  linkedResource: { [id: string]: TEntityLinkedResourceModel }
  accordedRight: { [id: string]: TEntityAccordedRightModel }
  linkedEntity: { [id: string]: TEntityLinkedEntityModel }

  // for DAO
  daoGroups?: { [id: string]: TDAOGroupModel }
}

export interface TCreateEntityState extends TEntityModel {
  entityType: string
  entityClassDid: string

  assetClassDid?: string // TODO: for asset?
  assetInstances?: TEntityModel[] // TODO: for nfts?

  stepNo: number
}

export enum ECreateEntityActions {
  UpdateEntityType = 'ixo/create/entity/UPDATE_ENTITY_TYPE',
  GotoStep = 'ixo/create/entity/GOTO_STEP',
  /**
   * @deprecated
   */
  UpdateMetadata = 'ixo/create/entity/UPDATE_METADATA',
  UpdateProfile = 'ixo/create/entity/UPDATE_PROFILE',
  UpdateCreator = 'ixo/create/entity/UPDATE_CREATOR',
  UpdateController = 'ixo/create/entity/UPDATE_CONTROLLER',
  /**
   * @deprecated
   */
  UpdateTags = 'ixo/create/entity/UPDATE_TAGS',
  UpdateDDOTags = 'ixo/create/entity/UPDATE_DDOTAGS',
  UpdatePage = 'ixo/create/entity/UPDATE_PAGE',
  UpdateService = 'ixo/create/entity/UPDATE_SERVICE',
  UpdateClaim = 'ixo/create/entity/UPDATE_CLAIM',
  UpdateLinkedResource = 'ixo/create/entity/UPDATE_LINKED_RESOURCE',
  UpdateAccordedRight = 'ixo/create/entity/UPDATE_ACCORDED_RIGHT',
  UpdateLinkedEntity = 'ixo/create/entity/UPDATE_LINKED_ENTITY',
  UpdateEntityClassDid = 'ixo/create/entity/UPDATE_ENTITY_CLASS_DID',
  UpdateAssetClassDid = 'ixo/create/entity/UPDATE_ASSET_CLASS_DID',
  AddAssetInstances = 'ixo/create/entity/ADD_ASSET_INSTANCES',
  UpdateAssetInstance = 'ixo/create/entity/UPDATE_ASSET_INSTANCE',
  RemoveAssetInstances = 'ixo/create/entity/REMOVE_ASSET_INSTANCES',
  UpdateLocalisation = 'ixo/create/entity/UPDATE_LOCALISATION',
  // for DAO
  UpdateDAOGroups = 'ixo/create/entity/UPDATE_DAO_GROUPS',
}

export interface TUpdateEntityTypeAction {
  type: typeof ECreateEntityActions.UpdateEntityType
  payload: string
}
export interface TGotoStepAction {
  type: typeof ECreateEntityActions.GotoStep
  payload: number
}
export interface TUpdateProfileAction {
  type: typeof ECreateEntityActions.UpdateProfile
  payload: TEntityProfileModel
}
/**
 * @deprecated
 */
export interface TUpdateMetaDataAction {
  type: typeof ECreateEntityActions.UpdateMetadata
  payload: TEntityMetadataModel
}
export interface TUpdateCreatorAction {
  type: typeof ECreateEntityActions.UpdateCreator
  payload: TEntityCreatorModel
}
export interface TUpdateControllerAction {
  type: typeof ECreateEntityActions.UpdateController
  payload: TEntityControllerModel
}
/**
 * @deprecated
 */
export interface TUpdateTagsAction {
  type: typeof ECreateEntityActions.UpdateTags
  payload: TEntityTagsModel
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
export interface TUpdateEntityClassDidAction {
  type: typeof ECreateEntityActions.UpdateEntityClassDid
  payload: string
}
export interface TUpdateAssetClassDidAction {
  type: typeof ECreateEntityActions.UpdateAssetClassDid
  payload: string
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

export type TCreateEntityActionTypes =
  | TUpdateEntityTypeAction
  | TGotoStepAction
  | TUpdateProfileAction
  | TUpdateMetaDataAction
  | TUpdateCreatorAction
  | TUpdateControllerAction
  | TUpdateTagsAction
  | TUpdateDDOTagsAction
  | TUpdatePageAction
  | TUpdateServiceAction
  | TUpdateClaimAction
  | TUpdateLinkedResourceAction
  | TUpdateAccordedRightAction
  | TUpdateLinkedEntityAction
  | TUpdateEntityClassDidAction
  | TUpdateAssetClassDidAction
  | TAddAssetInstancesAction
  | TUpdateAssetInstanceAction
  | TRemoveAssetInstancesAction
  | TUpdateLocalisationAction
  | TUpdateDAOGroupsAction
