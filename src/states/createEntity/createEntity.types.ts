import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityTagsModel,
  TEntityServiceModel,
  TEntityPaymentModel,
  TEntityLiquidityModel,
  TEntityClaimModel,
  TEntityLinkedResourceModel,
} from 'types'

export interface TCreateEntityState {
  entityType: string
  metadata: TEntityMetadataModel
  creator: TEntityCreatorModel
  tags: TEntityTagsModel
  service: TEntityServiceModel[]
  payments: TEntityPaymentModel[]
  liquidity: TEntityLiquidityModel[]
  claims: { [id: string]: TEntityClaimModel }
  linkedResource: { [id: string]: TEntityLinkedResourceModel }

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
