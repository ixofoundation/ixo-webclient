import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { CreateEntity } from 'common/utils/protocol/entity'
import { useAccount } from 'modules/Account/Account.hooks'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { encode as base64Encode } from 'js-base64'
import _ from 'lodash'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { PDS_URL } from 'modules/Entities/types'
import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityTagsModel,
  TEntityServiceModel,
  TEntityPaymentModel,
  TEntityLiquidityModel,
  TEntityClaimModel,
  TEntityLinkedResourceModel,
  ELocalisation,
  TEntityPageModel,
  TEntityControllerModel,
} from 'types'
import {
  addAssetInstancesAction,
  gotoStepAction,
  removeAssetInstancesAction,
  updateAssetClassDidAction,
  updateAssetInstanceAction,
  updateClaimsAction,
  updateControllerAction,
  updateCreatorAction,
  updateEntityClassDidAction,
  updateEntityTypeAction,
  updateLinkedResourceAction,
  updateLiquidityAction,
  updateLocalisationAction,
  updateMetadataAction,
  updatePageAction,
  updatePaymentsAction,
  updateServiceAction,
  updateTagsAction,
} from './createEntity.actions'
import {
  selectCreateEntityAssetClassDid,
  selectCreateEntityAssetInstances,
  selectCreateEntityClaims,
  selectCreateEntityController,
  selectCreateEntityCreator,
  selectCreateEntityEntityClassDid,
  selectCreateEntityLinkedResource,
  selectCreateEntityLiquidity,
  selectCreateEntityLocalisation,
  selectCreateEntityMetadata,
  selectCreateEntityPage,
  selectCreateEntityPayments,
  selectCreateEntityService,
  selectCreateEntityStepNo,
  selectCreateEntityTags,
  selectCreateEntityType,
} from './createEntity.selectors'
import {
  CreateEntityStrategyMap,
  TCreateEntityStepType,
  TCreateEntityStrategyType,
} from './strategy-map'
import { DeliverTxResponse } from '@cosmjs/stargate'
import { getDidFromEvents } from 'common/utils'
import { TEntityModel } from './createEntity.types'

const cellNodeEndpoint = PDS_URL

export function useCreateEntityStrategy(): {
  getStrategyByEntityType: (entityType: string) => TCreateEntityStrategyType
  getStrategyAndStepByPath: (
    path: string,
  ) => { strategy: TCreateEntityStrategyType; step: TCreateEntityStepType }
} {
  const getStrategyByEntityType = (
    entityType: string,
  ): TCreateEntityStrategyType => {
    return CreateEntityStrategyMap[entityType]
  }
  const getStrategyAndStepByPath = (
    path: string,
  ): { strategy: TCreateEntityStrategyType; step: TCreateEntityStepType } => {
    const strategy = Object.values(CreateEntityStrategyMap).find(({ steps }) =>
      Object.values(steps).some(({ url }) => url === path),
    )
    const step = Object.values(strategy?.steps ?? {}).find(
      ({ url }) => url === path,
    )
    return { strategy, step }
  }
  return {
    getStrategyByEntityType,
    getStrategyAndStepByPath,
  }
}

export function useCreateEntityState(): any {
  const dispatch = useDispatch()
  const { signingClient, address, did } = useAccount()

  const entityType: string = useSelector(selectCreateEntityType)
  const stepNo: number = useSelector(selectCreateEntityStepNo)
  const metadata: TEntityMetadataModel = useSelector(selectCreateEntityMetadata)
  const creator: TEntityCreatorModel = useSelector(selectCreateEntityCreator)
  const controller: TEntityControllerModel = useSelector(
    selectCreateEntityController,
  )
  const tags: TEntityTagsModel = useSelector(selectCreateEntityTags)
  const service: TEntityServiceModel[] = useSelector(selectCreateEntityService)
  const payments: TEntityPaymentModel[] = useSelector(
    selectCreateEntityPayments,
  )
  const liquidity: TEntityLiquidityModel[] = useSelector(
    selectCreateEntityLiquidity,
  )
  const claims: { [id: string]: TEntityClaimModel } = useSelector(
    selectCreateEntityClaims,
  )
  const linkedResource: {
    [id: string]: TEntityLinkedResourceModel
  } = useSelector(selectCreateEntityLinkedResource)
  const entityClassDid: string = useSelector(selectCreateEntityEntityClassDid)
  const assetClassDid: string = useSelector(selectCreateEntityAssetClassDid)
  const assetInstances: TEntityModel[] = useSelector(
    selectCreateEntityAssetInstances,
  )
  const localisation: ELocalisation = useSelector(
    selectCreateEntityLocalisation,
  )
  const page: TEntityPageModel = useSelector(selectCreateEntityPage)

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
  const updateMetadata = (metadata: TEntityMetadataModel): void => {
    dispatch(updateMetadataAction(metadata))
  }
  const updateCreator = (creator: TEntityCreatorModel): void => {
    dispatch(updateCreatorAction(creator))
  }
  const updateController = (controller: TEntityControllerModel): void => {
    dispatch(updateControllerAction(controller))
  }
  const updateTags = (tags: TEntityTagsModel): void => {
    dispatch(updateTagsAction(tags))
  }
  const updateService = (service: TEntityServiceModel[]): void => {
    dispatch(updateServiceAction(service))
  }
  const updatePayments = (payments: TEntityPaymentModel[]): void => {
    dispatch(updatePaymentsAction(payments))
  }
  const updateLiquidity = (liquidity: TEntityLiquidityModel[]): void => {
    dispatch(updateLiquidityAction(liquidity))
  }
  const updateClaims = (claims: { [id: string]: TEntityClaimModel }): void => {
    dispatch(updateClaimsAction(claims))
  }
  const updateLinkedResource = (linkedResource: {
    [id: string]: TEntityLinkedResourceModel
  }): void => {
    dispatch(updateLinkedResourceAction(linkedResource))
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
  const updatePage = (page: TEntityPageModel): void => {
    dispatch(updatePageAction(page))
  }

  const generateLinkedResources = async (
    metadata: TEntityMetadataModel,
    claims: { [id: string]: TEntityClaimModel },
    tags: TEntityTagsModel,
    page: TEntityPageModel,
  ): Promise<LinkedResource[]> => {
    const linkedResources: LinkedResource[] = []
    try {
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
          attributes: _.mapValues(
            _.keyBy(metadata?.attributes, 'key'),
            'value',
          ),
          metrics: metadata?.metrics,
        },
      }
      const res: any = await blocksyncApi.project.createPublic(
        `data:application/json;base64,${base64Encode(
          JSON.stringify(tokenMetadata),
        )}`,
        cellNodeEndpoint,
      )
      const hash = res?.result
      if (hash) {
        linkedResources.push({
          id: `did:ixo:entity:abc123#${hash}`, // TODO:
          type: 'tokenMetadata',
          description: metadata.description,
          mediaType: 'application/json',
          serviceEndpoint: `#cellnode-pandora/public/${hash}`,
          proof: hash, // the cid hash
          encrypted: 'false',
          right: '',
        })
      }
    } catch (e) {
      console.error('uploading tokenMetadata', e)
    }

    try {
      // claims
      const res: any = await blocksyncApi.project.createPublic(
        `data:application/json;base64,${base64Encode(JSON.stringify(claims))}`,
        cellNodeEndpoint,
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
        cellNodeEndpoint,
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
        cellNodeEndpoint,
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
    const res: DeliverTxResponse = await CreateEntity(
      signingClient,
      address,
      did,
      [data],
    )
    return getDidFromEvents(res)
  }

  const createEntity = async (
    inheritEntityDid: string,
    payload: {
      service: TEntityServiceModel[]
      tags: TEntityTagsModel
      metadata: TEntityMetadataModel
      claims: { [id: string]: TEntityClaimModel }
      page: TEntityPageModel
    }[],
  ): Promise<string> => {
    const data = await Promise.all(
      payload.map(async (item) => {
        const { service, tags, metadata, claims } = item
        const linkedResources = await generateLinkedResources(
          metadata,
          claims,
          tags,
          page,
        )
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

    const res: DeliverTxResponse = await CreateEntity(
      signingClient,
      address,
      did,
      data,
    )
    return getDidFromEvents(res)
  }

  return {
    entityType,
    stepNo,
    metadata,
    creator,
    controller,
    tags,
    page,
    service,
    payments,
    liquidity,
    claims,
    linkedResource,
    entityClassDid,
    assetClassDid,
    assetInstances,
    localisation,
    updateEntityType,
    gotoStep,
    updateMetadata,
    updateCreator,
    updateController,
    updateTags,
    updateService,
    updatePayments,
    updateLiquidity,
    updateClaims,
    updateLinkedResource,
    updateEntityClassDid,
    updateAssetClassDid,
    generateLinkedResources,
    createEntityClass,
    createEntity,
    addAssetInstances,
    updateAssetInstance,
    removeAssetInstances,
    updateLocalisation,
    updatePage,
  }
}
