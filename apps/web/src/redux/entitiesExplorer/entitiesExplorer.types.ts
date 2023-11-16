import {
  EntityConfig,
  TEntityDDOTagModel,
  TEntityModel,
  LiquiditySource,
  FundSource,
  TermsOfUseType,
} from 'types/entities'
import { Moment } from 'moment'
import { Timestamp } from '@ixo/impactxclient-sdk/types/utils/proto'

export interface Filter {
  ddoTags: TEntityDDOTagModel[]
  sector: string
  dateFrom: string
  dateTo: string
  userEntities: boolean
  featuredEntities: boolean
  popularEntities: boolean
  query: string
  itemOffset: number
  verified: boolean
}

export type TCollection = {
  collection: TEntityModel
  entities: TEntityModel[]
}

export interface EntitiesExplorerState {
  entities: { [id: string]: TEntityModel }
  collections: TCollection[]
  assetCollections: { [id: string]: TEntityModel }
  assetDevices: { [id: string]: TEntityModel }
  entityConfig: EntityConfig
  selectedEntitiesType: string
  filter: Filter
}

export enum EntitiesExplorerActions {
  GetEntitiesFromGraphql = 'ixo/EntitiesExplorer/GET_ENTITIES_FROM_GRAPHQL',
  GetSpecificEntity = 'ixo/EntitiesExplorer/GET_SPECIFIC_ENTITY',
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

export interface GetEntitiesFromGraphqlAction {
  type: typeof EntitiesExplorerActions.GetEntitiesFromGraphql
  payload: TEntityModel[]
}

export interface GetSpecificEntityAction {
  type: typeof EntitiesExplorerActions.GetSpecificEntity
  payload: TEntityModel
}

export interface GetIndividualEntityAction {
  type: typeof EntitiesExplorerActions.GetIndividualEntity
  payload: { id: string; key: string; data: any; merge: boolean }
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
    dateFrom: string
    dateTo: string
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
    ddoTags: TEntityDDOTagModel[]
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
  ddoTags?: TEntityDDOTagModel[]
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

export type EntitiesActionTypes =
  | GetEntitiesFromGraphqlAction
  | GetSpecificEntityAction
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
