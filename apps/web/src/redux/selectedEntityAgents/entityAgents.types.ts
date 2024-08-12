/* eslint-disable @typescript-eslint/no-empty-interface */ 
// @ts-nocheck
import { AgentRole } from 'redux/account/account.types'

export enum AgentStatus {
  Approved = '1',
  Revoked = '2',
  Pending = '0',
  Invited = '3',
}

export interface EntityAgent {
  name: string
  email: string
  agentDid: string
  role: AgentRole
  status: AgentStatus
  version: string
}

export interface EntityAgentsState {
  agents: {
    did: EntityAgent
  }
  isFetching: boolean
  fetchError: string
  isUpdatingStatus: boolean
  updateStatusError: string
  isCreating: boolean
  creationError: string
}

export type GetEntityAgentsTypeStrategyMap = {
  [TKey in AgentRole]: {
    successType: EntityAgentsActions
    failureType: EntityAgentsActions
  }
}

export enum EntityAgentsActions {
  GetEntityAgents = 'ixo/Entity/GET_ENTITY_AGENTS',
  GetEntityAgentsSuccess = 'ixo/Entity/GET_ENTITY_AGENTS_FULFILLED',
  GetEntityAgentsPending = 'ixo/Entity/GET_ENTITY_AGENTS_PENDING',
  GetEntityAgentsFailure = 'ixo/Entity/GET_ENTITY_AGENTS_REJECTED',
  UpdateEntityAgentStatus = 'ixo/Entity/UPDATE_ENTITY_AGENT_STATUS',
  UpdateEntityAgentStatusSuccess = 'ixo/Entity/UPDATE_ENTITY_AGENT_STATUS_FULFILLED',
  UpdateEntityAgentStatusPending = 'ixo/Entity/UPDATE_ENTITY_AGENT_STATUS_PENDING',
  UpdateEntityAgentStatusFailure = 'ixo/Entity/UPDATE_ENTITY_AGENT_STATUS_REJECTED',
  CreateEntityAgent = 'ixo/Entity/CREATE_ENTITY_AGENT',
  CreateEntityAgentSuccess = 'ixo/Entity/CREATE_ENTITY_AGENT_FULFILLED',
  CreateEntityAgentPending = 'ixo/Entity/CREATE_ENTITY_AGENT_PENDING',
  CreateEntityAgentFailure = 'ixo/Entity/CREATE_ENTITY_AGENT_REJECTED',
}

export interface GetEntityAgentsAction {
  type: typeof EntityAgentsActions.GetEntityAgents
  payload: EntityAgent[]
}

export interface GetEntityAgentsPendingAction {
  type: typeof EntityAgentsActions.GetEntityAgentsPending
}

export interface GetEntityAgentsSuccessAction {
  type: typeof EntityAgentsActions.GetEntityAgentsSuccess
  payload: {
    agents: EntityAgent[]
  }
}

export interface GetEntityAgentsFailureAction {
  type: typeof EntityAgentsActions.GetEntityAgentsFailure
  payload: {
    error: string
  }
}

export interface UpdateEntityAgentStatusAction {
  type: typeof EntityAgentsActions.UpdateEntityAgentStatus
  payload: EntityAgent[]
}

export interface UpdateEntityAgentStatusSuccessAction {
  type: typeof EntityAgentsActions.UpdateEntityAgentStatusSuccess
  payload: {
    agentDid: string
    status: AgentStatus
  }
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

export interface CreateEntityAgentAction {
  type: typeof EntityAgentsActions.CreateEntityAgent
  payload: EntityAgent
}

export interface CreateEntityAgentSuccessAction {
  type: typeof EntityAgentsActions.CreateEntityAgentSuccess
  payload: {
    agent: EntityAgent
  }
}

export interface CreateEntityAgentPendingAction {
  type: typeof EntityAgentsActions.CreateEntityAgentPending
}

export interface CreateEntityAgentFailureAction {
  type: typeof EntityAgentsActions.CreateEntityAgentFailure
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
  | CreateEntityAgentAction
  | CreateEntityAgentSuccessAction
  | CreateEntityAgentPendingAction
  | CreateEntityAgentFailureAction
