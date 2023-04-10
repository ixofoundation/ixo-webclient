import { useCallback, useMemo } from 'react'
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
  TEntityAdministratorModel,
  TEntityClaimModel1,
  TEntityDDOTagModel,
  TDAOGroupModel,
  TProposalModel,
} from 'types/protocol'
import {
  addAssetInstancesAction,
  gotoStepAction,
  removeAssetInstancesAction,
  updateAccordedRightAction,
  updateAssetInstanceAction,
  updateBreadCrumbsAction,
  updateClaimAction,
  updateAdministratorAction,
  updateCreatorAction,
  updateDAOControllerAction,
  updateDAOGroupsAction,
  updateDDOTagsAction,
  updateProposalAction,
  updateEntityTypeAction,
  updateLinkedEntityAction,
  updateLinkedResourceAction,
  updateLocalisationAction,
  updateMetadataAction,
  updatePageAction,
  updateServiceAction,
  updateSubtitleAction,
  updateTitleAction,
  clearEntityAction,
} from 'redux/createEntity/createEntity.actions'
import {
  selectCreateEntityAccordedRight,
  selectCreateEntityAdministrator,
  selectCreateEntityAssetInstances,
  selectCreateEntityBreadCrumbs,
  selectCreateEntityClaim,
  selectCreateEntityCreator,
  selectCreateEntityDAOController,
  selectCreateEntityDAOGroups,
  selectCreateEntityDDOTags,
  selectCreateEntityProposal,
  selectCreateEntityLinkedEntity,
  selectCreateEntityLinkedResource,
  selectCreateEntityLocalisation,
  selectCreateEntityMetadata,
  selectCreateEntityPage,
  selectCreateEntityService,
  selectCreateEntityStepNo,
  selectCreateEntitySubtitle,
  selectCreateEntityTitle,
  selectCreateEntityType,
} from 'redux/createEntity/createEntity.selectors'
import {
  CreateEntityStrategyMap,
  TCreateEntityStepType,
  TCreateEntityStrategyType,
} from 'redux/createEntity/strategy-map'
import { TCreateEntityModel } from 'redux/createEntity/createEntity.types'
import { useAccount } from './account'
import { CreateEntity, fee } from 'lib/protocol'
import { customQueries, ixo, utils } from '@ixo/impactxclient-sdk'
import { CellnodePublicResource, CellnodeWeb3Resource } from '@ixo/impactxclient-sdk/types/custom_queries/cellnode'
import {
  AccordedRight,
  LinkedEntity,
  LinkedResource,
  Service,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { WasmInstantiateTrx } from 'lib/protocol/cosmwasm'
import {
  convertDenomToMicroDenomWithDecimals,
  convertDurationWithUnitsToDuration,
  durationWithUnitsToSeconds,
} from 'utils/conversions'
import { Member } from 'types/dao'
import { chainNetwork } from './configs'
import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'
import { NodeType } from 'types/entities'
import { Cw20Coin } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'
import { DeliverTxResponse } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/stargate'

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
  breadCrumbs: { text: string; link?: string }[]
  title: string
  subtitle: string
  metadata: TEntityMetadataModel
  creator: TEntityCreatorModel
  administrator: TEntityAdministratorModel
  ddoTags: TEntityDDOTagModel[]
  page: TEntityPageModel
  service: TEntityServiceModel[]
  claim: { [id: string]: TEntityClaimModel1 }
  linkedResource: { [id: string]: TEntityLinkedResourceModel }
  accordedRight: { [key: string]: TEntityAccordedRightModel }
  linkedEntity: { [key: string]: TEntityLinkedEntityModel }
  assetInstances: TCreateEntityModel[]
  localisation: ELocalisation
  daoGroups: { [id: string]: TDAOGroupModel }
  daoController: string
  proposal: TProposalModel
  validateRequiredProperties: boolean
  updateEntityType: (entityType: string) => void
  clearEntity: () => void
  gotoStep: (type: 1 | -1) => void
  gotoStepByNo: (no: number) => void
  updateBreadCrumbs: (breadCrumbs: { text: string; link?: string }[]) => void
  updateTitle: (title: string) => void
  updateSubtitle: (subtitle: string) => void
  updateMetadata: (metadata: TEntityMetadataModel) => void
  updateCreator: (creator: TEntityCreatorModel) => void
  updateAdministrator: (administrator: TEntityAdministratorModel) => void
  updateDDOTags: (ddoTags: TEntityDDOTagModel[]) => void
  updatePage: (page: TEntityPageModel) => void
  updateService: (service: TEntityServiceModel[]) => void
  updateClaim: (claim: { [id: string]: TEntityClaimModel1 }) => void
  updateLinkedResource: (linkedResource: { [id: string]: TEntityLinkedResourceModel }) => void
  updateAccordedRight: (accordedRight: { [id: string]: TEntityAccordedRightModel }) => void
  updateLinkedEntity: (linkedEntity: { [id: string]: TEntityLinkedEntityModel }) => void
  addAssetInstances: (instances: TCreateEntityModel[]) => void
  updateAssetInstance: (id: number, instance: TCreateEntityModel) => void
  removeAssetInstances: () => void
  updateLocalisation: (localisation: ELocalisation) => void
  updateDAOGroups: (daoGroups: { [id: string]: TDAOGroupModel }) => void
  updateDAOController: (controller: string) => void
  updateProposal: (proposal: TProposalModel) => void
}

export function useCreateEntityState(): TCreateEntityStateHookRes {
  const dispatch = useAppDispatch()

  const entityType: string = useAppSelector(selectCreateEntityType)
  const stepNo: number = useAppSelector(selectCreateEntityStepNo)
  const breadCrumbs: { text: string; link?: string }[] = useAppSelector(selectCreateEntityBreadCrumbs)
  const title: string = useAppSelector(selectCreateEntityTitle)
  const subtitle: string = useAppSelector(selectCreateEntitySubtitle)

  const metadata: TEntityMetadataModel = useAppSelector(selectCreateEntityMetadata)
  const creator: TEntityCreatorModel = useAppSelector(selectCreateEntityCreator)
  const administrator: TEntityAdministratorModel = useAppSelector(selectCreateEntityAdministrator)
  const ddoTags: TEntityDDOTagModel[] = useAppSelector(selectCreateEntityDDOTags)
  const page: TEntityPageModel = useAppSelector(selectCreateEntityPage)
  const service: TEntityServiceModel[] = useAppSelector(selectCreateEntityService)
  const claim: { [id: string]: TEntityClaimModel1 } = useAppSelector(selectCreateEntityClaim)
  const linkedResource: {
    [id: string]: TEntityLinkedResourceModel
  } = useAppSelector(selectCreateEntityLinkedResource)
  const accordedRight: { [key: string]: TEntityAccordedRightModel } = useAppSelector(selectCreateEntityAccordedRight)
  const linkedEntity: { [key: string]: TEntityLinkedEntityModel } = useAppSelector(selectCreateEntityLinkedEntity)
  const assetInstances: TCreateEntityModel[] = useAppSelector(selectCreateEntityAssetInstances)
  const localisation: ELocalisation = useAppSelector(selectCreateEntityLocalisation)
  // for DAO
  const daoGroups: { [id: string]: TDAOGroupModel } = useAppSelector(selectCreateEntityDAOGroups)
  const daoController: string = useAppSelector(selectCreateEntityDAOController)
  // for Proposal
  const proposal: TProposalModel = useAppSelector(selectCreateEntityProposal)
  const validateRequiredProperties = useMemo(() => {
    return !!creator && !!administrator && Object.keys(page ?? {}).length > 0 && service?.length > 0
  }, [creator, administrator, page, service])

  const updateEntityType = (entityType: string): void => {
    dispatch(updateEntityTypeAction(entityType))
  }
  const clearEntity = (): void => {
    dispatch(clearEntityAction())
  }
  const gotoStep = useCallback(
    (type: 1 | -1): void => {
      if (!entityType) return
      const { steps } = CreateEntityStrategyMap[entityType]
      const nextStep = stepNo + 1
      const prevStep = stepNo - 1

      if (type === 1) {
        if (nextStep && steps[nextStep]) {
          dispatch(gotoStepAction(nextStep))
        }
      } else if (type === -1) {
        if (prevStep && steps[prevStep]) {
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
  const updateBreadCrumbs = (breadCrumbs: { text: string; link?: string }[]): void => {
    dispatch(updateBreadCrumbsAction(breadCrumbs))
  }
  const updateTitle = (title: string): void => {
    dispatch(updateTitleAction(title))
  }
  const updateSubtitle = (subtitle: string): void => {
    dispatch(updateSubtitleAction(subtitle))
  }

  const updateMetadata = (metadata: TEntityMetadataModel): void => {
    dispatch(updateMetadataAction(metadata))
  }
  const updateCreator = (creator: TEntityCreatorModel): void => {
    dispatch(updateCreatorAction(creator))
  }
  const updateAdministrator = (administrator: TEntityAdministratorModel): void => {
    dispatch(updateAdministratorAction(administrator))
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
  const addAssetInstances = (instances: TCreateEntityModel[]): void => {
    dispatch(addAssetInstancesAction(instances))
  }
  const updateAssetInstance = (id: number, instance: TCreateEntityModel): void => {
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
  const updateProposal = (proposal: TProposalModel): void => {
    dispatch(updateProposalAction(proposal))
  }

  return {
    entityType,
    stepNo,
    breadCrumbs,
    title,
    subtitle,
    metadata,
    creator,
    administrator,
    ddoTags,
    page,
    service,
    claim,
    linkedResource,
    accordedRight,
    linkedEntity,
    assetInstances,
    localisation,
    daoGroups,
    daoController,
    proposal,
    validateRequiredProperties,
    updateEntityType,
    clearEntity,
    gotoStep,
    gotoStepByNo,
    updateBreadCrumbs,
    updateTitle,
    updateSubtitle,
    updateMetadata,
    updateCreator,
    updateAdministrator,
    updateDDOTags,
    updatePage,
    updateService,
    updateClaim,
    updateLinkedResource,
    updateAccordedRight,
    updateLinkedEntity,
    addAssetInstances,
    updateAssetInstance,
    removeAssetInstances,
    updateLocalisation,
    updateDAOGroups,
    updateDAOController,
    updateProposal,
  }
}

interface TCreateEntityHookRes {
  CreateDAO: () => Promise<string>
  CreateDAOCredsIssuer: (daoDid: string) => Promise<string>
  SaveProfile: () => Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined>
  SaveCreator: (daoCredsIssuerDid: string) => Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined>
  SaveAdministrator: (daoCredsIssuerDid: string) => Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined>
  SavePage: () => Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined>
  SaveTags: () => Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined>
  SaveTokenMetadata: () => Promise<CellnodeWeb3Resource | undefined>
  SaveClaims: () => Promise<CellnodePublicResource | undefined>
  UploadLinkedResource: () => Promise<LinkedResource[]>
  CreateProtocol: () => Promise<string>
  CreateEntityBase: (
    entityType: string,
    protocolDid: string,
    payload: {
      service: Service[]
      linkedResource: LinkedResource[]
      accordedRight: AccordedRight[]
      linkedEntity: LinkedEntity[]
      verification?: Verification[]
    },
  ) => Promise<string>
  CreateDAOCoreByGroupId: (daoGroup: TDAOGroupModel) => Promise<string>
  AddLinkedEntity: (did: string, linkedEntity: LinkedEntity) => Promise<DeliverTxResponse | undefined>
}

const NEW_DAO_CW20_DECIMALS = 6

export function useCreateEntity(): TCreateEntityHookRes {
  const { signingClient, signer } = useAccount()
  const createEntityState = useCreateEntityState()
  const metadata = createEntityState.metadata as any
  const { creator, administrator, page, ddoTags, claim, service } = createEntityState
  // TODO: service choose-able
  const cellnodeService = service[0]

  const daoCoreContractCode = customQueries.contract.getContractCode('devnet', 'dao_core')
  const daoProposalContractCode = customQueries.contract.getContractCode('devnet', 'dao_proposal_single')
  const daoPreProposalContractCode = customQueries.contract.getContractCode('devnet', 'dao_pre_propose_single')
  const daoVotingCw4ContractCode = customQueries.contract.getContractCode('devnet', 'dao_voting_cw4')
  const cw4ContractCode = customQueries.contract.getContractCode('devnet', 'cw4_group')
  const daoVotingCw20StakedContractCode = customQueries.contract.getContractCode('devnet', 'dao_voting_cw20_staked')
  const cw20BaseContractCode = customQueries.contract.getContractCode('devnet', 'cw20_base')
  const cw20StakeContractCode = customQueries.contract.getContractCode('devnet', 'cw20_stake')

  /**
   * @description auto choose service for uploading data
   * @usage in when saving Profile, Creator, Administrator, Page, Tag, etc
   *      default upload to the cellnode
   * @param data
   * @returns
   */
  const UploadDataToService = async (data: string): Promise<CellnodePublicResource | CellnodeWeb3Resource> => {
    let res: CellnodePublicResource | CellnodeWeb3Resource
    if (cellnodeService?.type === NodeType.CellNode && cellnodeService?.serviceEndpoint) {
      res = await customQueries.cellnode.uploadPublicDoc(
        'application/ld+json',
        data,
        cellnodeService.serviceEndpoint,
        chainNetwork,
      )
    } else if (cellnodeService?.type === NodeType.Ipfs && cellnodeService?.serviceEndpoint) {
      res = await customQueries.cellnode.uploadWeb3Doc(
        utils.common.generateId(12),
        'application/ld+json',
        data,
        cellnodeService.serviceEndpoint,
        chainNetwork,
      )
    } else {
      res = await customQueries.cellnode.uploadPublicDoc('application/ld+json', data, undefined, chainNetwork)
    }
    return res
  }

  const LinkedResourceServiceEndpointGenerator = (
    uploadResult: CellnodePublicResource | CellnodeWeb3Resource,
    cellnodeService?: Service,
  ): string => {
    if (cellnodeService?.type === NodeType.Ipfs) {
      return `${cellnodeService.id}:${(uploadResult as CellnodeWeb3Resource).cid}`
    } else if (cellnodeService?.type === NodeType.CellNode) {
      return `${cellnodeService.id}:/public/${(uploadResult as CellnodePublicResource).key}`
    }
    return `cellnode:/public/${(uploadResult as CellnodePublicResource).key}`
  }

  const LinkedResourceProofGenerator = (
    uploadResult: CellnodePublicResource | CellnodeWeb3Resource,
    cellnodeService?: Service,
  ): string => {
    if (cellnodeService?.type === NodeType.Ipfs) {
      return (uploadResult as CellnodeWeb3Resource).cid
    } else if (cellnodeService?.type === NodeType.CellNode) {
      return (uploadResult as CellnodePublicResource).key
    }
    return (uploadResult as CellnodePublicResource).key
  }

  const CreateDAO = async (): Promise<string> => {
    try {
      const res = await CreateEntity(signingClient, signer, [{ entityType: 'dao' }])
      const daoDid = utils.common.getValueFromEvents(res!, 'wasm', 'token_id')
      console.log('CreateDAO', { daoDid })
      return daoDid
    } catch (e) {
      console.error('CreateDAO', e)
      return ''
    }
  }

  const CreateDAOCredsIssuer = async (daoDid: string): Promise<string> => {
    try {
      const res = await CreateEntity(signingClient, signer, [
        { entityType: 'dao', context: [{ key: 'class', val: daoDid }] },
      ])
      const daoCredsIssuerDid = utils.common.getValueFromEvents(res!, 'wasm', 'token_id')
      console.log('CreateDAOCredsIssuer', { daoCredsIssuerDid })
      return daoCredsIssuerDid
    } catch (e) {
      console.error('CreateDAOCredsIssuer', e)
      return ''
    }
  }

  const SaveProfile = async (): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
    try {
      const payload = {
        '@context': {
          ixo: 'https://w3id.org/ixo/ns/protocol/',
          '@id': '@type',
          type: '@type',
          '@protected': true,
        },
        id: 'ixo:entity#profile',
        type: 'profile',
        name: metadata.name,
        image: metadata.image,
        logo: metadata.icon,
        brand: metadata.brand,
        location: metadata.location,
        description: metadata.description,
        attributes: metadata.attributes,
        metrics: metadata.metrics,
      }
      const buff = Buffer.from(JSON.stringify(payload))
      const res = await UploadDataToService(buff.toString('base64'))
      console.log('SaveProfile', payload)
      return res
    } catch (e) {
      console.error('SaveProfile', e)
      return undefined
    }
  }

  const SaveCreator = async (
    daoCredsIssuerDid: string,
  ): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
    try {
      const payload = {
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://w3id.org/ixo/ns/context/v1',
          'https://w3id.org/ixo/ns/protocol/entity#creator',
          {
            '@version': 1,
            '@protected': true,
            id: '@id',
            type: '@type',
          },
        ],
        id: 'https://w3id.org/ixo/ns/credential-schemas/organization/v1',
        type: ['VerifiableCredential', 'CreatorCredential'],
        issuer: signer.did, // TODO: issuerDid ? maybe creatorDid inputted in form
        issuanceDate: new Date().toISOString(), // TODO: new Date(now) ?
        validFrom: new Date().toISOString(), // TODO: new Date(now) ?
        expirationDate: '', //  TODO: always empty ?
        credentialSubject: {
          id: daoCredsIssuerDid,
          type: 'creator',
          displayName: creator.displayName,
          location: creator.location,
          email: creator.email,
          mission: creator.mission,
          website: creator.website,
          logo: creator.logo,
        },
        proof: {
          type: 'EcdsaSecp256k1Signature2019',
          created: new Date().toISOString(), //   TODO:
          proofPurpose: 'assertionMethod',
          verificationMethod: 'did:ixo:entity:abc123#key-1', //   TODO:
          jws: '',
        },
      }
      const buff = Buffer.from(JSON.stringify(payload))
      const res = await UploadDataToService(buff.toString('base64'))
      console.log('SaveCreator', payload)
      return res
    } catch (e) {
      console.error('SaveCreator', e)
      return undefined
    }
  }

  const SaveAdministrator = async (
    daoCredsIssuerDid: string,
  ): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
    try {
      const payload = {
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://w3id.org/ixo/ns/context/v1',
          'https://w3id.org/ixo/ns/protocol/entity#administrator',
          {
            '@version': 1,
            '@protected': true,
            id: '@id',
            type: '@type',
          },
        ],
        id: 'https://w3id.org/ixo/ns/credential-schemas/organization/v1',
        type: ['VerifiableCredential', 'AdministratorCredential'],
        issuer: signer.did, // TODO: issuerDid ? maybe creatorDid inputted in form
        issuanceDate: new Date().toISOString(), // TODO: new Date(now)?
        validFrom: new Date().toISOString(), // TODO: new Date(now)?
        expirationDate: '', //  TODO:
        credentialSubject: {
          id: daoCredsIssuerDid, // TODO:
          type: 'administrator',
          displayName: administrator.displayName,
          location: administrator.location,
          email: administrator.email,
          mission: administrator.mission,
          website: administrator.website,
          logo: administrator.logo,
        },
        proof: {
          type: 'EcdsaSecp256k1Signature2019',
          created: new Date().toISOString(), //   TODO:
          proofPurpose: 'assertionMethod',
          verificationMethod: 'did:ixo:entity:abc123#key-1', //   TODO:
          jws: '',
        },
      }
      const buff = Buffer.from(JSON.stringify(payload))
      const res = await UploadDataToService(buff.toString('base64'))
      console.log('SaveAdministrator', payload)
      return res
    } catch (e) {
      console.error('SaveAdministrator', e)
      return undefined
    }
  }

  const SavePage = async (): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
    try {
      const payload = {
        '@context': {
          ixo: 'https://w3id.org/ixo/ns/protocol/',
          '@id': '@type',
          type: '@type',
          '@protected': true,
        },
        type: 'ixo:entity#page',
        page: Object.values(page),
      }
      const buff = Buffer.from(JSON.stringify(payload))
      const res = await UploadDataToService(buff.toString('base64'))
      console.log('SavePage', payload)
      return res
    } catch (e) {
      console.error('SavePage', e)
      return undefined
    }
  }

  // const SaveProjectCreds = async (daoCredsIssuerDid: string): Promise<CellnodeWeb3Resource | undefined> => {
  //   try {
  //     const buff = Buffer.from(
  //       JSON.stringify({
  //         '@context': [
  //           'https://www.w3.org/2018/credentials/v1',
  //           'https://w3id.org/ixo/ns/context/v1',
  //           'https://w3id.org/ixo/ns/credentials/v1',
  //           {
  //             '@version': 1,
  //             '@protected': true,
  //             id: '@id',
  //             type: '@type',
  //           },
  //         ],
  //         id: 'https://w3id.org/emerging/credential-schemas/project/v1',
  //         type: ['VerifiableCredential', 'DeviceCredential'],
  //         issuer: daoCredsIssuerDid,
  //         issuanceDate: '2022-01-01T00:00:00Z',
  //         validFrom: '2022-01-01T00:00:00Z',
  //         expirationDate: '2024-01-01T00:00:00Z',
  //         credentialSubject: {
  //           id: 'https://registry.emerging.eco/project/?id=MimiMoto',
  //           project: {
  //             type: 'EnergyEfficiency-Domestic',
  //             name: 'MimiMoto Zambia',
  //             description: '',
  //             attributes: [
  //               {
  //                 key: 'Region',
  //                 value: 'Malawi',
  //               },
  //               {
  //                 key: 'Scale',
  //                 value: 'Micro',
  //               },
  //               {
  //                 key: 'Annual Target',
  //                 value: '1,000',
  //               },
  //             ],
  //             linkedResources: [
  //               {
  //                 id: 'https://bafybeia4al2szs4d2kvwqhippp3kfguhkvx42oayuy6w2rixsdhoersib4.ipfs.w3s.link/testProjectDocument',
  //                 type: 'CertificationDocument',
  //                 description: 'SupaMoto Project Design Document',
  //                 mediaType: 'application/pdf',
  //                 serviceEndpoint: '',
  //                 proof: 'bafybeia4al2szs4d2kvwqhippp3kfguhkvx42oayuy6w2rixsdhoersib4',
  //                 encrypted: 'false',
  //               },
  //               {
  //                 id: 'https://bafybeia4al2szs4d2kvwqhippp3kfguhkvx42oayuy6w2rixsdhoersib4.ipfs.w3s.link/testProjectDocument',
  //                 type: 'CertificationDocument',
  //                 description: 'Verification Report',
  //                 mediaType: 'application/pdf',
  //                 serviceEndpoint: '',
  //                 proof: 'bafybeia4al2szs4d2kvwqhippp3kfguhkvx42oayuy6w2rixsdhoersib4',
  //                 encrypted: 'false',
  //               },
  //               {
  //                 id: 'https://bafybeia4al2szs4d2kvwqhippp3kfguhkvx42oayuy6w2rixsdhoersib4.ipfs.w3s.link/testProjectDocument',
  //                 type: 'VerificationMethodology',
  //                 description: 'Simplified Methodology for Metered and Measured Cooking Devices Using Digital-MRV',
  //                 mediaType: 'application/ld+json',
  //                 serviceEndpoint: '',
  //                 proof: 'bafybeia4al2szs4d2kvwqhippp3kfguhkvx42oayuy6w2rixsdhoersib4',
  //                 encrypted: 'false',
  //                 right: '',
  //               },
  //             ],
  //             impacts: [
  //               {
  //                 sdgs: [
  //                   {
  //                     sdg: '',
  //                     status: 'self-certified',
  //                   },
  //                   {
  //                     sdg: '',
  //                     status: 'self-certified',
  //                   },
  //                 ],
  //               },
  //               {
  //                 measurement: [
  //                   {
  //                     id: '',
  //                     type: 'ImpactParameter',
  //                     parameter: '',
  //                     description:
  //                       'Emissions reduced per tonne of clean fuel used to replace traditional energy sources for domestic cooking',
  //                     unit: '',
  //                     baselineValue: '',
  //                     source: '',
  //                     conversionFactor: '23.312',
  //                     status: 'certified',
  //                   },
  //                   {
  //                     id: '',
  //                     type: 'ImpactParameter',
  //                     parameter: 'VER',
  //                     description:
  //                       'Disability-adjusted Life Years gained per tonne of clean fuel used to replace traditional energy sources for domestic cooking',
  //                     unit: '',
  //                     baselineValue: '',
  //                     source: '',
  //                     conversionFactor: '5.623',
  //                     status: 'certified',
  //                   },
  //                   {
  //                     id: '',
  //                     type: 'ImpactParameter',
  //                     parameter: 'GenderEquity',
  //                     description:
  //                       'Reduction in gender-related disparity per tonne of clean fuel used to replace traditional energy sources for domestic cooking',
  //                     unit: '',
  //                     baselineValue: '',
  //                     source: '',
  //                     conversionFactor: '2.531513',
  //                     status: 'certified',
  //                   },
  //                 ],
  //               },
  //             ],
  //             status: 'self-certified',
  //           },
  //           proof: {
  //             type: 'EcdsaSecp256k1Signature2019',
  //             created: '2023-01-01T19:23:24Z',
  //             proofPurpose: 'assertionMethod',
  //             verificationMethod: 'did:ixo:entity:abc123#key-1',
  //             jws: '',
  //           },
  //         },
  //       }),
  //     )

  //     await customQueries.cellnode.uploadWeb3Doc(
  //       utils.common.generateId(12),
  //       'application/ld+json',
  //       buff.toString('base64'),
  //       undefined,
  //       chainNetwork,
  //     )
  //   } catch (e) {
  //     console.error('saveProjectCreds', e)
  //     return undefined
  //   }
  // }

  const SaveTags = async (): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
    try {
      const payload = {
        '@context': {
          ixo: 'https://w3id.org/ixo/ns/protocol/',
          '@id': '@type',
          type: '@type',
          '@protected': true,
        },
        type: 'ixo:entity#tags',
        ddoTags,
      }
      const buff = Buffer.from(JSON.stringify(payload))
      const res = await UploadDataToService(buff.toString('base64'))
      console.log('SaveTags', payload)
      return res
    } catch (e) {
      console.error('SaveTags', e)
      return undefined
    }
  }

  const SaveTokenMetadata = async (): Promise<CellnodeWeb3Resource | undefined> => {
    try {
      const buff = Buffer.from(
        JSON.stringify({
          id: '{id}#1',
          type: 'ImpactToken',
          name: metadata.name,
          tokenName: metadata.tokenname,
          decimals: metadata.decimals,
          description: metadata.description,
          image: metadata.image,
          properties: {
            denom: metadata.denom,
            icon: metadata.icon,
            maxSupply: metadata.maxSupply,
          },
        }),
      )
      const res = await customQueries.cellnode.uploadWeb3Doc(
        utils.common.generateId(12),
        'application/ld+json',
        buff.toString('base64'),
        undefined,
        chainNetwork,
      )
      console.log('SaveTokenMetadata', res)
      return res
    } catch (e) {
      console.error('SaveTokenMetadata', e)
      return undefined
    }
  }

  const SaveClaims = async (): Promise<CellnodePublicResource | undefined> => {
    try {
      const claims = Object.values(claim)
      const headLinMetricClaim = claims.find(({ isHeadlineMetric }) => isHeadlineMetric)

      const buff = Buffer.from(
        JSON.stringify({
          '@context': {
            ixo: 'https://w3id.org/ixo/ns/protocol/',
            '@id': '@type',
            type: '@type',
            '@protected': true,
          },
          type: 'ixo:entity#claim',
          entityClaims: claims,
          headlineMetric: headLinMetricClaim?.id,
        }),
      )
      const res = await customQueries.cellnode.uploadPublicDoc(
        'application/ld+json',
        buff.toString('base64'),
        undefined,
        chainNetwork,
      )
      console.log('SaveClaims', res)
      return res
    } catch (e) {
      console.error('SaveClaims', e)
      return undefined
    }
  }

  const UploadLinkedResource = async (): Promise<LinkedResource[]> => {
    // TODO: daoCredsIssuerDid
    const daoCredsIssuerDid = 'did:ixo:entity:c4a5588bdd7f651f5f5e742887709d57'
    const linkedResource: LinkedResource[] = []

    const [saveProfileRes, saveCreatorRes, saveAdministratorRes, savePageRes, saveTagsRes] = await Promise.allSettled([
      await SaveProfile(),
      await SaveCreator(daoCredsIssuerDid),
      await SaveAdministrator(daoCredsIssuerDid),
      await SavePage(),
      await SaveTags(),
    ]).then((responses) => responses.map((response: any) => response.value))

    if (saveProfileRes) {
      linkedResource.push({
        id: '{id}#profile',
        type: 'Settings',
        description: 'Profile',
        mediaType: 'application/ld+json',
        // serviceEndpoint: cellnodeService ? `${cellnodeService.id}:/public/${saveProfileRes.key}` : saveProfileRes.url,
        serviceEndpoint: LinkedResourceServiceEndpointGenerator(saveProfileRes, cellnodeService),
        // proof: cellnodeService ? saveProfileRes.key : saveProfileRes.cid,
        proof: LinkedResourceProofGenerator(saveProfileRes, cellnodeService),
        encrypted: 'false',
        right: '',
      })
    }
    if (saveCreatorRes) {
      linkedResource.push({
        id: '{id}#creator',
        type: 'VerifiableCredential',
        description: 'Creator',
        mediaType: 'application/ld+json',
        // serviceEndpoint: cellnodeService ? `${cellnodeService.id}:/public/${saveCreatorRes.key}` : saveCreatorRes.url,
        serviceEndpoint: LinkedResourceServiceEndpointGenerator(saveCreatorRes, cellnodeService),
        // proof: cellnodeService ? saveCreatorRes.key : saveCreatorRes.cid,
        proof: LinkedResourceProofGenerator(saveCreatorRes, cellnodeService),
        encrypted: 'false',
        right: '',
      })
    }
    if (saveAdministratorRes) {
      linkedResource.push({
        id: '{id}#administrator',
        type: 'VerifiableCredential',
        description: 'Administrator',
        mediaType: 'application/ld+json',
        // serviceEndpoint: cellnodeService ? `${cellnodeService.id}:/public/${saveAdministratorRes.key}` : saveAdministratorRes.url,
        serviceEndpoint: LinkedResourceServiceEndpointGenerator(saveAdministratorRes, cellnodeService),
        // proof: cellnodeService ? saveAdministratorRes.key : saveAdministratorRes.cid,
        proof: LinkedResourceProofGenerator(saveAdministratorRes, cellnodeService),
        encrypted: 'false',
        right: '',
      })
    }
    if (savePageRes) {
      linkedResource.push({
        id: '{id}#page',
        type: 'Settings',
        description: 'Page',
        mediaType: 'application/ld+json',
        // serviceEndpoint: cellnodeService ? `${cellnodeService.id}:/public/${savePageRes.key}` : savePageRes.url,
        serviceEndpoint: LinkedResourceServiceEndpointGenerator(savePageRes, cellnodeService),
        // proof: cellnodeService ? savePageRes.key : savePageRes.cid,
        proof: LinkedResourceProofGenerator(savePageRes, cellnodeService),
        encrypted: 'false',
        right: '',
      })
    }
    if (saveTagsRes) {
      linkedResource.push({
        id: '{id}#tags',
        type: 'Settings',
        description: 'Tags',
        mediaType: 'application/ld+json',
        // serviceEndpoint: cellnodeService ? `${cellnodeService.id}:/public/${saveTagsRes.key}` : saveTagsRes.url,
        serviceEndpoint: LinkedResourceServiceEndpointGenerator(saveTagsRes, cellnodeService),
        // proof: cellnodeService ? saveTagsRes.key : saveTagsRes.cid,
        proof: LinkedResourceProofGenerator(saveTagsRes, cellnodeService),
        encrypted: 'false',
        right: '',
      })
    }
    return linkedResource
  }

  const CreateProtocol = async (): Promise<string> => {
    try {
      const res = await CreateEntity(signingClient, signer, [{ entityType: 'protocol' }])
      const protocolDid = utils.common.getValueFromEvents(res!, 'wasm', 'token_id')
      console.log('CreateProtocol', { protocolDid })
      return protocolDid
    } catch (e) {
      console.error('CreateProtocol', e)
      return ''
    }
  }

  const CreateEntityBase = async (
    entityType: string,
    protocolDid: string,
    payload: {
      service: Service[]
      linkedResource: LinkedResource[]
      accordedRight: AccordedRight[]
      linkedEntity: LinkedEntity[]
      verification?: Verification[]
    },
  ): Promise<string> => {
    try {
      const { service, linkedResource, accordedRight, linkedEntity, verification } = payload
      const res = await CreateEntity(signingClient, signer, [
        {
          entityType,
          entityStatus: 0,
          context: [{ key: 'class', val: protocolDid }],
          service,
          linkedResource,
          accordedRight,
          linkedEntity,
          verification,
        },
      ])
      const did = utils.common.getValueFromEvents(res!, 'wasm', 'token_id')
      console.log('CreateEntityBase', { did }, res)
      return did
    } catch (e) {
      console.error('CreateEntityBase', e)
      return ''
    }
  }

  const CreateDAOCoreByGroupId = async (daoGroup: TDAOGroupModel): Promise<string> => {
    try {
      const imageUrl = metadata.image
      const {
        type,
        name,
        description,
        depositRequired,
        depositInfo,
        anyoneCanPropose,
        onlyMembersExecute,
        thresholdType,
        thresholdPercentage,
        quorumEnabled,
        quorumType,
        quorumPercentage,
        proposalDuration,
        proposalDurationUnits,
        allowRevoting,
        memberships,
        staking,
        absoluteThresholdCount,
      } = daoGroup
      const maxVotingPeriod = durationWithUnitsToSeconds(proposalDurationUnits ?? '', proposalDuration)
      const threshold =
        type === 'multisig' && absoluteThresholdCount
          ? {
              absolute_count: {
                threshold: absoluteThresholdCount,
              },
            }
          : quorumEnabled
          ? {
              threshold_quorum: {
                quorum: {
                  percent: quorumType === '%' ? String(quorumPercentage) : undefined,
                  majority: quorumType === 'majority' ? {} : undefined,
                },
                threshold: {
                  percent: thresholdType === '%' ? String(thresholdPercentage) : undefined,
                  majority: thresholdType === 'majority' ? {} : undefined,
                },
              },
            }
          : {
              absolute_percentage: {
                percentage: {
                  percent: thresholdType === '%' ? String(thresholdPercentage) : undefined,
                  majority: thresholdType === 'majority' ? {} : undefined,
                },
              },
            }

      const msg: any = {
        admin: null,
        automatically_add_cw20s: true,
        automatically_add_cw721s: true,
        description,
        image_url: imageUrl,
        name,
        proposal_modules_instantiate_info: [
          {
            admin: {
              core_module: {},
            },
            code_id: daoProposalContractCode,
            label: `DAO_${name}_DaoProposalSingle`,
            msg: utils.conversions.jsonToBase64({
              allow_revoting: allowRevoting,
              close_proposal_on_execution_failure: true,
              max_voting_period: {
                time: maxVotingPeriod,
              },
              min_voting_period: null,
              only_members_execute: onlyMembersExecute,
              pre_propose_info: {
                module_may_propose: {
                  info: {
                    admin: {
                      core_module: {},
                    },
                    code_id: daoPreProposalContractCode,
                    label: `DAO_${name}_pre-propose-DaoProposalSingle`,
                    msg: utils.conversions.jsonToBase64({
                      deposit_info: depositRequired
                        ? {
                            amount: depositInfo.amount,
                            denom: {
                              token: {
                                denom: {
                                  [depositInfo.type]: depositInfo.denomOrAddress,
                                },
                              },
                            },
                            refund_policy: depositInfo.refundPolicy,
                          }
                        : null,
                      extension: {},
                      open_proposal_submission: anyoneCanPropose,
                    }),
                  },
                },
              },
              threshold,
            }),
          },
        ],
      }
      switch (type) {
        case 'membership':
        case 'multisig': {
          const initialMembers: Member[] = []
          memberships?.forEach((membership) => {
            membership.members.forEach((member) => {
              initialMembers.push({ addr: member, weight: membership.weight })
            })
          })
          msg.voting_module_instantiate_info = {
            admin: { core_module: {} },
            code_id: daoVotingCw4ContractCode,
            label: `DAO_${name}_DaoVotingCw4`,
            msg: utils.conversions.jsonToBase64({
              cw4_group_code_id: cw4ContractCode,
              initial_members: initialMembers,
            }),
          }
          break
        }
        case 'staking': {
          if (!staking) {
            break
          }
          const { tokenContractAddress, unstakingDuration } = staking

          /**
           * if create new token
           * else use existing one
           */
          if (!tokenContractAddress) {
            const { tokenSymbol, tokenName, tokenSupply, tokenLogo, distributions } = staking

            const microInitialBalances: Cw20Coin[] = distributions.flatMap(({ totalSupplyPercent, members }) =>
              members.map((address) => ({
                address,
                amount: convertDenomToMicroDenomWithDecimals(
                  // Governance Token-based DAOs distribute tier weights
                  // evenly amongst members.
                  (totalSupplyPercent / members.length / 100) * tokenSupply,
                  NEW_DAO_CW20_DECIMALS,
                ).toString(),
              })),
            )
            // To prevent rounding issues, treasury balance becomes the
            // remaining tokens after the member weights are distributed.
            const microInitialTreasuryBalance = (
              convertDenomToMicroDenomWithDecimals(tokenSupply, NEW_DAO_CW20_DECIMALS) -
              microInitialBalances.reduce((acc, { amount }) => acc + Number(amount), 0)
            ).toString()

            msg.voting_module_instantiate_info = {
              admin: { core_module: {} },
              code_id: daoVotingCw20StakedContractCode,
              label: `DAO_${name}_DaoVotingCw20Staked`,
              msg: utils.conversions.jsonToBase64({
                token_info: {
                  new: {
                    code_id: cw20BaseContractCode,
                    decimals: NEW_DAO_CW20_DECIMALS,
                    marketing: tokenLogo ? { logo: { url: tokenLogo } } : null,
                    initial_balances: microInitialBalances,
                    initial_dao_balance: microInitialTreasuryBalance,
                    label: tokenName,
                    name: tokenName,
                    staking_code_id: cw20StakeContractCode,
                    symbol: tokenSymbol,
                    unstaking_duration: convertDurationWithUnitsToDuration(unstakingDuration),
                  },
                },
              }),
            }
          } else {
            msg.voting_module_instantiate_info = {
              admin: { core_module: {} },
              code_id: daoVotingCw20StakedContractCode,
              label: `DAO_${name}_DaoVotingCw20Staked`,
              msg: utils.conversions.jsonToBase64({
                token_info: {
                  existing: {
                    address: tokenContractAddress,
                    staking_contract: {
                      new: {
                        staking_code_id: cw20StakeContractCode,
                        unstaking_duration: convertDurationWithUnitsToDuration(unstakingDuration),
                      },
                    },
                  },
                },
              }),
            }
          }
          break
        }
        default:
          break
      }
      console.log('Instantiate Dao Group', {
        codeId: daoCoreContractCode!,
        msg: msg,
      })

      const message = {
        codeId: daoCoreContractCode!,
        msg: JSON.stringify(msg),
      }

      const res = await WasmInstantiateTrx(signingClient, signer, [message])
      console.log('CreateDAOCoreByGroupId', res)
      const contractAddress = utils.common.getValueFromEvents(res!, 'instantiate', '_contract_address')
      return contractAddress
    } catch (e) {
      console.error('CreateDAOCoreByGroupId', e)
      return ''
    }
  }

  const AddLinkedEntity = async (did: string, linkedEntity: LinkedEntity): Promise<DeliverTxResponse | undefined> => {
    try {
      const message = {
        typeUrl: '/ixo.iid.v1beta1.MsgAddLinkedEntity',
        value: ixo.iid.v1beta1.MsgAddLinkedEntity.fromPartial({
          id: did,
          linkedEntity: ixo.iid.v1beta1.LinkedEntity.fromPartial(linkedEntity),
          signer: signer.address,
        }),
      }
      const response: DeliverTxResponse = await signingClient.signAndBroadcast(signer.address, [message], fee)
      console.info('AddLinkedEntity', response)
      return response
    } catch (e) {
      console.error('AddLinkedEntity', e)
      return undefined
    }
  }

  return {
    CreateDAO,
    CreateDAOCredsIssuer,
    SaveProfile,
    SaveCreator,
    SaveAdministrator,
    SavePage,
    SaveTags,
    SaveTokenMetadata,
    SaveClaims,
    UploadLinkedResource,
    CreateProtocol,
    CreateEntityBase,
    CreateDAOCoreByGroupId,
    AddLinkedEntity,
  }
}
