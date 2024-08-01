import { Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { Entity } from 'generated/graphql'

export const getUrlFromContext = (url = '', contexts: any[] = []) => {
  // if url includes :// it means it already an https link most probably
  if (url.includes('://')) return url

  const pos = url.indexOf(':')
  if (pos === -1) return url

  const service = url.substring(0, pos)
  const endUrl = url.substring(pos + 1)

  const serviceEndpoint = contexts?.find((c) => {
    if (typeof c === 'string') return false
    for (const key of Object.keys(c)) {
      if (key === service) return true
    }
    return false
  })?.[service]
  if (!serviceEndpoint) return url

  return serviceEndpoint + endUrl
}

export const getServiceEndpoint = (url = '', services: Service[] = []) => {
  // if url includes :// it means it already an https link most probably
  if (url.includes('://')) return url

  const pos = url.indexOf(':')
  if (pos === -1) return url

  const service = url.substring(0, pos)
  const endUrl = url.substring(pos + 1)

  const serviceEndpoint = services?.find((s) => {
    const posHash = s.id.indexOf('#')
    const id = s.id.substring(posHash + 1)
    return id === service
  })?.serviceEndpoint
  if (!serviceEndpoint) return url

  return serviceEndpoint + endUrl
}

const fetchExternalData = async (url: string) =>
  await fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log({ error, url }))

const resolveFields = (data: Record<string, any>, fields: string[], context: any) => {
  const inputObject = { ...data }

  for (const key of fields) {
    const url = getUrlFromContext(inputObject[key], context)
    inputObject[key] = url
  }

  return inputObject
}

const getAccountsRestGQLQuery = async (address: string) => {
  const requestBody = {
    query: `
          query GetAccountTokens($address: String!) {
            getAccountTokens(address: $address)
          }
        `,
    variables: {
      address,
    },
  }

  return await fetch(import.meta.env.VITE_APP_BLOCK_SYNC_GRAPHQL as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .catch((error) => {
      // Handle any errors that occur during the fetch
      console.error('Error:', error)
    })
}

const tranformSettings = async (settings: Entity['settings'], services: Service[]) => {
  try {
    if (!settings) return

    const transformedSettings = {}

    for (const key of Object.keys(settings)) {
      const serviceEndpoint = getServiceEndpoint(settings[key]?.serviceEndpoint, services)
      const data = await fetchExternalData(serviceEndpoint)

      const setting = settings[key]?.id.split('#')[1]
      if (setting === 'profile') {
        transformedSettings[key] = data['@context']
          ? { ...settings[key], data: resolveFields(data, ['image', 'logo'], data['@context']) }
          : { ...settings[key], data }
      } else {
        transformedSettings[key] = { ...settings[key], data }
      }
    }

    return transformedSettings
  } catch (error) {
    console.log('could not transform settings ~ line 82 transformEntity.ts, ', error)
    return error
  }
}

const transformAccounts = async (accounts: any[]) => {
  const accountsWithData = []

  if (accounts?.length > 0) {
    for (const account of accounts) {
      const response = await getAccountsRestGQLQuery(account.address)
      accountsWithData.push({ ...account, data: response?.data?.getAccountTokens })
    }
  }

  return accountsWithData
}

const transformLinkedResources = async (resources: any[], service: Service[]) => {
  try {
    return await Promise.all(
      resources?.map(async (resource) => {
        const url = getServiceEndpoint(resource?.serviceEndpoint, service)
        return resource?.mediaType === 'application/json'
          ? { ...resource, data: await fetchExternalData(url) }
          : { ...resource, data: url }
      }) || [],
    )
  } catch (error) {
    console.log('could not transform linked resources ~ line 97 transformEntity.ts, ', error)
    return error
  }
}

export const transformEntity = async (entity: Entity) => {
  try {
    const services = entity?.service

    const transformedPromises = [
      tranformSettings(entity?.settings, services),
      transformLinkedResources(entity?.linkedResource, services),
      transformAccounts(entity?.accounts),
    ]
    const [settings, linkedResource, accounts] = await Promise.all(transformedPromises)

    if (settings) {
      entity = { ...entity, settings }
    }

    if (linkedResource) {
      entity = { ...entity, linkedResource }
    }

    if (accounts) {
      entity = { ...entity, accounts }
    }

    return { ...entity }
  } catch (error) {
    console.log('could not transform entity ~ line 114 transformEntity.ts, ', error)
    return error
  }
}
