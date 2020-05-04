import { Moment } from 'moment'

export interface Entity {
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

export interface EntitiesState<T> {
  entities: T[]
  filter: Filter
}

export enum EntitiesActions {
  GetEntities = 'GET_ENTITIES',
  GetEntitiesSuccess = 'GET_ENTITIES_FULFILLED',
  GetEntitiesPending = 'GET_ENTITIES_PENDING',
  GetEntitiesFailure = 'GET_ENTITIES_REJECTED',
  FilterToggleUserEntities = 'FILTER_TOGGLE_USER_ENTITIES',
  FilterToggleFeaturedEntities = 'FILTER_TOGGLE_FEATURED_ENTITIES',
  FilterTogglePopularEntities = 'FILTER_TOGGLE_POPULAR_ENTITIES',
  FilterDates = 'FILTER_DATES',
  ResetDatesFilter = 'RESET_DATES_FILTER',
  FilterCategoryTag = 'FILTER_CATEGORY_TAG',
  ResetCategoryFilter = 'RESET_CATEGORY_FILTER',
  ResetFilters = 'RESET_FILTERS',
}

export interface GetEntitiesAction<
  TAction extends string,
  TEntity extends Entity
> {
  type: TAction
  payload: Promise<TEntity[]>
}

export interface GetEntitiesSuccessAction<
  TAction extends string,
  TEntity extends Entity
> {
  type: TAction
  payload: TEntity[]
}

export interface FilterToggleUserEntitiesAction<TAction extends string> {
  type: TAction
  payload: {
    userEntities: boolean
  }
}

export interface FilterToggleFeaturedEntitiesAction<TAction extends string> {
  type: TAction
  payload: {
    featuredEntities: boolean
  }
}

export interface FilterTogglePopularEntitiesAction<TAction extends string> {
  type: TAction
  payload: {
    popularEntities: boolean
  }
}

export interface FilterEntitiesDatesAction<TAction extends string> {
  type: TAction
  payload: {
    dateFrom: Moment
    dateTo: Moment
  }
}

export interface ResetEntitiesDatesFilterAction<TAction extends string> {
  type: TAction
  payload: {}
}

export interface FilterEntitiesCategoryTagsAction<TAction extends string> {
  type: TAction
  payload: {
    category: string
    tags: string[]
  }
}

export interface ResetEntitiesCategoryFilterAction<TAction extends string> {
  type: TAction
  payload: {
    category: string
  }
}

export interface ResetEntitiesFiltersAction<TAction extends string> {
  type: TAction
  payload: {}
}
