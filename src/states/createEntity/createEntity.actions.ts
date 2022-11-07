import { TEntityCreatorModel, TEntityMetadataModel } from 'types'
import {
  ECreateEntityActions,
  TGotoStepAction,
  TUpdateCreatorAction,
  TUpdateEntityTypeAction,
  TUpdateMetaDataAction,
} from './createEntity.types'

export const updateEntityTypeAction = (
  entityType: string,
): TUpdateEntityTypeAction => ({
  type: ECreateEntityActions.UpdateEntityType,
  payload: entityType,
})

export const gotoStepAction = (no: number): TGotoStepAction => ({
  type: ECreateEntityActions.GotoStep,
  payload: no,
})

export const updateMetadataAction = (
  metadata: TEntityMetadataModel,
): TUpdateMetaDataAction => ({
  type: ECreateEntityActions.UpdateMetadata,
  payload: metadata,
})

export const updateCreatorAction = (
  creator: TEntityCreatorModel,
): TUpdateCreatorAction => ({
  type: ECreateEntityActions.UpdateCreator,
  payload: creator,
})
