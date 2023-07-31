import { EntityAccount } from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/entity'
import {
  IidMetadata,
  LinkedEntity,
  LinkedResource,
  Service,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { TEntityModel } from 'api/blocksync/types/entities'
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
} from 'redux/currentEntity/currentEntity.selectors'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { BlockSyncService } from 'services/blocksync'
import {
  TDAOGroupModel,
  EntityLinkedResourceConfig,
  TEntityAdministratorModel,
  TEntityClaimModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityPageSectionModel,
  TEntityProfileModel,
} from 'types/protocol'
import { getDaoContractInfo, thresholdToTQData } from 'utils/dao'
import { apiEntityToEntity } from 'utils/entities'
import { useAccount } from './account'
import { Config as ProposalConfig } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/DaoPreProposeSingle.types'
import { depositInfoToCoin } from 'utils/conversions'

const bsService = new BlockSyncService()

export default function useCurrentEntity(): {
  id: string
  entityType: string
  currentEntity: TEntityModel
  linkedResource: LinkedResource[]
  linkedEntity: LinkedEntity[]
  profile: TEntityProfileModel
  creator: TEntityCreatorModel
  administrator: TEntityAdministratorModel
  page: TEntityPageSectionModel[]
  tags: TEntityDDOTagModel[]
  metadata: IidMetadata | undefined
  accounts: EntityAccount[]
  linkedAccounts: LinkedEntity[]
  owner: string
  service: Service[]
  claim: { [id: string]: TEntityClaimModel }
  startDate: string
  endDate: string
  daoGroups: { [address: string]: TDAOGroupModel }
  selectedDAOGroup: TDAOGroupModel | undefined
  getEntityByDid: (did: string, force?: boolean) => Promise<boolean>
  clearEntity: () => void
  updateDAOGroup: (coreAddress: string) => Promise<void>
  selectDAOGroup: (coreAddress: string) => Promise<void>
} {
  const dispatch = useAppDispatch()
  const { cwClient } = useAccount()
  const currentEntity: TEntityModel = useAppSelector(selectCurrentEntity)
  const id: string = useAppSelector(selectEntityId)!
  const entityType: string = useAppSelector(selectEntityType)!
  const linkedResource: LinkedResource[] = useAppSelector(selectEntityLinkedResource)
  const linkedEntity: LinkedEntity[] = useAppSelector(selectEntityLinkedEntity)!
  const profile: TEntityProfileModel = useAppSelector(selectEntityProfile)!
  const creator: TEntityCreatorModel = useAppSelector(selectEntityCreator)!
  const administrator: TEntityAdministratorModel = useAppSelector(selectEntityAdministrator)!
  const page: TEntityPageSectionModel[] = useAppSelector(selectEntityPage)!
  const tags: TEntityDDOTagModel[] = useAppSelector(selectEntityTags)!
  const metadata: IidMetadata | undefined = useAppSelector(selectEntityMetadata)
  const accounts: EntityAccount[] = useAppSelector(selectEntityAccounts)
  const linkedAccounts: LinkedEntity[] = useAppSelector(selectEntityLinkedAccounts)
  const owner: string = useAppSelector(selectEntityOwner)
  const service: Service[] = useAppSelector(selectEntityService)
  const claim: { [id: string]: TEntityClaimModel } = useAppSelector(selectEntityClaim)
  const startDate: string = useAppSelector(selectEntityStartDate)
  const endDate: string = useAppSelector(selectEntityEndDate)
  const daoGroups: { [address: string]: TDAOGroupModel } = useAppSelector(selectEntityDAOGroups)
  const selectedDAOGroup: TDAOGroupModel | undefined = useMemo(
    () => Object.values(daoGroups).find((daoGroup) => daoGroup.selected),
    [daoGroups],
  )

  const updateEntity = (data: TEntityModel) => {
    dispatch(updateEntityAction(data))
  }

  const updateEntityResource = ({ key, data, merge }: { key: string; data: any; merge: boolean }) => {
    dispatch(updateEntityResourceAction({ key, data, merge }))
  }

  const getEntityByDid = async (did: string, force = false): Promise<boolean> => {
    /**
     * find entity in entities state and avoid refetch from api
     */
    if (did !== id || force) {
      return await bsService.entity
        .getEntityById(did)
        .then((entity: any) => {
          apiEntityToEntity({ entity, cwClient }, (key, data, merge = false) => {
            updateEntityResource({ key, data, merge })
          })

          updateEntity(entity)
          return true
        })
        .catch(() => false)
    }
    return true
  }

  const clearEntity = (): void => {
    dispatch(clearEntityAction())
  }

  const updateDAOGroup = async (coreAddress: string) => {
    console.log('updateDAOGroup ------>')
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

  const selectDAOGroup = async (coreAddress: string) => {
    const _daoGroupsArr = Object.values(daoGroups).map((daoGroup) => {
      if (daoGroup.coreAddress === coreAddress) {
        return { ...daoGroup, selected: true }
      }
      return { ...daoGroup, selected: false }
    })
    updateEntityResource({
      key: 'daoGroups',
      data: Object.fromEntries(_daoGroupsArr.map((daoGroup) => [daoGroup.coreAddress, daoGroup])),
      merge: false,
    })
  }

  return {
    id,
    entityType,
    currentEntity,
    linkedResource,
    linkedEntity,
    profile,
    creator,
    administrator,
    page,
    tags,
    metadata,
    accounts,
    linkedAccounts,
    owner,
    service,
    claim,
    startDate,
    endDate,
    daoGroups,
    selectedDAOGroup,
    getEntityByDid,
    clearEntity,
    updateDAOGroup,
    selectDAOGroup,
  }
}

export function useCurrentEntityMetadata(): {
  createdAt: Date | undefined
} {
  const { metadata } = useCurrentEntity()
  const createdAt = metadata?.created && new Date(metadata.created as never as string)

  return { createdAt }
}

export function useCurrentEntityProfile(): Omit<TEntityProfileModel, '@context' | 'id'> {
  const { profile } = useCurrentEntity()
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

export function useCurrentEntityLinkedEntity(): {
  bondDid: string
  linkedProposal?: LinkedEntity
} {
  const { linkedEntity = [] } = useCurrentEntity()
  const bondDid = ''
  const linkedProposal = linkedEntity.find(({ type }) => type === 'deed')

  return { bondDid, linkedProposal }
}

export function useCurrentEntityAdminAccount(): string {
  const { accounts } = useCurrentEntity()
  return accounts.find((account) => account.name === 'admin')?.address || ''
}

export function useCurrentEntityLinkedFiles(): LinkedResource[] {
  const { linkedResource } = useCurrentEntity()

  return linkedResource.filter((item: LinkedResource) => Object.keys(EntityLinkedResourceConfig).includes(item.type))
}

export function useCurrentEntityClaimSchemas(): LinkedResource[] {
  const { linkedResource } = useCurrentEntity()

  return linkedResource.filter((item: LinkedResource) => item.type === 'ClaimSchema')
}

export function useCurrentEntityDAOGroup(coreAddress: string) {
  const { daoGroups } = useCurrentEntity()
  const daoGroup: TDAOGroupModel | undefined = daoGroups[coreAddress]
  const { address } = useAccount()

  const type = daoGroup?.type

  const proposalModuleAddress = useMemo(() => daoGroup?.proposalModule.proposalModuleAddress, [daoGroup])
  const preProposalContractAddress = useMemo(() => daoGroup?.proposalModule.preProposalContractAddress, [daoGroup])
  const votingModuleAddress = useMemo(() => daoGroup?.votingModule.votingModuleAddress, [daoGroup])

  const isParticipating = useMemo(() => {
    return daoGroup?.votingModule.members.some(({ addr, weight }) => addr === address && weight > 0)
  }, [daoGroup?.votingModule.members, address])

  const proposalConfig: ProposalConfig = useMemo(() => daoGroup?.proposalModule.proposalConfig, [daoGroup])

  const depositInfo: Coin | undefined = useMemo(
    () => daoGroup && depositInfoToCoin(daoGroup.proposalModule.preProposeConfig.deposit_info!),
    [daoGroup],
  )

  const myVotingPower = useMemo(() => {
    const myWeight = daoGroup?.votingModule.members.find(({ addr }) => addr === address)?.weight ?? 0
    const totalWeight = daoGroup?.votingModule.totalWeight
    return myWeight / totalWeight
  }, [daoGroup, address])

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
