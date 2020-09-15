import countryData from 'lib/maps/countryLatLng.json'
import { EntityType } from './types'
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
