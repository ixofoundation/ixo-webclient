import { getMappedNewURL } from '@ixo-webclient/utils'
import { serviceEndpointToUrl } from 'utils/entities'

export const getTags = async ({ setting, service }: { setting: any; service: any }) => {
  if (!setting) return
  const url = serviceEndpointToUrl(setting.serviceEndpoint, service)

  return fetch(getMappedNewURL(url))
    .then((response) => response.json())
    .then((response) => response.entityTags ?? response.ddoTags)
    .catch(() => {
      return undefined
    })
}
