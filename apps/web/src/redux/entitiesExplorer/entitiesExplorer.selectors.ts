import moment from 'moment'
import { createSelector } from '@reduxjs/toolkit'
import { EntitiesExplorerState, Filter, TCollection } from './entitiesExplorer.types'
import { EntityConfig, TEntityModel, TEntityDDOTagModel, TDAOGroupModel } from 'types/entities'
import * as accountSelectors from 'redux/account/account.selectors'
import { RootState } from 'redux/store'
import { Schema as FilterSchema } from 'pages/EntitiesExplorer/Components/EntitiesFilter/schema/types'
import { theme } from 'components/App/App.styles'
import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { filterEntitiesByRelayerNode, filterProtocolDeedEntities } from 'utils/filters'

const formatDate = (date: string): string => moment(date).format("D MMM \\'YY")

export const selectEntitiesState = (state: RootState): EntitiesExplorerState => state.entities
const selectConfigsState = (state: RootState) => state.configs?.entityConfig

export const selectAllEntities = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): TEntityModel[] => {
    return Object.values(entitiesState.entities ?? {})
  },
)

export const getEntityById = (id: string) => createSelector(selectEntitiesState, (entitiesState: EntitiesExplorerState) => {
  if(!id) return {}
  return entitiesState.entities[id]
})

export const selectAllEntitiesByType = createSelector(
  selectEntitiesState,
  (entitiesState: EntitiesExplorerState): TEntityModel[] => {
    return Object.values(entitiesState.entities ?? {}).filter((entity) => {
      if (entitiesState.selectedEntitiesType.toLowerCase() === 'protocol') {
        return entity.type.toLowerCase().includes('protocol/')
      }
      return entity.type.toLowerCase().includes(entitiesState.selectedEntitiesType.toLowerCase())
    })
  },
)

export const selectEntitiesByType = (type: string) =>
  createSelector(selectEntitiesState, (entitiesState: EntitiesExplorerState): TEntityModel[] => {
    return type
      ? Object.values(entitiesState.entities ?? {}).filter((entity) => entity.type?.toLowerCase().includes(type))
      : []
  })

export const selectDAOEntities = createSelector(selectEntitiesByType('dao'), (daos: TEntityModel[]): TEntityModel[] => {
  return daos.filter((dao) => Object.keys(dao.daoGroups ?? {}).length > 0)
})

export const selectAllClaimProtocols = createSelector(
  selectEntitiesByType('protocol/claim'),
  (entities: TEntityModel[]): TEntityModel[] => {
    return entities
  },
)

export const selectAllDeedProtocols = createSelector(
  selectEntitiesByType('protocol/deed'),
  (entities: TEntityModel[]): TEntityModel[] => {
    return entities.filter(filterProtocolDeedEntities)
  },
)

export const selectAllDeedOffersForEntityId = (entityId: string) =>
  createSelector(selectEntitiesByType('deed/offer'), (entities: TEntityModel[]): TEntityModel[] => {
    return entities.filter((entity) =>
      entity.linkedEntity.some((item: LinkedEntity) => item.relationship === 'offers' && item.id === entityId),
    )
  })

export const selectUnverifiedEntities = createSelector(
  selectAllEntities,
  (entities: TEntityModel[]): TEntityModel[] => {
    return entities
      .filter((entity) => entity.entityVerified === false && entity.status === 0)
      .filter((entity) => entity.type !== 'deed')
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
  accountSelectors.selectAccountAddress,
  (entities: TEntityModel[], filter: Filter, userDid: string, accountAddress: string): TEntityModel[] => {
    // all entities
    let filteredEntities = entities

    /**
     * @description filter by entityStatus
     */
    filteredEntities = filteredEntities.filter((entity) => entity.status === 0 || entity.status === 2)

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
     * @description filter by entityVerified === true
     */
    if (filter.verified) {
      filteredEntities = filteredEntities.filter((entity) => entity.entityVerified === filter.verified)
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

    filteredEntities = filteredEntities.filter(
      (entity) => filterEntitiesByRelayerNode(entity) || entity.owner === accountAddress,
    )

    return filteredEntities
  },
)

export const selectAllEntitiesCount = createSelector(selectAllEntitiesByType, (entities: TEntityModel[]): number => {
  return !entities ? 0 : entities.length
})

export const selectFilteredEntitiesCount = createSelector(
  selectedFilteredEntities,
  (entities: TEntityModel[]): number => {
    return !entities ? 0 : entities.length
  },
)

export const selectIsLoadingEntities = createSelector(selectAllEntitiesByType, (entities: TEntityModel[]): boolean => {
  return entities === null
})

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
  (state: RootState) => state.configs.entityConfig,
  (entitiesState: EntitiesExplorerState, entityConfig): FilterSchema => {
    return entityConfig ? entityConfig[entitiesState?.selectedEntitiesType]?.filterSchema : {}
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

export const selectEntityUIConfig = createSelector(selectConfigsState, (entityConfig: any): any => {
  return entityConfig?.UI
})

export const selectEntityThemeConfig = createSelector(selectConfigsState, (entityConfig: EntityConfig): any => {
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
    return entityUIConfig?.header?.buttonColor ?? theme.ixoNewBlue
  },
)

export const selectEntityFooterUIConfig = createSelector(selectEntityUIConfig, (entityUIConfig: any): any => {
  return entityUIConfig?.footer
})

export const selectEntityPrimaryColor = createSelector(selectEntityThemeConfig, (themeConfig: any): string => {
  return themeConfig?.primaryColor ?? theme.ixoNewBlue
})

export const selectEntityThemeHighlightLight = createSelector(selectEntityThemeConfig, (themeConfig: any): string => {
  return themeConfig?.highlight?.light ?? theme.highlight.light
})

export const selectEntityById = (entityId: string) =>
  createSelector(selectAllEntities, (entities: TEntityModel[]): TEntityModel | undefined => {
    return entities.find((entity) => entity.id === entityId)
  })

export const selectStakingGroups = createSelector(selectDAOEntities, (entities: TEntityModel[]): TDAOGroupModel[] => {
  const stakingGroups: TDAOGroupModel[] = []
  entities.forEach((entity: TEntityModel) => {
    const { daoGroups } = entity
    if (daoGroups) {
      Object.values(daoGroups).forEach((daoGroup: TDAOGroupModel) => {
        if (daoGroup.type === 'staking') {
          stakingGroups.push(daoGroup)
        }
      })
    }
  })
  return stakingGroups
})

export const selectGroups = createSelector(selectDAOEntities, (entities: TEntityModel[]): TDAOGroupModel[] => {
  const groups: TDAOGroupModel[] = []
  entities.forEach((entity: TEntityModel) => {
    const { daoGroups } = entity
    if (daoGroups) {
      Object.values(daoGroups).forEach((daoGroup: TDAOGroupModel) => {
        groups.push(daoGroup)
      })
    }
  })
  return groups
})

export const selectStakingGroupsByTokenAddress = (tokenAddress: string) =>
  createSelector(selectStakingGroups, (stakingGroups: TDAOGroupModel[]): TDAOGroupModel[] => {
    return stakingGroups.filter((daoGroup: TDAOGroupModel) => daoGroup.token?.config.token_address === tokenAddress)
  })

export const selectStakingGroupByCoreAddress = (coreAddress: string) =>
  createSelector(selectStakingGroups, (stakingGroups: TDAOGroupModel[]): TDAOGroupModel | undefined => {
    return stakingGroups.find((daoGroup: TDAOGroupModel) => daoGroup.coreAddress === coreAddress)
  })

export const selectGroupByCoreAddress = (coreAddress: string) =>
  createSelector(selectGroups, (groups: TDAOGroupModel[]): TDAOGroupModel | undefined => {
    return groups.find((daoGroup: TDAOGroupModel) => daoGroup.coreAddress === coreAddress)
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

export const selectCollections = createSelector(
  selectEntitiesState,
  (entities: EntitiesExplorerState): TCollection[] => {
    return entities.collections
  },
)

export const selectCollectionByCollectionId = (collectionId: string) =>
  createSelector(selectCollections, (collections: TCollection[]): TCollection | undefined => {
    return collections.find(({ collection }) => collection.id === collectionId)
  })

