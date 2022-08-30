import { Schema, SchemaBase } from './schema/types'
import { EntityType } from '../../../types'

export const getHeaderSchema = (
  filterSector: string,
  headerSchema: Schema,
): SchemaBase => {
  const headerOverride = headerSchema.overrides.find(
    (override) => filterSector === override.ddoTag,
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
      title: entityTitle.toUpperCase(),
      tooltip: `${entityTitle} Explorer`,
    },
  ]

  if (entityType === EntityType.Project || entityType === EntityType.Dao) {
    tabButtons.push(
      {
        iconClass: 'icon-impacts',
        linkClass: 'in-active',
        path: '/impact',
        title: 'IMPACT',
        tooltip: `Impacts of ${entityType}s`,
      },
      {
        iconClass: 'icon-economy',
        linkClass: 'in-active',
        path: '/economy',
        title: 'ECONOMY',
        tooltip: `The Impact Economy`,
      },
    )
  }

  return tabButtons
}
