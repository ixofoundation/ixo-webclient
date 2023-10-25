import { CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { ProposalResponse, VoteInfo } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'

import { durationToSeconds, expirationAtTimeToSecondsFromNow } from 'utils/conversions'
import { getContractNameByCodeId } from './getContractNameByCodeId'

import { queryMultipleContracts } from 'utils/multiContractCall'
import { exponentialBackoff } from 'utils/exponentialBackoff'

export const getDaoContractInfo = async ({
  coreAddress,
  cwClient,
}: {
  coreAddress: string
  cwClient: CosmWasmClient
}) => {
  if (!cwClient) {
    throw new Error('Client is not defined')
  }
  let type = ''
  let token: any = undefined

  const daoQueries = [
    { address: coreAddress, data: { admin: {} } },
    { address: coreAddress, data: { config: {} } },
    { address: coreAddress, data: { proposal_modules: {} } },
    { address: coreAddress, data: { voting_module: {} } },
  ]

  const [admin, config, proposalModules, votingModuleAddress] = await exponentialBackoff(
    () => queryMultipleContracts(daoQueries),
    5,
    1000,
    30000,
  )

  const proposalModule: any = {
    proposalConfig: config,
    proposalModuleAddress: proposalModules[0].address,
    votes: null,
  }

  // proposalModule
  const proposalQueries = [
    {
      address: proposalModule.proposalModuleAddress,
      data: {
        config: {},
      },
    },
    {
      address: proposalModule.proposalModuleAddress,
      data: {
        list_proposals: {},
      },
    },
    {
      address: proposalModule.proposalModuleAddress,
      data: {
        proposal_creation_policy: {},
      },
    },
  ]

  const [proposalConfig, proposalsList, proposalCreationPolicy] = await exponentialBackoff(
    () => queryMultipleContracts(proposalQueries),
    5,
    1000,
    30000,
  )

  proposalModule.proposalConfig = proposalConfig
  const proposals = proposalsList.proposals

  const getVotes = async (proposals: ProposalResponse[]): Promise<VoteInfo[]> => {
    const voteQueries = proposals.map(({ id }) => ({
      address: proposalModule.proposalModuleAddress,
      data: {
        list_votes: {
          proposal_id: id,
        },
      },
    }))

    const allVotes: VoteInfo[][] = await exponentialBackoff(() => queryMultipleContracts(voteQueries), 5, 1000, 30000)

    // Flatten the array of arrays
    const votes: VoteInfo[] = allVotes.flat()

    return votes
  }

  const votes: VoteInfo[] = await getVotes(proposals)

  proposalModule.votes = votes

  const max_voting_period = proposalModule.proposalConfig.max_voting_period
  const votingPeriod = durationToSeconds(100, max_voting_period)

  proposalModule.proposals = proposals.map(({ id, proposal }: any) => {
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

  const {
    module: { addr: preProposalContractAddress },
  } = proposalCreationPolicy

  proposalModule.preProposalContractAddress = preProposalContractAddress

  const preProposeQueries = [
    {
      address: preProposalContractAddress,
      data: {
        config: {},
      },
    },
  ]

  const [preProposeConfig] = await await exponentialBackoff(
    () => queryMultipleContracts(preProposeQueries),
    5,
    1000,
    30000,
  )

  proposalModule.preProposeConfig = preProposeConfig

  // votingModule
  const votingModule: any = {}
  votingModule.votingModuleAddress = votingModuleAddress

  const result = await cwClient.getContract(votingModule.votingModuleAddress)
  const codeId = result.codeId

  votingModule.contractCodeId = codeId
  votingModule.contractName = getContractNameByCodeId(votingModule.contractCodeId)

  if (votingModule.contractName === 'dao_voting_cw20_staked') {
    type = 'staking'

    const daoVotingCW20StakedQueries = [
      { address: votingModule.votingModuleAddress, data: { staking_contract: {} } },
      { address: votingModule.votingModuleAddress, data: { token_contract: {} } },
    ]
    const [stakingContract, tokenContract] = await await exponentialBackoff(
      () => queryMultipleContracts(daoVotingCW20StakedQueries),
      5,
      1000,
      30000,
    )

    const cw20Queries = [
      { address: stakingContract, data: { total_value: {} } },
      { address: stakingContract, data: { list_stakers: {} } },
      { address: stakingContract, data: { get_config: {} } },
      { address: tokenContract, data: { token_info: {} } },
      { address: tokenContract, data: { marketing_info: {} } },
    ]
    const [totalValue, listStakers, getConfig, tokenInfo, marketingInfo] = await exponentialBackoff(
      () => queryMultipleContracts(cw20Queries),
      5,
      1000,
      30000,
    )

    const total = totalValue.total
    const stakers = listStakers.stakers
    const config = getConfig

    token = {
      tokenInfo,
      marketingInfo,
      config,
    }

    votingModule.members = stakers?.map(({ address, balance }: any) => ({ addr: address, weight: balance }))
    votingModule.totalWeight = parseInt(total ?? '0')
  } else if (votingModule.contractName === 'dao_voting_cw4') {
    type = 'membership'

    const daoVotingCw4Queries = [{ address: votingModule.votingModuleAddress, data: { group_contract: {} } }]
    const [groupContract] = await exponentialBackoff(() => queryMultipleContracts(daoVotingCw4Queries), 5, 1000, 30000)

    const cw4GroupQueries = [
      { address: groupContract, data: { list_members: {} } },
      { address: groupContract, data: { total_weight: {} } },
    ]

    const [listMembers, totalWeight] = await exponentialBackoff(
      () => queryMultipleContracts(cw4GroupQueries),
      5,
      1000,
      30000,
    )

    votingModule.members = listMembers.members

    votingModule.totalWeight = totalWeight.weight as number
  }

  return {
    coreAddress,
    type,
    admin,
    config,
    proposalModule,
    votingModule,
    token,
  }
}
