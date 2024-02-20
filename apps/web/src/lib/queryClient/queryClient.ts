import { createQueryClient } from '@ixo/impactxclient-sdk';
import { RPC_ENDPOINT } from 'lib/protocol';

let queryClientInstance: Awaited<ReturnType<typeof createQueryClient>>;

export const getQueryClient = async () => {
  if (!queryClientInstance) {

    queryClientInstance = await createQueryClient(RPC_ENDPOINT || "");
  }
  return queryClientInstance;
}
