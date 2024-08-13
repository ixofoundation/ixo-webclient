import { CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'

// Variable to hold the instance
const clientInstance: { [rpc: string]: CosmWasmClient } = {}
const clientPromises: { [rpc: string]: Promise<CosmWasmClient> | null } = {}

export const getCosmwasmClient = async (rpc?: string): Promise<CosmWasmClient> => {
  // Ensure the RPC endpoint is defined
  if (!rpc) {
    throw new Error('RPC endpoint is required')
  }

  // Check if an instance already exists for the given RPC endpoint
  if (clientInstance[rpc]) {
    return clientInstance[rpc]
  }

  // If an instance is being created, wait for its promise
  if (!clientPromises[rpc]) {
    // Create a new instance and store its promise
    clientPromises[rpc] = CosmWasmClient.connect(rpc)
      .then((client) => {
        clientInstance[rpc] = client
        clientPromises[rpc] = null // Clear the promise once resolved
        return client
      })
      .catch((error) => {
        clientPromises[rpc] = null // Reset the promise if creation failed
        throw error
      })
  }

  return clientPromises[rpc]!
}
