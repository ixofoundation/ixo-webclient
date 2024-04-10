import { createQueryClient } from '@ixo/impactxclient-sdk';
import { RPC_ENDPOINT } from 'lib/protocol';

let queryClientInstance: Awaited<ReturnType<typeof createQueryClient>>;

export const getQueryClient = async (rpc?: string) => {
  if (!queryClientInstance) {

    queryClientInstance = await createQueryClient(rpc ?? RPC_ENDPOINT ?? "");
  }
  return queryClientInstance;
}
