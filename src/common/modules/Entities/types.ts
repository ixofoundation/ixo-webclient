import { Moment } from 'moment'

export interface Entity {
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
  filter: Filter
}

export interface GetEntitiesAction<T extends string, U extends Entity> {
  type: T
  payload: Promise<U[]>
}

export interface GetEntitiesSuccessAction<T extends string, U extends Entity> {
  type: T
  payload: U[]
}

export interface FilterToggleUserEntitiesAction<T extends string> {
  type: T
  payload: {
    userEntities: boolean
  }
}

export interface FilterToggleFeaturedEntitiesAction<T extends string> {
  type: T
  payload: {
    featuredEntities: boolean
  }
}

export interface FilterTogglePopularEntitiesAction<T extends string> {
  type: T
  payload: {
    popularEntities: boolean
  }
}

export interface FilterEntitiesDatesAction<T extends string> {
  type: T
  payload: {
    dateFrom: Moment
    dateTo: Moment
  }
}

export interface ResetEntitiesDatesFilterAction<T extends string> {
  type: T
  payload: {}
}

export interface FilterEntitiesCategoryTagsAction<T extends string> {
  type: T
  payload: {
    category: string
    tags: string[]
  }
}

export interface ResetEntitiesCategoryFilterAction<T extends string> {
  type: T
  payload: {
    category: string
  }
}

export interface ResetEntitiesFiltersAction<T extends string> {
  type: T
  payload: {}
}
