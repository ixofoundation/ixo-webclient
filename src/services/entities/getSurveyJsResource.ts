import { getMappedNewURL } from 'new-utils'
import { serviceEndpointToUrl } from 'utils/entities'

export const getSurveyJsResource = async ({ resource, service }: { resource: any; service: any }) => {
  if (!resource) return
  const url = serviceEndpointToUrl(resource.serviceEndpoint.replace(/[\r\n]/g, ''), service)

  const newUrl = getMappedNewURL(url)

  return fetch(newUrl)
    .then((response) => response.json())
    .then((response) => response.question)
}
