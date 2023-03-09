import { Timestamp } from '@ixo/impactxclient-sdk/types/utils/proto'
import { Moment } from 'moment'
import { EntityConfig, LiquiditySource, FundSource, TermsOfUseType } from 'types/entities'

export interface DDOTagCategory {
  name: string
  tags: string[]
}

export interface Filter {
  ddoTags: DDOTagCategory[]
  sector: string
  dateFrom: Moment
  dateTo: Moment
  userEntities: boolean
  featuredEntities: boolean
  popularEntities: boolean
  query: string
  itemOffset: number
}

export interface ExplorerEntity {
  name?: string
  description?: string
  creatorDid?: string
  dateCreated?: Moment
  creatorName?: string
  creatorLogo?: string
  location?: string
  goal?: string
  serviceProvidersCount?: number
  evaluatorsCount?: number
  requiredClaimsCount?: number
  successfulClaimsCount?: number
  pendingClaimsCount?: number
  rejectedClaimsCount?: number
  disputedClaimsCount?: number
  sdgs?: string[]
  agentDids?: string[]
  image?: string
  logo?: string
  ddoTags?: DDOTagCategory[]
  termsType?: TermsOfUseType
  badges?: string[]
  version?: string
  entityClaims?: any
  linkedEntities?: any[]
  liquidity?: {
    ['@context']: string
    items: { ['@type']: LiquiditySource; id: string }[]
  }
  funding?: {
    //  TODO: this should be removed
    ['@context']: string
    items: { ['@type']: FundSource; id: string }[]
  }

  // new
  did: string
  type: string
  status: string | number
  startDate?: Timestamp
  endDate?: Timestamp
  relayerNode?: string
}

export interface EntitiesExplorerState {
  entities: ExplorerEntity[]
  entityConfig: EntityConfig
  selectedEntitiesType: string
  filter: Filter
}

export enum EntitiesExplorerActions {
  GetEntities = 'ixo/EntitiesExplorer/GET_ENTITIES',
  GetEntitiesSuccess = 'ixo/EntitiesExplorer/GET_ENTITIES_FULFILLED',
  GetEntitiesPending = 'ixo/EntitiesExplorer/GET_ENTITIES_PENDING',
  GetEntitiesFailure = 'ixo/EntitiesExplorer/GET_ENTITIES_REJECTED',
  GetIndividualEntity = 'ixo/EntitiesExplorer/GET_INDIVIDUAL_ENTITY',
  GetEntityConfig = 'ixo/EntitiesExplorer/GET_ENTITYCONFIG',
  GetEntityConfigSuccess = 'ixo/EntitiesExplorer/GET_ENTITYCONFIG_FULFILLED',
  GetEntityConfigPending = 'ixo/EntitiesExplorer/GET_ENTITYCONFIG_PENDING',
  GetEntityConfigFailure = 'ixo/EntitiesExplorer/GET_ENTITYCONFIG_REJECTED',
  ChangeEntitiesType = 'ixo/EntitiesExplorer/CHANGE_ENTITIES_TYPE',
  FilterToggleUserEntities = 'ixo/EntitiesExplorer/FILTER_TOGGLE_USER_ENTITIES',
  FilterToggleFeaturedEntities = 'ixo/EntitiesExplorer/FILTER_TOGGLE_FEATURED_ENTITIES',
  FilterTogglePopularEntities = 'ixo/EntitiesExplorer/FILTER_TOGGLE_POPULAR_ENTITIES',
  FilterDates = 'ixo/EntitiesExplorer/FILTER_DATES',
  FilterCategoryTag = 'ixo/EntitiesExplorer/FILTER_CATEGORY_TAG',
  FilterAddCategoryTag = 'ixo/EntitiesExplorer/FILTER_ADD_CATEGORY_TAG',
  FilterDDOCategories = 'ixo/EntitiesExplorer/FILTER_DDO_CATEGORIES',
  FilterItemOffset = 'ixo/EntitiesExplorer/FILTER_ITEM_OFFSET',
  ResetDatesFilter = 'ixo/EntitiesExplorer/RESET_DATES_FILTER',
  FilterSector = 'ixo/EntitiesExplorer/FILTER_SECTOR',
  ResetCategoryFilter = 'ixo/EntitiesExplorer/RESET_CATEGORY_FILTER',
  ResetSectorFilter = 'ixo/EntitiesExplorer/RESET_SECTOR_FILTER',
  ResetFilters = 'ixo/EntitiesExplorer/RESET_FILTERS',
  FilterQuery = 'ixo/EntitiesExplorer/FILTER_QUERY',
}

export interface GetEntitiesAction {
  type: typeof EntitiesExplorerActions.GetEntities
  payload: Promise<ExplorerEntity[]>
}

export interface GetEntitiesSuccessAction {
  type: typeof EntitiesExplorerActions.GetEntitiesSuccess
  payload: ExplorerEntity[]
}

export interface GetIndividualEntityAction {
  type: typeof EntitiesExplorerActions.GetIndividualEntity
  payload: Omit<ExplorerEntity, 'type' | 'status' | 'startDate' | 'endDate' | 'relayerNode'>
}

export interface GetEntityConfigAction {
  type: typeof EntitiesExplorerActions.GetEntityConfig
  payload: Promise<EntityConfig>
}

export interface GetEntityConfigSuccessAction {
  type: typeof EntitiesExplorerActions.GetEntityConfigSuccess
  payload: EntityConfig
}

export interface FilterToggleUserEntitiesAction {
  type: typeof EntitiesExplorerActions.FilterToggleUserEntities
  payload: {
    userEntities: boolean
  }
}

export interface ChangeEntitiesTypeAction {
  type: typeof EntitiesExplorerActions.ChangeEntitiesType
  payload: {
    type: string
  }
}

export interface FilterToggleFeaturedEntitiesAction {
  type: typeof EntitiesExplorerActions.FilterToggleFeaturedEntities
  payload: {
    featuredEntities: boolean
  }
}

export interface FilterTogglePopularEntitiesAction {
  type: typeof EntitiesExplorerActions.FilterTogglePopularEntities
  payload: {
    popularEntities: boolean
  }
}

export interface FilterDatesAction {
  type: typeof EntitiesExplorerActions.FilterDates
  payload: {
    dateFrom: Moment
    dateTo: Moment
  }
}

export interface ResetDatesFilterAction {
  type: typeof EntitiesExplorerActions.ResetDatesFilter
}

export interface FilterCategoryTagAction {
  type: typeof EntitiesExplorerActions.FilterCategoryTag
  payload: {
    category: string
    tags: string[]
  }
}

export interface FilterAddCategoryTagAction {
  type: typeof EntitiesExplorerActions.FilterAddCategoryTag
  payload: {
    category: string
    tags: string[]
  }
}

export interface FilterDDOCategoriesAction {
  type: typeof EntitiesExplorerActions.FilterDDOCategories
  payload: {
    ddoTags: DDOTagCategory[]
  }
}

export interface FilterItemOffsetAction {
  type: typeof EntitiesExplorerActions.FilterItemOffset
  payload: number
}

export interface ResetCategoryFilterAction {
  type: typeof EntitiesExplorerActions.ResetCategoryFilter
  payload: {
    category: string
  }
}
export interface FilterSectorAction {
  type: typeof EntitiesExplorerActions.FilterSector
  payload: {
    sector: string
  }
}
export interface ResetSectorFilterAction {
  type: typeof EntitiesExplorerActions.ResetSectorFilter
}

export interface ResetFiltersAction {
  type: typeof EntitiesExplorerActions.ResetFilters
}

export interface FilterQueryAction {
  type: typeof EntitiesExplorerActions.FilterQuery
  payload: {
    query: string
  }
}

export type EntitiesActionTypes =
  | GetEntitiesAction
  | GetEntitiesSuccessAction
  | GetIndividualEntityAction
  | GetEntityConfigAction
  | GetEntityConfigSuccessAction
  | ChangeEntitiesTypeAction
  | FilterToggleUserEntitiesAction
  | FilterToggleFeaturedEntitiesAction
  | FilterTogglePopularEntitiesAction
  | FilterDatesAction
  | FilterCategoryTagAction
  | FilterAddCategoryTagAction
  | FilterDDOCategoriesAction
  | FilterSectorAction
  | ResetDatesFilterAction
  | ResetCategoryFilterAction
  | ResetSectorFilterAction
  | ResetFiltersAction
  | FilterQueryAction
  | FilterItemOffsetAction
