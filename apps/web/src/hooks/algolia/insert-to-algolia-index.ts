import axios from 'axios'
import { algoliaIndexName } from 'constants/common'
import { SearchResult } from 'screens/ExploreNew/ExploreNew'
import { TEntityModel } from 'types/entities'
import { errorToast } from 'utils/toast'

export const insertToAlgoliaIndex: (entity: TEntityModel) => Promise<void> = async (entity) => {
  try {
    const record = convertEntityToAlgoliaObject(entity)

    return await axios.post(
      'https://algolia-worker.ixo-api.workers.dev',
      {
        indexName: algoliaIndexName,
        record,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-PLATFORM-NAME': 'ixo-web-client',
        },
      },
    )
  } catch (error) {
    console.error('Error inserting to Algolia index', error)
    errorToast('Error inserting to Algolia index')
  }
}

const convertEntityToAlgoliaObject = (entity: TEntityModel): SearchResult => ({
  objectID: entity.id,
  id: entity.id,
  brand: entity?.profile?.brand || '',
  name: entity?.profile?.name || '',
  image: entity?.profile?.image || '',
  logo: entity?.profile?.logo || '',
  description: entity?.profile?.description || '',
  filter: `${entity.type}: ${entity?.profile?.name}`,
  type: entity.type,
  entityVerified: entity.entityVerified,
  startDate: entity?.startDate ? new Date(entity.startDate as any).toISOString() : '',
  endDate: entity?.endDate ? new Date(entity.endDate as any).toISOString() : '',
  owner: entity.owner,
  relayerNode: entity.relayerNode,
  alsoKnownAs: entity.alsoKnownAs,
})
