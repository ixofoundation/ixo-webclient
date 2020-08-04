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
} from '../Entities/types'

export interface LinkedEntity {
  type: EntityType
  entityId: string
}

export interface Payment {
  type: PaymentType
  paymentId: string
  denomination: PaymentDenomination
  maxAmount: number
  maxUnits: number
}

export interface Stake {
  id: string
  type: StakeType
  stakeId: string
  denomination: PaymentDenomination
  depositAddress: string
  minStake: number
  slashingCondition: SlashingCondition
  slashFactor: number
  maxSlashAmount: number
  unbondingPeriod: number
}
export interface Node {
  id: string
  type: NodeType
  nodeId: string
}

export interface Fund {
  id: string
  source: FundSource
  fundId: string
}

export interface Key {
  purpose: KeyPurpose
  type: KeyType
  denomination: PaymentDenomination
  controllerId: string
  dateCreated: string
  dateUpdated: string
}

export interface Service {
  type: ServiceType
  shortDescription: string
  endpoint: string
  publicKey: string
  otherParams: string
}

export interface DataResource {
  id: string
  type: DataResourceType
  dataId: string
  resourceLocator: string
  otherParams: string
}

export interface CreateEntityAdvancedState {
  linkedEntity: LinkedEntity
  payment: Payment
  staking: {
    [id: string]: Stake
  }
  nodes: {
    [id: string]: Node
  }
  funding: {
    [id: string]: Fund
  }
  key: Key
  service: Service
  dataResources: {
    [id: string]: DataResource
  }
}

export enum CreateEntityAdvancedActions {
  // Linked Entity
  UpdateLinkedEntity = 'ixo/CreateEntityAdvanced/UPDATE_LINKED_ENTITY',
  // Payment
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
  UpdateKey = 'ixo/CreateEntityAdvanced/UPDATE_KEY',
  // Service
  UpdateService = 'ixo/CreateEntityAdvanced/UPDATE_SERVICE',
  // Data Resource
  AddDataResource = 'ixo/CreateEntityAdvanced/ADD_DATA_RESOURCE',
  RemoveDataResource = 'ixo/CreateEntityAdvanced/REMOVE_DATA_RESOURCE',
  UpdateDataResource = 'ixo/CreateEntityAdvanced/UPDATE_DATA_RESOURCE',
}

export interface UpdateLinkedEntityAction {
  type: typeof CreateEntityAdvancedActions.UpdateLinkedEntity
  payload: {
    type: EntityType
    entityId: string
  }
}

export interface UpdatePaymentAction {
  type: typeof CreateEntityAdvancedActions.UpdatePayment
  payload: {
    type: PaymentType
    paymentId: string
    denomination: PaymentDenomination
    maxAmount: number
    maxUnits: number
  }
}

export interface AddStakeSectionAction {
  type: typeof CreateEntityAdvancedActions.AddStake
  payload: {
    id: string
    type: StakeType
    stakeId: string
    denomination: PaymentDenomination
    depositAddress: string
    minStake: number
    slashingCondition: SlashingCondition
    slashFactor: number
    maxSlashAmount: number
    unbondingPeriod: number
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
    denomination: PaymentDenomination
    depositAddress: string
    minStake: number
    slashingCondition: SlashingCondition
    slashFactor: number
    maxSlashAmount: number
    unbondingPeriod: number
  }
}

export interface AddNodeSectionAction {
  type: typeof CreateEntityAdvancedActions.AddNode
  payload: {
    id: string
    type: NodeType
    nodeId: string
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
  }
}

export interface AddFundSectionAction {
  type: typeof CreateEntityAdvancedActions.AddFund
  payload: {
    id: string
    source: FundSource
    fundId: string
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

export interface UpdateKeyAction {
  type: typeof CreateEntityAdvancedActions.UpdateKey
  payload: {
    purpose: KeyPurpose
    type: KeyType
    denomination: PaymentDenomination
    controllerId: string
    dateCreated: string
    dateUpdated: string
  }
}

export interface UpdateServiceAction {
  type: typeof CreateEntityAdvancedActions.UpdateService
  payload: {
    type: ServiceType
    shortDescription: string
    endpoint: string
    publicKey: string
    otherParams: string
  }
}

export interface AddFundSectionAction {
  type: typeof CreateEntityAdvancedActions.AddFund
  payload: {
    id: string
    source: FundSource
    fundId: string
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
    type: DataResourceType
    dataId: string
    resourceLocator: string
    otherParams: string
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
    resourceLocator: string
    otherParams: string
  }
}

export type CreateEntityAdvancedActionTypes =
  | UpdateLinkedEntityAction
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
  | UpdateKeyAction
  | UpdateServiceAction
  | AddDataResourceSectionAction
  | RemoveDataResourceSectionAction
  | UpdateDataResourceAction
