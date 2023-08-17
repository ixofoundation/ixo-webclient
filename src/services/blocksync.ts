import { Ixo } from '@ixo/ixo-apimodule'

export class BlockSyncService {
  public blocksyncApi: any
  public project: any
  public entity: any
  public token: any

  constructor(bsUrl = process.env.REACT_APP_BLOCK_SYNC_URL) {
    this.blocksyncApi = new Ixo(bsUrl!)
    this.entity = {
      getAllEntities: async (): Promise<any> => {
        const url = new URL(`/api/entity/all`, bsUrl!)
        return fetch(url.href).then((response) => response.json())
      },
      getEntitiesByType: async (entityType: string): Promise<any> => {
        const url = new URL(`/api/entity/byType/${entityType.toLowerCase()}`, bsUrl!)
        return fetch(url.href).then((response) => response.json())
      },
      getEntityById: async (id: string): Promise<any> => {
        const url = new URL(`/api/entity/byId/${id.toLowerCase()}`, bsUrl!)
        return fetch(url.href).then((response) => response.json())
      },
      getCollections: async (): Promise<any> => {
        const url = new URL(`/api/entity/collections`, bsUrl!)
        return fetch(url.href).then((response) => response.json())
      },
      getCollectionsByOwnerAddress: async (address: string): Promise<any> => {
        const url = new URL(`/api/entity/collectionsByOwnerAddress/${address}`, bsUrl!)
        return fetch(url.href).then((response) => response.json())
      },
    }
    this.token = {
      getTokenByAddress: async (address: string): Promise<any> => {
        const url = new URL(`/api/token/byAddress/${address}`, bsUrl!)
        return fetch(url.href).then((response) => response.json())
      },
    }
  }
}
