import { EntityConfig, TEntityDDOTagModel, TEntityModel } from 'types/entities'

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
  entityConfig: EntityConfig
  selectedEntitiesType: string
  filter: Filter
}

export enum EntitiesExplorerActions {
  GetEntities = 'ixo/EntitiesExplorer/GET_ENTITIES',
  GetEntitiesSuccess = 'ixo/EntitiesExplorer/GET_ENTITIES_FULFILLED',
  GetEntitiesPending = 'ixo/EntitiesExplorer/GET_ENTITIES_PENDING',
  GetEntitiesFailure = 'ixo/EntitiesExplorer/GET_ENTITIES_REJECTED',
  GetCollections = 'ixo/EntitiesExplorer/GET_COLLECTIONS',
  GetCollectionsSuccess = 'ixo/EntitiesExplorer/GET_COLLECTIONS_FULFILLED',
  GetCollectionsPending = 'ixo/EntitiesExplorer/GET_COLLECTIONS_PENDING',
  GetCollectionsFailure = 'ixo/EntitiesExplorer/GET_COLLECTIONS_REJECTED',
  GetIndividualEntity = 'ixo/EntitiesExplorer/GET_INDIVIDUAL_ENTITY',
  UpdateEntityById = 'ixo/EntitiesExplorer/UPDATE_ENTITY_BY_ID',
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
  payload: Promise<TEntityModel[]>
}

export interface GetEntitiesSuccessAction {
  type: typeof EntitiesExplorerActions.GetEntitiesSuccess
  payload: TEntityModel[]
}
export interface GetCollectionsAction {
  type: typeof EntitiesExplorerActions.GetCollections
  payload: Promise<TCollection[]>
}
export interface GetCollectionsSuccessAction {
  type: typeof EntitiesExplorerActions.GetCollectionsSuccess
  payload: TCollection[]
}
export interface UpdateEntityByIdAction {
  type: typeof EntitiesExplorerActions.UpdateEntityById
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

export type EntitiesActionTypes =
  | GetEntitiesAction
  | GetEntitiesSuccessAction
  | GetCollectionsAction
  | GetCollectionsSuccessAction
  | GetIndividualEntityAction
  | UpdateEntityByIdAction
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
