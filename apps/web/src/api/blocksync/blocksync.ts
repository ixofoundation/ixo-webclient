// TODO - use this instead of the redux ixo for each component that has been refactored
import { Ixo } from '@ixo/ixo-apimodule'

const api = new Ixo(process.env.NEXT_PUBLIC_BLOCK_SYNC_URL as string)

export default api
