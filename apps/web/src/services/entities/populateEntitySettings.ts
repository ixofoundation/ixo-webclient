import { getMappedNewURL } from "@ixo-webclient/utils"
import { serviceEndpointToUrl } from "utils/entities"

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

export const getCredentialSubject = async ({ setting, service }: { setting: any, service: any }) => {
  if (!setting) return
  const url = serviceEndpointToUrl(setting.serviceEndpoint, service)

  return fetch(getMappedNewURL(url))
    .then((response) => response.json())
    .then((response) => response.credentialSubject).catch(e => e)
}

export const getTags = async ({ setting, service }: { setting: any, service: any }) => {
  if (!setting) return
  const url = serviceEndpointToUrl(setting.serviceEndpoint, service)

 return  fetch(getMappedNewURL(url))
  .then((response) => response.json())
  .then((response) => response.entityTags ?? response.ddoTags)
}