import { Ixo } from '@ixo/ixo-apimodule'
import { ApiListedEntity } from 'api/blocksync/types/entities'

export class BlockSyncService {
  public blocksyncApi: any
  public project: any
  public entity: any

  constructor(bsUrl = process.env.REACT_APP_BLOCK_SYNC_URL) {
    this.blocksyncApi = new Ixo(bsUrl!)
    this.project = {
      getProjectByProjectDid: async (did: string): Promise<ApiListedEntity> => {
        return this.blocksyncApi.project
          .getProjectByProjectDid(did.replace('did:ixo:', ''))
          .then((project: any): ApiListedEntity => ({ ...project, data: JSON.parse(project.data) }))
      },
      fetchPublic: this.blocksyncApi.project.fetchPublic,
    }
    this.entity = {
      getEntitiesByType: async (entityType: string): Promise<any> => {
        const url = new URL(`/api/entity/byType/${entityType.toLowerCase()}`, bsUrl!)
        return fetch(url.href).then((response) => response.json())
      },
      getEntityById: async (id: string): Promise<any> => {
        const url = new URL(`/api/entity/byId/${id.toLowerCase()}`, bsUrl!)
        return fetch(url.href).then((response) => response.json())
      },
    }
  }
}
