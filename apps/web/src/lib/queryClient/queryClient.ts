
import { invariant } from '@apollo/client/utilities/globals';
import { createQueryClient } from '@ixo/impactxclient-sdk';
import { singletonAsync } from 'lib/singleton';

async function initQueryClient() {
  const { RPC_ENDPOINT } = process.env;
  invariant(typeof RPC_ENDPOINT === "string", "RPC_ENDPOINT env var not set");

  const rpcEndpoint = RPC_ENDPOINT;
  return createQueryClient(rpcEndpoint); // No need to await here, just return the promise
}

export const getQueryClient = singletonAsync("queryClient", initQueryClient);

// Usage of queryClientPromise in an async context
// Example: (async () => {
//   const queryClient = await queryClientPromise;
//   // Use queryClient here
// })();
