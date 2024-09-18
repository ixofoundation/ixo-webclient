import { getMappedNewURL } from 'new-utils'
import { serviceEndpointToUrl } from 'utils/entities'

export const getLinkedResource = async ({ resource, service }: { resource: any; service: any }) => {
  if (!resource) return

  // Check if serviceEndpoint is already a URL
  const url = resource.serviceEndpoint.startsWith('http')
    ? resource.serviceEndpoint
    : serviceEndpointToUrl(resource.serviceEndpoint, service)

  return fetch(getMappedNewURL(url))
    .then((response) => response.json())
    .catch(() => null)
}
