import { EntityInterface } from 'redux/entitiesState/slice'
import { getLinkedResource } from './getLinkedResource'
import { LinkedResource, Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { transformStorageEndpoint } from 'new-utils'

const getAndTransformProfileData = async ({ resource, service }: { resource: LinkedResource; service: Service[] }) => {
  const fetchedResource = await getLinkedResource({ resource, service })

  if (!fetchedResource) return null

  return {
    ...fetchedResource,
    image: transformStorageEndpoint(fetchedResource.image),
    logo: transformStorageEndpoint(fetchedResource.logo),
  }
}

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
              data:
                (await getAndTransformProfileData({ resource: entity.settings?.Profile, service: entity.service })) ??
                null,
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
