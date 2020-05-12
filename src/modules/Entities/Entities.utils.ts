import countryData from '../../lib/maps/countryLatLng.json'
import projectsFilterSchema from './components/EntitiesFilter/schema/ProjectsFilter.schema.json'
import cellsFilterSchema from './components/EntitiesFilter/schema/CellsFilter.schema.json'
import { Category, EntityType } from './types'
import { Schema } from './components/EntitiesFilter/types'

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

export const getSchema = (entityType: EntityType): Schema => {
  switch (entityType) {
    case EntityType.Cell:
      return cellsFilterSchema
  }
  // Others here

  return projectsFilterSchema
}

export const getInitialSelectedCategories = (
  entityType: EntityType = EntityType.Project,
): Category[] => {
  return getSchema(entityType).ddoTags.map(ddoCategory => ({
    name: ddoCategory.name,
    tags:
      ddoCategory.selectedTags && ddoCategory.selectedTags.length
        ? [...ddoCategory.selectedTags]
        : [],
  }))
}
