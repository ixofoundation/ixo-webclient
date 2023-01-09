import {
  ELocalisation,
  TEntityAccordedRightsModel,
  TEntityClaimModel,
  TEntityControllerModel,
  TEntityCreatorModel,
  TEntityLinkedResourceModel,
  TEntityLiquidityModel,
  TEntityMetadataModel,
  TEntityPageModel,
  TEntityPaymentModel,
  TEntityServiceModel,
  TEntityTagsModel,
} from 'types/protocol'
import {
  ECreateEntityActions,
  TAddAssetInstancesAction,
  TEntityModel,
  TGotoStepAction,
  TRemoveAssetInstancesAction,
  TUpdateAccordedRightsAction,
  TUpdateAssetClassDidAction,
  TUpdateAssetInstanceAction,
  TUpdateClaimsAction,
  TUpdateControllerAction,
  TUpdateCreatorAction,
  TUpdateEntityClassDidAction,
  TUpdateEntityTypeAction,
  TUpdateLinkedResourceAction,
  TUpdateLiquidityAction,
  TUpdateLocalisationAction,
  TUpdateMetaDataAction,
  TUpdatePageAction,
  TUpdatePaymentsAction,
  TUpdateServiceAction,
  TUpdateTagsAction,
} from './createEntity.types'

export const updateEntityTypeAction = (entityType: string): TUpdateEntityTypeAction => ({
  type: ECreateEntityActions.UpdateEntityType,
  payload: entityType,
})

export const gotoStepAction = (no: number): TGotoStepAction => ({
  type: ECreateEntityActions.GotoStep,
  payload: no,
})

export const updateMetadataAction = (metadata: TEntityMetadataModel): TUpdateMetaDataAction => ({
  type: ECreateEntityActions.UpdateMetadata,
  payload: metadata,
})

export const updateCreatorAction = (creator: TEntityCreatorModel): TUpdateCreatorAction => ({
  type: ECreateEntityActions.UpdateCreator,
  payload: creator,
})

export const updateControllerAction = (controller: TEntityControllerModel): TUpdateControllerAction => ({
  type: ECreateEntityActions.UpdateController,
  payload: controller,
})

export const updateTagsAction = (tags: TEntityTagsModel): TUpdateTagsAction => ({
  type: ECreateEntityActions.UpdateTags,
  payload: tags,
})

export const updateServiceAction = (services: TEntityServiceModel[]): TUpdateServiceAction => ({
  type: ECreateEntityActions.UpdateService,
  payload: services,
})

export const updatePaymentsAction = (payments: TEntityPaymentModel[]): TUpdatePaymentsAction => ({
  type: ECreateEntityActions.UpdatePayments,
  payload: payments,
})

export const updateLiquidityAction = (liquidity: TEntityLiquidityModel[]): TUpdateLiquidityAction => ({
  type: ECreateEntityActions.UpdateLiquidity,
  payload: liquidity,
})

export const updateClaimsAction = (claims: { [id: string]: TEntityClaimModel }): TUpdateClaimsAction => ({
  type: ECreateEntityActions.UpdateClaims,
  payload: claims,
})

export const updateLinkedResourceAction = (linkedResource: {
  [id: string]: TEntityLinkedResourceModel
}): TUpdateLinkedResourceAction => ({
  type: ECreateEntityActions.UpdateLinkedResource,
  payload: linkedResource,
})

export const updateAccordedRightsAction = (accordedRights: {
  [id: string]: TEntityAccordedRightsModel
}): TUpdateAccordedRightsAction => ({
  type: ECreateEntityActions.UpdateAccordedRights,
  payload: accordedRights,
})

export const updateEntityClassDidAction = (did: string): TUpdateEntityClassDidAction => ({
  type: ECreateEntityActions.UpdateEntityClassDid,
  payload: did,
})

export const updateAssetClassDidAction = (did: string): TUpdateAssetClassDidAction => ({
  type: ECreateEntityActions.UpdateAssetClassDid,
  payload: did,
})

export const addAssetInstancesAction = (instances: TEntityModel[]): TAddAssetInstancesAction => ({
  type: ECreateEntityActions.AddAssetInstances,
  payload: instances,
})

export const updateAssetInstanceAction = (id: number, instance: TEntityModel): TUpdateAssetInstanceAction => ({
  type: ECreateEntityActions.UpdateAssetInstance,
  payload: { id, data: instance },
})

export const removeAssetInstancesAction = (): TRemoveAssetInstancesAction => ({
  type: ECreateEntityActions.RemoveAssetInstances,
})

export const updateLocalisationAction = (localisation: ELocalisation): TUpdateLocalisationAction => ({
  type: ECreateEntityActions.UpdateLocalisation,
  payload: localisation,
})

export const updatePageAction = (page: TEntityPageModel): TUpdatePageAction => ({
  type: ECreateEntityActions.UpdatePage,
  payload: page,
})
