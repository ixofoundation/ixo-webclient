import { createQueryClient } from '@ixo/impactxclient-sdk'

const RPC_ENDPOINT = process.env.REACT_APP_RPC_URL

export const GetProjectAccounts = async (projectDid: string) => {
  try {
    if (RPC_ENDPOINT) {
      const queryClient = await createQueryClient(RPC_ENDPOINT)
      const res = await queryClient.ixo.project.v1.projectAccounts({ projectDid })
      return res?.accountMap?.map
    }
  } catch (e) {
    console.error('GetProjectAccounts', e)
  }
}
