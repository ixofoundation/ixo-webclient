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
  services: TEntityServiceModel[]
  payments: TEntityPaymentModel[]
  liquidity: TEntityLiquidityModel[]
  claims: { [id: string]: TEntityClaimModel }
  linkedResources: { [id: string]: TEntityLinkedResourceModel }

  stepNo: number
}

export enum ECreateEntityActions {
  UpdateEntityType = 'ixo/create/entity/UPDATE_ENTITY_TYPE',
  GotoStep = 'ixo/create/entity/GOTO_STEP',
  UpdateMetadata = 'ixo/create/entity/UPDATE_METADATA',
  UpdateCreator = 'ixo/create/entity/UPDATE_CREATOR',
  UpdateTags = 'ixo/create/entity/UPDATE_TAGS',
  UpdateServices = 'ixo/create/entity/UPDATE_SERVICES',
  UpdatePayments = 'ixo/create/entity/UPDATE_PAYMENTS',
  UpdateLiquidity = 'ixo/create/entity/UPDATE_LIQUIDITY',
  UpdateClaims = 'ixo/create/entity/UPDATE_CLAIMS',
  UpdateLinkedResources = 'ixo/create/entity/UPDATE_LINKED_RESOURCES',
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
export interface TUpdateServicesAction {
  type: typeof ECreateEntityActions.UpdateServices
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
export interface TUpdateLinkedResourcesAction {
  type: typeof ECreateEntityActions.UpdateLinkedResources
  payload: { [id: string]: TEntityLinkedResourceModel }
}

export type TCreateEntityActionTypes =
  | TUpdateEntityTypeAction
  | TGotoStepAction
  | TUpdateMetaDataAction
  | TUpdateCreatorAction
  | TUpdateTagsAction
  | TUpdateServicesAction
  | TUpdatePaymentsAction
  | TUpdateLiquidityAction
  | TUpdateClaimsAction
  | TUpdateLinkedResourcesAction
