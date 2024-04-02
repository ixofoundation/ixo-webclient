import { CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { RPC_ENDPOINT } from "lib/protocol";

// Variable to hold the instance
let clientInstance: CosmWasmClient | null = null;

export const getCosmwasmClient = async () => {
    // Check if an instance already exists
    if (!clientInstance) {
        // If not, create a new instance
        clientInstance = await CosmWasmClient.connect(RPC_ENDPOINT ?? "");
    }
    // Return the instance
    return clientInstance;
};
