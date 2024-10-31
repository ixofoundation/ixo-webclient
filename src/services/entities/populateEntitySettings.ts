import { Entity } from 'generated/graphql'
import { getTags } from './getTags'
import { getEntityProfile } from './getEntityProfile'
import { getDAOGroupLinkedEntities, toRootEntityType } from 'utils/entities'
import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { getDaoContractInfo } from 'utils/dao'
import { getCosmwasmClient } from 'lib/cosmWasmClient/cosmWasmClient'
import { RPC_ENDPOINT } from 'lib/protocol'
import { getCarbonOracleAggregate } from 'api/blocksync/getEvaluations'

export const populateEntityForEntityExplorer = async (entity: Entity) => {
  const entityService = entity.service
  const profile = getEntityProfile(entity.settings?.Profile, entityService, entity)
  const tags = getTags({ setting: entity.settings?.Tags, service: entityService })
  const [profileResult, tagsResult] = await Promise.all([profile, tags])

  const metrics =
    toRootEntityType(entity.type) === 'oracle' ? await getCarbonOracleAggregate({ entityId: entity.id }) : {}

  // const cwClient = await getCosmwasmClient(RPC_ENDPOINT ?? "")

  // const groups = await Promise.all(getDAOGroupLinkedEntities(entity.linkedEntity).map(async (item: LinkedEntity) => {
  //   const { id } = item
  //   const [, coreAddress] = id.split('#')
  //   const daoContractInfo = await getDaoContractInfo({ coreAddress, cwClient })

  //   return { [daoContractInfo.coreAddress]: daoContractInfo }
  // }))

  // const daoGroups = groups.reduce((acc, item) => ({ ...acc, ...item }), {}) as any

  return { profile: profileResult, tags: tagsResult, daoGroups: {}, metrics }
}

export const populateEntitiesForEntityExplorer = async (entities: Entity[]) => {
  const populatedEntities = await Promise.all(
    entities.map(async (entity) => ({ ...entity, ...(await populateEntityForEntityExplorer(entity)) })),
  )

  return populatedEntities
}
