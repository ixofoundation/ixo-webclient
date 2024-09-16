import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityServiceModel,
  TEntityPageModel,
  TEntityAdministratorModel,
  TEntityClaimModel,
  TEntityDDOTagModel,
  TDAOGroupModel,
  TProposalModel,
} from 'types/entities'
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
  updateQuestionJSONAction,
  updateProtocolIdAction,
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
  selectCreateEntityHeadlineClaim,
  selectCreateEntityQuestionJSON,
  selectCreateEntityProtocolId,
} from 'redux/createEntity/createEntity.selectors'
import { TCreateEntityModel } from 'redux/createEntity/createEntity.types'
import { CreateEntityMessage, TSigner } from 'lib/protocol'
import { customQueries, utils } from '@ixo/impactxclient-sdk'
import { CellnodePublicResource, CellnodeWeb3Resource } from '@ixo/impactxclient-sdk/types/custom_queries/cellnode'
import {
  AccordedRight,
  LinkedClaim,
  LinkedEntity,
  LinkedResource,
  Service,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { WasmInstantiateMessage } from 'lib/protocol/cosmwasm'
import { chainNetwork } from './configs'
import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'
import { Cw20Coin } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'
import BigNumber from 'bignumber.js'
import { LinkedResourceProofGenerator, LinkedResourceServiceEndpointGenerator } from 'utils/entities'
import { selectAllClaimProtocols } from 'redux/entities/entities.selectors'
import { ELocalisation, TQuestion } from 'types/protocol'
import { useWallet } from 'wallet-connector'
import { DeliverTxResponse } from '@cosmjs/stargate'
import { useService } from './service'

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
  headlineMetricClaim: TEntityClaimModel | undefined
  linkedResource: { [id: string]: LinkedResource }
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
  questionJSON: any
  validateRequiredProperties: boolean
  protocolId: string
  updateEntityType: (entityType: string) => void
  clearEntity: () => void
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
  updateLinkedResource: (linkedResource: { [id: string]: LinkedResource }) => void
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
  updateQuestionJSON: (claimQuestionJSON: any) => void
  updateProtocolId: (protocolId: string) => void
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
  const headlineMetricClaim: TEntityClaimModel | undefined = useAppSelector(selectCreateEntityHeadlineClaim)
  const linkedResource: { [id: string]: LinkedResource } = useAppSelector(selectCreateEntityLinkedResource)
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
  const questionJSON: any = useAppSelector(selectCreateEntityQuestionJSON)
  const protocolId: string = useAppSelector(selectCreateEntityProtocolId)
  const validateRequiredProperties = useMemo(() => {
    return !!creator && !!administrator && Object.keys(page ?? {}).length > 0 && service?.length > 0
  }, [creator, administrator, page, service])

  const updateEntityType = useCallback(
    (entityType: string): void => {
      dispatch(updateEntityTypeAction(entityType))
    },
    [dispatch],
  )
  const clearEntity = (): void => {
    dispatch(clearEntityAction())
  }
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
  const updateLinkedResource = (linkedResource: { [id: string]: LinkedResource }): void => {
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
  const updateProposal = useCallback(
    (proposal: TProposalModel): void => {
      dispatch(updateProposalAction(proposal))
    },
    [dispatch],
  )
  const updateClaimQuestions = (claimQuestions: { [id: string]: TQuestion }): void => {
    dispatch(updateClaimQuestionsAction(claimQuestions))
  }
  const updateQuestionJSON = (claimQuestionJSON: any): void => {
    dispatch(updateQuestionJSONAction(claimQuestionJSON))
  }
  const updateProtocolId = (protocolId: string): void => {
    dispatch(updateProtocolIdAction(protocolId))
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
    headlineMetricClaim,
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
    questionJSON,
    validateRequiredProperties,
    protocolId,
    updateEntityType,
    clearEntity,
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
    updateQuestionJSON,
    updateProtocolId,
  }
}

interface TCreateEntityHookRes {
  UploadLinkedResource: () => Promise<LinkedResource[]>
  UploadLinkedClaim: () => Promise<LinkedClaim[]>
  CreateProtocol: (transactionConfig: { sequence: number; transactionSessionHash?: string }) => Promise<any>
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
      controller?: string[]
      relayerNode?: string
    },
    transactionConfig: {
      sequence: number
      transactionSessionHash?: string
    },
  ) => Promise<{ did?: string; adminAccount?: string }>
  CreateDAOCoreByGroupId: (daoGroup: TDAOGroupModel) => Promise<string>
  uploadPublicDoc: (data: string, contentType: string) => Promise<CellnodePublicResource | Error>
}

export function useCreateEntity(): TCreateEntityHookRes {
  const claimProtocols = useAppSelector(selectAllClaimProtocols)

  const createEntityState = useCreateEntityState()
  const profile = createEntityState.profile as any
  const { creator, administrator, page, ddoTags, service, questionJSON, claim } = createEntityState
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

  const { execute, wallet, close } = useWallet()
  const { SaveProfile, SaveCreator, SaveAdministrator, SavePage, SaveTags, SaveQuestionJSON, SaveClaim } = useService()

  const signer: TSigner = {
    address: wallet?.address || '',
    did: wallet?.did || '',
    pubKey: wallet?.pubKey || new Uint8Array(),
    keyType: 'secp',
  }

  const UploadLinkedResource = async (): Promise<LinkedResource[]> => {
    const linkedResource: LinkedResource[] = []

    const [saveProfileRes, saveCreatorRes, saveAdministratorRes, savePageRes, saveTagsRes, saveQuestionJSONRes] =
      await Promise.allSettled([
        await SaveProfile(profile, cellnodeService),
        await SaveCreator(creator, cellnodeService),
        await SaveAdministrator(administrator, cellnodeService),
        await SavePage(page, cellnodeService),
        await SaveTags(ddoTags, cellnodeService),
        await SaveQuestionJSON(questionJSON, cellnodeService),
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
    if (saveQuestionJSONRes.status === 'fulfilled' && saveQuestionJSONRes.value) {
      linkedResource.push({
        id: '{id}#surveyTemplate',
        type: 'surveyTemplate',
        description: questionJSON.description,
        mediaType: 'application/ld+json',
        serviceEndpoint: LinkedResourceServiceEndpointGenerator(saveQuestionJSONRes.value, cellnodeService),
        proof: LinkedResourceProofGenerator(saveQuestionJSONRes.value, cellnodeService),
        encrypted: 'false',
        right: '',
      })
    }

    return linkedResource
  }

  const UploadLinkedClaim = async (): Promise<LinkedClaim[]> => {
    const linkedClaims: LinkedClaim[] = await Promise.all(
      Object.values(claim).map(async (item) => {
        const res: CellnodePublicResource | CellnodeWeb3Resource | undefined = await SaveClaim(item, cellnodeService)
        const claimProtocol = claimProtocols.find((protocol) => item.template?.id.includes(protocol.id))

        return {
          type: claimProtocol?.profile?.category || '',
          id: `{id}#${item.id}`,
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

  const CreateProtocol = async (transactionConfig: {
    sequence: number
    transactionSessionHash?: string
  }): Promise<any> => {
    try {
      const createEntityMessagePayload = await CreateEntityMessage(signer, [{ entityType: 'protocol' }])

      const response = (await execute({ data: createEntityMessagePayload, transactionConfig })) as any
      return response
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
      controller?: string[]
      relayerNode?: string
    },
    transactionConfig: {
      sequence: number
      transactionSessionHash?: string
    },
  ): Promise<{ did?: string; adminAccount?: string }> => {
    try {
      const {
        service,
        linkedResource,
        accordedRight,
        linkedEntity,
        linkedClaim,
        verification,
        relayerNode,
        controller = [],
      } = payload
      const { startDate, endDate } = createEntityState
      const createEntityMessagePayload = await CreateEntityMessage(signer, [
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
          controller,
          startDate,
          endDate,
        },
      ])

      const response = (await execute({
        data: createEntityMessagePayload,
        transactionConfig,
      })) as unknown as DeliverTxResponse
      const did = utils.common.getValueFromEvents(response, 'wasm', 'token_id')
      const adminAccount = utils.common.getValueFromEvents(
        response,
        'ixo.entity.v1beta1.EntityCreatedEvent',
        'entity',
        (s) => s.accounts.find((a: any) => a.name === 'admin').address,
      )

      console.log('CreateEntityBase', { did, adminAccount }, response)
      return { did, adminAccount }
    } catch (e) {
      console.error('CreateEntityBase', e)
      return {}
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
          admin: { core_module: {} },
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
                  admin: { core_module: {} },
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

    // if (!signingClient || !wallet) {
    //   throw new Error('Connect Wallet First')
    // }
    const instantiateWasmPayload = await WasmInstantiateMessage(signer, [message])

    if (instantiateWasmPayload) {
      const response = (await execute({
        data: instantiateWasmPayload,
        transactionConfig: { sequence: 1 },
      })) as unknown as DeliverTxResponse
      const contractAddress = utils.common.getValueFromEvents(response!, 'instantiate', '_contract_address')
      if (!contractAddress) {
        throw new Error(response?.rawLog)
      }
      close()
      return contractAddress
    }

    return 'Error'
  }

  const uploadPublicDoc = async (data: string, contentType: string): Promise<CellnodePublicResource | Error> => {
    const response = await customQueries.cellnode.uploadPublicDoc(contentType, data, undefined, chainNetwork)
    return response
  }

  return {
    UploadLinkedResource,
    UploadLinkedClaim,
    CreateProtocol,
    CreateEntityBase,
    CreateDAOCoreByGroupId,
    uploadPublicDoc,
  }
}
