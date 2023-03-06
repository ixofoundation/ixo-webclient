import { cosmos, cosmwasm, createQueryClient, SigningStargateClient, utils } from '@ixo/impactxclient-sdk'
import { DumpStateResponse } from '@ixo/impactxclient-sdk/types/codegen/DaoCore.types'
import BigNumber from 'bignumber.js'
import Long from 'long'
import { fee, RPC_ENDPOINT, TSigner } from './common'

export const WasmInstantiateTrx = async (
  client: SigningStargateClient,
  signer: TSigner,
  payload: { codeId: number; msg: string }[],
) => {
  try {
    const { address, did } = signer
    const messages = payload.map(({ codeId, msg }) => ({
      typeUrl: '/cosmwasm.wasm.v1.MsgInstantiateContract',
      value: cosmwasm.wasm.v1.MsgInstantiateContract.fromPartial({
        admin: address,
        codeId: Long.fromNumber(codeId),
        funds: [
          cosmos.base.v1beta1.Coin.fromPartial({
            amount: '1',
            denom: 'uixo',
          }),
        ],
        label: did + 'contract' + codeId,
        msg: utils.conversions.JsonToArray(msg),
        sender: address,
      }),
    }))

    const updatedFee = { ...fee, gas: new BigNumber(fee.gas).times(messages.length).toString() }
    const response = await client.signAndBroadcast(address, messages, updatedFee)
    return response
  } catch (e) {
    console.error('WasmInstantiateTrx', e)
    return undefined
  }
}

export const WasmExecuteTrx = async (
  client: SigningStargateClient,
  signer: TSigner,
  payload: { contractAddress: string; msg: string },
  funds = {
    amount: '1',
    denom: 'uixo',
  },
) => {
  try {
    const { address } = signer
    const { contractAddress, msg } = payload
    const message = {
      typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
      value: cosmwasm.wasm.v1.MsgExecuteContract.fromPartial({
        contract: contractAddress,
        funds: [cosmos.base.v1beta1.Coin.fromPartial(funds)],
        msg: utils.conversions.JsonToArray(msg),
        sender: address,
      }),
    }

    const response = await client.signAndBroadcast(address, [message], fee)
    return response
  } catch (e) {
    console.error('WasmExecuteTrx', e)
    return undefined
  }
}

export const QueryDAOCoreContractDumpState = async (
  contractAddress: string,
): Promise<DumpStateResponse | undefined> => {
  try {
    const msg = { dump_state: {} }
    const client = await createQueryClient(RPC_ENDPOINT!)
    const res = await client.cosmwasm.wasm.v1.smartContractState({
      address: contractAddress,
      queryData: utils.conversions.JsonToArray(JSON.stringify(msg)),
    })
    const dumpState = JSON.parse(utils.conversions.Uint8ArrayToJS(res.data))
    // proposalContractAddress = dumpState.proposal_modules[0].address
    // votingContractAddress = dumpState.voting_module
    return dumpState
  } catch (e) {
    console.error('QueryDAOCoreContractDumpState', e)
    return undefined
  }
}

export const QueryDAOProposalContractProposalCreationPolicy = async (proposalContractAddress: string) => {
  try {
    const msg = { proposal_creation_policy: {} }
    const client = await createQueryClient(RPC_ENDPOINT!)
    const res = await client.cosmwasm.wasm.v1.smartContractState({
      address: proposalContractAddress,
      queryData: utils.conversions.JsonToArray(JSON.stringify(msg)),
    })
    const proposalCreationPolicy = JSON.parse(utils.conversions.Uint8ArrayToJS(res.data))
    // preProposalContractAddress = proposalCreationPolicy.module.addr;
    return proposalCreationPolicy
  } catch (e) {
    console.error('QueryDAOProposalContractProposalCreationPolicy', e)
    return undefined
  }
}

export const QueryDAOProposalContractReverseProposals = async (proposalContractAddress: string) => {
  try {
    const msg = { reverse_proposals: {} }
    const client = await createQueryClient(RPC_ENDPOINT!)
    const res = await client.cosmwasm.wasm.v1.smartContractState({
      address: proposalContractAddress,
      queryData: utils.conversions.JsonToArray(JSON.stringify(msg)),
    })
    const reverseProposals = JSON.parse(utils.conversions.Uint8ArrayToJS(res.data))
    // const proposalId: number = reverseProposals.proposals[0].id;
    return reverseProposals
  } catch (e) {
    console.error('QueryDAOProposalContractReverseProposals', e)
    return undefined
  }
}

export const QueryDAOProposalContractGetVote = async (
  proposalContractAddress: string,
  payload: { proposalId: number; voter: string },
) => {
  try {
    const { proposalId, voter } = payload
    const msg = { get_vote: { proposal_id: proposalId, voter } }
    const client = await createQueryClient(RPC_ENDPOINT!)
    const res = await client.cosmwasm.wasm.v1.smartContractState({
      address: proposalContractAddress,
      queryData: utils.conversions.JsonToArray(JSON.stringify(msg)),
    })
    const { vote } = JSON.parse(utils.conversions.Uint8ArrayToJS(res.data))
    return vote
  } catch (e) {
    console.error('QueryDAOProposalContractGetVote', e)
    return undefined
  }
}

export const QueryDAOCoreContractGetItem = async (contractAddress: string, payload: { key: string }) => {
  try {
    const { key } = payload
    const msg = { get_item: { key } }
    const client = await createQueryClient(RPC_ENDPOINT!)
    const res = await client.cosmwasm.wasm.v1.smartContractState({
      address: contractAddress,
      queryData: utils.conversions.JsonToArray(JSON.stringify(msg)),
    })
    const { item } = JSON.parse(utils.conversions.Uint8ArrayToJS(res.data))
    return item
  } catch (e) {
    console.error('QueryDAOCoreContractGetItem', e)
    return undefined
  }
}
