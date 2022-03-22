import { v4 as uuidv4 } from 'uuid'
import {
  EditEntityAdvancedState,
  EditEntityAdvancedActionTypes,
  EditEntityAdvancedActions,
} from './types'
import { EditEntityActionTypes, EditEntityActions } from '../types'
import * as reduxUtils from 'common/redux/utils'

const firstNodeId = uuidv4()

export const initialState: EditEntityAdvancedState = {
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
  liquidity: {},
  keys: {},
  services: {},
  dataResources: {},
  validation: {},
}

export const reducer = (
  state = initialState,
  action: EditEntityAdvancedActionTypes | EditEntityActionTypes,
): EditEntityAdvancedState => {
  switch (action.type) {
    case EditEntityAdvancedActions.AddLinkedEntity:
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
    case EditEntityAdvancedActions.RemoveLinkedEntity:
      return {
        ...state,
        linkedEntities: reduxUtils.omitKey(
          state.linkedEntities,
          action.payload.id,
        ),
      }
    case EditEntityAdvancedActions.UpdateLinkedEntity:
      return {
        ...state,
        linkedEntities: {
          ...state.linkedEntities,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case EditEntityAdvancedActions.AddPayment:
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
    case EditEntityAdvancedActions.RemovePayment:
      return {
        ...state,
        payments: reduxUtils.omitKey(state.payments, action.payload.id),
      }
    case EditEntityAdvancedActions.UpdatePayment:
      return {
        ...state,
        payments: {
          ...state.payments,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case EditEntityAdvancedActions.AddStake:
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
    case EditEntityAdvancedActions.RemoveStake:
      return {
        ...state,
        staking: reduxUtils.omitKey(state.staking, action.payload.id),
      }
    case EditEntityAdvancedActions.UpdateStake:
      return {
        ...state,
        staking: {
          ...state.staking,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case EditEntityAdvancedActions.AddNode:
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
    case EditEntityAdvancedActions.RemoveNode:
      return {
        ...state,
        nodes: reduxUtils.omitKey(state.nodes, action.payload.id),
      }
    case EditEntityAdvancedActions.UpdateNode:
      return {
        ...state,
        nodes: {
          ...state.nodes,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case EditEntityAdvancedActions.AddLiquidity:
      return {
        ...state,
        liquidity: {
          ...state.liquidity,
          ...{
            [action.payload.id]: {
              ...action.payload,
              source: undefined,
              liquidityId: undefined,
            },
          },
        },
      }
    case EditEntityAdvancedActions.RemoveLiquidity:
      return {
        ...state,
        liquidity: reduxUtils.omitKey(state.liquidity, action.payload.id),
      }
    case EditEntityAdvancedActions.UpdateLiquidity:
      return {
        ...state,
        liquidity: {
          ...state.liquidity,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case EditEntityAdvancedActions.AddKey:
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
    case EditEntityAdvancedActions.RemoveKey:
      return {
        ...state,
        keys: reduxUtils.omitKey(state.keys, action.payload.id),
      }
    case EditEntityAdvancedActions.UpdateKey:
      return {
        ...state,
        keys: {
          ...state.keys,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case EditEntityAdvancedActions.AddService:
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
    case EditEntityAdvancedActions.RemoveService:
      return {
        ...state,
        services: reduxUtils.omitKey(state.services, action.payload.id),
      }
    case EditEntityAdvancedActions.UpdateService:
      return {
        ...state,
        services: {
          ...state.services,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case EditEntityAdvancedActions.AddDataResource:
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
    case EditEntityAdvancedActions.RemoveDataResource:
      return {
        ...state,
        dataResources: reduxUtils.omitKey(
          state.dataResources,
          action.payload.id,
        ),
      }
    case EditEntityAdvancedActions.UpdateDataResource:
      return {
        ...state,
        dataResources: {
          ...state.dataResources,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case EditEntityAdvancedActions.Validated:
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
    case EditEntityAdvancedActions.ValidationError:
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
    case EditEntityAdvancedActions.ImportEntityAdvanced:
      return {
        ...state,
        ...action.payload,
      }
    case EditEntityActions.NewEntity:
    case EditEntityActions.EditEntitySuccess:
      return initialState
  }

  return state
}
