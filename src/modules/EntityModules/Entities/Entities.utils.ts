import moment from 'moment'
import countryData from 'lib/maps/countryLatLng.json'
import { toTitleCase } from 'common/utils/formatters'
import { Category, EntityType, Entity } from './types'
import { entityTypeMap } from './strategy-map'

export const mapApiEntityToEntity = (apiEntity: any): Entity => {
  return {
    did: apiEntity.projectDid,
    entityType: (apiEntity.data.entityType
      ? toTitleCase(apiEntity.data.entityType)
      : EntityType.Project) as EntityType,
    userDid: apiEntity.data.createdBy,
    status: apiEntity.status,
    title: apiEntity.data.title,
    shortDescription: apiEntity.data.shortDescription,
    longDescription: apiEntity.data.longDescription,
    dateCreated: moment(apiEntity.data.createdOn),
    ownerName: apiEntity.data.ownerName,
    country: apiEntity.data.projectLocation,
    impactAction: apiEntity.data.impactAction,
    imageUrl: `${apiEntity.data.serviceEndpoint}public/${apiEntity.data.imageLink}`,
    logoUrl: apiEntity.data.logoLink,
    serviceProvidersCount: apiEntity.data.agentStats.serviceProviders,
    evaluatorsCount: apiEntity.data.agentStats.evaluators,
    requiredClaimsCount: apiEntity.data.requiredClaims,
    pendingClaimsCount: [apiEntity.data.claims].filter(
      claim => claim.status === '0',
    ).length, // due to pendingClaims not existing in the claimStats we have to look in the claims itself!
    successfulClaimsCount: apiEntity.data.claimStats.currentSuccessful,
    rejectedClaimsCount: apiEntity.data.claimStats.currentRejected,
    agentDids: apiEntity.data.agents.map(agent => agent.did),
    sdgs: apiEntity.data.sdgs,
    categories: apiEntity.data.ddoTags
      ? apiEntity.data.ddoTags.map(ddoTag => ({
          name: ddoTag.category,
          tags: ddoTag.tags,
        }))
      : [],
    founderLogoUrl: apiEntity.data.founder
      ? apiEntity.data.founder.logoLink
      : '',
    pdsUrl: apiEntity.data.serviceEndpoint,
    data: apiEntity.data, // TEMP until project module not getting data from projects
  }
}

export const getCountryCoordinates = (countryCodes: string[]): any[] => {
  const coordinates = []

  countryCodes.forEach(code => {
    const country = countryData.find(data => data.alpha2 === code)
    if (country) {
      coordinates.push([country.longitude, country.latitude])
    }
  })

  return coordinates
}

export const getInitialSelectedCategories = (
  entityType: EntityType = EntityType.Project,
): Category[] => {
  return entityTypeMap[entityType].filterSchema.ddoTags.map(ddoCategory => ({
    name: ddoCategory.name,
    tags:
      ddoCategory.selectedTags && ddoCategory.selectedTags.length
        ? [...ddoCategory.selectedTags]
        : [],
  }))
}
