import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityServiceModel,
  ELocalisation,
  TEntityPageModel,
  TEntityAdministratorModel,
  TEntityClaimModel,
  TEntityDDOTagModel,
  TDAOGroupModel,
  TProposalModel,
  TQuestion,
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
  updateProfileAction,
  updatePageAction,
  updateServiceAction,
  updateSubtitleAction,
  updateTitleAction,
  clearEntityAction,
  updateClaimQuestionsAction,
  updateStartEndDateAction,
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
  selectCreateEntityProfile,
  selectCreateEntityPage,
  selectCreateEntityService,
  selectCreateEntityStepNo,
  selectCreateEntitySubtitle,
  selectCreateEntityTitle,
  selectCreateEntityType,
  selectCreateEntityClaimQuestions,
  selectCreateEntityStartDate,
  selectCreateEntityEndDate,
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
  LinkedClaim,
  LinkedEntity,
  LinkedResource,
  Service,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { WasmInstantiateTrx } from 'lib/protocol/cosmwasm'
import { chainNetwork } from './configs'
import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'
import { NodeType } from 'types/entities'
import { Cw20Coin } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'
import { DeliverTxResponse } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/stargate'
import BigNumber from 'bignumber.js'
import { LinkedResourceProofGenerator, LinkedResourceServiceEndpointGenerator } from 'utils/entities'
import { selectAllClaimProtocols } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

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
  profile: TEntityMetadataModel
  creator: TEntityCreatorModel
  administrator: TEntityAdministratorModel
  ddoTags: TEntityDDOTagModel[]
  page: TEntityPageModel
  service: TEntityServiceModel[]
  claim: { [id: string]: TEntityClaimModel }
  linkedResource: { [id: string]: LinkedResource | undefined }
  accordedRight: { [key: string]: AccordedRight }
  linkedEntity: { [key: string]: LinkedEntity }
  assetInstances: TCreateEntityModel[]
  localisation: ELocalisation
  startDate: string
  endDate: string
  daoGroups: { [id: string]: TDAOGroupModel }
  daoController: string
  proposal: TProposalModel
  claimQuestions: { [id: string]: TQuestion }
  validateRequiredProperties: boolean
  updateEntityType: (entityType: string) => void
  clearEntity: () => void
  gotoStep: (type: 1 | -1) => void
  gotoStepByNo: (no: number) => void
  updateBreadCrumbs: (breadCrumbs: { text: string; link?: string }[]) => void
  updateTitle: (title: string) => void
  updateSubtitle: (subtitle: string) => void
  updateProfile: (profile: TEntityMetadataModel) => void
  updateCreator: (creator: TEntityCreatorModel) => void
  updateAdministrator: (administrator: TEntityAdministratorModel) => void
  updateDDOTags: (ddoTags: TEntityDDOTagModel[]) => void
  updatePage: (page: TEntityPageModel) => void
  updateService: (service: TEntityServiceModel[]) => void
  updateClaim: (claim: { [id: string]: TEntityClaimModel }) => void
  updateLinkedResource: (linkedResource: { [id: string]: LinkedResource | undefined }) => void
  updateAccordedRight: (accordedRight: { [id: string]: AccordedRight }) => void
  updateLinkedEntity: (linkedEntity: { [id: string]: LinkedEntity }) => void
  updateStartEndDate: ({ startDate, endDate }: { startDate: string; endDate: string }) => void
  addAssetInstances: (instances: TCreateEntityModel[]) => void
  updateAssetInstance: (id: number, instance: TCreateEntityModel) => void
  removeAssetInstances: () => void
  updateLocalisation: (localisation: ELocalisation) => void
  updateDAOGroups: (daoGroups: { [id: string]: TDAOGroupModel }) => void
  updateDAOController: (controller: string) => void
  updateProposal: (proposal: TProposalModel) => void
  updateClaimQuestions: (claimQuestions: { [id: string]: TQuestion }) => void
}

export function useCreateEntityState(): TCreateEntityStateHookRes {
  const dispatch = useAppDispatch()

  const entityType: string = useAppSelector(selectCreateEntityType)
  const stepNo: number = useAppSelector(selectCreateEntityStepNo)
  const breadCrumbs: { text: string; link?: string }[] = useAppSelector(selectCreateEntityBreadCrumbs)
  const title: string = useAppSelector(selectCreateEntityTitle)
  const subtitle: string = useAppSelector(selectCreateEntitySubtitle)

  const profile: TEntityMetadataModel = useAppSelector(selectCreateEntityProfile)
  const creator: TEntityCreatorModel = useAppSelector(selectCreateEntityCreator)
  const administrator: TEntityAdministratorModel = useAppSelector(selectCreateEntityAdministrator)
  const ddoTags: TEntityDDOTagModel[] = useAppSelector(selectCreateEntityDDOTags)
  const page: TEntityPageModel = useAppSelector(selectCreateEntityPage)
  const service: TEntityServiceModel[] = useAppSelector(selectCreateEntityService)
  const claim: { [id: string]: TEntityClaimModel } = useAppSelector(selectCreateEntityClaim)
  const linkedResource: {
    [id: string]: LinkedResource | undefined
  } = useAppSelector(selectCreateEntityLinkedResource)
  const accordedRight: { [key: string]: AccordedRight } = useAppSelector(selectCreateEntityAccordedRight)
  const linkedEntity: { [key: string]: LinkedEntity } = useAppSelector(selectCreateEntityLinkedEntity)
  const assetInstances: TCreateEntityModel[] = useAppSelector(selectCreateEntityAssetInstances)
  const localisation: ELocalisation = useAppSelector(selectCreateEntityLocalisation)
  const startDate: string = useAppSelector(selectCreateEntityStartDate)
  const endDate: string = useAppSelector(selectCreateEntityEndDate)
  // for DAO
  const daoGroups: { [id: string]: TDAOGroupModel } = useAppSelector(selectCreateEntityDAOGroups)
  const daoController: string = useAppSelector(selectCreateEntityDAOController)
  // for Proposal
  const proposal: TProposalModel = useAppSelector(selectCreateEntityProposal)
  // for Claim
  const claimQuestions: { [id: string]: TQuestion } = useAppSelector(selectCreateEntityClaimQuestions)
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

  const updateProfile = (profile: TEntityMetadataModel): void => {
    dispatch(updateProfileAction(profile))
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
  const updateClaim = (claim: { [id: string]: TEntityClaimModel }): void => {
    dispatch(updateClaimAction(claim))
  }
  const updateLinkedResource = (linkedResource: { [id: string]: LinkedResource | undefined }): void => {
    dispatch(updateLinkedResourceAction(linkedResource))
  }
  const updateAccordedRight = (accordedRight: { [id: string]: AccordedRight }): void => {
    dispatch(updateAccordedRightAction(accordedRight))
  }
  const updateLinkedEntity = (linkedEntity: { [id: string]: LinkedEntity }): void => {
    dispatch(updateLinkedEntityAction(linkedEntity))
  }
  const updateStartEndDate = ({ startDate, endDate }: { startDate: string; endDate: string }): void => {
    dispatch(updateStartEndDateAction(startDate, endDate))
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
  const updateClaimQuestions = (claimQuestions: { [id: string]: TQuestion }): void => {
    dispatch(updateClaimQuestionsAction(claimQuestions))
  }

  return {
    entityType,
    stepNo,
    breadCrumbs,
    title,
    subtitle,
    profile,
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
    startDate,
    endDate,
    daoGroups,
    daoController,
    proposal,
    claimQuestions,
    validateRequiredProperties,
    updateEntityType,
    clearEntity,
    gotoStep,
    gotoStepByNo,
    updateBreadCrumbs,
    updateTitle,
    updateSubtitle,
    updateProfile,
    updateCreator,
    updateAdministrator,
    updateDDOTags,
    updatePage,
    updateService,
    updateClaim,
    updateLinkedResource,
    updateAccordedRight,
    updateLinkedEntity,
    updateStartEndDate,
    addAssetInstances,
    updateAssetInstance,
    removeAssetInstances,
    updateLocalisation,
    updateDAOGroups,
    updateDAOController,
    updateProposal,
    updateClaimQuestions,
  }
}

interface TCreateEntityHookRes {
  CreateDAO: () => Promise<string>
  CreateDAOCredsIssuer: (daoDid: string) => Promise<string>
  SaveProfile: (profile: any) => Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined>
  SaveCreator: (creator: TEntityCreatorModel) => Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined>
  SaveAdministrator: (
    administrator: TEntityCreatorModel,
  ) => Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined>
  SavePage: (page: TEntityPageModel) => Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined>
  SaveTags: (ddoTags: TEntityDDOTagModel[]) => Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined>
  SaveTokenMetadata: () => Promise<CellnodeWeb3Resource | undefined>
  SaveClaim: (claim: TEntityClaimModel) => Promise<CellnodeWeb3Resource | undefined>
  SaveClaimQuestions: (questions: TQuestion[]) => Promise<(CellnodePublicResource | CellnodeWeb3Resource)[]>
  UploadLinkedResource: () => Promise<LinkedResource[]>
  UploadLinkedClaim: () => Promise<LinkedClaim[]>
  CreateProtocol: () => Promise<string>
  CreateEntityBase: (
    entityType: string,
    protocolDid: string,
    payload: {
      service: Service[]
      linkedResource: LinkedResource[]
      accordedRight: AccordedRight[]
      linkedEntity: LinkedEntity[]
      linkedClaim: LinkedClaim[]
      verification?: Verification[]
      relayerNode?: string
    },
  ) => Promise<string>
  CreateDAOCoreByGroupId: (daoGroup: TDAOGroupModel) => Promise<string>
  AddLinkedEntity: (did: string, linkedEntity: LinkedEntity) => Promise<DeliverTxResponse | undefined>
}

export function useCreateEntity(): TCreateEntityHookRes {
  const { signingClient, signer } = useAccount()
  const claimProtocols = useAppSelector(selectAllClaimProtocols)

  const createEntityState = useCreateEntityState()
  const profile = createEntityState.profile as any
  const { creator, administrator, page, ddoTags, service, claimQuestions, claim } = createEntityState
  // TODO: service choose-able
  const cellnodeService = service[0]

  const daoCoreContractCode = customQueries.contract.getContractCode(chainNetwork, 'dao_core')
  const daoProposalContractCode = customQueries.contract.getContractCode(chainNetwork, 'dao_proposal_single')
  const daoPreProposalContractCode = customQueries.contract.getContractCode(chainNetwork, 'dao_pre_propose_single')
  const daoVotingCw4ContractCode = customQueries.contract.getContractCode(chainNetwork, 'dao_voting_cw4')
  const cw4ContractCode = customQueries.contract.getContractCode(chainNetwork, 'cw4_group')
  const daoVotingCw20StakedContractCode = customQueries.contract.getContractCode(chainNetwork, 'dao_voting_cw20_staked')
  const cw20BaseContractCode = customQueries.contract.getContractCode(chainNetwork, 'cw20_base')
  const cw20StakeContractCode = customQueries.contract.getContractCode(chainNetwork, 'cw20_stake')

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
    } else {
      res = await customQueries.cellnode.uploadWeb3Doc(
        utils.common.generateId(12),
        'application/ld+json',
        data,
        undefined,
        chainNetwork,
      )
    }
    return res
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

  const SaveProfile = async (profile: any): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
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
        orgName: profile.orgName,
        name: profile.name,
        image: profile.image,
        logo: profile.logo,
        brand: profile.brand,
        location: profile.location,
        description: profile.description,
        attributes: profile.attributes,
        metrics: profile.metrics,

        category: profile.type,
      }
      const buff = Buffer.from(JSON.stringify(payload))
      const res = await UploadDataToService(buff.toString('base64'))
      console.log('SaveProfile', res)
      return res
    } catch (e) {
      console.error('SaveProfile', e)
      return undefined
    }
  }

  const SaveCreator = async (
    creator: TEntityCreatorModel,
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
          id: process.env.REACT_APP_RELAYER_NODE,
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
      console.log('SaveCreator', res)
      return res
    } catch (e) {
      console.error('SaveCreator', e)
      return undefined
    }
  }

  const SaveAdministrator = async (
    administrator: TEntityCreatorModel,
  ): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
    try {
      if (!administrator) {
        throw new Error('Payload is null')
      }
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
          id: process.env.REACT_APP_RELAYER_NODE,
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
      console.log('SaveAdministrator', res)
      return res
    } catch (e) {
      console.error('SaveAdministrator', e)
      return undefined
    }
  }

  const SavePage = async (
    page: TEntityPageModel,
  ): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
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
      console.log('SavePage', res)
      return res
    } catch (e) {
      console.error('SavePage', e)
      return undefined
    }
  }

  const SaveTags = async (
    ddoTags: TEntityDDOTagModel[],
  ): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
    try {
      const payload = {
        '@context': {
          ixo: 'https://w3id.org/ixo/ns/protocol/',
          '@id': '@type',
          type: '@type',
          '@protected': true,
        },
        type: 'ixo:entity#tags',
        entityTags: ddoTags,
      }
      const buff = Buffer.from(JSON.stringify(payload))
      const res = await UploadDataToService(buff.toString('base64'))
      console.log('SaveTags', res)
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
          name: profile.name,
          tokenName: profile.tokenname,
          decimals: profile.decimals,
          description: profile.description,
          image: profile.image,
          properties: {
            denom: profile.denom,
            icon: profile.logo,
            maxSupply: profile.maxSupply,
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

  const SaveClaimQuestion = async (
    question: TQuestion,
  ): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
    try {
      const payload = {
        '@context': {
          ixo: 'https://w3id.org/ixo/ns/protocol/',
          '@id': '@type',
          type: '@type',
          '@protected': true,
        },
        type: 'ixo:entity#claimSchema',
        question,
      }
      const buff = Buffer.from(JSON.stringify(payload))
      const res = await UploadDataToService(buff.toString('base64'))
      console.log('SaveClaimQuestion', res)
      return res
    } catch (e) {
      console.error('SaveClaimQuestion', e)
      return undefined
    }
  }

  const SaveClaimQuestions = async (
    questions: TQuestion[],
  ): Promise<(CellnodePublicResource | CellnodeWeb3Resource)[]> => {
    return (await Promise.allSettled(questions.map(SaveClaimQuestion)))
      .filter((res) => res.status === 'fulfilled')
      .map((res: any) => res.value)
  }

  const SaveClaim = async (claim: TEntityClaimModel): Promise<CellnodeWeb3Resource | undefined> => {
    try {
      // const headLinMetricClaim = claims.find(({ isHeadlineMetric }) => isHeadlineMetric)

      const buff = Buffer.from(
        JSON.stringify({
          '@context': {
            ixo: 'https://w3id.org/ixo/vocab/v1',
            web3: 'https://ipfs.io/ipfs/',
            id: '@id',
            type: '@type',
            '@protected': true,
          },
          id: '{id}#claims',
          type: 'ixo:Claims',
          entityClaims: [claim],
          // headlineMetric: headLinMetricClaim?.id,
        }),
      )
      const res = await customQueries.cellnode.uploadWeb3Doc(
        utils.common.generateId(12),
        'application/ld+json',
        buff.toString('base64'),
        undefined,
        chainNetwork,
      )
      console.log('SaveClaim', res)
      return res
    } catch (e) {
      console.error('SaveClaim', e)
      return undefined
    }
  }

  const UploadLinkedResource = async (): Promise<LinkedResource[]> => {
    let linkedResource: LinkedResource[] = []

    const [saveProfileRes, saveCreatorRes, saveAdministratorRes, savePageRes, saveTagsRes] = await Promise.allSettled([
      await SaveProfile(profile),
      await SaveCreator(creator),
      await SaveAdministrator(administrator),
      await SavePage(page),
      await SaveTags(ddoTags),
    ])

    if (saveProfileRes.status === 'fulfilled' && saveProfileRes.value) {
      linkedResource.push({
        id: '{id}#profile',
        type: 'Settings',
        description: 'Profile',
        mediaType: 'application/ld+json',
        serviceEndpoint: LinkedResourceServiceEndpointGenerator(saveProfileRes.value, cellnodeService),
        proof: LinkedResourceProofGenerator(saveProfileRes.value, cellnodeService),
        encrypted: 'false',
        right: '',
      })
    }
    if (saveCreatorRes.status === 'fulfilled' && saveCreatorRes.value) {
      linkedResource.push({
        id: '{id}#creator',
        type: 'VerifiableCredential',
        description: 'Creator',
        mediaType: 'application/ld+json',
        serviceEndpoint: LinkedResourceServiceEndpointGenerator(saveCreatorRes.value, cellnodeService),
        proof: LinkedResourceProofGenerator(saveCreatorRes.value, cellnodeService),
        encrypted: 'false',
        right: '',
      })
    }
    if (saveAdministratorRes.status === 'fulfilled' && saveAdministratorRes.value) {
      linkedResource.push({
        id: '{id}#administrator',
        type: 'VerifiableCredential',
        description: 'Administrator',
        mediaType: 'application/ld+json',
        serviceEndpoint: LinkedResourceServiceEndpointGenerator(saveAdministratorRes.value, cellnodeService),
        proof: LinkedResourceProofGenerator(saveAdministratorRes.value, cellnodeService),
        encrypted: 'false',
        right: '',
      })
    }
    if (savePageRes.status === 'fulfilled' && savePageRes.value) {
      linkedResource.push({
        id: '{id}#page',
        type: 'Settings',
        description: 'Page',
        mediaType: 'application/ld+json',
        serviceEndpoint: LinkedResourceServiceEndpointGenerator(savePageRes.value, cellnodeService),
        proof: LinkedResourceProofGenerator(savePageRes.value, cellnodeService),
        encrypted: 'false',
        right: '',
      })
    }
    if (saveTagsRes.status === 'fulfilled' && saveTagsRes.value) {
      linkedResource.push({
        id: '{id}#tags',
        type: 'Settings',
        description: 'Tags',
        mediaType: 'application/ld+json',
        serviceEndpoint: LinkedResourceServiceEndpointGenerator(saveTagsRes.value, cellnodeService),
        proof: LinkedResourceProofGenerator(saveTagsRes.value, cellnodeService),
        encrypted: 'false',
        right: '',
      })
    }

    linkedResource = linkedResource.concat(
      await Promise.all(
        Object.values(claimQuestions).map(async (claimQuestion, index) => {
          const res: CellnodePublicResource | CellnodeWeb3Resource | undefined = await SaveClaimQuestion(claimQuestion)

          return {
            id: `{id}#${claimQuestion.title}`,
            type: 'ClaimSchema',
            description: claimQuestion.description,
            mediaType: 'application/ld+json',
            serviceEndpoint: LinkedResourceServiceEndpointGenerator(res!, cellnodeService),
            proof: LinkedResourceProofGenerator(res!, cellnodeService),
            encrypted: 'false',
            right: '',
          }
        }),
      ),
    )

    return linkedResource
  }

  const UploadLinkedClaim = async (): Promise<LinkedClaim[]> => {
    const linkedClaims: LinkedClaim[] = await Promise.all(
      Object.values(claim).map(async (item) => {
        const res: CellnodeWeb3Resource | undefined = await SaveClaim(item)
        const claimProtocol = claimProtocols.find((protocol) => item.template?.id.includes(protocol.id))

        return {
          type: claimProtocol?.profile?.category || '',
          id: `{id}#${claimProtocol?.profile?.name}`,
          description: claimProtocol?.profile?.description || '',
          serviceEndpoint: LinkedResourceServiceEndpointGenerator(res!, cellnodeService),
          proof: LinkedResourceProofGenerator(res!, cellnodeService),
          encrypted: 'false',
          right: '',
        }
      }),
    )

    return linkedClaims
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
      linkedClaim: LinkedClaim[]
      verification?: Verification[]
      relayerNode?: string
    },
  ): Promise<string> => {
    try {
      const { service, linkedResource, accordedRight, linkedEntity, linkedClaim, verification, relayerNode } = payload
      const { startDate, endDate } = profile
      const res = await CreateEntity(signingClient, signer, [
        {
          entityType,
          entityStatus: 0,
          context: [{ key: 'class', val: protocolDid }],
          service,
          linkedResource,
          linkedClaim,
          accordedRight,
          linkedEntity,
          verification,
          relayerNode,
          startDate,
          endDate,
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
    const { type, config, proposalModule, votingModule, token } = daoGroup

    const msg: any = {
      admin: null,
      automatically_add_cw20s: config.automatically_add_cw20s,
      automatically_add_cw721s: config.automatically_add_cw721s,
      description: config.description,
      image_url: config.image_url,
      name: config.name,
      proposal_modules_instantiate_info: [
        {
          admin: {
            core_module: {},
          },
          code_id: daoProposalContractCode,
          label: `DAO_${config.name}_DaoProposalSingle`,
          msg: utils.conversions.jsonToBase64({
            allow_revoting: proposalModule.proposalConfig.allow_revoting,
            close_proposal_on_execution_failure: true,
            max_voting_period: proposalModule.proposalConfig.max_voting_period,
            min_voting_period: null,
            only_members_execute: proposalModule.proposalConfig.only_members_execute,
            pre_propose_info: {
              module_may_propose: {
                info: {
                  admin: {
                    core_module: {},
                  },
                  code_id: daoPreProposalContractCode,
                  label: `DAO_${config.name}_pre-propose-DaoProposalSingle`,
                  msg: utils.conversions.jsonToBase64({
                    // deposit_info: proposalModule.preProposeConfig.deposit_info,
                    deposit_info: proposalModule.preProposeConfig.deposit_info
                      ? {
                          ...proposalModule.preProposeConfig.deposit_info,
                          denom: {
                            token: {
                              denom: proposalModule.preProposeConfig.deposit_info.denom,
                            },
                          },
                        }
                      : null,
                    extension: {},
                    open_proposal_submission: proposalModule.preProposeConfig.open_proposal_submission,
                  }),
                },
              },
            },
            threshold: proposalModule.proposalConfig.threshold,
          }),
        },
      ],
    }
    switch (type) {
      case 'membership':
      case 'multisig': {
        msg.voting_module_instantiate_info = {
          admin: { core_module: {} },
          code_id: daoVotingCw4ContractCode,
          label: `DAO_${config.name}_DaoVotingCw4`,
          msg: utils.conversions.jsonToBase64({
            cw4_group_code_id: cw4ContractCode,
            initial_members: votingModule.members,
          }),
        }
        break
      }
      case 'staking': {
        if (!token) {
          break
        }
        /**
         * if create new token
         * else use existing one
         */
        if (!token.config.token_address) {
          const initial_balances = votingModule.members.map(
            ({ addr, weight }): Cw20Coin => ({
              address: addr,
              amount: weight.toString(),
            }),
          )

          const initial_dao_balance = new BigNumber(token.tokenInfo.total_supply)
            .minus(
              new BigNumber(
                initial_balances.reduce((acc, { amount }) => new BigNumber(acc).plus(amount), new BigNumber(0)),
              ),
            )
            .toString()

          msg.voting_module_instantiate_info = {
            admin: { core_module: {} },
            code_id: daoVotingCw20StakedContractCode,
            label: `DAO_${config.name}_DaoVotingCw20Staked`,
            msg: utils.conversions.jsonToBase64({
              token_info: {
                new: {
                  code_id: cw20BaseContractCode,
                  decimals: token.tokenInfo.decimals,
                  marketing: token.marketingInfo,
                  label: token.tokenInfo.name,
                  name: token.tokenInfo.name,
                  staking_code_id: cw20StakeContractCode,
                  symbol: token.tokenInfo.symbol,
                  initial_balances: initial_balances,
                  initial_dao_balance: initial_dao_balance,
                  unstaking_duration: token.config.unstaking_duration,
                },
              },
            }),
          }
        } else {
          msg.voting_module_instantiate_info = {
            admin: { core_module: {} },
            code_id: daoVotingCw20StakedContractCode,
            label: `DAO_${config.name}_DaoVotingCw20Staked`,
            msg: utils.conversions.jsonToBase64({
              token_info: {
                existing: {
                  address: token.config.token_address,
                  staking_contract: {
                    new: {
                      staking_code_id: cw20StakeContractCode,
                      unstaking_duration: token.config.unstaking_duration,
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

    if (!signingClient) {
      throw new Error('Connect Wallet First')
    }
    const res = await WasmInstantiateTrx(signingClient, signer, [message])
    console.log('CreateDAOCoreByGroupId', res)
    const contractAddress = utils.common.getValueFromEvents(res!, 'instantiate', '_contract_address')
    if (!contractAddress) {
      throw new Error(res?.rawLog)
    }
    return contractAddress
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
    SaveClaim,
    SaveClaimQuestions,
    SaveTokenMetadata,
    UploadLinkedResource,
    UploadLinkedClaim,
    CreateProtocol,
    CreateEntityBase,
    CreateDAOCoreByGroupId,
    AddLinkedEntity,
  }
}
