import { gql, useQuery } from '@apollo/client'
import { MarketingInfoResponse, TokenInfoResponse } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'
import { Config as Cw20StakeConfig } from '@ixo/impactxclient-sdk/types/codegen/Cw20Stake.types'
import { selectDAOEntities } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { Member } from 'types/dao'
import { TEntityModel, TDAOGroupModel } from 'types/entities'

// GET_ALLDAOGROUPS
const GET_ALLDAOGROUPS = gql`
  query GetAllDAOGroups($daoId: String!) {
    getAllDAOGroups(daoId: $daoId) {
      address
      members {
        address
        administrator
        assignedAuthority
        avatar
        daos
        name
        proposals
        role
        staking
        status
        verified
        votes
        votingPower
      }
      title
      type
    }
  }
`
export function useGetAllDAOGroups(daoId: string) {
  const { loading, error, data } = useQuery(GET_ALLDAOGROUPS, {
    variables: { daoId },
  })
  return { loading, error, data: data?.getAllDAOGroups ?? [] }
}

// GET_MEMBERSHIPINFO
const GET_MEMBERSHIPINFO = gql`
  query GetMembershipInfo($daoId: String!, $groupIds: [String!]) {
    getMembershipInfo(daoId: $daoId, groupIds: $groupIds) {
      approveds
      members
      dayChanges
      pendings
      rejecteds
    }
  }
`
export function useGetMembershipInfo(daoId: string, groupIds: string[]) {
  const { loading, error, data } = useQuery(GET_MEMBERSHIPINFO, {
    variables: { daoId, groupIds },
  })
  return { loading, error, data: data?.getMembershipInfo ?? {} }
}

// GET_ANNOUNCEMENTS
const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements($daoId: String!, $groupIds: [String!], $filterBy: String, $limit: Int) {
    getAnnouncements(daoId: $daoId, groupIds: $groupIds, filterBy: $filterBy, limit: $limit) {
      announcerAvatar
      description
      replies
      title
      createdAt
      updatedAt
    }
  }
`
export function useGetAnnouncements(daoId: string, groupIds: string[], filterBy = 'newest', limit?: number) {
  const { loading, error, data, refetch } = useQuery(GET_ANNOUNCEMENTS, {
    variables: { daoId, groupIds, filterBy, limit },
  })
  return { loading, error, refetch, data: data?.getAnnouncements ?? [] }
}

// GET_PROPOSALS
const GET_PROPOSALS = gql`
  query GetProposals($daoId: String!, $groupIds: [String!]) {
    getProposals(daoId: $daoId, groupIds: $groupIds) {
      description
      endDate
      id
      startDate
      title
    }
  }
`
export function useGetProposals(daoId: string, groupIds: string[]) {
  const { loading, error, data } = useQuery(GET_PROPOSALS, {
    variables: { daoId, groupIds },
  })
  return { loading, error, data: data?.getProposals ?? [] }
}

// GET_TRANSACTIONS
const GET_VOTES = gql`
  query GetVotes($daoId: String!, $groupIds: [String!]) {
    getVotes(daoId: $daoId, groupIds: $groupIds) {
      timestamp
      votes
    }
  }
`
export function useGetVotes(daoId: string, groupIds: string[]) {
  const { loading, error, data } = useQuery(GET_VOTES, {
    variables: { daoId, groupIds },
  })
  return { loading, error, data: data?.getVotes ?? [] }
}

// GET_TRANSACTIONS
const GET_TRANSACTIONS = gql`
  query GetTransactions($daoId: String!, $groupIds: [String!]) {
    getTransactions(daoId: $daoId, groupIds: $groupIds) {
      age
      hash
      description
      purpose
      status
      type
      value
    }
  }
`
export function useGetTransactions(daoId: string, groupIds: string[]) {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: { daoId, groupIds },
    pollInterval: 1000,
  })
  return { loading, error, data: data?.getTransactions ?? [] }
}

// GET_CLAIM_STATUS
const GET_CLAIM_STATUS = gql`
  query GetClaimStatus($daoId: String!, $groupIds: [String!]) {
    getClaimStatus(daoId: $daoId, groupIds: $groupIds) {
      approveds
      pendings
      rejecteds
      disputeds
      remainings
    }
  }
`
export function useGetClaimStatus(daoId: string, groupIds: string[]) {
  const { loading, error, data } = useQuery(GET_CLAIM_STATUS, {
    variables: { daoId, groupIds },
  })
  return { loading, error, data: data?.getClaimStatus ?? {} }
}

// GET_OUTCOME_CONTRACT_STATUS
const GET_OUTCOME_CONTRACT_STATUS = gql`
  query GetOutcomeContractStatus($daoId: String!, $groupIds: [String!]) {
    getOutcomeContractStatus(daoId: $daoId, groupIds: $groupIds) {
      actives
      completeds
      totalPayments
      awardedPayments
    }
  }
`
export function useGetOutcomeContractStatus(daoId: string, groupIds: string[]) {
  const { loading, error, data } = useQuery(GET_OUTCOME_CONTRACT_STATUS, {
    variables: { daoId, groupIds },
  })
  return { loading, error, data: data?.getOutcomeContractStatus ?? {} }
}

// GET_TREASURY_POOLS
const GET_TREASURY_POOLS = gql`
  query GetTreasuryPools($daoId: String!) {
    getTreasuryPools(daoId: $daoId) {
      totalVolumeUSD
      dayChanges
      assets {
        name
        logoUrl
      }
    }
  }
`
export function useGetTreasuryPools(daoId: string) {
  const { loading, error, data } = useQuery(GET_TREASURY_POOLS, {
    variables: { daoId },
  })
  return { loading, error, data: data?.getTreasuryPools ?? {} }
}

// GET_MEMBERS
const GET_MEMBERS = gql`
  query GetMembers(
    $daoId: String!
    $groupId: String
    $sortBy: String
    $order: String
    $status: String
    $keyword: String
  ) {
    getMembers(daoId: $daoId, groupId: $groupId, sortBy: $sortBy, order: $order, status: $status, keyword: $keyword) {
      address
      administrator
      assignedAuthority
      avatar
      name
      proposals
      role
      staking
      status
      verified
      votes
      votingPower
    }
  }
`
export function useGetMembers(
  daoId: string,
  groupId: string,
  sortBy = 'name',
  order = 'asc',
  status = 'approved',
  keyword = '',
) {
  const { loading, error, data, refetch } = useQuery(GET_MEMBERS, {
    variables: { daoId, groupId, sortBy, order, status, keyword },
  })
  return { loading, error, refetch, data: data?.getMembers ?? [] }
}

// GET_MEMBER
const GET_MEMBER = gql`
  query GetMember($address: String) {
    getMember(address: $address) {
      address
      administrator
      assets
      assignedAuthority
      avatar
      daos
      investments
      name
      projects
      proposals
      role
      staking
      status
      verified
      votes
      votingPower
    }
  }
`
export function useGetMember(address: string) {
  const { loading, error, data } = useQuery(GET_MEMBER, {
    variables: { address },
  })
  return { loading, error, data: data?.getMember ?? {} }
}

// GET_MEMBER_PROFILE
const GET_MEMBER_PROFILE = gql`
  query GetMemberProfile($address: String) {
    getMemberProfile(address: $address) {
      accounts {
        cosmos
        ixo
      }
      address
      avatar
      credentials
      email
      name
      phoneNumber
      role
      socials {
        github
        linkedIn
        twitter
      }
    }
  }
`
export function useGetMemberProfile(address: string) {
  const { loading, error, data } = useQuery(GET_MEMBER_PROFILE, {
    variables: { address },
  })
  return { loading, error, data: data?.getMemberProfile ?? {} }
}

//
export function useDAO() {
  const daos: TEntityModel[] = useAppSelector(selectDAOEntities)

  const getParentDAOs = (daoId: string): TEntityModel[] => {
    const dao: TEntityModel | undefined = daos.find(({ id }) => id === daoId)
    if (dao) {
      const { accounts } = dao
      const adminAccountAddress = accounts.find(({ name }) => name === 'admin')?.address
      if (adminAccountAddress) {
        return (
          daos.filter(({ daoGroups = {} }) =>
            Object.values(daoGroups).some((daoGroup: TDAOGroupModel) =>
              daoGroup.votingModule.members.some((member: Member) => member.addr === adminAccountAddress),
            ),
          ) ?? []
        )
      }
    }
    return []
  }

  const getTokenInfo = (
    daoId: string,
    groupAddress: string,
  ):
    | {
        config: Cw20StakeConfig
        tokenInfo: TokenInfoResponse
        marketingInfo: MarketingInfoResponse
      }
    | undefined => {
    const dao = daos.find(({ id }) => id === daoId)
    if (dao) {
      const { daoGroups } = dao
      const daoGroup = daoGroups![groupAddress]
      if (daoGroup) {
        return daoGroup.token
      }
    }
    return undefined
  }

  return {
    daos,
    getParentDAOs,
    getTokenInfo,
  }
}
