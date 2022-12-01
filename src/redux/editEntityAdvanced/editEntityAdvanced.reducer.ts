import { v4 as uuidv4 } from 'uuid'
import {
  EditEntityAdvancedState,
  EditEntityAdvancedActionTypes,
  EditEntityAdvancedActions,
} from './editEntityAdvanced.types'
import { EditEntityActionTypes, EditEntityActions } from '../editEntity/editEntity.types'
import { omitKey } from 'utils'
import { LinkedResourceType } from 'types/entities'

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
  linkedResources: {},
  validation: {},
} as any

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
        } as any,
      }
    case EditEntityAdvancedActions.RemoveLinkedEntity:
      return {
        ...state,
        linkedEntities: omitKey(state.linkedEntities, action.payload.id),
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
        } as any,
      }
    case EditEntityAdvancedActions.RemovePayment:
      return {
        ...state,
        payments: omitKey(state.payments, action.payload.id),
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
        } as any,
      }
    case EditEntityAdvancedActions.RemoveStake:
      return {
        ...state,
        staking: omitKey(state.staking, action.payload.id),
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
        } as any,
      }
    case EditEntityAdvancedActions.RemoveNode:
      return {
        ...state,
        nodes: omitKey(state.nodes, action.payload.id),
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
        } as any,
      }
    case EditEntityAdvancedActions.RemoveLiquidity:
      return {
        ...state,
        liquidity: omitKey(state.liquidity, action.payload.id),
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
        } as any,
      }
    case EditEntityAdvancedActions.RemoveKey:
      return {
        ...state,
        keys: omitKey(state.keys, action.payload.id),
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
        } as any,
      }
    case EditEntityAdvancedActions.RemoveService:
      return {
        ...state,
        services: omitKey(state.services, action.payload.id),
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
        } as any,
      }
    case EditEntityAdvancedActions.RemoveDataResource:
      return {
        ...state,
        dataResources: omitKey(state.dataResources, action.payload.id),
      }
    case EditEntityAdvancedActions.UpdateDataResource:
      return {
        ...state,
        dataResources: {
          ...state.dataResources,
          ...{ [action.payload.id]: action.payload },
        },
      }
    case EditEntityAdvancedActions.AddLinkedResourcesSection:
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
    case EditEntityAdvancedActions.RemoveLinkedResourcesSection:
      return {
        ...state,
        linkedResources: omitKey(state.linkedResources, action.payload.id),
      }
    case EditEntityAdvancedActions.UpdateLinkedResourcesSuccess:
      return {
        ...state,
        linkedResources: {
          ...state.linkedResources,
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
