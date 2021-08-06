import { v4 as uuidv4 } from 'uuid'
import {
  CreateEntityAdvancedState,
  CreateEntityAdvancedActionTypes,
  CreateEntityAdvancedActions,
} from './types'
import { CreateEntityActionTypes, CreateEntityActions } from '../types'
import * as reduxUtils from 'common/redux/utils'

const firstNodeId = uuidv4()

export const initialState: CreateEntityAdvancedState = {
  linkedEntities: {},
  payments: {},
  staking: {},
  nodes: {
    [firstNodeId]: {
      id: firstNodeId,
      type: undefined,
      nodeId: undefined,
    },
  },
  funding: {},
  keys: {},
  services: {},
  dataResources: {},
  validation: {},
}

export const reducer = (
  state = initialState,
  action: CreateEntityAdvancedActionTypes | CreateEntityActionTypes,
): CreateEntityAdvancedState => {
  switch (action.type) {
    case CreateEntityAdvancedActions.AddLinkedEntity:
      return {
        ...state,
        linkedEntities: {
          ...state.linkedEntities,
          ...{
            [action.payload.id]: {
              ...action.payload,
              type: undefined,
              entityId: undefined,
            },
          },
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
          ...{
            [action.payload.id]: {
              ...action.payload,
              type: undefined,
              paymentId: undefined,
            },
          },
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
          ...{
            [action.payload.id]: {
              ...action.payload,
              type: undefined,
              stakeId: undefined,
              denom: undefined,
              stakeAddress: undefined,
              minStake: undefined,
              slashCondition: undefined,
              slashFactor: undefined,
              slashAmount: undefined,
              unbondPeriod: undefined,
            },
          },
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
          ...{
            [action.payload.id]: {
              ...action.payload,
              type: undefined,
              nodeId: undefined,
            },
          },
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
          ...{
            [action.payload.id]: {
              ...action.payload,
              source: undefined,
              fundId: undefined,
            },
          },
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
          ...{
            [action.payload.id]: {
              ...action.payload,
              purpose: undefined,
              type: undefined,
              controller: undefined,
              dateCreated: undefined,
              dateUpdated: undefined,
              keyValue: undefined,
              signature: undefined,
            },
          },
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
          ...{
            [action.payload.id]: {
              ...action.payload,
              type: undefined,
              shortDescription: undefined,
              serviceEndpoint: undefined,
              properties: undefined,
              publicKey: undefined,
              serviceId: undefined,
            },
          },
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
          ...{
            [action.payload.id]: {
              ...action.payload,
              type: undefined,
              dataId: undefined,
              serviceEndpoint: undefined,
              properties: undefined,
            },
          },
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
    case CreateEntityAdvancedActions.Validated:
      return {
        ...state,
        validation: {
          ...state.validation,
          ...{
            [action.payload.identifier]: {
              identifier: action.payload.identifier,
              validated: true,
              errors: [],
            },
          },
        },
      }
    case CreateEntityAdvancedActions.ValidationError:
      return {
        ...state,
        validation: {
          ...state.validation,
          ...{
            [action.payload.identifier]: {
              identifier: action.payload.identifier,
              validated: false,
              errors: action.payload.errors,
            },
          },
        },
      }
    case CreateEntityAdvancedActions.ImportEntityAdvanced:
      return {
        ...state,
        ...action.payload
      }
    case CreateEntityActions.NewEntity:
    case CreateEntityActions.CreateEntitySuccess:
      return initialState
  }

  return state
}
