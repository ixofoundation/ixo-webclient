import { contracts } from '@ixo/impactxclient-sdk'
import { CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { Member } from 'types/dao'
import { getContractNameByCodeId } from './getContractNameByCodeId'

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
