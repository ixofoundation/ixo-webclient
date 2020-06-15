import { Moment } from 'moment'
import { Schema as FilterSchema } from './components/EntitiesFilter/schema/types'
import { Schema as HeaderSchema } from './components/EntitiesHero/schema/types'

export enum EntityType {
  Project = 'Project',
  Cell = 'Cell',
  Investment = 'Investment',
  Oracle = 'Oracle',
  Template = 'Template',
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
  logoUrl: string
  categories: Category[]
  founderLogoUrl: string
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
  entities: Entity[]
  selectedEntitiesType: EntityType
  filter: Filter
}

export type StrategyMap = {
  [TKey in EntityType]: {
    title: string
    plural: string
    themeColor: string
    headerSchema: HeaderSchema
    filterSchema: FilterSchema
  }
}

export enum EntitiesActions {
  GetEntities = 'ixo/Entities/GET_ENTITIES',
  GetEntitiesSuccess = 'ixo/Entities/GET_ENTITIES_FULFILLED',
  GetEntitiesPending = 'ixo/Entities/GET_ENTITIES_PENDING',
  GetEntitiesFailure = 'ixo/Entities/GET_ENTITIES_REJECTED',
  ChangeEntitiesType = 'ixo/Entities/CHANGE_ENTITIES_TYPE',
  FilterToggleUserEntities = 'ixo/Entities/FILTER_TOGGLE_USER_ENTITIES',
  FilterToggleFeaturedEntities = 'ixo/Entities/FILTER_TOGGLE_FEATURED_ENTITIES',
  FilterTogglePopularEntities = 'ixo/Entities/FILTER_TOGGLE_POPULAR_ENTITIES',
  FilterDates = 'ixo/Entities/FILTER_DATES',
  FilterCategoryTag = 'ixo/Entities/FILTER_CATEGORY_TAG',
  FilterAddCategoryTag = 'ixo/Entities/FILTER_ADD_CATEGORY_TAG',
  FilterCategories = 'ixo/Entities/FILTER_CATEGORIES',
  ResetDatesFilter = 'ixo/Entities/RESET_DATES_FILTER',
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

export interface ChangeEntitiesTypeAction {
  type: typeof EntitiesActions.ChangeEntitiesType
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

export interface FilterDatesAction {
  type: typeof EntitiesActions.FilterDates
  payload: {
    dateFrom: Moment
    dateTo: Moment
  }
}

export interface ResetDatesFilterAction {
  type: typeof EntitiesActions.ResetDatesFilter
}

export interface FilterCategoryTagAction {
  type: typeof EntitiesActions.FilterCategoryTag
  payload: {
    category: string
    tags: string[]
  }
}

export interface FilterAddCategoryTagAction {
  type: typeof EntitiesActions.FilterAddCategoryTag
  payload: {
    category: string
    tags: string[]
  }
}

export interface FilterCategoriesAction {
  type: typeof EntitiesActions.FilterCategories
  payload: {
    categories: Category[]
  }
}

export interface ResetCategoryFilterAction {
  type: typeof EntitiesActions.ResetCategoryFilter
  payload: {
    category: string
  }
}

export interface ResetFiltersAction {
  type: typeof EntitiesActions.ResetFilters
}

export type EntitiesActionTypes =
  | GetEntitiesAction
  | GetEntitiesSuccessAction
  | ChangeEntitiesTypeAction
  | FilterToggleUserEntitiesAction
  | FilterToggleFeaturedEntitiesAction
  | FilterTogglePopularEntitiesAction
  | FilterDatesAction
  | FilterCategoryTagAction
  | FilterAddCategoryTagAction
  | FilterCategoriesAction
  | ResetDatesFilterAction
  | ResetCategoryFilterAction
  | ResetFiltersAction
