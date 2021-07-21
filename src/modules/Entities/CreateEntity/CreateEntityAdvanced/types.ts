import { Validation } from '../types'

import {
  EntityType,
  PaymentType,
  PaymentDenomination,
  SlashingCondition,
  KeyPurpose,
  ServiceType,
  DataResourceType,
  KeyType,
  StakeType,
  NodeType,
  FundSource,
} from '../../types'

export interface LinkedEntity {
  id: string
  type: EntityType
  entityId: string
}

export interface Payment {
  id: string
  type: PaymentType
  paymentId: string
}

export interface Stake {
  id: string
  type: StakeType
  stakeId: string
  denom: PaymentDenomination
  stakeAddress: string
  minStake: number
  slashCondition: SlashingCondition
  slashFactor: number
  slashAmount: number
  unbondPeriod: number
}
export interface Node {
  id: string
  type: NodeType
  nodeId: string
  serviceEndpoint?: string
}

export interface Fund {
  id: string
  source: FundSource
  fundId: string
}

export interface Key {
  id: string
  purpose: KeyPurpose
  type: KeyType
  keyValue: string
  controller: string
  signature: string
  dateCreated: string
  dateUpdated: string
}

export interface Service {
  id: string
  type: ServiceType
  shortDescription: string
  serviceEndpoint: string
  publicKey: string
  properties: string
  serviceId: string
}

export interface DataResource {
  id: string
  type: DataResourceType
  dataId: string
  serviceEndpoint: string
  properties: string
}

export interface CreateEntityAdvancedState {
  linkedEntities: {
    [id: string]: LinkedEntity
  }
  payments: {
    [id: string]: Payment
  }
  staking: {
    [id: string]: Stake
  }
  nodes: {
    [id: string]: Node
  }
  funding: {
    [id: string]: Fund
  }
  keys: {
    [id: string]: Key
  }
  services: {
    [id: string]: Service
  }
  dataResources: {
    [id: string]: DataResource
  }
  validation: {
    [identifier: string]: Validation
  }
}

export enum CreateEntityAdvancedActions {
  // Linked Entity
  AddLinkedEntity = 'ixo/CreateEntityAdvanced/ADD_LINKED_ENTITY',
  RemoveLinkedEntity = 'ixo/CreateEntityAdvanced/REMOVE_LINKED_ENTITY',
  UpdateLinkedEntity = 'ixo/CreateEntityAdvanced/UPDATE_LINKED_ENTITY',
  // Payment
  AddPayment = 'ixo/CreateEntityAdvanced/ADD_PAYMENT',
  RemovePayment = 'ixo/CreateEntityAdvanced/REMOVE_PAYMENT',
  UpdatePayment = 'ixo/CreateEntityAdvanced/UPDATE_PAYMENT',
  // Staking
  AddStake = 'ixo/CreateEntityAdvanced/ADD_STAKE',
  RemoveStake = 'ixo/CreateEntityAdvanced/REMOVE_STAKE',
  UpdateStake = 'ixo/CreateEntityAdvanced/UPDATE_STAKE',
  // Nodes
  AddNode = 'ixo/CreateEntityAdvanced/ADD_NODE',
  RemoveNode = 'ixo/CreateEntityAdvanced/REMOVE_NODE',
  UpdateNode = 'ixo/CreateEntityAdvanced/UPDATE_NODE',
  // Funding
  AddFund = 'ixo/CreateEntityAdvanced/ADD_FUND',
  RemoveFund = 'ixo/CreateEntityAdvanced/REMOVE_FUND',
  UpdateFund = 'ixo/CreateEntityAdvanced/UPDATE_FUND',
  // Key
  AddKey = 'ixo/CreateEntityAdvanced/ADD_KEY',
  RemoveKey = 'ixo/CreateEntityAdvanced/REMOVE_KEY',
  UpdateKey = 'ixo/CreateEntityAdvanced/UPDATE_KEY',
  // Service
  AddService = 'ixo/CreateEntityAdvanced/ADD_SERVICE',
  RemoveService = 'ixo/CreateEntityAdvanced/REMOVE_SERVICE',
  UpdateService = 'ixo/CreateEntityAdvanced/UPDATE_SERVICE',
  // Data Resource
  AddDataResource = 'ixo/CreateEntityAdvanced/ADD_DATA_RESOURCE',
  RemoveDataResource = 'ixo/CreateEntityAdvanced/REMOVE_DATA_RESOURCE',
  UpdateDataResource = 'ixo/CreateEntityAdvanced/UPDATE_DATA_RESOURCE',
  // Validation
  Validated = 'ixo/CreateEntityAdvanced/SET_VALIDATED',
  ValidationError = 'ixo/CreateEntityAdvanced/VALIDATION_ERROR',

  ImportEntityAdvanced = 'ixo/CreateEntityAdvanced/IMPORT_ENTITY_ADVANCED'
}

export interface UpdateLinkedEntityAction {
  type: typeof CreateEntityAdvancedActions.UpdateLinkedEntity
  payload: {
    id: string
    type: EntityType
    entityId: string
  }
}

export interface AddLinkedEntitySectionAction {
  type: typeof CreateEntityAdvancedActions.AddLinkedEntity
  payload: {
    id: string
  }
}
export interface RemoveLinkedEntitySectionAction {
  type: typeof CreateEntityAdvancedActions.RemoveLinkedEntity
  payload: {
    id: string
  }
}

export interface AddPaymentSectionAction {
  type: typeof CreateEntityAdvancedActions.AddPayment
  payload: {
    id: string
  }
}
export interface RemovePaymentSectionAction {
  type: typeof CreateEntityAdvancedActions.RemovePayment
  payload: {
    id: string
  }
}

export interface UpdatePaymentAction {
  type: typeof CreateEntityAdvancedActions.UpdatePayment
  payload: {
    id: string
    type: PaymentType
    paymentId: string
  }
}

export interface AddStakeSectionAction {
  type: typeof CreateEntityAdvancedActions.AddStake
  payload: {
    id: string
  }
}
export interface RemoveStakeSectionAction {
  type: typeof CreateEntityAdvancedActions.RemoveStake
  payload: {
    id: string
  }
}

export interface UpdateStakeAction {
  type: typeof CreateEntityAdvancedActions.UpdateStake
  payload: {
    id: string
    type: StakeType
    stakeId: string
    denom: PaymentDenomination
    stakeAddress: string
    minStake: number
    slashCondition: SlashingCondition
    slashFactor: number
    slashAmount: number
    unbondPeriod: number
  }
}

export interface AddNodeSectionAction {
  type: typeof CreateEntityAdvancedActions.AddNode
  payload: {
    id: string
  }
}
export interface RemoveNodeSectionAction {
  type: typeof CreateEntityAdvancedActions.RemoveNode
  payload: {
    id: string
  }
}

export interface UpdateNodeAction {
  type: typeof CreateEntityAdvancedActions.UpdateNode
  payload: {
    id: string
    type: NodeType
    nodeId: string
    serviceEndpoint: string
  }
}

export interface AddFundSectionAction {
  type: typeof CreateEntityAdvancedActions.AddFund
  payload: {
    id: string
  }
}

export interface RemoveFundSectionAction {
  type: typeof CreateEntityAdvancedActions.RemoveFund
  payload: {
    id: string
  }
}

export interface UpdateFundAction {
  type: typeof CreateEntityAdvancedActions.UpdateFund
  payload: {
    id: string
    source: FundSource
    fundId: string
  }
}

export interface AddKeySectionAction {
  type: typeof CreateEntityAdvancedActions.AddKey
  payload: {
    id: string
  }
}
export interface RemoveKeySectionAction {
  type: typeof CreateEntityAdvancedActions.RemoveKey
  payload: {
    id: string
  }
}

export interface UpdateKeyAction {
  type: typeof CreateEntityAdvancedActions.UpdateKey
  payload: {
    id: string
    purpose: KeyPurpose
    type: KeyType
    keyValue: string
    controller: string
    signature: string
    dateCreated: string
    dateUpdated: string
  }
}

export interface AddServiceSectionAction {
  type: typeof CreateEntityAdvancedActions.AddService
  payload: {
    id: string
  }
}

export interface RemoveServiceSectionAction {
  type: typeof CreateEntityAdvancedActions.RemoveService
  payload: {
    id: string
  }
}

export interface UpdateServiceAction {
  type: typeof CreateEntityAdvancedActions.UpdateService
  payload: {
    id: string
    type: ServiceType
    shortDescription: string
    serviceEndpoint: string
    publicKey: string
    properties: string
    serviceId: string
  }
}

export interface AddFundSectionAction {
  type: typeof CreateEntityAdvancedActions.AddFund
  payload: {
    id: string
  }
}

export interface RemoveFundSectionAction {
  type: typeof CreateEntityAdvancedActions.RemoveFund
  payload: {
    id: string
  }
}

export interface AddDataResourceSectionAction {
  type: typeof CreateEntityAdvancedActions.AddDataResource
  payload: {
    id: string
  }
}

export interface RemoveDataResourceSectionAction {
  type: typeof CreateEntityAdvancedActions.RemoveDataResource
  payload: {
    id: string
  }
}

export interface UpdateDataResourceAction {
  type: typeof CreateEntityAdvancedActions.UpdateDataResource
  payload: {
    id: string
    type: DataResourceType
    dataId: string
    serviceEndpoint: string
    properties: string
  }
}

export interface ValidatedAction {
  type: typeof CreateEntityAdvancedActions.Validated
  payload: {
    identifier: string
  }
}

export interface ValidationErrorAction {
  type: typeof CreateEntityAdvancedActions.ValidationError
  payload: {
    identifier: string
    errors: string[]
  }
}

export interface ImportEntityAdvanced {
  type: typeof CreateEntityAdvancedActions.ImportEntityAdvanced
  payload: any
}

export type CreateEntityAdvancedActionTypes =
  | AddLinkedEntitySectionAction
  | RemoveLinkedEntitySectionAction
  | UpdateLinkedEntityAction
  | AddPaymentSectionAction
  | RemovePaymentSectionAction
  | UpdatePaymentAction
  | AddStakeSectionAction
  | RemoveStakeSectionAction
  | UpdateStakeAction
  | AddNodeSectionAction
  | RemoveNodeSectionAction
  | UpdateNodeAction
  | AddFundSectionAction
  | RemoveFundSectionAction
  | UpdateFundAction
  | AddKeySectionAction
  | RemoveKeySectionAction
  | UpdateKeyAction
  | AddServiceSectionAction
  | RemoveServiceSectionAction
  | UpdateServiceAction
  | AddDataResourceSectionAction
  | RemoveDataResourceSectionAction
  | UpdateDataResourceAction
  | ValidatedAction
  | ValidationErrorAction
  | ImportEntityAdvanced