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
          ...convertArrayToObject(action.payload, 'did'),
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
  }

  return initialState
}
