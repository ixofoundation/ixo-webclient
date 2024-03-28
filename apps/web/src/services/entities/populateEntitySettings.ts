import { getMappedNewURL } from "@ixo-webclient/utils"
import { Entity } from "generated/graphql"
import { replacePDSWithCellNode, serviceEndpointToUrl } from "utils/entities"

export const getEntityProfile = async (profile: any, service: any) => {
  if (!profile) return
  const url = serviceEndpointToUrl(profile.serviceEndpoint, service)
  return await fetch(getMappedNewURL(url))
    .then((response) => response.json())
    .then((response) => {
      const context = response['@context']
      let image: string = response.image
      let logo: string = response.logo

      if (image && !image.startsWith('http')) {
        const [identifier] = image.split(':')
        let endpoint = ''
          ; (Array.isArray(context)
            ? context
            : Object.entries(context).map(([key, value]) => ({ [key]: value }))
          ).forEach((item: any) => {
            if (typeof item === 'object' && identifier in item) {
              endpoint = item[identifier]
            }
          })
        image = image.replace(identifier + ':', endpoint)
      }
      if (logo && !logo.startsWith('http')) {
        const [identifier] = logo.split(':')
        let endpoint = ''
          ; (Array.isArray(context)
            ? context
            : Object.entries(context).map(([key, value]) => ({ [key]: value }))
          ).forEach((item: any) => {
            if (typeof item === 'object' && identifier in item) {
              endpoint = item[identifier]
            }
          })
        logo = logo.replace(identifier + ':', endpoint)
      }
      return { ...response, image, logo }
    })
    .catch((e) => {
      return undefined
    })
}

export const getCredentialSubject = async ({ resource, service }: { resource: any, service: any }) => {
  if (!resource) return
  const url = serviceEndpointToUrl(resource.serviceEndpoint, service)

  return fetch(getMappedNewURL(url))
    .then((response) => response.json())
    .then((response) => response.credentialSubject).catch((e) => {
      return undefined
    })
}

export const getTags = async ({ setting, service }: { setting: any, service: any }) => {
  if (!setting) return
  const url = serviceEndpointToUrl(setting.serviceEndpoint, service)

  return fetch(getMappedNewURL(url))
    .then((response) => response.json())
    .then((response) => response.entityTags ?? response.ddoTags).catch((e) => {
      return undefined
    })
}

export const getPage = async ({ setting, service }: { setting: any, service: any }) => {
  if (!setting) return
  const url = serviceEndpointToUrl(setting.serviceEndpoint, service)

  return fetch(getMappedNewURL(url))
    .then((response) => response.json())
    .then((response) => {
      if ('@context' in response && 'page' in response) {
        return { 'page': response.page }
      }

      return { 'pageLegacy': replacePDSWithCellNode(response) }
    }
    )
}

export const getLinkedResource = async ({ resource, service }: { resource: any, service: any }) => {
  if (!resource) return
  const url = serviceEndpointToUrl(resource.serviceEndpoint, service)

  return fetch(getMappedNewURL(url))
    .then((response) => response.json())
}

export const getSurveyJsResource = async ({ resource, service }: { resource: any, service: any }) => {
  if (!resource) return
  const url = serviceEndpointToUrl(resource.serviceEndpoint, service)

  return fetch(getMappedNewURL(url))
    .then((response) => response.json())
    .then((response) => response.question)
}

export const getLinkedClaim = async ({ claim, service }: { claim: any, service: any }) => {
  const url = serviceEndpointToUrl(claim.serviceEndpoint, service)

  if (claim.proof && url) {
    return fetch(getMappedNewURL(url))
      .then((response) => response.json())
      .then((response) => {
        return response.entityClaims[0]
      })
      .then((claim) => {
        return { [claim.id]: claim }
      })
      .catch(() => undefined)
  }
}

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

