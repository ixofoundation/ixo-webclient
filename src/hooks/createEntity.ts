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
  TDeedModel,
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
  updateDeedAction,
  updateEntityTypeAction,
  updateLinkedEntityAction,
  updateLinkedResourceAction,
  updateLocalisationAction,
  updateMetadataAction,
  updatePageAction,
  updateServiceAction,
  updateSubtitleAction,
  updateTitleAction,
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
  selectCreateEntityDeed,
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
import { TEntityModel } from 'redux/createEntity/createEntity.types'
import { useAccount } from './account'
import { CreateEntity } from 'lib/protocol'
import { customQueries, utils } from '@ixo/impactxclient-sdk'
import { CellnodePublicResource, CellnodeWeb3Resource } from '@ixo/impactxclient-sdk/types/custom_queries/cellnode'
import {
  AccordedRight,
  LinkedEntity,
  LinkedResource,
  Service,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { WasmInstantiateTrx } from 'lib/protocol/cosmwasm'
import { durationToSeconds1 } from 'utils/conversions'
import { Member } from 'types/dao'
import { chainNetwork } from './configs'
import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'

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
  assetInstances: TEntityModel[]
  localisation: ELocalisation
  daoGroups: { [id: string]: TDAOGroupModel }
  daoController: string
  deed: TDeedModel
  validateRequiredProperties: boolean
  updateEntityType: (entityType: string) => void
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
  addAssetInstances: (instances: TEntityModel[]) => void
  updateAssetInstance: (id: number, instance: TEntityModel) => void
  removeAssetInstances: () => void
  updateLocalisation: (localisation: ELocalisation) => void
  updateDAOGroups: (daoGroups: { [id: string]: TDAOGroupModel }) => void
  updateDAOController: (controller: string) => void
  updateDeed: (deed: TDeedModel) => void
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
  const assetInstances: TEntityModel[] = useAppSelector(selectCreateEntityAssetInstances)
  const localisation: ELocalisation = useAppSelector(selectCreateEntityLocalisation)
  // for DAO
  const daoGroups: { [id: string]: TDAOGroupModel } = useAppSelector(selectCreateEntityDAOGroups)
  const daoController: string = useAppSelector(selectCreateEntityDAOController)
  // for Deed
  const deed: TDeedModel = useAppSelector(selectCreateEntityDeed)
  const validateRequiredProperties = useMemo(() => {
    return !!creator && !!administrator && Object.keys(page ?? {}).length > 0 && service?.length > 0
  }, [creator, administrator, page, service])

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
    deed,
    validateRequiredProperties,
    updateEntityType,
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
    updateDeed,
  }
}

interface TCreateEntityHookRes {
  CreateDAO: () => Promise<string>
  CreateDAOCredsIssuer: (daoDid: string) => Promise<string>
  SaveProfile: () => Promise<CellnodeWeb3Resource | undefined>
  SaveCreator: (daoCredsIssuerDid: string) => Promise<CellnodePublicResource | undefined>
  SaveAdministrator: (daoCredsIssuerDid: string) => Promise<CellnodePublicResource | undefined>
  SavePage: () => Promise<CellnodePublicResource | undefined>
  SaveTags: () => Promise<CellnodePublicResource | undefined>
  SaveTokenMetadata: () => Promise<CellnodeWeb3Resource | undefined>
  SaveClaims: () => Promise<CellnodePublicResource | undefined>
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
}

export function useCreateEntity(): TCreateEntityHookRes {
  const { signingClient, signer } = useAccount()
  const createEntityState = useCreateEntityState()
  const metadata = createEntityState.metadata as any
  const { creator, administrator, page, ddoTags, claim } = createEntityState

  const daoCoreContractCode = customQueries.contract.getContractCode('devnet', 'dao_core')
  const daoProposalContractCode = customQueries.contract.getContractCode('devnet', 'dao_proposal_single')
  const daoPreProposalContractCode = customQueries.contract.getContractCode('devnet', 'dao_pre_propose_single')
  const daoVotingCw4ContractCode = customQueries.contract.getContractCode('devnet', 'dao_voting_cw4')
  const cw4ContractCode = customQueries.contract.getContractCode('devnet', 'cw4_group')
  // const daoVotingCw20StakedContractCode = customQueries.contract.getContractCode('devnet', 'dao_voting_cw20_staked')
  // const cw20BaseContractCode = customQueries.contract.getContractCode('devnet', 'cw20_base')

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

  const SaveProfile = async (): Promise<CellnodeWeb3Resource | undefined> => {
    try {
      const buff = Buffer.from(
        JSON.stringify({
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
        }),
      )
      const res = await customQueries.cellnode.uploadWeb3Doc(
        utils.common.generateId(12),
        'application/ld+json',
        buff.toString('base64'),
        undefined,
        chainNetwork,
      )
      console.log('SaveProfile', res)
      /**
       *  {
            "cid": "bafkreia3am66tjebxnpa7khxxbj7rvnpihgyqyu3udsmo3fn24ezkiw7ie",
            "name": "NsEXszeIqTLK",
            "ipfs": "bafkreia3am66tjebxnpa7khxxbj7rvnpihgyqyu3udsmo3fn24ezkiw7ie.ipfs.w3s.link",
            "url": "https://bafkreia3am66tjebxnpa7khxxbj7rvnpihgyqyu3udsmo3fn24ezkiw7ie.ipfs.w3s.link"
          }
       */
      return res
    } catch (e) {
      console.error('SaveProfile', e)
      return undefined
    }
  }

  const SaveCreator = async (daoCredsIssuerDid: string): Promise<CellnodePublicResource | undefined> => {
    try {
      const buff = Buffer.from(
        JSON.stringify({
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
        }),
      )
      const res: CellnodePublicResource = await customQueries.cellnode.uploadPublicDoc(
        'application/ld+json',
        buff.toString('base64'),
        undefined,
        chainNetwork,
      )
      console.log('SaveCreator', res)
      /**
       *  {
            "key": "63mimq0kl4plerl80du",
            "contentType": "application/ld+json",
            "data": "eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSIsImh0dHBzOi8vdzNpZC5vcmcvaXhvL25zL2NvbnRleHQvdjEiLCJodHRwczovL3czaWQub3JnL2l4by9ucy9wcm90b2NvbC9lbnRpdHkjY3JlYXRvciIseyJAdmVyc2lvbiI6MSwiQHByb3RlY3RlZCI6dHJ1ZSwiaWQiOiJAaWQiLCJ0eXBlIjoiQHR5cGUifV0sImlkIjoiaHR0cHM6Ly93M2lkLm9yZy9peG8vbnMvY3JlZGVudGlhbC1zY2hlbWFzL29yZ2FuaXphdGlvbi92MSIsInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJDcmVhdG9yQ3JlZGVudGlhbCJdLCJpc3N1ZXIiOiJkaWQ6eDp6UTNzaHRkZnFLekRQVlNGWjkycUVyUmFDeHRXOUNvbW1ZcUg4WWg1UDM1a1JzeUxpIiwiaXNzdWFuY2VEYXRlIjoiMjAyMy0wMy0wMlQyMDo1NzowNy42ODFaIiwidmFsaWRGcm9tIjoiMjAyMy0wMy0wMlQyMDo1NzowNy42ODFaIiwiZXhwaXJhdGlvbkRhdGUiOiIiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDppeG86ZW50aXR5OmM0YTU1ODhiZGQ3ZjY1MWY1ZjVlNzQyODg3NzA5ZDU3IiwidHlwZSI6ImNyZWF0b3IiLCJkaXNwbGF5TmFtZSI6IlNtb2tlIE1vbmtleSIsImxvY2F0aW9uIjoiSnVuZ2xlIiwiZW1haWwiOiJzbW9rZUBtb25rZXkuY29tIiwibWlzc2lvbiI6ImFzZGZhc2RmYXNkZmFzZGZhc2RmYXNkZiIsIndlYnNpdGUiOiJodHRwczovL21vbmtleS5jb20iLCJsb2dvIjoiaHR0cHM6Ly9kZXZuZXQtY2VsbG5vZGUuaXhvLmVhcnRoL3B1YmxpYy84MW54ZWFuOGp2Nmxlcmt5cDN5In0sInByb29mIjp7InR5cGUiOiJFY2RzYVNlY3AyNTZrMVNpZ25hdHVyZTIwMTkiLCJjcmVhdGVkIjoiMjAyMy0wMy0wMlQyMDo1NzowNy42ODFaIiwicHJvb2ZQdXJwb3NlIjoiYXNzZXJ0aW9uTWV0aG9kIiwidmVyaWZpY2F0aW9uTWV0aG9kIjoiZGlkOml4bzplbnRpdHk6YWJjMTIzI2tleS0xIiwiandzIjoiIn19",
            "url": "https://devnet-cellnode.ixo.earth/public/63mimq0kl4plerl80du"
          }
       */
      return res
    } catch (e) {
      console.error('SaveCreator', e)
      return undefined
    }
  }

  const SaveAdministrator = async (daoCredsIssuerDid: string): Promise<CellnodePublicResource | undefined> => {
    try {
      const buff = Buffer.from(
        JSON.stringify({
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
        }),
      )
      const res: CellnodePublicResource = await customQueries.cellnode.uploadPublicDoc(
        'application/ld+json',
        buff.toString('base64'),
        undefined,
        chainNetwork,
      )
      console.log('SaveAdministrator', res)
      /**
       *  {
            "key": "63mimq0kl4plerl80du",
            "contentType": "application/ld+json",
            "data": "eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSIsImh0dHBzOi8vdzNpZC5vcmcvaXhvL25zL2NvbnRleHQvdjEiLCJodHRwczovL3czaWQub3JnL2l4by9ucy9wcm90b2NvbC9lbnRpdHkjY3JlYXRvciIseyJAdmVyc2lvbiI6MSwiQHByb3RlY3RlZCI6dHJ1ZSwiaWQiOiJAaWQiLCJ0eXBlIjoiQHR5cGUifV0sImlkIjoiaHR0cHM6Ly93M2lkLm9yZy9peG8vbnMvY3JlZGVudGlhbC1zY2hlbWFzL29yZ2FuaXphdGlvbi92MSIsInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJDcmVhdG9yQ3JlZGVudGlhbCJdLCJpc3N1ZXIiOiJkaWQ6eDp6UTNzaHRkZnFLekRQVlNGWjkycUVyUmFDeHRXOUNvbW1ZcUg4WWg1UDM1a1JzeUxpIiwiaXNzdWFuY2VEYXRlIjoiMjAyMy0wMy0wMlQyMDo1NzowNy42ODFaIiwidmFsaWRGcm9tIjoiMjAyMy0wMy0wMlQyMDo1NzowNy42ODFaIiwiZXhwaXJhdGlvbkRhdGUiOiIiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDppeG86ZW50aXR5OmM0YTU1ODhiZGQ3ZjY1MWY1ZjVlNzQyODg3NzA5ZDU3IiwidHlwZSI6ImNyZWF0b3IiLCJkaXNwbGF5TmFtZSI6IlNtb2tlIE1vbmtleSIsImxvY2F0aW9uIjoiSnVuZ2xlIiwiZW1haWwiOiJzbW9rZUBtb25rZXkuY29tIiwibWlzc2lvbiI6ImFzZGZhc2RmYXNkZmFzZGZhc2RmYXNkZiIsIndlYnNpdGUiOiJodHRwczovL21vbmtleS5jb20iLCJsb2dvIjoiaHR0cHM6Ly9kZXZuZXQtY2VsbG5vZGUuaXhvLmVhcnRoL3B1YmxpYy84MW54ZWFuOGp2Nmxlcmt5cDN5In0sInByb29mIjp7InR5cGUiOiJFY2RzYVNlY3AyNTZrMVNpZ25hdHVyZTIwMTkiLCJjcmVhdGVkIjoiMjAyMy0wMy0wMlQyMDo1NzowNy42ODFaIiwicHJvb2ZQdXJwb3NlIjoiYXNzZXJ0aW9uTWV0aG9kIiwidmVyaWZpY2F0aW9uTWV0aG9kIjoiZGlkOml4bzplbnRpdHk6YWJjMTIzI2tleS0xIiwiandzIjoiIn19",
            "url": "https://devnet-cellnode.ixo.earth/public/63mimq0kl4plerl80du"
          }
       */
      return res
    } catch (e) {
      console.error('SaveAdministrator', e)
      return undefined
    }
  }

  const SavePage = async (): Promise<CellnodePublicResource | undefined> => {
    try {
      const buff = Buffer.from(
        JSON.stringify({
          '@context': {
            ixo: 'https://w3id.org/ixo/ns/protocol/',
            '@id': '@type',
            type: '@type',
            '@protected': true,
          },
          type: 'ixo:entity#page',
          page: Object.values(page),
        }),
      )
      const res = await customQueries.cellnode.uploadPublicDoc(
        'application/json',
        buff.toString('base64'),
        undefined,
        chainNetwork,
      )
      console.log('SavePage', res)
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

  const SaveTags = async (): Promise<CellnodePublicResource | undefined> => {
    try {
      const buff = Buffer.from(JSON.stringify(ddoTags))
      const res = await customQueries.cellnode.uploadPublicDoc(
        'application/ld+json',
        buff.toString('base64'),
        undefined,
        chainNetwork,
      )
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
      console.log('CreateEntityBase', { did })
      return did
    } catch (e) {
      console.error('CreateEntityBase', e)
      return ''
    }
  }

  // const createAssetInstance = async (): Promise<string> => {
  //   //
  //   return ''
  // }

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
        // staking,
      } = daoGroup
      const maxVotingPeriod = durationToSeconds1(proposalDurationUnits ?? '', proposalDuration)

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
              threshold: quorumEnabled
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
                  },
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
        case 'staking':
          // msg.voting_module_instantiate_info = {
          //   admin: { core_module: {} },
          //   code_id: daoVotingCw20StakedContractCode,
          //   label: `DAO_${name}_DaoVotingCw20Staked`,
          //   msg: utils.conversions.jsonToBase64({
          //     token_info: {
          //       new: {
          //         code_id: cw20BaseContractCode,
          //         decimals: 6,
          //         initial_balances: [
          //           {
          //             address: 'juno1z7wa83uur7jv6mx9wd4cdwx0c853gp9tt0mt50',
          //             amount: '200000000000',
          //           },
          //           {
          //             address: 'juno1z7wa83uur7jv6mx9wd4cdwx0c853gp9tt0mt54',
          //             amount: '200000000000',
          //           },
          //           {
          //             address: 'juno1z7wa83uur7jv6mx9wd4cdwx0c853gp9tt0mt10',
          //             amount: '166666666667',
          //           },
          //           {
          //             address: 'juno1z7wa83uur7jv6mx9wd4cdwx0c853gp9tt0mt11',
          //             amount: '166666666667',
          //           },
          //           {
          //             address: 'juno1z7wa83uur7jv6mx9wd4cdwx0c853gp9tt0mt14',
          //             amount: '166666666667',
          //           },
          //         ],
          //         initial_dao_balance: '9099999999999',
          //         label: 'safdweve',
          //         marketing: null,
          //         name: 'safdweve',
          //         staking_code_id: 1683,
          //         symbol: 'asdf',
          //         unstaking_duration: {
          //           time: 1209600,
          //         },
          //       },
          //     },
          //   }),
          // }
          break
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
    CreateProtocol,
    CreateEntityBase,
    CreateDAOCoreByGroupId,
  }
}
