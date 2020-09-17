import countryData from 'lib/maps/countryLatLng.json'
import { Agent, EntityType } from './types'
import { AgentRole } from 'modules/Account/types'
import { DDOTagCategory } from './EntitiesExplorer/types'
import { entityTypeMap } from './strategy-map'

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

export const getInitialSelectedCategories = (
  entityType: EntityType = EntityType.Project,
): DDOTagCategory[] => {
  return entityTypeMap[entityType].filterSchema.ddoTags.map((ddoCategory) => ({
    name: ddoCategory.name,
    tags:
      ddoCategory.selectedTags && ddoCategory.selectedTags.length
        ? [...ddoCategory.selectedTags]
        : [],
  }))
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
