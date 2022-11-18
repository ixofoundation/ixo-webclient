import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityTagsModel,
  TEntityServiceModel,
  TEntityPaymentModel,
  TEntityLiquidityModel,
  TEntityClaimModel,
  TEntityLinkedResourceModel,
  ELocalisation,
  TEntityPageModel,
  TEntityControllerModel,
} from 'types'

export interface TEntityModel {
  localisation: ELocalisation
  metadata: TEntityMetadataModel
  creator: TEntityCreatorModel
  controller: TEntityControllerModel
  tags: TEntityTagsModel
  page: TEntityPageModel
  service: TEntityServiceModel[]
  payments: TEntityPaymentModel[]
  liquidity: TEntityLiquidityModel[]
  claims: { [id: string]: TEntityClaimModel }
  linkedResource: { [id: string]: TEntityLinkedResourceModel }
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
  UpdateMetadata = 'ixo/create/entity/UPDATE_METADATA',
  UpdateCreator = 'ixo/create/entity/UPDATE_CREATOR',
  UpdateTags = 'ixo/create/entity/UPDATE_TAGS',
  UpdateService = 'ixo/create/entity/UPDATE_SERVICE',
  UpdatePayments = 'ixo/create/entity/UPDATE_PAYMENTS',
  UpdateLiquidity = 'ixo/create/entity/UPDATE_LIQUIDITY',
  UpdateClaims = 'ixo/create/entity/UPDATE_CLAIMS',
  UpdateLinkedResource = 'ixo/create/entity/UPDATE_LINKED_RESOURCE',
  UpdateEntityClassDid = 'ixo/create/entity/UPDATE_ENTITY_CLASS_DID',
  UpdateAssetClassDid = 'ixo/create/entity/UPDATE_ASSET_CLASS_DID',
  AddAssetInstances = 'ixo/create/entity/ADD_ASSET_INSTANCES',
  UpdateAssetInstance = 'ixo/create/entity/UPDATE_ASSET_INSTANCE',
  UpdateLocalisation = 'ixo/create/entity/UPDATE_LOCALISATION',
}

export interface TUpdateEntityTypeAction {
  type: typeof ECreateEntityActions.UpdateEntityType
  payload: string
}
export interface TGotoStepAction {
  type: typeof ECreateEntityActions.GotoStep
  payload: number
}
export interface TUpdateMetaDataAction {
  type: typeof ECreateEntityActions.UpdateMetadata
  payload: TEntityMetadataModel
}
export interface TUpdateCreatorAction {
  type: typeof ECreateEntityActions.UpdateCreator
  payload: TEntityCreatorModel
}
export interface TUpdateTagsAction {
  type: typeof ECreateEntityActions.UpdateTags
  payload: TEntityTagsModel
}
export interface TUpdateServiceAction {
  type: typeof ECreateEntityActions.UpdateService
  payload: TEntityServiceModel[]
}
export interface TUpdatePaymentsAction {
  type: typeof ECreateEntityActions.UpdatePayments
  payload: TEntityPaymentModel[]
}
export interface TUpdateLiquidityAction {
  type: typeof ECreateEntityActions.UpdateLiquidity
  payload: TEntityLiquidityModel[]
}
export interface TUpdateClaimsAction {
  type: typeof ECreateEntityActions.UpdateClaims
  payload: { [id: string]: TEntityClaimModel }
}
export interface TUpdateLinkedResourceAction {
  type: typeof ECreateEntityActions.UpdateLinkedResource
  payload: { [id: string]: TEntityLinkedResourceModel }
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
export interface TUpdateLocalisationAction {
  type: typeof ECreateEntityActions.UpdateLocalisation
  payload: ELocalisation
}

export type TCreateEntityActionTypes =
  | TUpdateEntityTypeAction
  | TGotoStepAction
  | TUpdateMetaDataAction
  | TUpdateCreatorAction
  | TUpdateTagsAction
  | TUpdateServiceAction
  | TUpdatePaymentsAction
  | TUpdateLiquidityAction
  | TUpdateClaimsAction
  | TUpdateLinkedResourceAction
  | TUpdateEntityClassDidAction
  | TUpdateAssetClassDidAction
  | TAddAssetInstancesAction
  | TUpdateAssetInstanceAction
  | TUpdateLocalisationAction
