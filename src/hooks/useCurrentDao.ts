import { ArrayOfAddr } from '@ixo/impactxclient-sdk/types/codegen/DaoCore.types'
import { ProposalResponse } from '@ixo/impactxclient-sdk/types/codegen/DaoMigrator.types'
import { useCallback } from 'react'
import { updateGroupAction } from 'redux/currentEntity/dao/currentDao.actions'
import { selectDaoGroups } from 'redux/currentEntity/dao/currentDao.selectors'
import { CurrentDao, DaoGroup } from 'redux/currentEntity/dao/currentDao.types'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { Member } from 'types/dao'

export default function useCurrentDao(): {
  daoGroups: CurrentDao
  updateGroup: (group: DaoGroup) => void
  getMembersByAddresses: (addresses: string[]) => Member[]
  getProposalModuleCountByAddresses: (addresses: string[]) => {
    active_proposal_module_count: number
    total_proposal_module_count: number
  }
  getProposalsByAddresses: (addresses: string[]) => ProposalResponse[]
  getTotalCw20Balances: (addresses: string[]) => number
} {
  const dispatch = useAppDispatch()
  const daoGroups = useAppSelector(selectDaoGroups)

  const updateGroup = (group: DaoGroup) => {
    dispatch(updateGroupAction(group))
  }

  const getDaoGroupsByAddresses = useCallback(
    (addresses: ArrayOfAddr) => {
      return Object.values(daoGroups).filter((daoGroup) => addresses.includes(daoGroup.coreAddress))
    },
    [daoGroups],
  )

  const getMembersByAddresses = useCallback(
    (addresses: string[]): Member[] => {
      let members: Member[] = []
      getDaoGroupsByAddresses(addresses).forEach((daoGroup) => {
        members = members.concat([...daoGroup.votingModule.members])
      })
      return members
    },
    [getDaoGroupsByAddresses],
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

  const getProposalsByAddresses = useCallback(
    (addresses: string[]): ProposalResponse[] => {
      return getDaoGroupsByAddresses(addresses)
        .map((daoGroup) => daoGroup.proposalModule.proposals)
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

  return {
    daoGroups,
    updateGroup,
    getMembersByAddresses,
    getProposalModuleCountByAddresses,
    getProposalsByAddresses,
    getTotalCw20Balances,
  }
}
