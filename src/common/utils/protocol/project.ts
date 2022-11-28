import { createQueryClient, ixo, SigningStargateClient } from '@ixo/impactxclient-sdk'
import { DeliverTxResponse } from '@cosmjs/stargate'
import { fee, RPC_ENDPOINT } from './common'

export const GetProjectAccounts = async (projectDid: string) => {
  try {
    if (RPC_ENDPOINT) {
      const queryClient = await createQueryClient(RPC_ENDPOINT)
      const res = await queryClient.ixo.project.v1.projectAccounts({ projectDid })
      return res?.accountMap?.map
    }
  } catch (e) {
    console.error('GetProjectAccounts', e)
    return undefined
  }
}

export const CreateAgent = async (
  client: SigningStargateClient,
  payload: { did: string; projectDid: string; projectAddress: string; role: string },
): Promise<DeliverTxResponse | undefined> => {
  try {
    const { did, projectDid, projectAddress, role } = payload
    const message = {
      typeUrl: '/ixo.project.v1.MsgCreateAgent',
      value: ixo.project.v1.MsgCreateAgent.fromPartial({
        txHash: '',
        senderDid: did,
        projectDid,
        data: ixo.project.v1.CreateAgentDoc.fromPartial({ agentDid: did, role }),
        projectAddress,
      }),
    }
    console.info('CreateAgent', message)
    const response: DeliverTxResponse = await client.signAndBroadcast(projectAddress, [message], fee)
    return response
  } catch (e) {
    console.error('CreateAgent', e)
    return undefined
  }
}
