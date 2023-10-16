import { contracts, customQueries } from '@ixo/impactxclient-sdk'
import { CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { MarketingInfoResponse, TokenInfoResponse } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'
import {
  ProposalResponse,
  Threshold,
  VoteInfo,
  CosmosMsgForEmpty,
} from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { UpdateProposalConfigData } from 'components/Modals/AddActionModal/SetupUpdateVotingConfigModal'
import { ProposalActionConfigMap } from 'constants/entity'
import { chainNetwork } from 'hooks/configs'
import { Member } from 'types/dao'
import { durationToSeconds, expirationAtTimeToSecondsFromNow } from './conversions'
import { sleepByLimiter } from './limiter'
import { decodeProtobufValue, parseEncodedMessage } from './messages'

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
  await sleepByLimiter()
  const admin = await daoCoreClient.admin()
  await sleepByLimiter()
  const config = await daoCoreClient.config()
  await sleepByLimiter()
  const [{ address: proposalModuleAddress }] = await daoCoreClient.proposalModules({})
  await sleepByLimiter()
  const votingModuleAddress = await daoCoreClient.votingModule()

  // proposalModule
  const proposalModule: any = {}
  proposalModule.proposalModuleAddress = proposalModuleAddress
  const daoProposalSingleClient = new contracts.DaoProposalSingle.DaoProposalSingleQueryClient(
    cwClient,
    proposalModuleAddress,
  )
  await sleepByLimiter()
  proposalModule.proposalConfig = await daoProposalSingleClient.config()
  await sleepByLimiter()
  const { proposals } = await daoProposalSingleClient.listProposals({})
  const votes: VoteInfo[] = await proposals.reduce(
    async (previousPromise: Promise<VoteInfo[]>, current: ProposalResponse) => {
      const { id } = current
      await sleepByLimiter()
      const { votes } = await daoProposalSingleClient.listVotes({ proposalId: id })
      await sleepByLimiter()
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

  await sleepByLimiter()
  const {
    module: { addr: preProposalContractAddress },
  } = (await daoProposalSingleClient.proposalCreationPolicy()) as { module: { addr: string } }
  proposalModule.preProposalContractAddress = preProposalContractAddress
  const daoPreProposeSingleClient = new contracts.DaoPreProposeSingle.DaoPreProposeSingleQueryClient(
    cwClient,
    preProposalContractAddress,
  )
  await sleepByLimiter()
  proposalModule.preProposeConfig = await daoPreProposeSingleClient.config()

  // votingModule
  const votingModule: any = {}
  votingModule.votingModuleAddress = votingModuleAddress
  await sleepByLimiter()
  const { codeId } = await cwClient.getContract(votingModule.votingModuleAddress)
  votingModule.contractCodeId = codeId
  votingModule.contractName = getContractNameByCodeId(votingModule.contractCodeId)

  if (votingModule.contractName === 'dao_voting_cw20_staked') {
    type = 'staking'
    const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
      cwClient,
      votingModule.votingModuleAddress,
    )
    await sleepByLimiter()
    const stakingContract = await daoVotingCw20StakedClient.stakingContract()
    await sleepByLimiter()
    const tokenContract = await daoVotingCw20StakedClient.tokenContract()

    const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeQueryClient(cwClient, stakingContract)
    await sleepByLimiter()
    const { total } = await cw20StakeClient.totalValue()
    await sleepByLimiter()
    const { stakers } = await cw20StakeClient.listStakers({})
    await sleepByLimiter()
    const config = await cw20StakeClient.getConfig()

    const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract)
    await sleepByLimiter()
    const tokenInfo: TokenInfoResponse = await cw20BaseClient.tokenInfo()
    await sleepByLimiter()
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

    await sleepByLimiter()
    const cw4GroupAddress = await daoVotingCw4Client.groupContract()
    const cw4GroupClient = new contracts.Cw4Group.Cw4GroupQueryClient(cwClient, cw4GroupAddress)
    await sleepByLimiter()
    votingModule.members = (await cw4GroupClient.listMembers({})).members as never[]
    await sleepByLimiter()
    votingModule.totalWeight = (await cw4GroupClient.totalWeight({})).weight as number
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

export const proposalMsgToActionConfig = (msg: CosmosMsgForEmpty) => {
  try {
    if ('wasm' in msg && 'execute' in msg.wasm && 'msg' in msg.wasm.execute) {
      const encodedMessage = parseEncodedMessage(msg.wasm.execute.msg)

      let key: string = Object.keys(encodedMessage)[0]
      const value: any = Object.values(encodedMessage)[0]

      if (key === 'update_config') {
        if ('config' in value) {
          key += '.config'
        } else if ('deposit_info' in value) {
          key += '.proposal'
        } else if ('threshold' in value) {
          key += '.voting'
        }
      }

      const proposalActionDetail = ProposalActionConfigMap[`wasm.execute.${key}`] ?? {}
      return {
        ...proposalActionDetail,
        data: value,
        type: `wasm.execute.${key}`,
      }
    } else if ('stargate' in msg && 'type_url' in msg.stargate && msg.stargate.type_url) {
      const typeUrl: string = msg.stargate.type_url
      const value = decodeProtobufValue(typeUrl, msg.stargate.value)

      const proposalActionDetail = ProposalActionConfigMap[typeUrl] ?? {}
      return {
        ...proposalActionDetail,
        data: value,
        type: typeUrl,
      }
    }
  } catch (e) {
    console.error('proposalMsgToActionConfig', e)
    return undefined
  }
}
