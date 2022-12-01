import { SigningStargateClient, ixo } from '@ixo/impactxclient-sdk'
import { DeliverTxResponse } from '@cosmjs/stargate'
import { fee } from './common'

export const WithdrawShare = async (
  client: SigningStargateClient,
  payload: { did: string; bondDid: string; address: string },
): Promise<DeliverTxResponse | undefined> => {
  try {
    const { did, bondDid, address } = payload
    const message = {
      typeUrl: '/ixo.bonds.v1beta1.MsgWithdrawShare',
      value: ixo.bonds.v1beta1.MsgWithdrawShare.fromPartial({
        recipientDid: did,
        bondDid: bondDid,
        recipientAddress: address,
      }),
    }
    console.info('WithdrawShare', message)
    const response: DeliverTxResponse = await client.signAndBroadcast(address, [message], fee)
    return response
  } catch (e) {
    console.error('WithdrawShare', e)
    return undefined
  }
}
