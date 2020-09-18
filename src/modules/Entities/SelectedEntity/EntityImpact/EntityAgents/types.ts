/* eslint-disable @typescript-eslint/no-empty-interface */
import { AgentRole } from 'modules/Account/types'

export enum AgentStatus {
  Approved = '0',
  Revoked = '1',
  Pending = '2',
}

export interface EntityAgent {
  name: string
  email: string
  did: string
  role: AgentRole
  status: AgentStatus
}

export interface EntityAgentsState {
  agents: {
    did: EntityAgent
  }
  isFetching: boolean
  fetchError: string
  isUpdatingStatus: boolean
  updateStatusError: string
}

export type GetEntityAgentsTypeStrategyMap = {
  [TKey in AgentRole]: {
    successType: EntityAgentsActions
    failureType: EntityAgentsActions
  }
}

export enum EntityAgentsActions {
  /*   GetEntityAgentServiceProviders = 'ixo/Entity/GET_ENTITY_AGENT_SERVICE_PROVIDERS',
  GetEntityAgentServiceProvidersSuccess = 'ixo/Entity/GET_ENTITY_AGENT_SERVICE_PROVIDERS_FULFILLED',
  GetEntityAgentServiceProvidersPending = 'ixo/Entity/GET_ENTITY_AGENT_SERVICE_PROVIDERS_PENDING',
  GetEntityAgentServiceProvidersFailure = 'ixo/Entity/GET_ENTITY_AGENT_SERVICE_PROVIDERS_REJECTED',
  GetEntityAgentEvaluators = 'ixo/Entity/GET_ENTITY_AGENT_EVALUATORS',
  GetEntityAgentEvaluatorsSuccess = 'ixo/Entity/GET_ENTITY_AGENT_EVALUATORS_FULFILLED',
  GetEntityAgentEvaluatorsPending = 'ixo/Entity/GET_ENTITY_AGENT_EVALUATORS_PENDING',
  GetEntityAgentEvaluatorsFailure = 'ixo/Entity/GET_ENTITY_AGENT_EVALUATORS_REJECTED',
  GetEntityAgentInvestors = 'ixo/Entity/GET_ENTITY_AGENT_INVESTORS',
  GetEntityAgentInvestorsSuccess = 'ixo/Entity/GET_ENTITY_AGENT_INVESTORS_FULFILLED',
  GetEntityAgentInvestorsPending = 'ixo/Entity/GET_ENTITY_AGENT_INVESTORS_PENDING',
  GetEntityAgentInvestorsFailure = 'ixo/Entity/GET_ENTITY_AGENT_INVESTORS_REJECTED',*/
  GetEntityAgents = 'ixo/Entity/GET_ENTITY_AGENTS',
  GetEntityAgentsSuccess = 'ixo/Entity/GET_ENTITY_AGENTS_FULFILLED',
  GetEntityAgentsPending = 'ixo/Entity/GET_ENTITY_AGENTS_PENDING',
  GetEntityAgentsFailure = 'ixo/Entity/GET_ENTITY_AGENTS_REJECTED',

  UpdateEntityAgentStatus = 'ixo/Entity/UPDATE_ENTITY_AGENT_STATUS',
  UpdateEntityAgentStatusSuccess = 'ixo/Entity/UPDATE_ENTITY_AGENT_STATUS_FULFILLED',
  UpdateEntityAgentStatusPending = 'ixo/Entity/UPDATE_ENTITY_AGENT_STATUS_PENDING',
  UpdateEntityAgentStatusFailure = 'ixo/Entity/UPDATE_ENTITY_AGENT_STATUS_REJECTED',
}

export interface GetEntityAgentsAction {
  type: typeof EntityAgentsActions.GetEntityAgents
  payload: Promise<EntityAgent[]>
}

export interface GetEntityAgentsPendingAction {
  type: typeof EntityAgentsActions.GetEntityAgentsPending
}

export interface GetEntityAgentsSuccessAction {
  type: typeof EntityAgentsActions.GetEntityAgentsSuccess
  payload: EntityAgent[]
}

export interface GetEntityAgentsFailureAction {
  type: typeof EntityAgentsActions.GetEntityAgentsFailure
  payload: {
    error: string
  }
}

export interface UpdateEntityAgentStatusAction {
  type: typeof EntityAgentsActions.UpdateEntityAgentStatus
  payload: Promise<EntityAgent[]>
}

export interface UpdateEntityAgentStatusSuccessAction {
  type: typeof EntityAgentsActions.UpdateEntityAgentStatusSuccess
  payload: Promise<EntityAgent[]>
}

export interface UpdateEntityAgentStatusPendingAction {
  type: typeof EntityAgentsActions.UpdateEntityAgentStatusPending
}

export interface UpdateEntityAgentStatusFailureAction {
  type: typeof EntityAgentsActions.UpdateEntityAgentStatusFailure
  payload: {
    error: string
  }
}

export type GetEntityAgentsActionTypes =
  | GetEntityAgentsAction
  | GetEntityAgentsSuccessAction
  | GetEntityAgentsPendingAction
  | GetEntityAgentsFailureAction
  | UpdateEntityAgentStatusAction
  | UpdateEntityAgentStatusSuccessAction
  | UpdateEntityAgentStatusPendingAction
  | UpdateEntityAgentStatusFailureAction
