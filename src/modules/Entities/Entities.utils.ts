import moment from 'moment'
import countryData from 'lib/maps/countryLatLng.json'
import { toTitleCase } from 'common/utils/formatters'
import { EntityType } from './types'
import { DDOTagCategory, ExplorerEntity } from './EntitiesExplorer/types'
import { entityTypeMap } from './strategy-map'

// TODO - move to explorer module
export const mapApiEntityToEntity = (apiEntity: any): ExplorerEntity => {
  return {
    did: apiEntity.projectDid,
    type: (apiEntity.data.entityType
      ? toTitleCase(apiEntity.data.entityType)
      : EntityType.Project) as EntityType,
    creatorDid: apiEntity.data.createdBy,
    status: apiEntity.status,
    name: apiEntity.data.title,
    description: apiEntity.data.shortDescription,
    dateCreated: moment(apiEntity.data.createdOn),
    ownerName: apiEntity.data.ownerName,
    location: apiEntity.data.projectLocation,
    goal: apiEntity.data.impactAction,
    image: `${apiEntity.data.serviceEndpoint}public/${apiEntity.data.imageLink}`,
    logo: apiEntity.data.logoLink,
    serviceProvidersCount: apiEntity.data.agentStats.serviceProviders,
    evaluatorsCount: apiEntity.data.agentStats.evaluators,
    requiredClaimsCount: apiEntity.data.requiredClaims,
    pendingClaimsCount: [apiEntity.data.claims].filter(
      (claim) => claim.status === '0',
    ).length, // due to pendingClaims not existing in the claimStats we have to look in the claims itself!
    successfulClaimsCount: apiEntity.data.claimStats.currentSuccessful,
    rejectedClaimsCount: apiEntity.data.claimStats.currentRejected,
    agentDids: apiEntity.data.agents.map((agent) => agent.did),
    sdgs: apiEntity.data.sdgs,
    ddoTags: apiEntity.data.ddoTags
      ? apiEntity.data.ddoTags.map((ddoTag) => ({
          name: ddoTag.category,
          tags: ddoTag.tags,
        }))
      : [],
  }
}

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
