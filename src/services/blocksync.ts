import { Ixo } from '@ixo/ixo-apimodule'
import { ApiListedEntity } from 'api/blocksync/types/entities'

export class BlockSyncService {
  public blocksyncApi: any

  constructor(bsUrl = process.env.REACT_APP_BLOCK_SYNC_URL) {
    this.blocksyncApi = new Ixo(bsUrl!)
  }

  async getProjectByProjectDid(did: string): Promise<ApiListedEntity> {
    return this.blocksyncApi.project.getProjectByProjectDid(did.replace('did:ixo:', ''))
  }
  async fetchPublic(key: string, PDSUrl: string): Promise<unknown> {
    return this.blocksyncApi.project.fetchPublic(key, PDSUrl)
  }
}
