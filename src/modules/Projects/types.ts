import { Moment } from 'moment'

export interface Project {
  projectDid: string
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
  userProjectsOnly: boolean
}

export interface ProjectsState {
  projects: Project[]
  filter: Filter
}

export enum ProjectsActions {
  GetProjects = 'ixo/Projects/GET_PROJECTS',
  GetProjectsSuccess = 'ixo/Projects/GET_PROJECTS_FULFILLED',
  GetProjectsPending = 'ixo/Projects/GET_PROJECTS_PENDING',
  GetProjectsFailure = 'ixo/Projects/GET_PROJECTS_REJECTED',
  FilterToggleUserProjects = 'ixo/Projects/FILTER_TOGGLE_USER_PROJECTS',
  FilterDates = 'ixo/Projects/FILTER_DATES',
  ResetDatesFilter = 'ixo/Projects/RESET_DATES_FILTER',
  FilterCategoryTag = 'ixo/Projects/FILTER_CATEGORY_TAG',
  ResetCategoryFilter = 'ixo/Projects/RESET_CATEGORY_FILTER',
  ResetFilters = 'ixo/Projects/RESET_FILTERS',
}

export interface GetProjectsAction {
  type: typeof ProjectsActions.GetProjects
  payload: Promise<Project[]>
}

export interface GetProjectsSuccessAction {
  type: typeof ProjectsActions.GetProjectsSuccess
  payload: Project[]
}

export interface FilterToggleUserProjectsAction {
  type: typeof ProjectsActions.FilterToggleUserProjects
  payload: {
    userProjectsOnly: boolean
  }
}

export interface FilterDatesAction {
  type: typeof ProjectsActions.FilterDates
  payload: {
    dateFrom: Moment
    dateTo: Moment
  }
}

export interface ResetDatesFilterAction {
  type: typeof ProjectsActions.ResetDatesFilter
}

export interface FilterCategoryTagsAction {
  type: typeof ProjectsActions.FilterCategoryTag
  payload: {
    category: string
    tags: string[]
  }
}

export interface ResetCategoryFilterAction {
  type: typeof ProjectsActions.ResetCategoryFilter
  payload: {
    category: string
  }
}

export interface ResetFiltersAction {
  type: typeof ProjectsActions.ResetFilters
}

export type ProjectsActionTypes =
  | GetProjectsAction
  | GetProjectsSuccessAction
  | FilterToggleUserProjectsAction
  | FilterDatesAction
  | ResetDatesFilterAction
  | FilterCategoryTagsAction
  | ResetCategoryFilterAction
  | ResetFiltersAction

export interface Stats {
  claims: Claims
  totalServiceProviders: number
  totalProjects: number
  totalEvaluationAgents: number
}
interface Claims {
  total: number
  totalSuccessful: number
  totalSubmitted: number
  totalPending: number
  totalRejected: number
}
