import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityTagsModel,
} from 'types'

export interface TCreateEntityState {
  entityType: string
  metadata: TEntityMetadataModel
  creator: TEntityCreatorModel
  tags: TEntityTagsModel

  stepNo: number
}

export enum ECreateEntityActions {
  UpdateEntityType = 'ixo/create/entity/UPDATE_ENTITY_TYPE',
  GotoStep = 'ixo/create/entity/GOTO_STEP',
  UpdateMetadata = 'ixo/create/entity/UPDATE_METADATA',
  UpdateCreator = 'ixo/create/entity/UPDATE_CREATOR',
  UpdateTags = 'ixo/create/entity/UPDATE_TAGS',
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

export type TCreateEntityActionTypes =
  | TUpdateEntityTypeAction
  | TGotoStepAction
  | TUpdateMetaDataAction
  | TUpdateCreatorAction
  | TUpdateTagsAction
