import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { DeliverTxResponse } from '@cosmjs/stargate'
import { cosmos, createQueryClient, SigningStargateClient } from '@ixo/impactxclient-sdk'
import { fee, RPC_ENDPOINT } from './common'
import { VoteOption } from '@ixo/impactxclient-sdk/types/codegen/cosmos/gov/v1/gov'

export const BankSendTrx = async (
  client: SigningStargateClient,
  myAddress: string,
  toAddress: string,
  token: Coin,
): Promise<DeliverTxResponse | undefined> => {
  try {
    const message = {
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: cosmos.bank.v1beta1.MsgSend.fromPartial({
        fromAddress: myAddress,
        toAddress: toAddress,
        amount: [cosmos.base.v1beta1.Coin.fromPartial(token)],
      }),
    }
    const response = await client.signAndBroadcast(myAddress, [message], fee)
    return response
  } catch (e) {
    console.error('BankSendTrx', e)
    return undefined
  }
}

export const GetBalances = async (address: string): Promise<Coin[]> => {
  try {
    if (!address) {
      throw new Error('address is undefined')
    }
    const client = await createQueryClient(RPC_ENDPOINT!)
    const { balances } = await client.cosmos.bank.v1beta1.allBalances({
      address,
    })
    return balances
  } catch (e) {
    console.error('GetBalances', e)
    return []
  }
}

export const GovVoteTrx = async (
  client: SigningStargateClient,
  payload: { address: string; proposalId: Long; option: VoteOption },
): Promise<DeliverTxResponse | undefined> => {
  try {
    const { address, proposalId, option } = payload
    const message = {
      typeUrl: '/cosmos.gov.v1beta1.MsgVote',
      value: cosmos.gov.v1beta1.MsgVote.fromPartial({
        proposalId,
        voter: address,
        option,
      }),
    }
    const response = await client.signAndBroadcast(address, [message], fee)
    return response
  } catch (e) {
    console.error('GovVoteTrx', e)
    return undefined
  }
}
