// TODO - use this instead of the redux ixo for each component that has been refactored
import { Ixo } from "@ixo/ixo-apimodule";

const blocksyncMainURL = "https://blocksync.ixo.world";
const blocksyncPandoraURL = "https://blocksync-pandora.ixo.world";

const api = new Ixo(process.env.REACT_APP_BLOCK_SYNC_URL as string);

export const blocksyncMainApi = new Ixo(blocksyncMainURL as string);
export const blocksyncPandoraApi = new Ixo(blocksyncPandoraURL as string);

export default api;
