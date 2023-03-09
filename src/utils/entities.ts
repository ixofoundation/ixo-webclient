import Axios from 'axios'
import { get } from 'lodash'
import countryData from 'data/maps/countryLatLng.json'
import { Agent, FundSource, LiquiditySource } from 'types/entities'
import { AgentRole } from 'redux/account/account.types'
import { DDOTagCategory } from 'redux/entitiesExplorer/entitiesExplorer.types'
import { PageContent } from 'redux/selectedEntity/selectedEntity.types'
import { ApiListedEntityData } from 'api/blocksync/types/entities'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { cellNodeChainMapping, chainNetwork } from 'hooks/configs'

export const getCountryCoordinates = (countryCodes: string[]): any[] => {
  const coordinates: any[] = []

  countryCodes.forEach((code) => {
    const country = countryData.find((data) => data.alpha2 === code)
    if (country) {
      coordinates.push([country.longitude, country.latitude])
    }
  })

  return coordinates
}

export const getDefaultSelectedViewCategory = (entityConfig: any): any => {
  try {
    const defaultViewCategory = entityConfig.filterSchema.view?.selectedTags[0]
    let filterView
    switch (defaultViewCategory) {
      case 'Global':
        filterView = {
          userEntities: false,
          featuredEntities: false,
          popularEntities: false,
        }
        break
      case 'My Portfolio':
        filterView = {
          userEntities: true,
          featuredEntities: false,
          popularEntities: false,
        }
        break
      case 'Featured':
        filterView = {
          userEntities: false,
          featuredEntities: true,
          popularEntities: false,
        }
        break
      case 'Popular':
        filterView = {
          userEntities: false,
          featuredEntities: false,
          popularEntities: true,
        }
        break
      default:
        filterView = {}
        break
    }
    return filterView
  } catch (e) {
    return {}
  }
}

export const getInitialSelectedCategories = (entityConfig: any): DDOTagCategory[] => {
  return entityConfig?.filterSchema.ddoTags.map((ddoCategory: any) => ({
    name: ddoCategory.name,
    tags: ddoCategory.selectedTags && ddoCategory.selectedTags.length ? [...ddoCategory.selectedTags] : [],
  }))
}

export const getInitialSelectedSectors = (entityConfig: any): string => {
  try {
    return entityConfig.filterSchema.sector.selectedTag
  } catch (e) {
    console.log('getInitialSelectedSectors', e)
    return ''
  }
}

export const isUserInRolesOfEntity = (
  userDid: string,
  creatorDid: string,
  agents: Agent[],
  roles: string[],
): boolean => {
  let found = false
  if (userDid) {
    if (creatorDid === userDid) {
      if (roles.some((role) => role === AgentRole.Owner)) {
        return true
      }
    }
    agents.forEach((agent) => {
      if (agent.did === userDid) {
        if (roles.some((role) => role === agent.role)) {
          found = true
        }
      }
    })
  }

  return found
}

export const getTags = (entityConfig: any, ddoTagName: string): any[] => {
  return entityConfig.filterSchema.ddoTags.find((ddoTag: any) => ddoTag.name === ddoTagName)?.tags ?? []
}

export const replaceLegacyPDSInEntity = (data: ApiListedEntityData): ApiListedEntityData => ({
  ...data,
  image: data.image?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  logo: data.logo?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  creator: {
    ...data.creator,
    logo: data.creator.logo?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  },
  owner: {
    ...data.owner,
    logo: data.owner.logo?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  },
})

export const replaceLegacyPDSInPageContent = (content: PageContent): PageContent => {
  const { header, body, images, profiles, social, embedded } = content

  const newHeader = {
    ...header,
    image: header.image?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
    logo: header.logo?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  }

  const newBody = body.map((item) => ({
    ...item,
    image: item.image?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  }))

  const newImages = images.map((item) => ({
    ...item,
    image: item.image?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  }))

  const newProfiles = profiles.map((item) => ({
    ...item,
    image: item.image?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  }))

  return {
    header: newHeader,
    body: newBody,
    images: newImages,
    profiles: newProfiles,
    social,
    embedded,
  }
}

export const checkIsLaunchpadFromApiListedEntityData = (ddoTags: any[]): boolean => {
  return (
    (ddoTags
      .find((ddoTag) => ddoTag.category === 'Project Type' || ddoTag.name === 'Project Type')
      ?.tags.some((tag: any) => tag === 'Candidate') ||
      ddoTags
        .find((ddoTag) => ddoTag.category === 'DAO Type' || ddoTag.name === 'DAO Type')
        ?.tags.some((tag: any) => tag === 'Candidate') ||
      ddoTags
        .find((ddoTag) => ddoTag.category === 'Oracle Type' || ddoTag.name === 'Oracle Type')
        ?.tags.some((tag: any) => tag === 'Candidate')) &&
    ddoTags
      .find((ddoTag) => ddoTag.category === 'Stage' || ddoTag.name === 'Stage')
      ?.tags.some((tag: any) => tag === 'Selection')
  )
}

export const getBondDidFromApiListedEntityData = async (data: ApiListedEntityData): Promise<string> => {
  let alphaBonds: any[] = []

  if (data.funding) {
    // TODO: should be removed
    alphaBonds = data.funding.items.filter((elem) => elem['@type'] === FundSource.Alphabond)
  } else if (data.liquidity) {
    alphaBonds = data.liquidity.items.filter((elem) => elem['@type'] === LiquiditySource.Alphabond)
  }

  return Promise.all(
    alphaBonds.map((alphaBond) => {
      return Axios.get(`${process.env.REACT_APP_GAIA_URL}/bonds/${alphaBond.id}`, {
        transformResponse: [
          (response: string): any => {
            const parsedResponse = JSON.parse(response)

            return get(parsedResponse, 'result.value', parsedResponse)
          },
        ],
      })
    }),
  ).then((bondDetails) => {
    const bondToShow = bondDetails
      .map((bondDetail) => bondDetail.data)
      .find((bond) => bond.function_type !== 'swapper_function')

    return bondToShow?.bond_did ?? undefined
  })
}

export const extractLinkedResource = async (linkedResource: LinkedResource[]): Promise<any[]> => {
  return Promise.all(
    linkedResource.map(async (item: LinkedResource) => {
      const { id, serviceEndpoint } = item
      switch (id) {
        case '{id}#profile':
          return fetch(serviceEndpoint)
            .then((response) => response.json())
            .then((profile) => ({ ...profile, id: 'profile' }))
        case '{id}#creator': {
          const [, ...paths] = serviceEndpoint.split('/')
          return fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
            .then((response) => response.json())
            .then((response) => response.credentialSubject)
            .then((credentialSubject) => ({ ...credentialSubject, id: 'creator' }))
        }
        case '{id}#administrator': {
          const [, ...paths] = serviceEndpoint.split('/')
          return fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
            .then((response) => response.json())
            .then((response) => response.credentialSubject)
            .then((credentialSubject) => ({ ...credentialSubject, id: 'administrator' }))
        }
        case '{id}#page': {
          const [, ...paths] = serviceEndpoint.split('/')
          fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
            .then((response) => response.json())
            .then((page) => ({ ...page, id: 'page' }))
          break
        }
        case '{id}#tags': {
          const [, ...paths] = serviceEndpoint.split('/')
          fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
            .then((response) => response.json())
            .then((ddoTags) => ({ ...ddoTags, id: 'tags' }))
          break
        }
        default:
          break
      }
    }),
  )
}
