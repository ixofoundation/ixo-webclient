import {
  ELocalisation,
  TEntityAccordedRightModel,
  TEntityClaimModel1,
  TEntityControllerModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityLinkedEntityModel,
  TEntityLinkedResourceModel,
  TEntityMetadataModel,
  TEntityPageModel,
  TEntityProfileModel,
  TEntityServiceModel,
  TEntityTagsModel,
} from 'types/protocol'
import {
  ECreateEntityActions,
  TAddAssetInstancesAction,
  TEntityModel,
  TGotoStepAction,
  TRemoveAssetInstancesAction,
  TUpdateAccordedRightAction,
  TUpdateAssetClassDidAction,
  TUpdateAssetInstanceAction,
  TUpdateClaimAction,
  TUpdateControllerAction,
  TUpdateCreatorAction,
  TUpdateDDOTagsAction,
  TUpdateEntityClassDidAction,
  TUpdateEntityTypeAction,
  TUpdateLinkedEntityAction,
  TUpdateLinkedResourceAction,
  TUpdateLocalisationAction,
  TUpdateMetaDataAction,
  TUpdatePageAction,
  TUpdateProfileAction,
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

export const updateProfileAction = (profile: TEntityProfileModel): TUpdateProfileAction => ({
  type: ECreateEntityActions.UpdateProfile,
  payload: profile,
})

/**
 * @deprecated
 * @param metadata
 * @returns
 */
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

/**
 * @deprecated
 * @param tags
 * @returns
 */
export const updateTagsAction = (tags: TEntityTagsModel): TUpdateTagsAction => ({
  type: ECreateEntityActions.UpdateTags,
  payload: tags,
})

export const updateDDOTagsAction = (ddoTags: TEntityDDOTagModel[]): TUpdateDDOTagsAction => ({
  type: ECreateEntityActions.UpdateDDOTags,
  payload: ddoTags,
})

export const updatePageAction = (page: TEntityPageModel): TUpdatePageAction => ({
  type: ECreateEntityActions.UpdatePage,
  payload: page,
})

export const updateServiceAction = (services: TEntityServiceModel[]): TUpdateServiceAction => ({
  type: ECreateEntityActions.UpdateService,
  payload: services,
})

export const updateClaimAction = (claim: { [id: string]: TEntityClaimModel1 }): TUpdateClaimAction => ({
  type: ECreateEntityActions.UpdateClaim,
  payload: claim,
})

export const updateLinkedResourceAction = (linkedResource: {
  [id: string]: TEntityLinkedResourceModel
}): TUpdateLinkedResourceAction => ({
  type: ECreateEntityActions.UpdateLinkedResource,
  payload: linkedResource,
})

export const updateAccordedRightAction = (accordedRight: {
  [id: string]: TEntityAccordedRightModel
}): TUpdateAccordedRightAction => ({
  type: ECreateEntityActions.UpdateAccordedRight,
  payload: accordedRight,
})

export const updateLinkedEntityAction = (linkedEntity: {
  [id: string]: TEntityLinkedEntityModel
}): TUpdateLinkedEntityAction => ({
  type: ECreateEntityActions.UpdateLinkedEntity,
  payload: linkedEntity,
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
