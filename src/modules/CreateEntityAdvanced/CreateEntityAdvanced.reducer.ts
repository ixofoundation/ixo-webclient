import {
  CreateEntityAdvancedState,
  CreateEntityAdvancedActionTypes,
  CreateEntityAdvancedActions,
} from './types'
import * as reduxUtils from '../../common/redux/utils'

export const initialState: CreateEntityAdvancedState = {
  linkedEntity: {
    entityId: null,
    type: null,
  },
  payment: {
    denomination: null,
    maxAmount: null,
    maxUnits: null,
    paymentId: null,
    type: null,
  },
  staking: {},
  nodes: {},
  funding: {},
  key: {
    controllerId: null,
    dateCreated: null,
    dateUpdated: null,
    denomination: null,
    purpose: null,
    type: null,
  },
  service: {
    endpoint: null,
    otherParams: null,
    publicKey: null,
    shortDescription: null,
    type: null,
  },
  dataResources: {},
}

export const reducer = (
  state = initialState,
  action: CreateEntityAdvancedActionTypes,
): CreateEntityAdvancedState => {
  switch (action.type) {
    case CreateEntityAdvancedActions.UpdateLinkedEntity:
      return {
        ...state,
        linkedEntity: action.payload,
      }
    case CreateEntityAdvancedActions.UpdatePayment:
      return {
        ...state,
        payment: action.payload,
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
    case CreateEntityAdvancedActions.UpdateKey:
      return {
        ...state,
        key: action.payload,
      }
    case CreateEntityAdvancedActions.UpdateService:
      return {
        ...state,
        service: action.payload,
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
