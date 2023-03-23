import { Moment } from 'moment'
import { createSelector } from '@reduxjs/toolkit'
import { ExplorerEntity, EntitiesExplorerState, Filter } from './entitiesExplorer.types'
import { EntityType, EntityConfig } from 'types/entities'
import * as accountSelectors from 'redux/account/account.selectors'
import { RootState } from 'redux/store'
import { Schema as FilterSchema } from 'components/Entities/EntitiesExplorer/Components/EntitiesFilter/schema/types'
import { theme } from 'components/App/App.styles'
import { TEntityDDOTagModel } from 'types/protocol'
import { TEntityModel } from 'api/blocksync/types/entities'
import { utils } from '@ixo/impactxclient-sdk'

const formatDate = (date: Moment): string => date.format("D MMM \\'YY")

export const selectEntitiesState = (state: RootState): EntitiesExplorerState => state.entities

export const selectAllEntitiesByType = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): ExplorerEntity[] => {
    return entitiesState.entities
      ? entitiesState.entities.filter((entity) => entity.type === entitiesState.selectedEntitiesType)
      : null!
  },
)

export const selectAllEntitiesByType2 = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): TEntityModel[] => {
    return Object.values(entitiesState.entities2 ?? {}).filter(
      (entity) => entity.type.toLowerCase() === entitiesState.selectedEntitiesType.toLowerCase(),
    )
  },
)

export const selectAllTemplateEntities = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): ExplorerEntity[] => {
    return entitiesState.entities
      ? entitiesState.entities
          .filter((entity) => entity.type === EntityType.Template)
          .sort((a, b) => {
            if (b?.dateCreated && a?.dateCreated) {
              return b.dateCreated.unix() - a.dateCreated.unix()
            }
            return 0
          })
      : null!
  },
)

export const selectTokenClassTemplateEntities = createSelector(
  selectAllTemplateEntities,
  (entities: ExplorerEntity[]): ExplorerEntity[] => {
    return entities
      ? entities.filter((entity) =>
          entity.ddoTags
            ?.filter((ddoTag: any) => ddoTag.name === 'Entity')
            .some((ddoTag: any) => ddoTag.tags.some((tag: any) => tag === 'Token Class')),
        )
      : []
  },
)

export const selectEntitiesFilter = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): Filter => {
    return entitiesState.filter
  },
)

export const selectSelectedEntitiesType = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): string => {
    return entitiesState.selectedEntitiesType
  },
)

export const selectedFilteredEntities = createSelector(
  selectAllEntitiesByType,
  selectEntitiesFilter,
  accountSelectors.selectAccountDid,
  (entities: ExplorerEntity[], filter: Filter, userDid: string): ExplorerEntity[] => {
    // all entities
    let entitiesToFilter = entities && entities.length ? entities : []

    // entitiesToFilter = entitiesToFilter.filter((entity) => entity.status === 'STARTED' || entity.creatorDid === userDid)
    entitiesToFilter = entitiesToFilter.filter((entity) => entity.status === 0 || entity.creatorDid === userDid)

    // filter by current user's entities
    if (filter.userEntities) {
      entitiesToFilter = entitiesToFilter.filter(
        (entity) => entity.creatorDid === userDid || entity.agentDids?.some((agentDid) => agentDid === userDid),
      )
    }

    // TODO - featured and popular

    // filter by date created and be sure to remove any times from the dates
    if (filter.dateFrom && filter.dateTo) {
      entitiesToFilter = entitiesToFilter.filter(
        (entity) =>
          !entity.dateCreated ||
          (entity.dateCreated.startOf('day') >= filter.dateFrom && entity.dateCreated.startOf('day') <= filter.dateTo),
      )
    }

    // filter by categories
    if (filter.ddoTags?.length > 0) {
      filter.ddoTags.forEach((category) => {
        if (category.tags.length > 0) {
          category.tags.forEach((tag) => {
            entitiesToFilter = entitiesToFilter.filter((entity) =>
              entity.ddoTags?.some(
                (entityCategory) => entityCategory.category === category.category && entityCategory.tags.includes(tag),
              ),
            )
          })
        }
      })
    }

    // filter by query
    if (filter.query) {
      const lowerCaseQuery = filter.query.toLowerCase()
      entitiesToFilter = entitiesToFilter.filter((entity) => {
        let filtered = false
        if (entity.name) {
          filtered = filtered || entity.name.toLowerCase().includes(lowerCaseQuery)
        }
        if (entity.description) {
          filtered = filtered || entity.description.toLowerCase().includes(lowerCaseQuery)
        }
        if (entity.goal) {
          filtered = filtered || entity.goal.toLowerCase().includes(lowerCaseQuery)
        }

        return filtered
      })
    }

    // filter by sector
    if (filter.sector) {
      entitiesToFilter = entitiesToFilter.filter((entity) =>
        entity.ddoTags?.some(
          (entityCategory) => entityCategory.category === 'Sector' && entityCategory.tags.includes(filter.sector),
        ),
      )
    }

    // sort the result
    entitiesToFilter = entitiesToFilter.sort((a, b) => {
      if (b.dateCreated && a.dateCreated) {
        return b.dateCreated!.unix() - a.dateCreated!.unix()
      }
      return 0
    })

    return entitiesToFilter
  },
)

export const selectedFilteredEntities2 = createSelector(
  selectAllEntitiesByType2,
  selectEntitiesFilter,
  accountSelectors.selectAccountDid,
  (entities: TEntityModel[], filter: Filter, userDid: string): TEntityModel[] => {
    // all entities
    let filteredEntities = entities

    /**
     * @description filter by entityStatus
     */
    filteredEntities = filteredEntities.filter((entity) => entity.status === 0 || entity.controller.includes(userDid))

    /**
     * @description filter by user entities or entity Status 0
     */
    if (filter.userEntities) {
      filteredEntities = filteredEntities.filter((entity) => entity.controller.includes(userDid))
    }

    /**
     * @description filter by featured entities
     * TODO:
     */

    /**
     * @description filter by popular entities
     * TODO:
     */

    /**
     * @description filter by date rage
     */
    if (filter.dateFrom && filter.dateTo) {
      filteredEntities = filteredEntities.filter(
        (entity) =>
          !entity.metadata?.created ||
          (utils.proto.fromTimestamp(entity.metadata.created).getTime() >= filter.dateFrom.valueOf() &&
            utils.proto.fromTimestamp(entity.metadata.created).getTime() <= filter.dateTo.valueOf()),
      )
    }

    /**
     * @description filter by tags
     */
    if (filter.ddoTags?.length > 0) {
      filter.ddoTags.forEach((category) => {
        if (category.tags.length > 0) {
          category.tags.forEach((tag) => {
            filteredEntities = filteredEntities.filter((entity) =>
              entity.tags?.some(
                (entityCategory) => entityCategory.category === category.category && entityCategory.tags.includes(tag),
              ),
            )
          })
        }
      })
    }

    /**
     * @description filter by query keyword
     */
    if (filter.query) {
      const lowerCaseQuery = filter.query.toLowerCase()
      filteredEntities = filteredEntities.filter((entity) => {
        return (
          entity.profile?.name.toLowerCase().includes(lowerCaseQuery) ||
          entity.profile?.description.toLowerCase().includes(lowerCaseQuery)
        )
      })
    }

    /**
     * @description filter by sector
     */
    if (filter.sector) {
      filteredEntities = filteredEntities.filter((entity) =>
        entity.tags?.some(
          (entityCategory) => entityCategory.category === 'Sector' && entityCategory.tags.includes(filter.sector),
        ),
      )
    }

    /**
     * @description sort by createdAt
     */
    filteredEntities = filteredEntities.sort((a, b) => {
      if (b.metadata?.created && a.metadata?.created) {
        return (
          new Date(b.metadata?.created as unknown as string).getTime() -
          new Date(a.metadata?.created as unknown as string).getTime()
        )
      }
      return 0
    })

    return filteredEntities
  },
)

export const selectAllEntitiesCount = createSelector(selectAllEntitiesByType, (entities: ExplorerEntity[]): number => {
  return !entities ? 0 : entities.length
})
export const selectAllEntitiesCount2 = createSelector(selectAllEntitiesByType2, (entities: TEntityModel[]): number => {
  return !entities ? 0 : entities.length
})

export const selectFilteredEntitiesCount = createSelector(
  selectedFilteredEntities,
  (entities: ExplorerEntity[]): number => {
    return !entities ? 0 : entities.length
  },
)

export const selectFilteredEntitiesCount2 = createSelector(
  selectedFilteredEntities2,
  (entities: TEntityModel[]): number => {
    return !entities ? 0 : entities.length
  },
)

export const selectIsLoadingEntities = createSelector(
  selectAllEntitiesByType,
  (entities: ExplorerEntity[]): boolean => {
    return entities === null
  },
)
export const selectIsLoadingEntities2 = createSelector(
  selectAllEntitiesByType2,
  (entities: TEntityModel[]): boolean => {
    return entities === null
  },
)

export const selectFilterDateFrom = createSelector(selectEntitiesFilter, (filter: Filter): Moment => {
  return filter.dateFrom
})

export const selectFilterDateTo = createSelector(selectEntitiesFilter, (filter: Filter): Moment => {
  return filter.dateTo
})

export const selectFilterDateFromFormatted = createSelector(selectFilterDateFrom, (dateFrom: Moment): string => {
  return dateFrom ? formatDate(dateFrom) : null!
})

export const selectFilterDateToFormatted = createSelector(selectFilterDateTo, (dateTo: Moment): string => {
  return dateTo ? formatDate(dateTo) : null!
})

export const selectFilterDateSummary = createSelector(
  selectFilterDateFromFormatted,
  selectFilterDateToFormatted,
  (dateFromFormatted: string, dateToFormatted: string): string => {
    if (dateFromFormatted || dateToFormatted) {
      return `${dateFromFormatted ? dateFromFormatted : 'Select'} - ${dateToFormatted ? dateToFormatted : 'Select'}`
    }
    return 'Dates'
  },
)

export const selectFilterCategories = createSelector(selectEntitiesFilter, (filter: Filter): TEntityDDOTagModel[] => {
  return filter.ddoTags
})

export const selectFilterSector = createSelector(selectEntitiesFilter, (filter: Filter): string => {
  return filter.sector
})

export const selectFilterItemOffset = createSelector(selectEntitiesFilter, (filter: Filter): number => {
  return filter.itemOffset
})

export const selectFilterCategoriesSummary = createSelector(
  selectFilterCategories,
  (categories: TEntityDDOTagModel[]): string => {
    const totalFilters = categories?.reduce((total, category) => {
      return total + category.tags.length
    }, 0)

    return totalFilters > 0 ? `Filters - ${totalFilters}` : 'Filters'
  },
)

export const selectFilterUserEntities = createSelector(selectEntitiesFilter, (filter: Filter): boolean => {
  return filter.userEntities
})

export const selectFilterFeaturedEntities = createSelector(selectEntitiesFilter, (filter: Filter): boolean => {
  return filter.featuredEntities
})

export const selectFilterPopularEntities = createSelector(selectEntitiesFilter, (filter: Filter): boolean => {
  return filter.popularEntities
})

export const selectFilterQuery = createSelector(selectEntitiesFilter, (filter: Filter): string => {
  return filter.query
})

export const selectFilterSchema = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): FilterSchema => {
    return entitiesState.entityConfig[entitiesState.selectedEntitiesType]?.filterSchema
  },
)

export const selectFilterSchemaSdgDdoTags = createSelector(selectFilterSchema, (filterSchema: FilterSchema) => {
  return filterSchema?.ddoTags.find(({ name }) => name === 'SDG')?.tags ?? []
})

export const selectFilterCategoryTypeName = createSelector(selectFilterSchema, (filterSchema: FilterSchema): string => {
  try {
    return filterSchema.ddoTags[0].name
  } catch (e) {
    return undefined!
  }
})

export const selectEntityConfig = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): EntityConfig => {
    return entitiesState.entityConfig
  },
)

export const selectEntityUIConfig = createSelector(selectEntityConfig, (entityConfig: EntityConfig): any => {
  return entityConfig?.UI
})

export const selectEntityThemeConfig = createSelector(selectEntityConfig, (entityConfig: EntityConfig): any => {
  return entityConfig?.theme
})

export const selectEntityLogoConfig = createSelector(selectEntityUIConfig, (entityUIConfig: any): any => {
  return entityUIConfig?.logo ?? 'ixo-logo'
})

export const selectEntityHeadUIConfig = createSelector(selectEntityUIConfig, (entityUIConfig: any): any => {
  return entityUIConfig?.head
})

export const selectEntityHeadTitleUIConfig = createSelector(
  selectEntityHeadUIConfig,
  (entityHeadUIConfig: any): any => {
    return entityHeadUIConfig?.title ?? 'IXO'
  },
)

export const selectEntityHeaderUIConfig = createSelector(selectEntityUIConfig, (entityUIConfig: any): any => {
  return entityUIConfig?.header
})

export const selectEntityHeaderButtonColorUIConfig = createSelector(
  selectEntityUIConfig,
  (entityUIConfig: any): any => {
    return entityUIConfig?.header?.buttonColor ?? theme.ixoBlue
  },
)

export const selectEntityFooterUIConfig = createSelector(selectEntityUIConfig, (entityUIConfig: any): any => {
  return entityUIConfig?.footer
})

export const selectEntityPrimaryColor = createSelector(selectEntityThemeConfig, (themeConfig: any): string => {
  return themeConfig?.primaryColor ?? theme.ixoBlue
})

export const selectEntityThemeHighlightLight = createSelector(selectEntityThemeConfig, (themeConfig: any): string => {
  return themeConfig?.highlight?.light ?? theme.highlight.light
})

export const selectEntitiesCountries = createSelector(
  selectAllEntitiesByType,
  (entities: ExplorerEntity[]): string[] => {
    return entities?.map((entity) => entity.location ?? '')
  },
)

export const selectTotalServiceProvidersCount = createSelector(
  selectAllEntitiesByType,
  (entities: ExplorerEntity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + (entity.serviceProvidersCount || 0)
        }, 0)
  },
)

export const selectTotalEvaluatorsCount = createSelector(
  selectAllEntitiesByType,
  (entities: ExplorerEntity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + (entity.evaluatorsCount || 0)
        }, 0)
  },
)

export const selectTotalRequiredClaimsCount = createSelector(
  selectAllEntitiesByType,
  (entities: ExplorerEntity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + (entity.requiredClaimsCount || 0)
        }, 0)
  },
)

export const selectTotalPendingClaimsCount = createSelector(
  selectAllEntitiesByType,
  (entities: ExplorerEntity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + (entity.pendingClaimsCount || 0)
        }, 0)
  },
)

export const selectTotalSuccessfulClaimsCount = createSelector(
  selectAllEntitiesByType,
  (entities: ExplorerEntity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + (entity.successfulClaimsCount || 0)
        }, 0)
  },
)

export const selectTotalRejectedClaimsCount = createSelector(
  selectAllEntitiesByType,
  (entities: ExplorerEntity[]): number => {
    return !entities
      ? 0
      : entities.reduce((total, entity) => {
          return total + (entity.rejectedClaimsCount || 0)
        }, 0)
  },
)

export const selectTotalRemainingClaimsCount = createSelector(
  selectTotalRequiredClaimsCount,
  selectTotalSuccessfulClaimsCount,
  (totalClaimsRequired: number, totalClaimsSuccessful: number): number => totalClaimsRequired - totalClaimsSuccessful,
)
