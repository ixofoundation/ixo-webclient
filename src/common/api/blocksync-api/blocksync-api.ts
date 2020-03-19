// TODO - use this instead of the redux ixo for each component that has been refactored
import { Ixo } from 'ixo-module'

const api = new Ixo(process.env.REACT_APP_BLOCK_SYNC_URL)

export default api
