// TODO - use this instead of the redux ixo for each component that has been refactored
import { Ixo } from '@ixo/ixo-apimodule'

const api = new Ixo(import.meta.env.VITE_APP_BLOCK_SYNC_URL as string)

export default api
