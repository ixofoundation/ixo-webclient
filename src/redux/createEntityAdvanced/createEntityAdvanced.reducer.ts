import { v4 as uuidv4 } from 'uuid'
import {
  CreateEntityAdvancedState,
  CreateEntityAdvancedActionTypes,
  CreateEntityAdvancedActions,
} from './createEntityAdvanced.types'
import { CreateEntityActionTypes, CreateEntityActions } from '../createEntityOld/createEntity.types'
import { omitKey } from 'utils'
import { LinkedResourceType } from 'modules/Entities/types'

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
  liquidity: {},
  keys: {},
  services: {},
  dataResources: {},
  linkedResources: {},
  validation: {},
} as any

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
        } as any,
      }
    case CreateEntityAdvancedActions.RemoveLinkedEntity:
      return {
        ...state,
        linkedEntities: omitKey(state.linkedEntities, action.payload.id),
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
        } as any,
      }
    case CreateEntityAdvancedActions.RemovePayment:
      return {
        ...state,
        payments: omitKey(state.payments, action.payload.id),
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
        } as any,
      }
    case CreateEntityAdvancedActions.RemoveStake:
      return {
        ...state,
        staking: omitKey(state.staking, action.payload.id),
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
        } as any,
      }
    case CreateEntityAdvancedActions.RemoveNode:
      return {
        ...state,
        nodes: omitKey(state.nodes, action.payload.id),
      }
    case CreateEntityAdvancedActions.UpdateNode:
      return {
        ...state,
        nodes: {
          ...state.nodes,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.AddLiquidity:
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
        } as any,
      }
    case CreateEntityAdvancedActions.RemoveLiquidity:
      return {
        ...state,
        liquidity: omitKey(state.liquidity, action.payload.id),
      }
    case CreateEntityAdvancedActions.UpdateLiquidity:
      return {
        ...state,
        liquidity: {
          ...state.liquidity,
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
        } as any,
      }
    case CreateEntityAdvancedActions.RemoveKey:
      return {
        ...state,
        keys: omitKey(state.keys, action.payload.id),
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
        } as any,
      }
    case CreateEntityAdvancedActions.RemoveService:
      return {
        ...state,
        services: omitKey(state.services, action.payload.id),
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
        } as any,
      }
    case CreateEntityAdvancedActions.RemoveDataResource:
      return {
        ...state,
        dataResources: omitKey(state.dataResources, action.payload.id),
      }
    case CreateEntityAdvancedActions.UpdateDataResource:
      return {
        ...state,
        dataResources: {
          ...state.dataResources,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case CreateEntityAdvancedActions.AddLinkedResourcesSection:
      return {
        ...state,
        linkedResources: {
          ...state.linkedResources,
          ...{
            [action.payload.id]: {
              ...action.payload,
              type: LinkedResourceType.UNDEFINED,
              path: '',
              name: '',
              description: '',
            },
          },
        },
      }
    case CreateEntityAdvancedActions.RemoveLinkedResourcesSection:
      return {
        ...state,
        linkedResources: omitKey(state.linkedResources, action.payload.id),
      }
    case CreateEntityAdvancedActions.UpdateLinkedResourcesSuccess:
      return {
        ...state,
        linkedResources: {
          ...state.linkedResources,
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
        ...action.payload,
      }
    case CreateEntityActions.NewEntity:
    case CreateEntityActions.CreateEntitySuccess:
    case CreateEntityActions.ClearEntity:
      return initialState
  }

  return state
}
