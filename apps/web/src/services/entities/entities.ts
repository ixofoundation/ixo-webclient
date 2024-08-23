import { EntityInterface } from 'redux/entitiesState/slice'
import { getLinkedResource } from './getLinkedResource'

const getEntityData = async (entity: EntityInterface) => {
  return {
    ...entity,
    linkedResource: await Promise.all(
      entity.linkedResource.map(async (resource) => {
        const response = await getLinkedResource({ resource, service: entity.service })
        return { ...resource, data: response ?? null }
      }),
    ),
    settings: {
      ...(entity.settings?.Profile
        ? {
            Profile: {
              ...entity.settings.Profile,
              data: (await getLinkedResource({ resource: entity.settings?.Profile, service: entity.service })) ?? null,
            },
          }
        : {}),
      ...(entity.settings?.Page
        ? {
            Page: {
              ...entity.settings.Page,
              data: (await getLinkedResource({ resource: entity.settings?.Page, service: entity.service })) ?? null,
            },
          }
        : {}),
      ...(entity.settings?.Tags
        ? {
            Tags: {
              ...entity.settings.Tags,
              data: (await getLinkedResource({ resource: entity.settings?.Tags, service: entity.service })) ?? null,
            },
          }
        : {}),
    },
  }
}

export const getAllEntitiesData = async ({ entities }: { entities: EntityInterface[] }) => {
  return Promise.all(entities.map(getEntityData))
}
