import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { cosmos, createQueryClient, SigningStargateClient } from '@ixo/impactxclient-sdk'
import { fee } from './common'

const RPC_ENDPOINT = process.env.REACT_APP_RPC_URL

export const BankSendTrx = async (
  client: SigningStargateClient,
  myAddress: string,
  toAddress: string,
  token: Coin,
): Promise<any> => {
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
