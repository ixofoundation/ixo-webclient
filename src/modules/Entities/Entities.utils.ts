import { isoCountriesLatLng } from '../../lib/commonData'
import { Category, EntityType } from './types'
import projectsFilterSchema from './components/EntitiesFilter/schema/ProjectsFilter.schema.json'
import cellsFilterSchema from './components/EntitiesFilter/schema/CellsFilter.schema.json'
import { Schema } from './components/EntitiesFilter/types'

export const getCountryCoordinates = (countries: any[]): Array<unknown> => {
  const coords = []
  for (const key in isoCountriesLatLng) {
    if (Object.hasOwnProperty.call(isoCountriesLatLng, key)) {
      for (const i in countries) {
        if (countries[i] === key) {
          coords.push([
            isoCountriesLatLng[key].lng,
            isoCountriesLatLng[key].lat,
          ])
        }
      }
    }
  }
  return coords
}

export const getSchema = (entityType: EntityType): Schema => {
  switch (entityType) {
    case EntityType.Cells:
      return cellsFilterSchema
  }
  // Others here

  return projectsFilterSchema
}

export const getInitialSelectedCategories = (
  entityType: EntityType = EntityType.Projects,
): Category[] => {
  return getSchema(entityType).ddoTags.map(ddoCategory => ({
    name: ddoCategory.name,
    tags:
      ddoCategory.selectedTags && ddoCategory.selectedTags.length
        ? [...ddoCategory.selectedTags]
        : [],
  }))
}
