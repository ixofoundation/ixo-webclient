export interface Project {
  projectDid: string
  userDid: string
  title: string
  shortDescription: string
  longDescription: string
  dateCreated: Date
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
  data: any // this is temporary until we don't have to pass projectData into the card component because of the weird link
}

export interface Category {
  name: string
  selectedTags: string[]
}

export interface Filter {
  selectedCategories: Category[]
  dateFrom: any
  dateTo: any
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
}

export interface GetProjectsAction {
  type: typeof ProjectsActions.GetProjects
  payload: Promise<Project[]>
}

export interface GetProjectsSuccessAction {
  type: typeof ProjectsActions.GetProjectsSuccess
  payload: Project[]
}

export type ProjectsActionTypes = GetProjectsAction | GetProjectsSuccessAction

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
