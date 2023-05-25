import { contracts, customQueries } from '@ixo/impactxclient-sdk'
import { CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { MarketingInfoResponse, TokenInfoResponse } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'
import { ProposalResponse, Threshold, VoteInfo } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { UpdateProposalConfigData } from 'components/Modals/AddActionModal/SetupUpdateVotingConfigModal'
import { chainNetwork } from 'hooks/configs'
import { Member } from 'types/dao'
import { durationToSeconds, expirationAtTimeToSecondsFromNow } from './conversions'

export const thresholdToTQData = (
  source: Threshold,
): Pick<
  UpdateProposalConfigData,
  'thresholdType' | 'thresholdPercentage' | 'quorumEnabled' | 'quorumType' | 'quorumPercentage'
> & { absoluteThresholdCount?: string } => {
  let thresholdType: UpdateProposalConfigData['thresholdType'] = 'majority'
  let thresholdPercentage: UpdateProposalConfigData['thresholdPercentage'] = undefined
  let quorumEnabled = true
  let quorumType: UpdateProposalConfigData['quorumType'] = '%'
  let quorumPercentage: UpdateProposalConfigData['quorumPercentage'] = 20
  let absoluteThresholdCount: string | undefined = undefined

  if ('threshold_quorum' in source) {
    const { threshold, quorum } = source.threshold_quorum

    thresholdType = 'majority' in threshold ? 'majority' : '%'
    thresholdPercentage = 'majority' in threshold ? undefined : Number(threshold.percent) * 100

    quorumType = 'majority' in quorum ? 'majority' : '%'
    quorumPercentage = 'majority' in quorum ? undefined : Number(quorum.percent) * 100

    quorumEnabled = true
  } else if ('absolute_percentage' in source) {
    const { percentage } = source.absolute_percentage

    thresholdType = 'majority' in percentage ? 'majority' : '%'
    thresholdPercentage = 'majority' in percentage ? undefined : Number(percentage.percent) * 100

    quorumEnabled = false
  } else if ('absolute_count' in source) {
    const { threshold } = source.absolute_count
    absoluteThresholdCount = threshold
  }

  return {
    thresholdType,
    thresholdPercentage,
    quorumEnabled,
    quorumType,
    quorumPercentage,
    absoluteThresholdCount,
  }
}

export const getContractNameByCodeId = (codeId: number): string => {
  return customQueries.contract.getContractCodes(chainNetwork).find(({ code }) => code === codeId)?.name ?? ''
}

export const getDaoContractInfo = async ({
  coreAddress,
  cwClient,
}: {
  coreAddress: string
  cwClient: CosmWasmClient
}) => {
  if (!cwClient) {
    throw new Error('')
  }
  let type = ''
  let token: any = undefined
  const daoCoreClient = new contracts.DaoCore.DaoCoreQueryClient(cwClient, coreAddress)
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
  const daoProposalSingleClient = new contracts.DaoProposalSingle.DaoProposalSingleQueryClient(
    cwClient,
    proposalModuleAddress,
  )
  proposalModule.proposalConfig = await daoProposalSingleClient.config()
  const { proposals } = await daoProposalSingleClient.listProposals({})
  const votes: VoteInfo[] = await proposals.reduce(
    async (previousPromise: Promise<VoteInfo[]>, current: ProposalResponse) => {
      const { id } = current
      const { votes } = await daoProposalSingleClient.listVotes({ proposalId: id })
      const previous = await previousPromise
      return previous.concat(votes)
    },
    Promise.resolve([]),
  )
  proposalModule.votes = votes

  const max_voting_period = proposalModule.proposalConfig.max_voting_period
  const votingPeriod = durationToSeconds(100, max_voting_period)

  proposalModule.proposals = proposals.map(({ id, proposal }) => {
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
  } = (await daoProposalSingleClient.proposalCreationPolicy()) as { module: { addr: string } }
  proposalModule.preProposalContractAddress = preProposalContractAddress
  const daoPreProposeSingleClient = new contracts.DaoPreProposeSingle.DaoPreProposeSingleQueryClient(
    cwClient,
    preProposalContractAddress,
  )
  proposalModule.preProposeConfig = await daoPreProposeSingleClient.config()

  // votingModule
  const votingModule: any = {}
  votingModule.votingModuleAddress = votingModuleAddress
  const { codeId } = await cwClient.getContract(votingModule.votingModuleAddress)
  votingModule.contractCodeId = codeId
  votingModule.contractName = getContractNameByCodeId(votingModule.contractCodeId)

  if (votingModule.contractName === 'dao_voting_cw20_staked') {
    type = 'staking'
    const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
      cwClient,
      votingModule.votingModuleAddress,
    )
    const stakingContract = await daoVotingCw20StakedClient.stakingContract()
    const tokenContract = await daoVotingCw20StakedClient.tokenContract()

    const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeQueryClient(cwClient, stakingContract)
    const { total } = await cw20StakeClient.totalValue()
    const { stakers } = await cw20StakeClient.listStakers({})
    const config = await cw20StakeClient.getConfig()

    const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract)
    const tokenInfo: TokenInfoResponse = await cw20BaseClient.tokenInfo()
    const marketingInfo: MarketingInfoResponse = await cw20BaseClient.marketingInfo()

    token = {
      tokenInfo,
      marketingInfo,
      config,
    }

    votingModule.members = stakers.map(({ address, balance }) => ({ addr: address, weight: balance }))
    votingModule.totalWeight = parseInt(total)
  } else if (votingModule.contractName === 'dao_voting_cw4') {
    type = 'membership'
    const daoVotingCw4Client = new contracts.DaoVotingCw4.DaoVotingCw4QueryClient(
      cwClient,
      votingModule.votingModuleAddress,
    )

    const cw4GroupAddress = await daoVotingCw4Client.groupContract()
    const cw4GroupClient = new contracts.Cw4Group.Cw4GroupQueryClient(cwClient, cw4GroupAddress)
    votingModule.members = (await cw4GroupClient.listMembers({})).members as never[]
    votingModule.totalWeight = (await cw4GroupClient.totalWeight({})).weight as number
  }

  // treasury
  const treasury: any = {}
  treasury.cw20Balances = cw20Balances
  treasury.cw20TokenList = cw20TokenList
  treasury.cw721TokenList = cw721TokenList

  return {
    type,
    admin,
    config,
    cw20Balances,
    cw20TokenList,
    storageItems,
    activeProposalModuleAddress,
    proposalModule,
    votingModule,
    treasury,
    token,
  }
}

export const getDaoContractMembersInfo = async ({
  coreAddress,
  cwClient,
}: {
  coreAddress: string
  cwClient: CosmWasmClient
}) => {
  if (!cwClient) {
    throw new Error('')
  }
  let members: Member[] = []
  const daoCoreClient = new contracts.DaoCore.DaoCoreQueryClient(cwClient, coreAddress)
  const votingModuleAddress = await daoCoreClient.votingModule()
  const { codeId } = await cwClient.getContract(votingModuleAddress)
  const contractName = getContractNameByCodeId(codeId)

  if (contractName === 'dao_voting_cw20_staked') {
    const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
      cwClient,
      votingModuleAddress,
    )
    const stakingContract = await daoVotingCw20StakedClient.stakingContract()
    const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeQueryClient(cwClient, stakingContract)
    const { stakers } = await cw20StakeClient.listStakers({})

    members = stakers.map(({ address, balance }) => ({ addr: address, weight: Number(balance) } as Member))
  } else if (contractName === 'dao_voting_cw4') {
    const daoVotingCw4Client = new contracts.DaoVotingCw4.DaoVotingCw4QueryClient(cwClient, votingModuleAddress)

    const cw4GroupAddress = await daoVotingCw4Client.groupContract()
    const cw4GroupClient = new contracts.Cw4Group.Cw4GroupQueryClient(cwClient, cw4GroupAddress)
    members = (await cw4GroupClient.listMembers({})).members as never[]
  }

  return members
}
