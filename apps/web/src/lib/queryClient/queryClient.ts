import { createQueryClient } from '@ixo/impactxclient-sdk'
import { RPC_ENDPOINT } from 'lib/protocol'

let queryClientInstance: Awaited<ReturnType<typeof createQueryClient>>
let queryClientPromise: Promise<Awaited<ReturnType<typeof createQueryClient>>> | null = null

export const getQueryClient = async (rpc?: string) => {
  if (queryClientInstance) {
    return queryClientInstance
  }

  if (!queryClientPromise) {
    queryClientPromise = createQueryClient(rpc ?? RPC_ENDPOINT ?? '')
      .then((client) => {
        queryClientInstance = client
        queryClientPromise = null
        return client
      })
      .catch((error) => {
        // Reset the promise if creation failed so subsequent calls can retry
        queryClientPromise = null
        throw error
      })
  }

  return queryClientPromise
}
