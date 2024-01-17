import { EntityAccount } from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/entity'
import {
  IidMetadata,
  LinkedEntity,
  LinkedResource,
  Service,
  VerificationMethod,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
} from 'redux/currentEntity/currentEntity.selectors'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  TDAOGroupModel,
  TEntityAdministratorModel,
  TEntityClaimModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityModel,
  TEntityPageSectionModel,
  TEntityProfileModel,
} from 'types/entities'
import { getDaoContractInfo, thresholdToTQData } from 'utils/dao'
import { useAccount } from './account'
import { Config as ProposalConfig } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/DaoPreProposeSingle.types'
import { convertMicroDenomToDenomWithDecimals, depositInfoToCoin } from 'utils/conversions'
import { EntityLinkedResourceConfig } from 'constants/entity'
import { IMPACTS_DAO_ID } from 'constants/chains'
import { OutputBlockData } from '@editorjs/editorjs'
import { useEntityLazyQuery } from 'generated/graphql'
import { apiEntityToEntity } from 'utils/entities'
import { updateEntityPropertyAction } from 'redux/entitiesExplorer/entitiesExplorer.actions'
import { TTreasuryAccountModel, TTreasuryCoinModel } from 'pages/CurrentEntity/Treasury/DAOTreasury/Accounts'
import { truncateString } from 'utils/formatters'
import { determineChainFromAddress } from 'utils/account'
import { GetBalances, GetTokenAsset } from 'lib/protocol'
import { contracts, customQueries } from '@ixo/impactxclient-sdk'
import { IxoCoinCodexRelayerApi } from './configs'
import { getDisplayAmount } from 'utils/currency'
import { selectStakingGroups } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

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

export function useCurrentEntityPage(): OutputBlockData[] {
  const { settings } = useCurrentEntity()
  const page = settings?.Page?.data?.page ?? []

  return page
}

export function useCurrentEntityClaims() {
  const claims: { [id: string]: TEntityClaimModel } = useAppSelector(selectEntityClaim)
  const headlineClaim = Object.values(claims).find((v) => v.isHeadlineMetric)

  return { claims, headlineClaim }
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

  return linkedResource.filter((item: LinkedResource) => item.type === 'surveyTemplate')
}

export function useCurrentEntityLinkedEntities(): LinkedEntity[] {
  const { linkedEntity } = useCurrentEntity()

  return linkedEntity
}

export function useCurrentEntityBondLinkedEntity(): LinkedEntity | undefined {
  const linkedEntity = useCurrentEntityLinkedEntities()
  return linkedEntity.find((v) => v.type === 'bond')
}

export function useCurrentEntityDAOGroup(coreAddress: string) {
  const { daoGroups } = useCurrentEntity()
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

export function useCurrentEntityTreasury() {
  const { cwClient } = useAccount()
  const { accounts: entityAccounts, linkedAccounts, daoGroups } = useCurrentEntity()
  const stakingGroups = useAppSelector(selectStakingGroups)
  const [accounts, setAccounts] = useState<{
    [address: string]: TTreasuryAccountModel
  }>({})

  // entityAccounts
  useEffect(() => {
    if (entityAccounts.length > 0) {
      ;(async () => {
        await Promise.all(
          entityAccounts.map(async (account) => {
            setAccounts((accounts) => ({
              ...accounts,
              [account.address]: {
                address: account.address,
                name: account.name,
                type: 'entity',
                network: 'ixo Network',
                coins: {},
              },
            }))
          }),
        )
      })()
    }
    return () => {
      setAccounts((accounts) =>
        Object.fromEntries(Object.entries(accounts).filter(([key, value]) => value.type !== 'entity')),
      )
    }
  }, [entityAccounts])

  // groupAccounts
  useEffect(() => {
    if (Object.keys(daoGroups).length > 0) {
      ;(async () => {
        await Promise.all(
          Object.values(daoGroups).map(async (daoGroup: TDAOGroupModel) => {
            setAccounts((accounts) => ({
              ...accounts,
              [daoGroup.coreAddress]: {
                address: daoGroup.coreAddress,
                name: daoGroup.config.name,
                type: 'group',
                network: 'ixo Network',
                coins: {},
              },
            }))
          }),
        )
      })()
    }
    return () => {
      setAccounts((accounts) =>
        Object.fromEntries(Object.entries(accounts).filter(([key, value]) => value.type !== 'group')),
      )
    }
  }, [daoGroups])

  // linkedAccounts
  useEffect(() => {
    if (linkedAccounts.length > 0) {
      ;(async () => {
        await Promise.all(
          linkedAccounts.map((account) => {
            setAccounts((accounts) => ({
              ...accounts,
              [account.id]: {
                address: account.id,
                name: truncateString(account.id, 15),
                type: 'linked',
                network: account.relationship,
                coins: {},
              },
            }))
            return ''
          }),
        )
      })()
      return () => {
        setAccounts((accounts) =>
          Object.fromEntries(Object.entries(accounts).filter(([key, value]) => value.type !== 'linked')),
        )
      }
    }
  }, [linkedAccounts])

  const updateNativeTokenBalances = useCallback(async (address: string): Promise<TTreasuryCoinModel[]> => {
    if (!address) {
      return []
    }
    const { rpc } = await determineChainFromAddress(address)

    const balances = await GetBalances(address, rpc)

    const coins: TTreasuryCoinModel[] = (await Promise.all(
      await balances
        .map(async ({ amount, denom }) => {
          const token = await GetTokenAsset(denom)
          const tokenInfo = await customQueries.currency.findTokenInfoFromDenom(
            token.coinMinimalDenom,
            true,
            IxoCoinCodexRelayerApi,
          )
          if (!tokenInfo) {
            return undefined
          }
          const { coinName, lastPriceUsd } = tokenInfo
          const payload = {
            address,
            balance: getDisplayAmount(amount, token.coinDecimals),
            network: `${coinName.toUpperCase()}`,
            coinDenom: token.coinDenom,
            coinImageUrl: token.coinImageUrl!,
            lastPriceUsd,
          }
          return payload
        })
        .filter((v) => v !== undefined),
    )) as TTreasuryCoinModel[]
    return coins
  }, [])

  const updateCw20TokenBalances = useCallback(
    async (address): Promise<TTreasuryCoinModel[]> => {
      const coins: TTreasuryCoinModel[] = (await Promise.all(
        stakingGroups.map(async (stakingGroup: TDAOGroupModel) => {
          const {
            token,
            votingModule: { votingModuleAddress },
          } = stakingGroup

          if (token) {
            const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
              cwClient,
              votingModuleAddress,
            )
            const tokenContract = await daoVotingCw20StakedClient.tokenContract()

            const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract)
            const { balance: microBalance } = await cw20BaseClient.balance({ address })
            const balance = convertMicroDenomToDenomWithDecimals(microBalance, token.tokenInfo.decimals)
            if (balance === 0) {
              return undefined
            }

            const payload: TTreasuryCoinModel = {
              address,
              coinDenom: token.tokenInfo.symbol,
              network: 'IXO',
              balance: balance.toString(),
              coinImageUrl: (token.marketingInfo?.logo !== 'embedded' && token.marketingInfo.logo?.url) || '',
              lastPriceUsd: 0,
            }
            return payload
          }
          return undefined
        }),
      )) as TTreasuryCoinModel[]
      return coins.filter(Boolean)
    },
    [cwClient, stakingGroups],
  )

  useEffect(() => {
    Object.values(accounts).forEach((account) => {
      updateNativeTokenBalances(account.address).then((coins: TTreasuryCoinModel[]) => {
        coins.forEach((coin) => {
          setAccounts((v) => ({
            ...v,
            [coin.address]: {
              ...v[coin.address],
              coins: { ...(v[coin.address]?.coins ?? {}), [coin.coinDenom]: coin },
            },
          }))
        })
      })
      updateCw20TokenBalances(account.address).then((coins: TTreasuryCoinModel[]) => {
        coins.forEach((coin) => {
          setAccounts((v) => ({
            ...v,
            [coin.address]: {
              ...v[coin.address],
              coins: { ...(v[coin.address]?.coins ?? {}), [coin.coinDenom]: coin },
            },
          }))
        })
      })
    })
    return () => {
      //
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(Object.keys(accounts))])

  return accounts
}
