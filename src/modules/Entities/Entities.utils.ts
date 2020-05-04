import { isoCountriesLatLng } from '../../lib/commonData'
import { Category, EntityType } from './types'
import projectsFilterSchema from './components/EntitiesFilter/schema/ProjectsFilter.schema.json'
import cellsFilterSchema from './components/EntitiesFilter/schema/CellsFilter.schema.json'

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

export const getInitialSelectedCategories = (
  entityType: EntityType = EntityType.Projects,
): Category[] => {
  let schema

  switch (entityType) {
    case EntityType.Cells:
      schema = cellsFilterSchema
      break
    default:
      schema = projectsFilterSchema
  }

  return schema.ddoTags.map(ddoCategory => ({
    name: ddoCategory.name,
    tags:
      ddoCategory.selectedTags && ddoCategory.selectedTags.length
        ? [...ddoCategory.selectedTags]
        : [],
  }))
}
