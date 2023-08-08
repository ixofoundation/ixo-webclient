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
}

export interface EntitiesExplorerState {
  entities2: { [id: string]: TEntityModel }
  entityConfig: EntityConfig
  selectedEntitiesType: string
  filter: Filter
}

export enum EntitiesExplorerActions {
  GetEntities2 = 'ixo/EntitiesExplorer/GET_ENTITIES2',
  GetEntities2Success = 'ixo/EntitiesExplorer/GET_ENTITIES2_FULFILLED',
  GetEntities2Pending = 'ixo/EntitiesExplorer/GET_ENTITIES2_PENDING',
  GetEntities2Failure = 'ixo/EntitiesExplorer/GET_ENTITIES2_REJECTED',
  GetIndividualEntity2 = 'ixo/EntitiesExplorer/GET_INDIVIDUAL_ENTITY2',
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

export interface GetEntities2Action {
  type: typeof EntitiesExplorerActions.GetEntities2
  payload: Promise<TEntityModel[]>
}

export interface GetEntities2SuccessAction {
  type: typeof EntitiesExplorerActions.GetEntities2Success
  payload: TEntityModel[]
}
export interface UpdateEntityByIdAction {
  type: typeof EntitiesExplorerActions.UpdateEntityById
  payload: TEntityModel
}
export interface GetIndividualEntityAction2 {
  type: typeof EntitiesExplorerActions.GetIndividualEntity2
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
  | GetEntities2Action
  | GetEntities2SuccessAction
  | GetIndividualEntityAction2
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
