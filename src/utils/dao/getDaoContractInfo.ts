import { CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { ProposalResponse, VoteInfo } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'

import { durationToSeconds, expirationAtTimeToSecondsFromNow } from 'utils/conversions'
import { getContractNameByCodeId } from './getContractNameByCodeId'
import { sleepByLimiter } from 'utils/limiter'

import { queryMultipleContracts } from 'utils/multiContractCall'

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

  console.log('dao queries run')
  const [admin, config, proposalModules, votingModuleAddress] = await queryMultipleContracts(daoQueries)
  console.log('dao queries done')

  const proposalModule: any = {
    proposalConfig: config,
    proposalModuleAddress: proposalModules[0].address,
    votes: null,
  }

  console.log({ proposalAddress: proposalModule?.proposalModuleAddress })

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

  console.log('proposal queries run')

  const [proposalConfig, proposalsList, proposalCreationPolicy] = await queryMultipleContracts(proposalQueries)
  console.log('proposal queries done')

  proposalModule.proposalConfig = proposalConfig

  const proposals = proposalsList.proposals

  console.log('vote queries run')

  const getVotes = async (proposals: ProposalResponse[]): Promise<VoteInfo[]> => {
    const voteQueries = proposals.map(({ id }) => ({
      address: proposalModule.proposalModuleAddress,
      data: {
        list_votes: {
          proposal_id: id,
        },
      },
    }))

    const allVotes: VoteInfo[][] = await queryMultipleContracts(voteQueries)

    // Flatten the array of arrays
    const votes: VoteInfo[] = allVotes.flat()

    return votes
  }

  const votes: VoteInfo[] = await getVotes(proposals)

  console.log('vote queries done')

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

  console.log('prepropose queries run')

  const [preProposeConfig] = await queryMultipleContracts(preProposeQueries)
  console.log('prepropose queries run')

  proposalModule.preProposeConfig = preProposeConfig

  // votingModule
  const votingModule: any = {}
  votingModule.votingModuleAddress = votingModuleAddress

  let codeId
  try {
    console.log('cwClient.getContract queries run')

    const result = await cwClient.getContract(votingModule.votingModuleAddress)
    console.log('cwClient.getContract queries done')

    codeId = result.codeId
    await sleepByLimiter()
  } catch (error) {
    console.log({ error })
  }
  votingModule.contractCodeId = codeId
  votingModule.contractName = getContractNameByCodeId(votingModule.contractCodeId)

  if (votingModule.contractName === 'dao_voting_cw20_staked') {
    type = 'staking'

    const daoVotingCW20StakedQueries = [
      { address: votingModule.votingModuleAddress, data: { staking_contract: {} } },
      { address: votingModule.votingModuleAddress, data: { token_contract: {} } },
    ]
    console.log('daoVotingCW20StakedQueries queries run')

    const [stakingContract, tokenContract] = await queryMultipleContracts(daoVotingCW20StakedQueries)
    console.log('daoVotingCW20StakedQueries queries done')

    const cw20StakeQueries = [
      { address: stakingContract, data: { total_value: {} } },
      { address: stakingContract, data: { list_stakers: {} } },
      { address: stakingContract, data: { get_config: {} } },
    ]
    console.log('cw20StakeQueries queries run')

    const [totalValue, listStakers, getConfig] = await queryMultipleContracts(cw20StakeQueries)
    console.log('cw20StakeQueries queries done')

    const total = totalValue.total
    const stakers = listStakers.stakers
    const config = getConfig

    const cw20BaseQueries = [
      { address: tokenContract, data: { token_info: {} } },
      { address: tokenContract, data: { marketing_info: {} } },
    ]
    console.log('cw20BaseQueries queries run')

    const [tokenInfo, marketingInfo] = await queryMultipleContracts(cw20BaseQueries)
    console.log('cw20BaseQueries queries done')

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
    console.log('daoVotingCw4Queries queries run')

    const [groupContract] = await queryMultipleContracts(daoVotingCw4Queries)
    console.log('daoVotingCw4Queries queries done')

    const cw4GroupQueries = [
      { address: groupContract, data: { list_members: {} } },
      { address: groupContract, data: { total_weight: {} } },
    ]
    console.log('cw4GroupQueries queries run')

    const [listMembers, totalWeight] = await queryMultipleContracts(cw4GroupQueries)
    console.log('cw4GroupQueries queries done')

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
