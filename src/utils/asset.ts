import { LinkedClaim, Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { serviceEndpointToUrl } from './entities'

export const resolveClaims = (claims?: LinkedClaim[], service?: Service[]) => {
  if (!claims || !service) return []

  return claims.map(async (claim) => {
    const url = serviceEndpointToUrl(claim.serviceEndpoint, service)
    return fetch(url).then((response) => response.json())
  })
}
