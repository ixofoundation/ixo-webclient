import { Schema, SchemaBase } from './schema/types'
import { Category, EntityType } from '../../types'

export const getHeaderSchema = (
  filterCategories: Category[],
  headerSchema: Schema,
): SchemaBase => {
  // is there a selected category and tag that matches an override
  const headerOverride = headerSchema.overrides.find(override =>
    filterCategories.some(
      category =>
        category.name === override.ddoCategory &&
        category.tags.length === 1 &&
        category.tags.includes(override.ddoTag),
    ),
  )

  return headerOverride || headerSchema
}

export const getHeaderTabButtons = (
  entityType: EntityType,
  entityTitle: string,
): any => {
  const tabButtons = [
    {
      iconClass: `icon-${entityType.toLowerCase()}`,
      linkClass: entityType.toLowerCase(),
      path: '/',
      title: entityTitle,
    },
  ]

  if (entityType === EntityType.Project) {
    tabButtons.push({
      iconClass: 'icon-impacts',
      linkClass: null,
      path: '/global-statistics',
      title: 'IMPACT',
    })
  }

  return tabButtons
}
