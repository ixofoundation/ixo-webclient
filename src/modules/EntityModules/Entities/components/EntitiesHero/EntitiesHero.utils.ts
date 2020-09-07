import { Schema, SchemaBase } from './schema/types'
import { EntityType } from '../../types'

export const getHeaderSchema = (
  filterSector: string,
  headerSchema: Schema,
): SchemaBase => {
  const headerOverride = headerSchema.overrides.find(
    override => filterSector === override.ddoTag,
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
  
  if (entityType === EntityType.Project || entityType === EntityType.Cell) {
    tabButtons.push(
      {
        iconClass: 'icon-impacts',
        linkClass: null,
        path: '/impact',
        title: 'IMPACT',
      },
      {
        iconClass: 'icon-economy',
        linkClass: 'in-active',
        path: '/economy',
        title: 'ECONOMY',
      },
    )
  }

  return tabButtons
}

/* const getHeaderTabButtons = (): any => {
  const tabButtons = [
    {
      iconClass: `icon-${entityType.toLowerCase()}`,
      linkClass: entityType.toLowerCase(),
      path: '/',
      title: entityStrategyMap.plural.toUpperCase(),
    },
  ]

  if (entityType === EntityType.Project || entityType === EntityType.Cell) {
    tabButtons.push(
      {
        iconClass: 'icon-impacts',
        linkClass: null,
        path: '/global-statistics',
        title: 'IMPACT',
      },
      {
        iconClass: 'icon-economy',
        linkClass: 'in-active',
        path: '/economy',
        title: 'ECONOMY',
      },
    )
  }

  return tabButtons
} */
