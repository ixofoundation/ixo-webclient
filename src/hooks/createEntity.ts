import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { CreateEntity, getDidFromEvents } from 'lib/protocol'
import { useAccount } from 'hooks/account'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { encode as base64Encode } from 'js-base64'
import _ from 'lodash'
import blocksyncApi from 'api/blocksync/blocksync'
import { PDS_URL } from 'types/entities'
import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityTagsModel,
  TEntityServiceModel,
  TEntityLinkedResourceModel,
  ELocalisation,
  TEntityPageModel,
  TAssetMetadataModel,
  TEntityAccordedRightModel,
  TEntityLinkedEntityModel,
  TEntityControllerModel,
  TEntityClaimModel1,
  TEntityProfileModel,
  TEntityDDOTagModel,
  TDAOGroupModel,
} from 'types/protocol'
import {
  addAssetInstancesAction,
  gotoStepAction,
  removeAssetInstancesAction,
  updateAccordedRightAction,
  updateAssetClassDidAction,
  updateAssetInstanceAction,
  updateClaimAction,
  updateControllerAction,
  updateCreatorAction,
  updateDAOGroupsAction,
  updateDDOTagsAction,
  updateEntityClassDidAction,
  updateEntityTypeAction,
  updateLinkedEntityAction,
  updateLinkedResourceAction,
  updateLocalisationAction,
  updateMetadataAction,
  updatePageAction,
  updateProfileAction,
  updateServiceAction,
  updateTagsAction,
} from 'redux/createEntity/createEntity.actions'
import {
  selectCreateEntityAccordedRight,
  selectCreateEntityAssetClassDid,
  selectCreateEntityAssetInstances,
  selectCreateEntityClaim,
  selectCreateEntityController,
  selectCreateEntityCreator,
  selectCreateEntityDAOGroups,
  selectCreateEntityDDOTags,
  selectCreateEntityEntityClassDid,
  selectCreateEntityLinkedEntity,
  selectCreateEntityLinkedResource,
  selectCreateEntityLocalisation,
  selectCreateEntityMetadata,
  selectCreateEntityPage,
  selectCreateEntityProfile,
  selectCreateEntityService,
  selectCreateEntityStepNo,
  selectCreateEntityTags,
  selectCreateEntityType,
} from 'redux/createEntity/createEntity.selectors'
import {
  CreateEntityStrategyMap,
  TCreateEntityStepType,
  TCreateEntityStrategyType,
} from 'redux/createEntity/strategy-map'
import { TEntityModel } from 'redux/createEntity/createEntity.types'

const cellNodeEndpoint = PDS_URL

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
  /**
   * @deprecated
   */
  metadata: TEntityMetadataModel
  profile: TEntityProfileModel
  creator: TEntityCreatorModel
  controller: TEntityControllerModel
  /**
   * @deprecated
   */
  tags: TEntityTagsModel
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
  updateEntityType: (entityType: string) => void
  gotoStep: (type: 1 | -1) => void
  gotoStepByNo: (no: number) => void
  updateProfile: (profile: TEntityProfileModel) => void
  /**
   * @deprecated
   * @param metadata
   * @returns
   */
  updateMetadata: (metadata: TEntityMetadataModel) => void
  updateCreator: (creator: TEntityCreatorModel) => void
  updateController: (controller: TEntityControllerModel) => void
  /**
   * @deprecated
   */
  updateTags: (tags: TEntityTagsModel) => void
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
  generateLinkedResources: (
    _metadata: TEntityMetadataModel,
    claims: { [id: string]: TEntityClaimModel1 },
    tags: TEntityTagsModel,
    page: TEntityPageModel,
  ) => Promise<LinkedResource[]>
  createEntityClass: () => Promise<string>
  createEntity: (
    inheritEntityDid: string,
    payload: {
      service: TEntityServiceModel[]
      tags: TEntityTagsModel
      metadata: TEntityMetadataModel
      claims: { [id: string]: TEntityClaimModel1 }
      page: TEntityPageModel
    }[],
  ) => Promise<string>
}

export function useCreateEntityState(): TCreateEntityStateHookRes {
  const dispatch = useAppDispatch()
  const { signingClient, address, did } = useAccount()

  const entityType: string = useAppSelector(selectCreateEntityType)
  const stepNo: number = useAppSelector(selectCreateEntityStepNo)
  const profile: TEntityProfileModel = useAppSelector(selectCreateEntityProfile)
  /**
   * @deprecated
   */
  const metadata: TEntityMetadataModel = useAppSelector(selectCreateEntityMetadata)
  const creator: TEntityCreatorModel = useAppSelector(selectCreateEntityCreator)
  const controller: TEntityControllerModel = useAppSelector(selectCreateEntityController)
  /**
   * @deprecated
   */
  const tags: TEntityTagsModel = useAppSelector(selectCreateEntityTags)
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
  // for DAo
  const daoGroups: { [id: string]: TDAOGroupModel } = useAppSelector(selectCreateEntityDAOGroups)

  const updateEntityType = (entityType: string): void => {
    dispatch(updateEntityTypeAction(entityType))
  }
  const gotoStep = useCallback(
    (type: 1 | -1): void => {
      if (!entityType) return
      const { steps } = CreateEntityStrategyMap[entityType]
      const { nextStep, prevStep } = steps[stepNo]

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
  const updateProfile = (profile: TEntityProfileModel): void => {
    dispatch(updateProfileAction(profile))
  }
  /**
   * @deprecated
   * @param metadata
   */
  const updateMetadata = (metadata: TEntityMetadataModel): void => {
    dispatch(updateMetadataAction(metadata))
  }
  const updateCreator = (creator: TEntityCreatorModel): void => {
    dispatch(updateCreatorAction(creator))
  }
  const updateController = (controller: TEntityControllerModel): void => {
    dispatch(updateControllerAction(controller))
  }
  /**
   * @deprecated
   * @param tags
   */
  const updateTags = (tags: TEntityTagsModel): void => {
    dispatch(updateTagsAction(tags))
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

  const generateLinkedResources = async (
    _metadata: TEntityMetadataModel,
    claims: { [id: string]: TEntityClaimModel1 },
    tags: TEntityTagsModel,
    page: TEntityPageModel,
  ): Promise<LinkedResource[]> => {
    const linkedResources: LinkedResource[] = []
    try {
      if (entityType === 'Asset') {
        const metadata: TAssetMetadataModel = _metadata as TAssetMetadataModel
        // tokenMetadata for asset
        const tokenMetadata = {
          id: 'did:ixo:entity:abc123', // TODO: An IID that identifies the asset that this token represents
          type: metadata?.type,
          name: metadata?.name,
          tokenName: metadata?.tokenName,
          decimals: metadata?.decimals,
          description: metadata?.description,
          image: metadata?.image,
          properties: {
            denom: metadata?.denom,
            icon: metadata?.icon,
            maxSupply: metadata?.maxSupply,
            attributes: _.mapValues(_.keyBy(metadata?.attributes, 'key'), 'value'),
            metrics: metadata?.metrics,
          },
        }
        // TODO: from separate file
        const res: any = await blocksyncApi.project.createPublic(
          `data:application/json;base64,${base64Encode(JSON.stringify(tokenMetadata))}`,
          cellNodeEndpoint!,
        )
        const hash = res?.result
        if (hash) {
          linkedResources.push({
            id: `did:ixo:entity:abc123#${hash}`, // TODO:
            type: 'tokenMetadata',
            description: metadata.description!,
            mediaType: 'application/json',
            serviceEndpoint: `#cellnode-pandora/public/${hash}`,
            proof: hash, // the cid hash
            encrypted: 'false',
            right: '',
          })
        }
      }
    } catch (e) {
      console.error('uploading tokenMetadata', e)
    }

    try {
      // claims
      const res: any = await blocksyncApi.project.createPublic(
        `data:application/json;base64,${base64Encode(JSON.stringify(claims))}`,
        cellNodeEndpoint!,
      )
      const hash = res?.result
      if (hash) {
        linkedResources.push({
          id: `did:ixo:entity:abc123#${hash}`, // TODO:
          type: 'claims',
          description: '',
          mediaType: 'application/json',
          serviceEndpoint: `#cellnode-pandora/public/${hash}`,
          proof: hash, // the cid hash
          encrypted: 'false',
          right: '',
        })
      }
    } catch (e) {
      console.error('uploading claims', e)
    }

    try {
      // filters
      const res: any = await blocksyncApi.project.createPublic(
        `data:application/json;base64,${base64Encode(JSON.stringify(tags))}`,
        cellNodeEndpoint!,
      )
      const hash = res?.result
      if (hash) {
        linkedResources.push({
          id: `did:ixo:entity:abc123#${hash}`, // TODO:
          type: 'filters',
          description: '',
          mediaType: 'application/json',
          serviceEndpoint: `#cellnode-pandora/public/${hash}`,
          proof: hash, // the cid hash
          encrypted: 'false',
          right: '',
        })
      }
    } catch (e) {
      console.error('uploading filters', e)
    }

    try {
      // page
      const res: any = await blocksyncApi.project.createPublic(
        `data:application/json;base64,${base64Encode(JSON.stringify(page))}`,
        cellNodeEndpoint!,
      )
      const hash = res?.result
      if (hash) {
        linkedResources.push({
          id: `did:ixo:entity:abc123#${hash}`, // TODO:
          type: 'page',
          description: '',
          mediaType: 'application/json',
          serviceEndpoint: `#cellnode-pandora/public/${hash}`,
          proof: hash, // the cid hash
          encrypted: 'false',
          right: '',
        })
      }
    } catch (e) {
      console.error('uploading page', e)
    }

    return linkedResources
  }

  const createEntityClass = async (): Promise<string> => {
    const data = {
      entityType,
      context: [{ key: 'ixo', val: 'https://w3id.org/ixo/v1' }],
      service: [],
      linkedResource: [],
      accordedRight: [],
      linkedEntity: [],
    }
    const res = await CreateEntity(signingClient, address, did, [data])
    return getDidFromEvents(res)
  }

  const createEntity = async (
    inheritEntityDid: string,
    payload: {
      service: TEntityServiceModel[]
      tags: TEntityTagsModel
      metadata: TEntityMetadataModel
      claims: { [id: string]: TEntityClaimModel1 }
      page: TEntityPageModel
    }[],
  ): Promise<string> => {
    const data = await Promise.all(
      payload.map(async (item) => {
        const { service, tags, metadata, claims, page } = item
        const linkedResources = await generateLinkedResources(metadata, claims, tags, page)
        return {
          entityType,
          context: [{ key: 'class', val: inheritEntityDid }],
          service: service,
          linkedResource: linkedResources,
          accordedRight: [], // TODO:
          linkedEntity: [], // TODO:
        }
      }),
    )

    const res = await CreateEntity(signingClient, address, did, data)
    return getDidFromEvents(res)
  }

  return {
    entityType,
    stepNo,
    metadata,
    profile,
    creator,
    controller,
    tags,
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
    updateEntityType,
    gotoStep,
    gotoStepByNo,
    updateMetadata,
    updateProfile,
    updateCreator,
    updateController,
    updateTags,
    updateDDOTags,
    updatePage,
    updateService,
    updateClaim,
    updateLinkedResource,
    updateAccordedRight,
    updateLinkedEntity,
    updateEntityClassDid,
    updateAssetClassDid,
    generateLinkedResources,
    createEntityClass,
    createEntity,
    addAssetInstances,
    updateAssetInstance,
    removeAssetInstances,
    updateLocalisation,
    updateDAOGroups,
  }
}
