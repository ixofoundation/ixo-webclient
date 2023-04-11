import { ArrayOfAddr } from '@ixo/impactxclient-sdk/types/codegen/DaoCore.types'
import { ProposalResponse } from '@ixo/impactxclient-sdk/types/codegen/DaoMigrator.types'
import { useCallback, useMemo } from 'react'
import { clearGroupAction, updateGroupAction } from 'redux/currentEntity/dao/currentDao.actions'
import { selectDaoGroupByAddress, selectDaoGroups } from 'redux/currentEntity/dao/currentDao.selectors'
import { CurrentDao, DaoGroup } from 'redux/currentEntity/dao/currentDao.types'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { Member } from 'types/dao'
import * as _ from 'lodash'
import { contracts, customQueries } from '@ixo/impactxclient-sdk'
import { useAccount } from './account'
import { chainNetwork } from './configs'
import { Config as ProposalConfig } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/DaoPreProposeSingle.types'
import { depositInfoToCoin, durationToSeconds, expirationAtTimeToSecondsFromNow } from 'utils/conversions'

export default function useCurrentDao(): {
  daoGroups: CurrentDao
  daoGroupAddresses: string[]
  selectedGroups: CurrentDao
  myGroups: CurrentDao
  selectDaoGroup: (coreAddress: string) => void
  setDaoGroup: (coreAddress: string) => void
  updateDaoGroup: (group: DaoGroup) => void
  clearDaoGroup: () => void
  getNumOfMembersByAddresses: (addresses: string[]) => number
  getMembersByAddress: (address: string) => Member[]
  getProposalModuleCountByAddresses: (addresses: string[]) => {
    active_proposal_module_count: number
    total_proposal_module_count: number
  }
  getAllProposals: () => ProposalResponse[]
  getProposalsByAddresses: (addresses: string[]) => ProposalResponse[]
  getTotalCw20Balances: (addresses: string[]) => number
} {
  const dispatch = useAppDispatch()
  const daoGroups = useAppSelector(selectDaoGroups)
  const daoGroupAddresses = useMemo(() => Object.keys(daoGroups), [daoGroups])
  const { cosmWasmClient, address } = useAccount()
  const selectedGroups = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(daoGroups)
          .filter(([, value]) => value.selected)
          .map(([key, value]) => [key, value]),
      ),
    [daoGroups],
  )
  const myGroups = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(daoGroups)
          .filter(([, value]) => value.votingModule.members.some(({ addr }) => addr === address))
          .map(([key, value]) => [key, value]),
      ),
    [daoGroups, address],
  )

  const selectDaoGroup = (coreAddress: string) => {
    const daoGroup = daoGroups[coreAddress]
    if (daoGroup) {
      dispatch(updateGroupAction({ ...daoGroup, selected: !daoGroup.selected }))
    }
  }

  const getDaoGroupsByAddresses = useCallback(
    (addresses: ArrayOfAddr) => {
      return Object.values(daoGroups).filter((daoGroup) => addresses.includes(daoGroup.coreAddress))
    },
    [daoGroups],
  )

  const getNumOfMembersByAddresses = useCallback(
    (addresses: string[]): number => {
      let totalMembers: Member[] = []
      getDaoGroupsByAddresses(addresses).forEach((daoGroup) => {
        const members = daoGroup.votingModule.members ?? []
        totalMembers = totalMembers.concat([...members])
      })
      return _.uniqBy(totalMembers, 'addr').length
    },
    [getDaoGroupsByAddresses],
  )

  const getMembersByAddress = useCallback(
    (address: string): Member[] => {
      const members = daoGroups[address]?.votingModule.members ?? []
      const totalWeight = daoGroups[address]?.votingModule.totalWeight ?? 1
      return members.map((member) => ({ ...member, votingPower: member.weight / totalWeight }))
    },
    [daoGroups],
  )

  const getProposalModuleCountByAddresses = useCallback(
    (addresses: string[]) => {
      return getDaoGroupsByAddresses(addresses)
        .map((daoGroup) => daoGroup.proposalModule.proposalModuleCount)
        .reduce(
          (accumulator, currentValue) => ({
            active_proposal_module_count:
              accumulator.active_proposal_module_count + currentValue.active_proposal_module_count,
            total_proposal_module_count:
              accumulator.total_proposal_module_count + currentValue.total_proposal_module_count,
          }),
          { active_proposal_module_count: 0, total_proposal_module_count: 0 },
        )
    },
    [getDaoGroupsByAddresses],
  )

  const getAllProposals = useCallback((): ProposalResponse[] => {
    return Object.values(daoGroups)
      .map((daoGroup) =>
        daoGroup.proposalModule.proposals.map((proposal) => ({
          ...proposal,
          proposal: {
            ...proposal.proposal,
            max_voting_period: (daoGroup.proposalModule.proposalConfig.max_voting_period as { time: number }).time,
          },
        })),
      )
      .reduce((acc, cur) => [...acc, ...cur], [])
  }, [daoGroups])

  const getProposalsByAddresses = useCallback(
    (addresses: string[]): ProposalResponse[] => {
      return getDaoGroupsByAddresses(addresses)
        .map((daoGroup) =>
          daoGroup.proposalModule.proposals.map((proposal) => ({
            ...proposal,
            proposal: {
              ...proposal.proposal,
              max_voting_period: (daoGroup.proposalModule.proposalConfig.max_voting_period as { time: number }).time,
            },
          })),
        )
        .reduce((acc, cur) => [...acc, ...cur], [])
    },
    [getDaoGroupsByAddresses],
  )

  const getTotalCw20Balances = useCallback(
    (addresses: string[]): number => {
      return getDaoGroupsByAddresses(addresses)
        .map((daoGroup) => daoGroup.treasury.cw20Balances)
        .reduce((acc, cur) => acc + Number(cur), 0)
    },
    [getDaoGroupsByAddresses],
  )

  const getCodeId = async (address: string): Promise<number> => {
    const { codeId } = await cosmWasmClient.getContract(address)
    return codeId
  }

  const getContractNameByCodeId = (codeId: number): string => {
    return customQueries.contract.getContractCodes(chainNetwork).find(({ code }) => code === codeId)?.name ?? ''
  }

  const updateDaoGroup = async (group: DaoGroup) => {
    dispatch(updateGroupAction(group))
  }

  const setDaoGroup = async (coreAddress: string) => {
    let type = ''
    const daoCoreClient = new contracts.DaoCore.DaoCoreClient(cosmWasmClient, address, coreAddress)
    const admin = await daoCoreClient.admin()
    const config = await daoCoreClient.config()
    const cw20Balances = await daoCoreClient.cw20Balances({})
    const cw20TokenList = await daoCoreClient.cw20TokenList({})
    const cw721TokenList = await daoCoreClient.cw721TokenList({})
    const storageItems = await daoCoreClient.listItems({})
    const [{ address: proposalModuleAddress }] = await daoCoreClient.proposalModules({})
    const [{ address: activeProposalModuleAddress }] = await daoCoreClient.activeProposalModules({})
    const proposalModuleCount = await daoCoreClient.proposalModuleCount()
    const votingModuleAddress = await daoCoreClient.votingModule()

    // proposalModule
    const proposalModule: any = {}
    proposalModule.proposalModuleAddress = proposalModuleAddress
    proposalModule.proposalModuleCount = proposalModuleCount
    const daoProposalSingleClient = new contracts.DaoProposalSingle.DaoProposalSingleClient(
      cosmWasmClient,
      address,
      proposalModuleAddress,
    )
    proposalModule.proposalConfig = await daoProposalSingleClient.config()
    const { proposals } = await daoProposalSingleClient.listProposals({})
    // const votes = await daoProposalSingleClient.listVotes({})
    proposalModule.proposals = proposals
    const {
      module: { addr: preProposalContractAddress },
    } = (await daoProposalSingleClient.proposalCreationPolicy()) as { module: { addr: string } }
    proposalModule.preProposalContractAddress = preProposalContractAddress
    const daoPreProposeSingleClient = new contracts.DaoPreProposeSingle.DaoPreProposeSingleClient(
      cosmWasmClient,
      address,
      preProposalContractAddress,
    )
    proposalModule.preProposeConfig = await daoPreProposeSingleClient.config()

    // votingModule
    const votingModule: any = {}
    votingModule.votingModuleAddress = votingModuleAddress
    votingModule.contractCodeId = await getCodeId(votingModule.votingModuleAddress)
    votingModule.contractName = getContractNameByCodeId(votingModule.contractCodeId)

    console.log('votingModule.contractName', votingModule.contractName)

    if (votingModule.contractName === 'dao_voting_cw20_staked') {
      type = 'staking'
      const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedClient(
        cosmWasmClient,
        address,
        votingModule.votingModuleAddress,
      )
      console.log('DaoVotingCw20StakedClient-------start')
      const stakingContract = await daoVotingCw20StakedClient.stakingContract()
      const tokenContract = await daoVotingCw20StakedClient.tokenContract()
      const totalPowerAtHeight = await daoVotingCw20StakedClient.totalPowerAtHeight({})
      console.log({ stakingContract, totalPowerAtHeight, tokenContract })
      console.log('DaoVotingCw20StakedClient-------end')

      console.log('Cw20StakeClient-------start')
      const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeClient(cosmWasmClient, address, stakingContract)
      const { total } = await cw20StakeClient.totalValue()
      const { stakers } = await cw20StakeClient.listStakers({})
      const totalStakedAtHeight = await cw20StakeClient.totalStakedAtHeight({})
      const stakedBalanceAtHeight = await cw20StakeClient.stakedBalanceAtHeight({ address })
      const stakedValue = await cw20StakeClient.stakedValue({ address })
      const config = await cw20StakeClient.getConfig()
      console.log({ total, stakers, totalStakedAtHeight, stakedBalanceAtHeight, stakedValue, config })
      console.log('Cw20StakeClient-------end')

      console.log('Cw20BaseClient-------start')
      const cw20BaseClient = new contracts.Cw20Base.Cw20BaseClient(cosmWasmClient, address, tokenContract)
      const balance = await cw20BaseClient.balance({ address })
      const tokenInfo = await cw20BaseClient.tokenInfo()
      const marketingInfo = await cw20BaseClient.marketingInfo()
      console.log({ balance, tokenInfo, marketingInfo })
      console.log('Cw20BaseClient-------end')

      votingModule.members = stakers.map(({ address, balance }) => ({ addr: address, weight: balance }))
      votingModule.totalWeight = parseInt(total)
    } else if (votingModule.contractName === 'dao_voting_cw4') {
      type = 'membership'
      const daoVotingCw4Client = new contracts.DaoVotingCw4.DaoVotingCw4Client(
        cosmWasmClient,
        address,
        votingModule.votingModuleAddress,
      )

      console.log('Cw4GroupClient-------start')
      const cw4GroupAddress = await daoVotingCw4Client.groupContract()
      const cw4GroupClient = new contracts.Cw4Group.Cw4GroupClient(cosmWasmClient, address, cw4GroupAddress)
      votingModule.members = (await cw4GroupClient.listMembers({})).members as never[]
      votingModule.totalWeight = (await cw4GroupClient.totalWeight({})).weight as number
      console.log('Cw4GroupClient-------end')
    }

    // treasury
    const treasury: any = {}
    treasury.cw20Balances = cw20Balances
    treasury.cw20TokenList = cw20TokenList
    treasury.cw721TokenList = cw721TokenList

    console.log({
      admin,
      config,
      cw20Balances,
      cw20TokenList,
      storageItems,
      activeProposalModuleAddress,
      proposalModule,
      votingModule,
      treasury,
    })

    updateDaoGroup({
      coreAddress,
      admin,
      type,
      config,
      proposalModule,
      votingModule,
      treasury,
      storageItems,
    })
  }

  const clearDaoGroup = () => {
    dispatch(clearGroupAction())
  }

  return {
    daoGroups,
    daoGroupAddresses,
    selectedGroups,
    myGroups,
    selectDaoGroup,
    setDaoGroup,
    updateDaoGroup,
    clearDaoGroup,
    getNumOfMembersByAddresses,
    getMembersByAddress,
    getProposalModuleCountByAddresses,
    getAllProposals,
    getProposalsByAddresses,
    getTotalCw20Balances,
  }
}

export function useCurrentDaoGroup(groupAddress: string) {
  const daoGroup: DaoGroup = useAppSelector(selectDaoGroupByAddress(groupAddress))
  const { cosmWasmClient, address } = useAccount()

  const proposalModuleAddress = useMemo(() => daoGroup?.proposalModule.proposalModuleAddress, [daoGroup])
  const preProposalContractAddress = useMemo(() => daoGroup?.proposalModule.preProposalContractAddress, [daoGroup])
  const votingModuleAddress = useMemo(() => daoGroup?.votingModule.votingModuleAddress, [daoGroup])

  const daoProposalSingleClient = useMemo(
    () => new contracts.DaoProposalSingle.DaoProposalSingleClient(cosmWasmClient, address, proposalModuleAddress),
    [proposalModuleAddress, cosmWasmClient, address],
  )

  const daoPreProposeSingleClient = useMemo(
    () =>
      new contracts.DaoPreProposeSingle.DaoPreProposeSingleClient(cosmWasmClient, address, preProposalContractAddress),
    [cosmWasmClient, address, preProposalContractAddress],
  )

  const daoVotingCw20StakedClient = useMemo(
    () => new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedClient(cosmWasmClient, address, votingModuleAddress),
    [cosmWasmClient, address, votingModuleAddress],
  )

  const isParticipating = useMemo(() => {
    return daoGroup?.votingModule.members.some(({ addr }) => addr === address)
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

  const proposals = useMemo(() => {
    const proposals = daoGroup?.proposalModule.proposals
    const max_voting_period = daoGroup?.proposalModule.proposalConfig.max_voting_period
    if (!proposals || !max_voting_period) {
      return []
    }

    const votingPeriod = durationToSeconds(100, max_voting_period)

    return proposals.map(({ id, proposal }) => {
      const { expiration } = proposal
      const secondsRemaining = expirationAtTimeToSecondsFromNow(expiration) ?? 0
      const secondsPassed = votingPeriod - secondsRemaining
      const submissionDate = new Date().getTime() - secondsPassed * 1000
      const closeDate = new Date().getTime() + secondsRemaining * 1000

      return {
        id,
        proposal: {
          ...proposal,
          submissionDate,
          closeDate,
        },
      }
    })
  }, [daoGroup])

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

  return {
    daoGroup,
    daoProposalSingleClient,
    daoPreProposeSingleClient,
    daoVotingCw20StakedClient,
    isParticipating,
    proposalConfig,
    depositInfo,
    myVotingPower,
    myProposals,
    members,
    numOfMembers,
    contractName,
  }
}
