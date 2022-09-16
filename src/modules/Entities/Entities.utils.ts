import countryData from 'lib/maps/countryLatLng.json'
import { Agent } from './types'
import { AgentRole } from 'modules/Account/types'
import { DDOTagCategory } from './EntitiesExplorer/types'
import { PageContent } from './SelectedEntity/types'
import { ApiListedEntityData } from 'common/api/blocksync-api/types/entities'

export const getCountryCoordinates = (countryCodes: string[]): any[] => {
  const coordinates = []

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

export const getInitialSelectedCategories = (
  entityConfig: any,
): DDOTagCategory[] => {
  return entityConfig.filterSchema.ddoTags.map((ddoCategory) => ({
    name: ddoCategory.name,
    tags:
      ddoCategory.selectedTags && ddoCategory.selectedTags.length
        ? [...ddoCategory.selectedTags]
        : [],
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
  return (
    entityConfig.filterSchema.ddoTags.find(
      (ddoTag) => ddoTag.name === ddoTagName,
    )?.tags ?? []
  )
}

export const replaceLegacyPDSInEntity = (
  data: ApiListedEntityData,
): ApiListedEntityData => ({
  ...data,
  image: data.image?.replace(
    'pds_pandora.ixo.world',
    'cellnode-pandora.ixo.earth',
  ),
  logo: data.logo?.replace(
    'pds_pandora.ixo.world',
    'cellnode-pandora.ixo.earth',
  ),
  creator: {
    ...data.creator,
    logo: data.creator.logo?.replace(
      'pds_pandora.ixo.world',
      'cellnode-pandora.ixo.earth',
    ),
  },
  owner: {
    ...data.owner,
    logo: data.owner.logo?.replace(
      'pds_pandora.ixo.world',
      'cellnode-pandora.ixo.earth',
    ),
  },
})

export const replaceLegacyPDSInPageContent = (
  content: PageContent,
): PageContent => {
  const { header, body, images, profiles, social, embedded } = content

  const newHeader = {
    ...header,
    image: header.image?.replace(
      'pds_pandora.ixo.world',
      'cellnode-pandora.ixo.earth',
    ),
    logo: header.logo?.replace(
      'pds_pandora.ixo.world',
      'cellnode-pandora.ixo.earth',
    ),
  }

  const newBody = body.map((item) => ({
    ...item,
    image: item.image?.replace(
      'pds_pandora.ixo.world',
      'cellnode-pandora.ixo.earth',
    ),
  }))

  const newImages = images.map((item) => ({
    ...item,
    image: item.image?.replace(
      'pds_pandora.ixo.world',
      'cellnode-pandora.ixo.earth',
    ),
  }))

  const newProfiles = profiles.map((item) => ({
    ...item,
    image: item.image?.replace(
      'pds_pandora.ixo.world',
      'cellnode-pandora.ixo.earth',
    ),
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
