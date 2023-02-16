import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityServiceModel,
  TEntityLinkedResourceModel,
  ELocalisation,
  TEntityPageModel,
  TEntityAccordedRightModel,
  TEntityLinkedEntityModel,
  TEntityControllerModel,
  TEntityClaimModel1,
  TEntityDDOTagModel,
  TDAOGroupModel,
  TDeedModel,
} from 'types/protocol'
import {
  addAssetInstancesAction,
  gotoStepAction,
  initializeAction,
  removeAssetInstancesAction,
  updateAccordedRightAction,
  updateAssetClassDidAction,
  updateAssetInstanceAction,
  updateClaimAction,
  updateControllerAction,
  updateCreatorAction,
  updateDAOControllerAction,
  updateDAOGroupsAction,
  updateDDOTagsAction,
  updateDeedAction,
  updateEntityClassDidAction,
  updateEntityTypeAction,
  updateLinkedEntityAction,
  updateLinkedResourceAction,
  updateLocalisationAction,
  updateMetadataAction,
  updatePageAction,
  updateServiceAction,
} from 'redux/createEntity/createEntity.actions'
import {
  selectCreateEntityAccordedRight,
  selectCreateEntityAssetClassDid,
  selectCreateEntityAssetInstances,
  selectCreateEntityClaim,
  selectCreateEntityController,
  selectCreateEntityCreator,
  selectCreateEntityDAOController,
  selectCreateEntityDAOGroups,
  selectCreateEntityDDOTags,
  selectCreateEntityDeed,
  selectCreateEntityEntityClassDid,
  selectCreateEntityLinkedEntity,
  selectCreateEntityLinkedResource,
  selectCreateEntityLocalisation,
  selectCreateEntityMetadata,
  selectCreateEntityPage,
  selectCreateEntityService,
  selectCreateEntityStepNo,
  selectCreateEntityType,
} from 'redux/createEntity/createEntity.selectors'
import {
  CreateEntityStrategyMap,
  TCreateEntityStepType,
  TCreateEntityStrategyType,
} from 'redux/createEntity/strategy-map'
import { TEntityModel } from 'redux/createEntity/createEntity.types'

export function useCreateEntityStrategy(): {
  getStrategyByEntityType: (entityType: string) => TCreateEntityStrategyType
  getStrategyAndStepByPath: (path: string) => { strategy: TCreateEntityStrategyType; step: TCreateEntityStepType }
} {
  const getStrategyByEntityType = (entityType: string): TCreateEntityStrategyType => {
    return CreateEntityStrategyMap[entityType]
  }
  const getStrategyAndStepByPath = (
    path: string,
  ): { strategy: TCreateEntityStrategyType; step: TCreateEntityStepType } => {
    const strategy = Object.values(CreateEntityStrategyMap).find(({ steps }) =>
      Object.values(steps).some(({ url }) => url === path),
    )
    const step = Object.values(strategy?.steps ?? {}).find(({ url }) => url === path)
    return { strategy, step } as any
  }
  return {
    getStrategyByEntityType,
    getStrategyAndStepByPath,
  }
}

interface TCreateEntityStateHookRes {
  entityType: string
  stepNo: number
  metadata: TEntityMetadataModel
  creator: TEntityCreatorModel
  controller: TEntityControllerModel
  ddoTags: TEntityDDOTagModel[]
  page: TEntityPageModel
  service: TEntityServiceModel[]
  claim: { [id: string]: TEntityClaimModel1 }
  linkedResource: { [id: string]: TEntityLinkedResourceModel }
  accordedRight: { [key: string]: TEntityAccordedRightModel }
  linkedEntity: { [key: string]: TEntityLinkedEntityModel }
  entityClassDid: string
  assetClassDid: string
  assetInstances: TEntityModel[]
  localisation: ELocalisation
  daoGroups: { [id: string]: TDAOGroupModel }
  daoController: string
  deed: TDeedModel
  updateEntityType: (entityType: string) => void
  gotoStep: (type: 1 | -1) => void
  gotoStepByNo: (no: number) => void
  updateMetadata: (metadata: TEntityMetadataModel) => void
  updateCreator: (creator: TEntityCreatorModel) => void
  updateController: (controller: TEntityControllerModel) => void
  updateDDOTags: (ddoTags: TEntityDDOTagModel[]) => void
  updatePage: (page: TEntityPageModel) => void
  updateService: (service: TEntityServiceModel[]) => void
  updateClaim: (claim: { [id: string]: TEntityClaimModel1 }) => void
  updateLinkedResource: (linkedResource: { [id: string]: TEntityLinkedResourceModel }) => void
  updateAccordedRight: (accordedRight: { [id: string]: TEntityAccordedRightModel }) => void
  updateLinkedEntity: (linkedEntity: { [id: string]: TEntityLinkedEntityModel }) => void
  updateEntityClassDid: (did: string) => void
  updateAssetClassDid: (did: string) => void
  addAssetInstances: (instances: TEntityModel[]) => void
  updateAssetInstance: (id: number, instance: TEntityModel) => void
  removeAssetInstances: () => void
  updateLocalisation: (localisation: ELocalisation) => void
  updateDAOGroups: (daoGroups: { [id: string]: TDAOGroupModel }) => void
  updateDAOController: (controller: string) => void
  updateDeed: (deed: TDeedModel) => void
  initialize: () => void
}

export function useCreateEntityState(): TCreateEntityStateHookRes {
  const dispatch = useAppDispatch()

  const entityType: string = useAppSelector(selectCreateEntityType)
  const stepNo: number = useAppSelector(selectCreateEntityStepNo)
  const metadata: TEntityMetadataModel = useAppSelector(selectCreateEntityMetadata)
  const creator: TEntityCreatorModel = useAppSelector(selectCreateEntityCreator)
  const controller: TEntityControllerModel = useAppSelector(selectCreateEntityController)
  const ddoTags: TEntityDDOTagModel[] = useAppSelector(selectCreateEntityDDOTags)
  const page: TEntityPageModel = useAppSelector(selectCreateEntityPage)
  const service: TEntityServiceModel[] = useAppSelector(selectCreateEntityService)
  const claim: { [id: string]: TEntityClaimModel1 } = useAppSelector(selectCreateEntityClaim)
  const linkedResource: {
    [id: string]: TEntityLinkedResourceModel
  } = useAppSelector(selectCreateEntityLinkedResource)
  const accordedRight: { [key: string]: TEntityAccordedRightModel } = useAppSelector(selectCreateEntityAccordedRight)
  const linkedEntity: { [key: string]: TEntityLinkedEntityModel } = useAppSelector(selectCreateEntityLinkedEntity)
  const entityClassDid: string = useAppSelector(selectCreateEntityEntityClassDid)
  const assetClassDid: string = useAppSelector(selectCreateEntityAssetClassDid)
  const assetInstances: TEntityModel[] = useAppSelector(selectCreateEntityAssetInstances)
  const localisation: ELocalisation = useAppSelector(selectCreateEntityLocalisation)
  // for DAO
  const daoGroups: { [id: string]: TDAOGroupModel } = useAppSelector(selectCreateEntityDAOGroups)
  const daoController: string = useAppSelector(selectCreateEntityDAOController)
  // for Deed
  const deed: TDeedModel = useAppSelector(selectCreateEntityDeed)

  const updateEntityType = (entityType: string): void => {
    dispatch(updateEntityTypeAction(entityType))
  }
  const gotoStep = useCallback(
    (type: 1 | -1): void => {
      if (!entityType) return
      const { steps } = CreateEntityStrategyMap[entityType]
      const nextStep = steps[stepNo]?.nextStep
      const prevStep = steps[stepNo]?.prevStep

      if (type === 1) {
        if (nextStep) {
          dispatch(gotoStepAction(nextStep))
        }
      } else if (type === -1) {
        if (prevStep) {
          dispatch(gotoStepAction(prevStep))
        }
      }
    },
    // eslint-disable-next-line
    [entityType, stepNo],
  )
  const gotoStepByNo = useCallback(
    (no: number): void => {
      dispatch(gotoStepAction(no))
    },
    // eslint-disable-next-line
    [],
  )
  const updateMetadata = (metadata: TEntityMetadataModel): void => {
    dispatch(updateMetadataAction(metadata))
  }
  const updateCreator = (creator: TEntityCreatorModel): void => {
    dispatch(updateCreatorAction(creator))
  }
  const updateController = (controller: TEntityControllerModel): void => {
    dispatch(updateControllerAction(controller))
  }
  const updateDDOTags = (ddoTags: TEntityDDOTagModel[]): void => {
    dispatch(updateDDOTagsAction(ddoTags))
  }
  const updatePage = (page: TEntityPageModel): void => {
    dispatch(updatePageAction(page))
  }
  const updateService = (service: TEntityServiceModel[]): void => {
    dispatch(updateServiceAction(service))
  }
  const updateClaim = (claim: { [id: string]: TEntityClaimModel1 }): void => {
    dispatch(updateClaimAction(claim))
  }
  const updateLinkedResource = (linkedResource: { [id: string]: TEntityLinkedResourceModel }): void => {
    dispatch(updateLinkedResourceAction(linkedResource))
  }
  const updateAccordedRight = (accordedRight: { [id: string]: TEntityAccordedRightModel }): void => {
    dispatch(updateAccordedRightAction(accordedRight))
  }
  const updateLinkedEntity = (linkedEntity: { [id: string]: TEntityLinkedEntityModel }): void => {
    dispatch(updateLinkedEntityAction(linkedEntity))
  }
  const updateEntityClassDid = (did: string): void => {
    dispatch(updateEntityClassDidAction(did))
  }
  const updateAssetClassDid = (did: string): void => {
    dispatch(updateAssetClassDidAction(did))
  }
  const addAssetInstances = (instances: TEntityModel[]): void => {
    dispatch(addAssetInstancesAction(instances))
  }
  const updateAssetInstance = (id: number, instance: TEntityModel): void => {
    dispatch(updateAssetInstanceAction(id, instance))
  }
  const removeAssetInstances = (): void => {
    dispatch(removeAssetInstancesAction())
  }
  const updateLocalisation = (localisation: ELocalisation): void => {
    dispatch(updateLocalisationAction(localisation))
  }
  const updateDAOGroups = (daoGroups: { [id: string]: TDAOGroupModel }): void => {
    dispatch(updateDAOGroupsAction(daoGroups))
  }
  const updateDAOController = (controller: string): void => {
    dispatch(updateDAOControllerAction(controller))
  }
  const updateDeed = (deed: TDeedModel): void => {
    dispatch(updateDeedAction(deed))
  }
  const initialize = (): void => {
    dispatch(initializeAction())
  }

  return {
    entityType,
    stepNo,
    metadata,
    creator,
    controller,
    ddoTags,
    page,
    service,
    claim,
    linkedResource,
    accordedRight,
    linkedEntity,
    entityClassDid,
    assetClassDid,
    assetInstances,
    localisation,
    daoGroups,
    daoController,
    deed,
    updateEntityType,
    gotoStep,
    gotoStepByNo,
    updateMetadata,
    updateCreator,
    updateController,
    updateDDOTags,
    updatePage,
    updateService,
    updateClaim,
    updateLinkedResource,
    updateAccordedRight,
    updateLinkedEntity,
    updateEntityClassDid,
    updateAssetClassDid,
    addAssetInstances,
    updateAssetInstance,
    removeAssetInstances,
    updateLocalisation,
    updateDAOGroups,
    updateDAOController,
    updateDeed,
    initialize,
  }
}
