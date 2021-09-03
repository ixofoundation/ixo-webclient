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
} from '../../../types'

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

export interface EditEntityAdvancedState {
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

export enum EditEntityAdvancedActions {
  // Linked Entity
  AddLinkedEntity = 'ixo/EditEntityAdvanced/ADD_LINKED_ENTITY',
  RemoveLinkedEntity = 'ixo/EditEntityAdvanced/REMOVE_LINKED_ENTITY',
  UpdateLinkedEntity = 'ixo/EditEntityAdvanced/UPDATE_LINKED_ENTITY',
  // Payment
  AddPayment = 'ixo/EditEntityAdvanced/ADD_PAYMENT',
  RemovePayment = 'ixo/EditEntityAdvanced/REMOVE_PAYMENT',
  UpdatePayment = 'ixo/EditEntityAdvanced/UPDATE_PAYMENT',
  // Staking
  AddStake = 'ixo/EditEntityAdvanced/ADD_STAKE',
  RemoveStake = 'ixo/EditEntityAdvanced/REMOVE_STAKE',
  UpdateStake = 'ixo/EditEntityAdvanced/UPDATE_STAKE',
  // Nodes
  AddNode = 'ixo/EditEntityAdvanced/ADD_NODE',
  RemoveNode = 'ixo/EditEntityAdvanced/REMOVE_NODE',
  UpdateNode = 'ixo/EditEntityAdvanced/UPDATE_NODE',
  // Funding
  AddFund = 'ixo/EditEntityAdvanced/ADD_FUND',
  RemoveFund = 'ixo/EditEntityAdvanced/REMOVE_FUND',
  UpdateFund = 'ixo/EditEntityAdvanced/UPDATE_FUND',
  // Key
  AddKey = 'ixo/EditEntityAdvanced/ADD_KEY',
  RemoveKey = 'ixo/EditEntityAdvanced/REMOVE_KEY',
  UpdateKey = 'ixo/EditEntityAdvanced/UPDATE_KEY',
  // Service
  AddService = 'ixo/EditEntityAdvanced/ADD_SERVICE',
  RemoveService = 'ixo/EditEntityAdvanced/REMOVE_SERVICE',
  UpdateService = 'ixo/EditEntityAdvanced/UPDATE_SERVICE',
  // Data Resource
  AddDataResource = 'ixo/EditEntityAdvanced/ADD_DATA_RESOURCE',
  RemoveDataResource = 'ixo/EditEntityAdvanced/REMOVE_DATA_RESOURCE',
  UpdateDataResource = 'ixo/EditEntityAdvanced/UPDATE_DATA_RESOURCE',
  // Validation
  Validated = 'ixo/EditEntityAdvanced/SET_VALIDATED',
  ValidationError = 'ixo/EditEntityAdvanced/VALIDATION_ERROR',

  ImportEntityAdvanced = 'ixo/EditEntityAdvanced/IMPORT_ENTITY_ADVANCED'
}

export interface UpdateLinkedEntityAction {
  type: typeof EditEntityAdvancedActions.UpdateLinkedEntity
  payload: {
    id: string
    type: EntityType
    entityId: string
  }
}

export interface AddLinkedEntitySectionAction {
  type: typeof EditEntityAdvancedActions.AddLinkedEntity
  payload: {
    id: string
  }
}
export interface RemoveLinkedEntitySectionAction {
  type: typeof EditEntityAdvancedActions.RemoveLinkedEntity
  payload: {
    id: string
  }
}

export interface AddPaymentSectionAction {
  type: typeof EditEntityAdvancedActions.AddPayment
  payload: {
    id: string
  }
}
export interface RemovePaymentSectionAction {
  type: typeof EditEntityAdvancedActions.RemovePayment
  payload: {
    id: string
  }
}

export interface UpdatePaymentAction {
  type: typeof EditEntityAdvancedActions.UpdatePayment
  payload: {
    id: string
    type: PaymentType
    paymentId: string
  }
}

export interface AddStakeSectionAction {
  type: typeof EditEntityAdvancedActions.AddStake
  payload: {
    id: string
  }
}
export interface RemoveStakeSectionAction {
  type: typeof EditEntityAdvancedActions.RemoveStake
  payload: {
    id: string
  }
}

export interface UpdateStakeAction {
  type: typeof EditEntityAdvancedActions.UpdateStake
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
  type: typeof EditEntityAdvancedActions.AddNode
  payload: {
    id: string
  }
}
export interface RemoveNodeSectionAction {
  type: typeof EditEntityAdvancedActions.RemoveNode
  payload: {
    id: string
  }
}

export interface UpdateNodeAction {
  type: typeof EditEntityAdvancedActions.UpdateNode
  payload: {
    id: string
    type: NodeType
    nodeId: string
    serviceEndpoint: string
  }
}

export interface AddFundSectionAction {
  type: typeof EditEntityAdvancedActions.AddFund
  payload: {
    id: string
  }
}

export interface RemoveFundSectionAction {
  type: typeof EditEntityAdvancedActions.RemoveFund
  payload: {
    id: string
  }
}

export interface UpdateFundAction {
  type: typeof EditEntityAdvancedActions.UpdateFund
  payload: {
    id: string
    source: FundSource
    fundId: string
  }
}

export interface AddKeySectionAction {
  type: typeof EditEntityAdvancedActions.AddKey
  payload: {
    id: string
  }
}
export interface RemoveKeySectionAction {
  type: typeof EditEntityAdvancedActions.RemoveKey
  payload: {
    id: string
  }
}

export interface UpdateKeyAction {
  type: typeof EditEntityAdvancedActions.UpdateKey
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
  type: typeof EditEntityAdvancedActions.AddService
  payload: {
    id: string
  }
}

export interface RemoveServiceSectionAction {
  type: typeof EditEntityAdvancedActions.RemoveService
  payload: {
    id: string
  }
}

export interface UpdateServiceAction {
  type: typeof EditEntityAdvancedActions.UpdateService
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
  type: typeof EditEntityAdvancedActions.AddFund
  payload: {
    id: string
  }
}

export interface RemoveFundSectionAction {
  type: typeof EditEntityAdvancedActions.RemoveFund
  payload: {
    id: string
  }
}

export interface AddDataResourceSectionAction {
  type: typeof EditEntityAdvancedActions.AddDataResource
  payload: {
    id: string
  }
}

export interface RemoveDataResourceSectionAction {
  type: typeof EditEntityAdvancedActions.RemoveDataResource
  payload: {
    id: string
  }
}

export interface UpdateDataResourceAction {
  type: typeof EditEntityAdvancedActions.UpdateDataResource
  payload: {
    id: string
    type: DataResourceType
    dataId: string
    serviceEndpoint: string
    properties: string
  }
}

export interface ValidatedAction {
  type: typeof EditEntityAdvancedActions.Validated
  payload: {
    identifier: string
  }
}

export interface ValidationErrorAction {
  type: typeof EditEntityAdvancedActions.ValidationError
  payload: {
    identifier: string
    errors: string[]
  }
}

export interface ImportEntityAdvanced {
  type: typeof EditEntityAdvancedActions.ImportEntityAdvanced
  payload: any
}

export type EditEntityAdvancedActionTypes =
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