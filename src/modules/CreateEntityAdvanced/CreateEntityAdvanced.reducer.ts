import {
  CreateEntityAdvancedState,
  CreateEntityAdvancedActionTypes,
  CreateEntityAdvancedActions,
} from './types'
import * as reduxUtils from '../../common/redux/utils'

export const initialState: CreateEntityAdvancedState = {
  linkedEntities: {},
  payments: {},
  staking: {},
  nodes: {},
  funding: {},
  keys: {},
  services: {},
  dataResources: {},
}

export const reducer = (
  state = initialState,
  action: CreateEntityAdvancedActionTypes,
): CreateEntityAdvancedState => {
  switch (action.type) {
    case CreateEntityAdvancedActions.AddLinkedEntity:
      return {
        ...state,
        linkedEntities: {
          ...state.linkedEntities,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.RemoveLinkedEntity:
      return {
        ...state,
        linkedEntities: reduxUtils.omitKey(
          state.linkedEntities,
          action.payload.id,
        ),
      }
    case CreateEntityAdvancedActions.UpdateLinkedEntity:
      return {
        ...state,
        linkedEntities: {
          ...state.linkedEntities,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.AddPayment:
      return {
        ...state,
        payments: {
          ...state.payments,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.RemovePayment:
      return {
        ...state,
        payments: reduxUtils.omitKey(state.payments, action.payload.id),
      }
    case CreateEntityAdvancedActions.UpdatePayment:
      return {
        ...state,
        payments: {
          ...state.payments,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.AddStake:
      return {
        ...state,
        staking: {
          ...state.staking,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.RemoveStake:
      return {
        ...state,
        staking: reduxUtils.omitKey(state.staking, action.payload.id),
      }
    case CreateEntityAdvancedActions.UpdateStake:
      return {
        ...state,
        staking: {
          ...state.staking,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.AddNode:
      return {
        ...state,
        nodes: {
          ...state.nodes,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.RemoveNode:
      return {
        ...state,
        nodes: reduxUtils.omitKey(state.nodes, action.payload.id),
      }
    case CreateEntityAdvancedActions.UpdateNode:
      return {
        ...state,
        nodes: {
          ...state.nodes,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.AddFund:
      return {
        ...state,
        funding: {
          ...state.funding,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.RemoveFund:
      return {
        ...state,
        funding: reduxUtils.omitKey(state.funding, action.payload.id),
      }
    case CreateEntityAdvancedActions.UpdateFund:
      return {
        ...state,
        funding: {
          ...state.funding,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.AddKey:
      return {
        ...state,
        keys: {
          ...state.keys,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.RemoveKey:
      return {
        ...state,
        keys: reduxUtils.omitKey(state.keys, action.payload.id),
      }
    case CreateEntityAdvancedActions.UpdateKey:
      return {
        ...state,
        keys: {
          ...state.keys,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.AddService:
      return {
        ...state,
        services: {
          ...state.services,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.RemoveService:
      return {
        ...state,
        services: reduxUtils.omitKey(state.services, action.payload.id),
      }
    case CreateEntityAdvancedActions.UpdateService:
      return {
        ...state,
        services: {
          ...state.services,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.AddDataResource:
      return {
        ...state,
        dataResources: {
          ...state.dataResources,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.RemoveDataResource:
      return {
        ...state,
        dataResources: reduxUtils.omitKey(
          state.dataResources,
          action.payload.id,
        ),
      }
    case CreateEntityAdvancedActions.UpdateDataResource:
      return {
        ...state,
        dataResources: {
          ...state.dataResources,
          ...{ [action.payload.id]: action.payload },
        },
      }
  }

  return state
}
