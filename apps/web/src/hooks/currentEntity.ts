import { EntityAccount } from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/entity'
import {
  IidMetadata,
  LinkedEntity,
  LinkedResource,
  Service,
  VerificationMethod,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { useMemo } from 'react'
import {
  clearEntityAction,
  updateEntityAction,
  updateEntityResourceAction,
} from 'redux/currentEntity/currentEntity.actions'
import {
  selectEntityLinkedResource,
  selectEntityProfile,
  selectEntityCreator,
  selectEntityType,
  selectEntityAdministrator,
  selectEntityPage,
  selectEntityTags,
  selectEntityLinkedEntity,
  selectEntityMetadata,
  selectEntityId,
  selectEntityAccounts,
  selectEntityOwner,
  selectEntityService,
  selectEntityStartDate,
  selectEntityEndDate,
  selectCurrentEntity,
  selectEntityLinkedAccounts,
  selectEntityClaim,
  selectEntityDAOGroups,
  selectEntityVerificationMethod,
  selectEntityController,
  selectEntityStatus,
  selectEntitySettings,
  selectEntityPageLegacy,
} from 'redux/currentEntity/currentEntity.selectors'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  TDAOGroupModel,
  TEntityAdministratorModel,
  TEntityClaimModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityModel,
  TEntityPageSectionLegacyModel,
  TEntityPageSectionModel,
  TEntityProfileModel,
} from 'types/entities'
import { getDaoContractInfo, thresholdToTQData } from 'utils/dao'
import { useAccount } from './account'
import { Config as ProposalConfig } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/DaoPreProposeSingle.types'
import { depositInfoToCoin } from 'utils/conversions'
import { EntityLinkedResourceConfig } from 'constants/entity'
import { IMPACTS_DAO_ID } from 'constants/chains'
import { OutputBlockData } from '@editorjs/editorjs'
import { useEntityLazyQuery } from 'generated/graphql'
import { apiEntityToEntity } from 'utils/entities'
import { updateEntityPropertyAction } from 'redux/entitiesExplorer/entitiesExplorer.actions'
export default function useCurrentEntity(): {
  id: string
  settings: any
  entityType: string
  entityStatus: number
  currentEntity: TEntityModel
  linkedResource: LinkedResource[]
  linkedEntity: LinkedEntity[]
  profile: TEntityProfileModel
  creator: TEntityCreatorModel
  administrator: TEntityAdministratorModel
  page: TEntityPageSectionModel[]
  pageLegacy: TEntityPageSectionLegacyModel
  tags: TEntityDDOTagModel[]
  metadata: IidMetadata | undefined
  accounts: EntityAccount[]
  linkedAccounts: LinkedEntity[]
  owner: string
  controller: string[]
  service: Service[]
  claim: { [id: string]: TEntityClaimModel }
  startDate: string
  endDate: string
  verificationMethod: VerificationMethod[]
  daoGroups: { [address: string]: TDAOGroupModel }
  daoController: string
  isImpactsDAO: boolean
  isMemberOfImpactsDAO: boolean
  isOwner: boolean
  clearEntity: () => void
  updateDAOGroup: (coreAddress: string) => Promise<void>
  updateEntity: (entity: TEntityModel) => void
  refetchAndUpdate: () => void
} {
  const dispatch = useAppDispatch()
  const { cwClient, address } = useAccount()
  const currentEntity: TEntityModel = useAppSelector(selectCurrentEntity)
  const id: string = useAppSelector(selectEntityId)!
  const entityType: string = useAppSelector(selectEntityType)!
  const entityStatus: number = useAppSelector(selectEntityStatus)!
  const linkedResource: LinkedResource[] = useAppSelector(selectEntityLinkedResource)
  const linkedEntity: LinkedEntity[] = useAppSelector(selectEntityLinkedEntity)!
  const profile: TEntityProfileModel = useAppSelector(selectEntityProfile)!
  const creator: TEntityCreatorModel = useAppSelector(selectEntityCreator)!
  const administrator: TEntityAdministratorModel = useAppSelector(selectEntityAdministrator)!
  const page: TEntityPageSectionModel[] = useAppSelector(selectEntityPage)!
  const pageLegacy: TEntityPageSectionLegacyModel = useAppSelector(selectEntityPageLegacy)!
  const tags: TEntityDDOTagModel[] = useAppSelector(selectEntityTags)!
  const metadata: IidMetadata | undefined = useAppSelector(selectEntityMetadata)
  const accounts: EntityAccount[] = useAppSelector(selectEntityAccounts)
  const linkedAccounts: LinkedEntity[] = useAppSelector(selectEntityLinkedAccounts)
  const owner: string = useAppSelector(selectEntityOwner)
  const controller: string[] = useAppSelector(selectEntityController)
  const service: Service[] = useAppSelector(selectEntityService)
  const settings: Service[] = useAppSelector(selectEntitySettings)
  const claim: { [id: string]: TEntityClaimModel } = useAppSelector(selectEntityClaim)
  const startDate: string = useAppSelector(selectEntityStartDate)
  const endDate: string = useAppSelector(selectEntityEndDate)
  const verificationMethod: VerificationMethod[] = useAppSelector(selectEntityVerificationMethod)
  const daoGroups: { [address: string]: TDAOGroupModel } = useAppSelector(selectEntityDAOGroups)
  const daoController: string = useMemo(
    () =>
      Object.values(daoGroups)
        .map((v) => v.coreAddress)
        .find((addr) => verificationMethod.some((v) => v.id.includes(addr))) || '',
    [daoGroups, verificationMethod],
  )
  const isImpactsDAO = id === IMPACTS_DAO_ID
  const isMemberOfImpactsDAO = useMemo(
    () => !!isImpactsDAO && linkedEntity.some(({ type, id }) => type === 'MemberDAO' && id.includes(address)),
    [address, isImpactsDAO, linkedEntity],
  )
  const isOwner = owner === address

  const updateEntity = (data: TEntityModel) => {
    dispatch(updateEntityAction(data))
  }

  const updateEntityResource = ({ key, data, merge }: { key: string; data: any; merge: boolean }) => {
    dispatch(updateEntityResourceAction({ key, data, merge }))
  }

  const clearEntity = (): void => {
    dispatch(clearEntityAction())
  }

  const updateDAOGroup = async (coreAddress: string) => {
    const { type, admin, config, proposalModule, votingModule, token } = await getDaoContractInfo({
      coreAddress,
      cwClient,
    })

    updateEntityResource({
      key: 'daoGroups',
      data: {
        [coreAddress]: {
          coreAddress,
          admin,
          type,
          config,
          proposalModule,
          votingModule,
          token,
          selected: daoGroups[coreAddress]?.selected,
        },
      },
      merge: true,
    })
  }

  const [refetchAndUpdate] = useEntityLazyQuery({
    variables: { id },
    onCompleted: (data) => {
      apiEntityToEntity({ entity: data.entity, cwClient }, (key, data, merge = true) => {
        dispatch(updateEntityPropertyAction(id, key, data, merge))
      })
    },
  })

  return {
    id,
    settings,
    entityType,
    entityStatus,
    currentEntity,
    linkedResource,
    linkedEntity,
    profile,
    creator,
    administrator,
    page,
    pageLegacy,
    tags,
    metadata,
    accounts,
    linkedAccounts,
    owner,
    controller,
    service,
    claim,
    startDate,
    endDate,
    verificationMethod,
    daoGroups,
    daoController,
    isImpactsDAO,
    isMemberOfImpactsDAO,
    isOwner,
    clearEntity,
    updateDAOGroup,
    updateEntity,
    refetchAndUpdate,
  }
}

export function useCurrentEntityMetadata(): {
  createdAt: Date | undefined
} {
  const { metadata } = useCurrentEntity()
  const createdAt = metadata?.created && new Date(metadata.created as never as string)

  return { createdAt }
}

export function useCurrentEntityProfile(profile: TEntityModel["profile"]): Omit<TEntityProfileModel, '@context' | 'id'> {
  const type = profile?.type ?? ''
  const name = profile?.name ?? ''
  const orgName = profile?.orgName ?? ''
  const image = profile?.image ?? ''
  const logo = profile?.logo ?? ''
  const brand = profile?.brand ?? ''
  const location = profile?.location ?? ''
  const description = profile?.description ?? ''
  const attributes = profile?.attributes ?? []
  const metrics = profile?.metrics ?? []
  const category = profile?.category ?? ''

  return { type, name, orgName, image, logo, brand, location, description, attributes, metrics, category }
}

export function useCurrentEntityCreator(): Omit<TEntityCreatorModel, '@type'> {
  const { creator } = useCurrentEntity()
  const id = creator?.id ?? ''
  const logo = creator?.logo ?? ''
  const displayName = creator?.displayName ?? ''
  const email = creator?.email ?? ''
  const location = creator?.location ?? ''
  const website = creator?.website ?? ''
  const mission = creator?.mission ?? ''

  return { id, logo, displayName, email, location, website, mission }
}

export function useCurrentEntityTags(): {
  sdgs: string[]
} {
  const { tags } = useCurrentEntity()
  const sdgs = tags?.find(({ category }) => category === 'SDG')?.tags ?? []

  return { sdgs }
}

export function useCurrentEntityPage(): OutputBlockData[] {
  const { settings } = useCurrentEntity()
  const page = settings?.Page?.data?.page ?? []

  return page
}

export function useCurrentEntityClaims() {
  const claims: { [id: string]: TEntityClaimModel } = useAppSelector(selectEntityClaim)
  const headlineClaim = Object.values(claims)?.find((v) => v?.isHeadlineMetric)

  return { claims, headlineClaim }
}

export function useCurrentEntityAdminAccount(accounts: EntityAccount[]): string {
  return accounts?.find((account) => account.name === 'admin')?.address || ''
}

export function useCurrentEntityLinkedFiles(): LinkedResource[] {
  const { linkedResource } = useCurrentEntity()

  return linkedResource?.filter((item: LinkedResource) => Object.keys(EntityLinkedResourceConfig).includes(item.type))
}

export function useCurrentEntityClaimSchemas(): LinkedResource[] {
  const { linkedResource } = useCurrentEntity()

  return linkedResource?.filter((item: LinkedResource) => item.type === 'surveyTemplate')
}

export function useCurrentEntityLinkedEntities(): LinkedEntity[] {
  const { linkedEntity } = useCurrentEntity()

  return linkedEntity
}

export function useCurrentEntityBondLinkedEntity(): LinkedEntity | undefined {
  const linkedEntity = useCurrentEntityLinkedEntities()
  return linkedEntity?.find((v) => v.type === 'bond')
}

export function useCurrentEntityDAOGroup(coreAddress: string, daoGroups: { [address: string] : TDAOGroupModel} ) {
  const daoGroup: TDAOGroupModel | undefined = daoGroups[coreAddress]
  const { address } = useAccount()

  const type = daoGroup?.type

  const proposalModuleAddress = useMemo(() => daoGroup?.proposalModule.proposalModuleAddress, [daoGroup])
  const preProposalContractAddress = useMemo(() => daoGroup?.proposalModule.preProposalContractAddress, [daoGroup])
  const votingModuleAddress = useMemo(() => daoGroup?.votingModule?.votingModuleAddress, [daoGroup])

  const isParticipating = useMemo(() => {
    return daoGroup?.votingModule.members.some(({ addr, weight }) => addr === address && weight > 0)
  }, [daoGroup?.votingModule.members, address])

  const proposalConfig: ProposalConfig = useMemo(() => daoGroup?.proposalModule.proposalConfig, [daoGroup])

  const depositInfo: Coin | undefined = useMemo(
    () => daoGroup && depositInfoToCoin(daoGroup.proposalModule.preProposeConfig.deposit_info!),
    [daoGroup],
  )
  const totalWeight = useMemo(() => daoGroup?.votingModule.totalWeight, [daoGroup])

  const myVotingPower = useMemo(() => {
    const myWeight = daoGroup?.votingModule.members.find(({ addr }) => addr === address)?.weight ?? 0
    return totalWeight ? myWeight / totalWeight : 0
  }, [daoGroup, address, totalWeight])

  const proposals = useMemo(() => daoGroup?.proposalModule.proposals ?? [], [daoGroup])

  const myProposals = useMemo(() => {
    return proposals.filter(({ proposal }) => proposal.proposer === address)
  }, [proposals, address])

  const members = useMemo(() => {
    return daoGroup?.votingModule.members ?? []
  }, [daoGroup])

  const numOfMembers = useMemo(() => {
    return members.length
  }, [members])

  const contractName = useMemo(() => {
    return daoGroup?.votingModule.contractName
  }, [daoGroup])

  const votes = useMemo(() => daoGroup?.proposalModule.votes, [daoGroup])

  const anyoneCanPropose = useMemo(() => {
    return daoGroup?.proposalModule.preProposeConfig.open_proposal_submission
  }, [daoGroup])

  const tqData = useMemo(() => {
    if (proposalConfig?.threshold) {
      return thresholdToTQData(proposalConfig?.threshold)
    }
    return undefined
  }, [proposalConfig])

  return {
    type,
    daoGroup,
    isParticipating,
    proposalConfig,
    depositInfo,
    proposals,
    votes,
    totalWeight,
    myVotingPower,
    myProposals,
    members,
    numOfMembers,
    contractName,
    anyoneCanPropose,
    tqData,

    proposalModuleAddress,
    preProposalContractAddress,
    votingModuleAddress,
  }
}
export function useCurrentEntityDAOGroupToken(coreAddress: string, daoGroups: {
  [address: string]: TDAOGroupModel;
}) {
  const daoGroup: TDAOGroupModel | undefined = daoGroups[coreAddress]

  const token = useMemo(() => daoGroup?.token, [daoGroup])

  const tokenTotalSupply = useMemo(() => token?.tokenInfo.total_supply, [token])
  const tokenSymbol = useMemo(() => token?.tokenInfo.symbol, [token])
  const tokenDecimals = useMemo(() => token?.tokenInfo.decimals || 0, [token])

  return {
    tokenTotalSupply,
    tokenSymbol,
    tokenDecimals,
  }
}
