import { ArrayOfAddr } from '@ixo/impactxclient-sdk/types/codegen/DaoCore.types'
import { useCallback, useMemo } from 'react'
import { clearGroupAction, selectGroupAction, updateGroupAction } from 'redux/currentEntity/dao/currentDao.actions'
import { selectDaoGroupByAddress, selectDaoGroups } from 'redux/currentEntity/dao/currentDao.selectors'
import { CurrentDao, DaoGroup } from 'redux/currentEntity/dao/currentDao.types'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { Member, Proposal } from 'types/dao'
import * as _ from 'lodash'
import { contracts } from '@ixo/impactxclient-sdk'
import { useAccount } from './account'
import { Config as ProposalConfig } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/DaoPreProposeSingle.types'
import { depositInfoToCoin } from 'utils/conversions'
import { getDaoContractInfo } from 'utils/dao'

export default function useCurrentDao(): {
  daoGroups: CurrentDao
  daoGroupsArr: DaoGroup[]
  daoGroupAddresses: string[]
  selectedGroups: CurrentDao
  selectedGroupsArr: DaoGroup[]
  myGroups: CurrentDao
  selectDaoGroup: (coreAddress: string, multi?: boolean) => void
  setDaoGroup: (coreAddress: string) => void
  updateDaoGroup: (group: DaoGroup) => void
  clearDaoGroup: () => void
  getNumOfMembersByAddresses: (addresses: string[]) => number
  getProposalsByAddresses: (addresses: string[]) => Proposal[]
  getTotalCw20Balances: (addresses: string[]) => number
} {
  const dispatch = useAppDispatch()
  const daoGroups = useAppSelector(selectDaoGroups)
  const daoGroupsArr = useMemo(() => Object.values(daoGroups), [daoGroups])
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
  const selectedGroupsArr = useMemo(() => Object.values(selectedGroups), [selectedGroups])

  const myGroups = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(daoGroups)
          .filter(([, value]) => value.votingModule.members.some(({ addr }) => addr === address))
          .map(([key, value]) => [key, value]),
      ),
    [daoGroups, address],
  )

  const selectDaoGroup = (coreAddress: string, multi = false) => {
    dispatch(selectGroupAction(coreAddress, multi))
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

  const getProposalsByAddresses = useCallback(
    (addresses: string[]): Proposal[] => {
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

  const updateDaoGroup = async (group: DaoGroup) => {
    dispatch(updateGroupAction(group))
  }

  const setDaoGroup = async (coreAddress: string) => {
    const { type, admin, config, proposalModule, votingModule, treasury, storageItems } = await getDaoContractInfo({
      coreAddress,
      cosmWasmClient,
      address,
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
    daoGroupsArr,
    daoGroupAddresses,
    selectedGroups,
    selectedGroupsArr,
    myGroups,
    selectDaoGroup,
    setDaoGroup,
    updateDaoGroup,
    clearDaoGroup,
    getNumOfMembersByAddresses,
    getProposalsByAddresses,
    getTotalCw20Balances,
  }
}

export function useCurrentDaoGroup(groupAddress: string) {
  const daoGroup: DaoGroup = useAppSelector(selectDaoGroupByAddress(groupAddress))
  const { cosmWasmClient, address } = useAccount()

  const type = daoGroup?.type

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

  return {
    type,
    daoGroup,
    daoProposalSingleClient,
    daoPreProposeSingleClient,
    daoVotingCw20StakedClient,
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
  }
}
