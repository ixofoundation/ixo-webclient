import { ArrayOfAddr } from '@ixo/impactxclient-sdk/types/codegen/DaoCore.types'
import { ProposalResponse } from '@ixo/impactxclient-sdk/types/codegen/DaoMigrator.types'
import { useCallback, useMemo } from 'react'
import { updateGroupAction } from 'redux/currentEntity/dao/currentDao.actions'
import { selectDaoGroupByAddress, selectDaoGroups } from 'redux/currentEntity/dao/currentDao.selectors'
import { CurrentDao, DaoGroup } from 'redux/currentEntity/dao/currentDao.types'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { Member } from 'types/dao'
import * as _ from 'lodash'
import { contracts } from '@ixo/impactxclient-sdk'
import { useAccount } from './account'

export default function useCurrentDao(): {
  daoGroups: CurrentDao
  daoGroupAddresses: string[]
  setDaoGroup: (coreAddress: string) => void
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
        const members = daoGroup.votingModule.members
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

  // const getCw20PairsByAddresses = useCallback(
  //   async (addresses: string[]) => {
  //     const pairs: { [address: string]: { address: string; balance?: string } } = {}
  //     getDaoGroupsByAddresses(addresses).forEach((daoGroup) => {
  //       daoGroup.treasury.cw20TokenList.
  //     })
  //   },
  //   [getDaoGroupsByAddresses],
  // )

  const setDaoGroup = async (coreAddress: string) => {
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
    const daoVotingCw4Client = new contracts.DaoVotingCw4.DaoVotingCw4Client(
      cosmWasmClient,
      address,
      votingModule.votingModuleAddress,
    )
    votingModule.groupContractAddress = await daoVotingCw4Client.groupContract()
    const cw4GroupClient = new contracts.Cw4Group.Cw4GroupClient(
      cosmWasmClient,
      address,
      votingModule.groupContractAddress,
    )
    votingModule.members = (await cw4GroupClient.listMembers({})).members as never[]
    votingModule.totalWeight = (await cw4GroupClient.totalWeight({})).weight as number

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

    dispatch(
      updateGroupAction({
        coreAddress,
        admin,
        type: 'membership', // TODO:
        config,
        proposalModule,
        votingModule,
        treasury,
        storageItems,
      }),
    )
  }

  return {
    daoGroups,
    daoGroupAddresses,
    setDaoGroup,
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

  const { proposalModuleAddress } = useMemo(() => daoGroup.proposalModule, [daoGroup])

  const daoProposalSingleClient = useMemo(
    () => new contracts.DaoProposalSingle.DaoProposalSingleClient(cosmWasmClient, address, proposalModuleAddress),
    [proposalModuleAddress, cosmWasmClient, address],
  )

  return { daoGroup, daoProposalSingleClient }
}
