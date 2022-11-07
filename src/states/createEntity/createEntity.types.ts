import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityTagsModel,
  TEntityServiceModel,
} from 'types'

export interface TCreateEntityState {
  entityType: string
  metadata: TEntityMetadataModel
  creator: TEntityCreatorModel
  tags: TEntityTagsModel
  services: TEntityServiceModel[]

  stepNo: number
}

export enum ECreateEntityActions {
  UpdateEntityType = 'ixo/create/entity/UPDATE_ENTITY_TYPE',
  GotoStep = 'ixo/create/entity/GOTO_STEP',
  UpdateMetadata = 'ixo/create/entity/UPDATE_METADATA',
  UpdateCreator = 'ixo/create/entity/UPDATE_CREATOR',
  UpdateTags = 'ixo/create/entity/UPDATE_TAGS',
  UpdateServices = 'ixo/create/entity/UPDATE_SERVICES',
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

export type TCreateEntityActionTypes =
  | TUpdateEntityTypeAction
  | TGotoStepAction
  | TUpdateMetaDataAction
  | TUpdateCreatorAction
  | TUpdateTagsAction
  | TUpdateServicesAction
