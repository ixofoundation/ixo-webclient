import { Entity } from "generated/graphql"
import { getTags } from "./getTags"
import { getEntityProfile } from "./getEntityProfile"

export const populateEntityForEntityExplorer = async (entity: Entity) => {
  const entityService = entity.service
  const profile = getEntityProfile(entity.settings?.Profile, entityService)
  const tags = getTags({ setting: entity.settings?.Tags, service: entityService })
  const [profileResult, tagsResult] = await Promise.all([profile, tags])

  return { profile: profileResult, tags: tagsResult }
}

export const populateEntitiesForEntityExplorer = async (entities: Entity[]) => {
  const populatedEntities = await Promise.all(entities.map(async entity => ({ ...entity, ...(await populateEntityForEntityExplorer(entity)) })))

  return populatedEntities
}

