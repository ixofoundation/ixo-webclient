import countryData from '../../lib/maps/countryLatLng.json'
import { Category, EntityType } from './types'
import { strategyMap } from './strategy-map'

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
  return strategyMap[entityType].filterSchema.ddoTags.map(ddoCategory => ({
    name: ddoCategory.name,
    tags:
      ddoCategory.selectedTags && ddoCategory.selectedTags.length
        ? [...ddoCategory.selectedTags]
        : [],
  }))
}
