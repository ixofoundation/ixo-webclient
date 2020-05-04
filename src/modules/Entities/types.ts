import { Moment } from 'moment'

export enum EntityType {
  Projects = 'Projects',
  Cells = 'Cells',
  Funds = 'Funds',
  Oracle = 'Oracle',
  Templates = 'Template',
  Data = 'Data',
}

export interface Entity {
  entityType: EntityType
  did: string
  userDid: string
  title: string
  shortDescription: string
  longDescription: string
  dateCreated: Moment
  ownerName: string
  status: string
  country: string
  impactAction: string
  serviceProvidersCount: number
  evaluatorsCount: number
  requiredClaimsCount: number
  successfulClaimsCount: number
  pendingClaimsCount: number
  rejectedClaimsCount: number
  sdgs: number[]
  agentDids: string[]
  imageUrl: string
  categories: Category[]
  data: any // this is temporary until we don't have to pass projectData into the card component because of the weird link
}

export interface Category {
  name: string
  tags: string[]
}

export interface Filter {
  categories: Category[]
  dateFrom: Moment
  dateTo: Moment
  userEntities: boolean
  featuredEntities: boolean
  popularEntities: boolean
}

export interface EntitiesState {
  entityType: EntityType
  entities: Entity[]
  filter: Filter
}

export enum EntitiesActions {
  GetEntities = 'ixo/Entities/GET_ENTITIES',
  GetEntitiesSuccess = 'ixo/Entities/GET_ENTITIES_FULFILLED',
  GetEntitiesPending = 'ixo/Entities/GET_ENTITIES_PENDING',
  GetEntitiesFailure = 'ixo/Entities/GET_ENTITIES_REJECTED',
  ChangeEntityType = 'ixo/Entities/CHANGE_ENTITY_TYPE',
  FilterToggleUserEntities = 'ixo/Entities/FILTER_TOGGLE_USER_ENTITIES',
  FilterToggleFeaturedEntities = 'ixo/Entities/FILTER_TOGGLE_FEATURED_ENTITIES',
  FilterTogglePopularEntities = 'ixo/Entities/FILTER_TOGGLE_POPULAR_ENTITIES',
  FilterDates = 'ixo/Entities/FILTER_DATES',
  ResetDatesFilter = 'ixo/Entities/RESET_DATES_FILTER',
  FilterCategoryTag = 'ixo/Entities/FILTER_CATEGORY_TAG',
  ResetCategoryFilter = 'ixo/Entities/RESET_CATEGORY_FILTER',
  ResetFilters = 'ixo/Entities/RESET_FILTERS',
}

export interface GetEntitiesAction {
  type: typeof EntitiesActions.GetEntities
  payload: Promise<Entity[]>
}

export interface GetEntitiesSuccessAction {
  type: typeof EntitiesActions.GetEntitiesSuccess
  payload: Entity[]
}

export interface FilterToggleUserEntitiesAction {
  type: typeof EntitiesActions.FilterToggleUserEntities
  payload: {
    userEntities: boolean
  }
}

export interface ChangeEntityTypeAction {
  type: typeof EntitiesActions.ChangeEntityType
  payload: {
    entityType: EntityType
  }
}

export interface FilterToggleFeaturedEntitiesAction {
  type: typeof EntitiesActions.FilterToggleFeaturedEntities
  payload: {
    featuredEntities: boolean
  }
}

export interface FilterTogglePopularEntitiesAction {
  type: typeof EntitiesActions.FilterTogglePopularEntities
  payload: {
    popularEntities: boolean
  }
}

export interface FilterEntitiesDatesAction {
  type: typeof EntitiesActions.FilterDates
  payload: {
    dateFrom: Moment
    dateTo: Moment
  }
}

export interface ResetEntitiesDatesFilterAction {
  type: typeof EntitiesActions.ResetDatesFilter
}

export interface FilterEntitiesCategoryTagsAction {
  type: typeof EntitiesActions.FilterCategoryTag
  payload: {
    category: string
    tags: string[]
  }
}

export interface ResetEntitiesCategoryFilterAction {
  type: typeof EntitiesActions.ResetCategoryFilter
  payload: {
    category: string
  }
}

export interface ResetEntitiesFiltersAction {
  type: typeof EntitiesActions.ResetFilters
}

export type EntitiesActionTypes =
  | GetEntitiesAction
  | GetEntitiesSuccessAction
  | ChangeEntityTypeAction
  | FilterToggleUserEntitiesAction
  | FilterToggleFeaturedEntitiesAction
  | FilterTogglePopularEntitiesAction
  | FilterEntitiesDatesAction
  | ResetEntitiesDatesFilterAction
  | FilterEntitiesCategoryTagsAction
  | ResetEntitiesCategoryFilterAction
  | ResetEntitiesFiltersAction
