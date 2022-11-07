import { TEntityMetadataModel, TEntityCreatorModel } from 'types'

export interface TCreateEntityState {
  entityType: string
  metadata: TEntityMetadataModel
  creator: TEntityCreatorModel

  stepNo: number
}

export enum ECreateEntityActions {
  UpdateEntityType = 'ixo/create/entity/UPDATE_ENTITY_TYPE',
  GotoStep = 'ixo/create/entity/GOTO_STEP',
  UpdateMetadata = 'ixo/create/entity/UPDATE_METADATA',
  UpdateCreator = 'ixo/create/entity/UPDATE_CREATOR',
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

export type TCreateEntityActionTypes =
  | TUpdateEntityTypeAction
  | TGotoStepAction
  | TUpdateMetaDataAction
  | TUpdateCreatorAction
