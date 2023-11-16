import { LinkedClaim, Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { serviceEndpointToUrl } from './entities'
import axios from 'axios'
import { useGetEntityById } from 'graphql/entities'
import { useEffect, useState } from 'react'

export const resolveClaims = async (claims?: LinkedClaim[], service?: Service[]): Promise<any[]> => {
  if (!claims || !service) return []

  const resolvedClaims = await Promise.all(
    claims.map(async (claim) => {
      const url = serviceEndpointToUrl(claim.serviceEndpoint, service)
      const response = await axios.get(url)
      return response.data
    }),
  )

  return resolvedClaims
}

export const resolveVerifiableCredential = async (endpoint: string, service: Service[]) => {
  if (!endpoint || !service) return undefined

  const url = serviceEndpointToUrl(endpoint, service)

  return await axios.get(url).then((response) => response.data)
}

export const useGetCreator = ({ endpoint, service }: { endpoint: string; service: Service[] }) => {
  const [verifiableCredential, setVerifiableCredential] = useState<any>(null)

  useEffect(() => {
    resolveVerifiableCredential(endpoint, service).then((response) => setVerifiableCredential(response))
  }, [setVerifiableCredential, endpoint, service])

  const { data, error } = useGetEntityById(verifiableCredential?.issuer?.id)

  return { data, error }
}

export const useGetCreatorProfileWithVerifiableCredential = ({
  endpoint,
  service,
}: {
  endpoint: string
  service: Service[]
}) => {
  const [profile, setProfile] = useState<any>()
  const [error, setError] = useState<string | null>(null)
  const [profileUrl, setProfileUrl] = useState<string | undefined>()

  const { data } = useGetCreator({ endpoint, service })

  useEffect(() => {
    if (!profileUrl && data?.settings?.Profile?.serviceEndpoint && data?.service) {
      const profileUrlResponse = serviceEndpointToUrl(data.settings.Profile.serviceEndpoint, data.service)
      setProfileUrl(profileUrlResponse)
    }
  }, [profileUrl, setProfileUrl, data?.settings?.Profile?.serviceEndpoint, data?.service])

  useEffect(() => {
    if (profileUrl) {
      axios
        .get(profileUrl)
        .then((response) => setProfile(response.data))
        .catch((error) => setError(JSON.stringify(error)))
    }
  }, [profileUrl, setProfile, setError])

  return { profile, error }
}
