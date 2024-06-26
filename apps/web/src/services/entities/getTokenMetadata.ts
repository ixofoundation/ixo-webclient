import { getMappedNewURL } from '@ixo-webclient/utils'
import { serviceEndpointToUrl } from 'utils/entities'

export const getTokenMetadata = async ({ resource, service }: { resource: any; service: any }) => {
  if (!resource) return
  const url = serviceEndpointToUrl(resource.serviceEndpoint, service)

  return fetch(getMappedNewURL(url))
    .then((response) => response.json())
    .catch((e) => {
      return undefined
    })
}
