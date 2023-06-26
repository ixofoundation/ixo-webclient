import moment from 'moment'
import { createSelector } from '@reduxjs/toolkit'
import { ExplorerEntity, EntitiesExplorerState, Filter } from './entitiesExplorer.types'
import { EntityType, EntityConfig } from 'types/entities'
import * as accountSelectors from 'redux/account/account.selectors'
import { RootState } from 'redux/store'
import { Schema as FilterSchema } from 'components/Entities/EntitiesExplorer/Components/EntitiesFilter/schema/types'
import { theme } from 'components/App/App.styles'
import { TEntityDDOTagModel } from 'types/protocol'
import { TEntityModel } from 'api/blocksync/types/entities'
import { DaoGroup } from 'redux/currentEntity/dao/currentDao.types'

const formatDate = (date: string): string => moment(date).format("D MMM \\'YY")

export const selectEntitiesState = (state: RootState): EntitiesExplorerState => state.entities

export const selectAllEntities = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): TEntityModel[] => {
    return Object.values(entitiesState.entities2 ?? {})
  },
)

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
    return Object.values(entitiesState.entities2 ?? {}).filter((entity) =>
      entity.type.toLowerCase().includes(entitiesState.selectedEntitiesType.toLowerCase()),
    )
  },
)

export const selectEntitiesByType = (type: string) =>
  createSelector(selectEntitiesState, (entitiesState: EntitiesExplorerState): TEntityModel[] => {
    return type
      ? Object.values(entitiesState.entities2 ?? {}).filter((entity) => entity.type?.toLowerCase().includes(type))
      : []
  })

export const selectDAOEntities = createSelector(selectEntitiesByType('dao'), (daos: TEntityModel[]): TEntityModel[] => {
  return daos.filter((dao) => Object.keys(dao.daoGroups ?? {}).length > 0)
})

export const selectAllTemplateEntities = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): ExplorerEntity[] => {
    return entitiesState.entities
      ? entitiesState.entities
          .filter((entity) => entity.type === EntityType.Protocol)
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
          (new Date(entity.metadata.created as never as string).getTime() >= new Date(filter.dateFrom).getTime() &&
            new Date(entity.metadata.created as never as string).getTime() <= new Date(filter.dateTo).getTime()),
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
                (entityCategory) =>
                  entityCategory?.category === category.category && entityCategory?.tags.includes(tag),
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

export const selectAllEntitiesCount2 = createSelector(selectAllEntitiesByType2, (entities: TEntityModel[]): number => {
  return !entities ? 0 : entities.length
})

export const selectFilteredEntitiesCount2 = createSelector(
  selectedFilteredEntities2,
  (entities: TEntityModel[]): number => {
    return !entities ? 0 : entities.length
  },
)

export const selectIsLoadingEntities2 = createSelector(
  selectAllEntitiesByType2,
  (entities: TEntityModel[]): boolean => {
    return entities === null
  },
)

export const selectFilterDateFrom = createSelector(selectEntitiesFilter, (filter: Filter): string => {
  return filter.dateFrom
})

export const selectFilterDateTo = createSelector(selectEntitiesFilter, (filter: Filter): string => {
  return filter.dateTo
})

export const selectFilterDateFromFormatted = createSelector(selectFilterDateFrom, (dateFrom: string): string => {
  return dateFrom ? formatDate(dateFrom) : ''
})

export const selectFilterDateToFormatted = createSelector(selectFilterDateTo, (dateTo: string): string => {
  return dateTo ? formatDate(dateTo) : ''
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

export const selectEntityById = (entityId: string) =>
  createSelector(selectDAOEntities, (entities: TEntityModel[]): DaoGroup[] => {
    const stakingGroups: DaoGroup[] = []
    entities.forEach((entity: TEntityModel) => {
      const { daoGroups } = entity
      if (daoGroups) {
        Object.values(daoGroups).forEach((daoGroup: DaoGroup) => {
          if (daoGroup.type === 'staking') {
            stakingGroups.push(daoGroup)
          }
        })
      }
    })
    return stakingGroups
  })

export const selectStakingGroups = createSelector(selectDAOEntities, (entities: TEntityModel[]): DaoGroup[] => {
  const stakingGroups: DaoGroup[] = []
  entities.forEach((entity: TEntityModel) => {
    const { daoGroups } = entity
    if (daoGroups) {
      Object.values(daoGroups).forEach((daoGroup: DaoGroup) => {
        if (daoGroup.type === 'staking') {
          stakingGroups.push(daoGroup)
        }
      })
    }
  })
  return stakingGroups
})

export const selectStakingGroupsByTokenAddress = (tokenAddress: string) =>
  createSelector(selectStakingGroups, (stakingGroups: DaoGroup[]): DaoGroup[] => {
    return stakingGroups.filter((daoGroup: DaoGroup) => daoGroup.token?.config.token_address === tokenAddress)
  })

export const selectStakingGroupByCoreAddress = (coreAddress: string) =>
  createSelector(selectStakingGroups, (stakingGroups: DaoGroup[]): DaoGroup | undefined => {
    return stakingGroups.find((daoGroup: DaoGroup) => daoGroup.coreAddress === coreAddress)
  })

export const selectIsMemberOfDAO = (daoId: string, address: string) =>
  createSelector(selectDAOEntities, (entities: TEntityModel[]): boolean => {
    const dao = entities.find((entity) => entity.id === daoId)
    if (!dao) {
      return false
    }
    return Object.values(dao.daoGroups ?? {}).some((daoGroup) =>
      daoGroup.votingModule.members.some((member) => member.addr === address),
    )
  })
