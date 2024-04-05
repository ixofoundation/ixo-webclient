import { CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate';

// Variable to hold the instance
const clientInstance: { [rpc: string] : CosmWasmClient } = {};

export const getCosmwasmClient = async (rpc?: string): Promise<CosmWasmClient> => {
    // Ensure the RPC endpoint is defined
    if (!rpc) {
        throw new Error("RPC endpoint is required");
    }
    
    // Check if an instance already exists for the given RPC endpoint
    if (!clientInstance[rpc]) {
        // If not, create a new instance
        clientInstance[rpc] = await CosmWasmClient.connect(rpc);
    }
    
    // Return the instance
    return clientInstance[rpc];
};
