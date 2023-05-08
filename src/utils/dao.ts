import { contracts, customQueries } from '@ixo/impactxclient-sdk'
import { SigningCosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { MarketingInfoResponse, TokenInfoResponse } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'
import { Threshold } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { UpdateProposalConfigData } from 'components/Modals/AddActionModal/SetupUpdateVotingConfigModal'
import { chainNetwork } from 'hooks/configs'
import { Member } from 'types/dao'
import { TDAOGroupModel } from 'types/protocol'

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

export const membersToMemberships = (members: Member[]): TDAOGroupModel['memberships'] => {
  const memberships: { [weight: number]: string[] } = {}

  members.forEach(({ addr, weight }) => {
    memberships[weight] = [...(memberships[weight] ?? []), addr]
  })

  return Object.entries(memberships).map(([weight, members]) => ({ weight: Number(weight), members, category: '' }))
}

export const getContractNameByCodeId = (codeId: number): string => {
  return customQueries.contract.getContractCodes(chainNetwork).find(({ code }) => code === codeId)?.name ?? ''
}

export const getDaoContractInfo = async ({
  coreAddress,
  cosmWasmClient,
  address,
}: {
  coreAddress: string
  cosmWasmClient: SigningCosmWasmClient | undefined
  address: string | undefined
}) => {
  if (!cosmWasmClient || !address) {
    throw new Error('')
  }
  let type = ''
  let token: any = undefined
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
  const { codeId } = await cosmWasmClient.getContract(votingModule.votingModuleAddress)
  votingModule.contractCodeId = codeId
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
    const tokenInfo: TokenInfoResponse = await cw20BaseClient.tokenInfo()
    const marketingInfo: MarketingInfoResponse = await cw20BaseClient.marketingInfo()
    console.log({ balance, tokenInfo, marketingInfo })
    console.log('Cw20BaseClient-------end')

    token = {
      tokenInfo,
      marketingInfo,
      config,
    }

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
  cosmWasmClient,
  address,
}: {
  coreAddress: string
  cosmWasmClient: SigningCosmWasmClient | undefined
  address: string | undefined
}) => {
  if (!cosmWasmClient || !address) {
    throw new Error('')
  }
  let members: Member[] = []
  const daoCoreClient = new contracts.DaoCore.DaoCoreClient(cosmWasmClient, address, coreAddress)
  const votingModuleAddress = await daoCoreClient.votingModule()
  const { codeId } = await cosmWasmClient.getContract(votingModuleAddress)
  const contractName = getContractNameByCodeId(codeId)

  if (contractName === 'dao_voting_cw20_staked') {
    const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedClient(
      cosmWasmClient,
      address,
      votingModuleAddress,
    )
    const stakingContract = await daoVotingCw20StakedClient.stakingContract()
    const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeClient(cosmWasmClient, address, stakingContract)
    const { stakers } = await cw20StakeClient.listStakers({})

    members = stakers.map(({ address, balance }) => ({ addr: address, weight: Number(balance) } as Member))
  } else if (contractName === 'dao_voting_cw4') {
    const daoVotingCw4Client = new contracts.DaoVotingCw4.DaoVotingCw4Client(
      cosmWasmClient,
      address,
      votingModuleAddress,
    )

    const cw4GroupAddress = await daoVotingCw4Client.groupContract()
    const cw4GroupClient = new contracts.Cw4Group.Cw4GroupClient(cosmWasmClient, address, cw4GroupAddress)
    members = (await cw4GroupClient.listMembers({})).members as never[]
  }

  return members
}
