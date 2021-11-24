import { convertArrayToObject } from 'common/utils/transformationUtils'
import {
  EntityAgentsState,
  GetEntityAgentsActionTypes,
  EntityAgentsActions,
} from './types'

export const initialState: EntityAgentsState = {
  agents: null,
  isFetching: false,
  fetchError: null,
  isUpdatingStatus: false,
  updateStatusError: null,
  isCreating: false,
  creationError: null,
}

export const reducer = (
  state = initialState,
  action: GetEntityAgentsActionTypes,
): EntityAgentsState => {
  switch (action.type) {
    case EntityAgentsActions.GetEntityAgentsPending:
      return {
        ...state,
        isFetching: true,
      }
    case EntityAgentsActions.GetEntityAgentsSuccess:
      return {
        ...state,
        agents: {
          ...state.agents,
          ...convertArrayToObject(action.payload.agents, 'agentDid'),
        },
        isFetching: false,
        fetchError: null,
      }
    case EntityAgentsActions.GetEntityAgentsFailure:
      return {
        ...state,
        isFetching: false,
        fetchError: action.payload.error,
      }
    case EntityAgentsActions.UpdateEntityAgentStatusPending:
      return {
        ...state,
        isUpdatingStatus: true,
      }
    case EntityAgentsActions.UpdateEntityAgentStatusSuccess:
      return {
        ...state,
        agents: {
          ...state.agents,
          [action.payload.agentDid]: {
            ...state.agents[action.payload.agentDid],
            status: action.payload.status,
          },
        },
        isUpdatingStatus: false,
        updateStatusError: null,
      }
    case EntityAgentsActions.UpdateEntityAgentStatusFailure:
      return {
        ...state,
        isUpdatingStatus: false,
        updateStatusError: action.payload.error,
      }
    case EntityAgentsActions.CreateEntityAgentPending:
      return {
        ...state,
        isCreating: true,
      }
    case EntityAgentsActions.CreateEntityAgentSuccess:
      return {
        ...state,
        agents: {
          ...state.agents,
          [action.payload.agent.agentDid]: action.payload.agent,
        },
        isCreating: false,
        creationError: null,
      }
    case EntityAgentsActions.CreateEntityAgentFailure:
      return {
        ...state,
        isCreating: false,
        creationError: action.payload.error,
      }
  }

  return state
}
