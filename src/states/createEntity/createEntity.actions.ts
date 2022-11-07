import {
  TEntityCreatorModel,
  TEntityMetadataModel,
  TEntityPaymentModel,
  TEntityServiceModel,
  TEntityTagsModel,
} from 'types'
import {
  ECreateEntityActions,
  TGotoStepAction,
  TUpdateCreatorAction,
  TUpdateEntityTypeAction,
  TUpdateMetaDataAction,
  TUpdatePaymentsAction,
  TUpdateServicesAction,
  TUpdateTagsAction,
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

export const updateTagsAction = (
  tags: TEntityTagsModel,
): TUpdateTagsAction => ({
  type: ECreateEntityActions.UpdateTags,
  payload: tags,
})

export const updateServicesAction = (
  services: TEntityServiceModel[],
): TUpdateServicesAction => ({
  type: ECreateEntityActions.UpdateServices,
  payload: services,
})

export const updatePaymentsAction = (
  payments: TEntityPaymentModel[],
): TUpdatePaymentsAction => ({
  type: ECreateEntityActions.UpdatePayments,
  payload: payments,
})
