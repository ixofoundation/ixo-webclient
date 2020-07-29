import { EntityType } from '../Entities/types'

// temp enums
enum Denomination {
  Temp = 'Temp',
}

enum PaymentType {
  Temp = 'Temp',
}

enum SlashingCondition {
  Temp = 'Temp',
}

enum KeyType {
  Temp = 'Temp',
}

enum KeyPurpose {
  Temp = 'Temp',
}

enum ServiceType {
  Temp = 'Temp',
}

enum DataType {
  Temp = 'Temp',
}
// end temp enums

export interface LinkedEntity {
  type: EntityType
  entityId: string
}

export interface Payment {
  type: PaymentType
  paymentId: string
  denomination: Denomination
  maxAmount: number
  maxUnits: number
}

export interface Stake {
  id: string
  type: string
  stakeId: string
  denomination: Denomination
  depositAddress: string
  minStake: number
  slashingCondition: SlashingCondition
  slashFactor: number
  maxSlashAmount: number
  unbondingPeriod: number
}

export interface Node {
  id: string
  type: any
  nodeId: string
}

export interface Fund {
  id: string
  source: any
  fundId: string
}

export interface Key {
  purpose: KeyPurpose
  type: KeyType
  denomination: Denomination
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

export interface Data {
  type: DataType
  id: string
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
  data: Data
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
  // Data
  UpdateData = 'ixo/CreateEntityAdvanced/UPDATE_DATA',
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
    denomination: Denomination
    maxAmount: number
    maxUnits: number
  }
}

export interface AddStakeAction {
  type: typeof CreateEntityAdvancedActions.AddStake
  payload: {
    id: string
    type: string
    stakeId: string
    denomination: Denomination
    depositAddress: string
    minStake: number
    slashingCondition: SlashingCondition
    slashFactor: number
    maxSlashAmount: number
    unbondingPeriod: number
  }
}
export interface RemoveStakeAction {
  type: typeof CreateEntityAdvancedActions.RemoveStake
  payload: {
    id: string
  }
}

export interface UpdateStakeAction {
  type: typeof CreateEntityAdvancedActions.UpdateStake
  payload: {
    id: string
    type: string
    stakeId: string
    denomination: Denomination
    depositAddress: string
    minStake: number
    slashingCondition: SlashingCondition
    slashFactor: number
    maxSlashAmount: number
    unbondingPeriod: number
  }
}

export interface AddNodeAction {
  type: typeof CreateEntityAdvancedActions.AddNode
  payload: {
    id: string
    type: any
    nodeId: string
  }
}
export interface RemoveNodeAction {
  type: typeof CreateEntityAdvancedActions.RemoveNode
  payload: {
    id: string
  }
}

export interface UpdateNodeAction {
  type: typeof CreateEntityAdvancedActions.UpdateNode
  payload: {
    id: string
    type: any
    nodeId: string
  }
}

export interface AddFundAction {
  type: typeof CreateEntityAdvancedActions.AddFund
  payload: {
    id: string
    source: any
    fundId: string
  }
}

export interface RemoveFundAction {
  type: typeof CreateEntityAdvancedActions.RemoveFund
  payload: {
    id: string
  }
}

export interface UpdateFundAction {
  type: typeof CreateEntityAdvancedActions.UpdateFund
  payload: {
    id: string
    source: any
    fundId: string
  }
}

export interface UpdateKeyAction {
  type: typeof CreateEntityAdvancedActions.UpdateKey
  payload: {
    purpose: KeyPurpose
    type: KeyType
    denomination: Denomination
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

export interface UpdateDataAction {
  type: typeof CreateEntityAdvancedActions.UpdateData
  payload: {
    type: DataType
    id: string
    resourceLocator: string
    otherParams: string
  }
}

export type CreateEntityAdvancedActionTypes =
  | UpdateLinkedEntityAction
  | UpdatePaymentAction
  | AddStakeAction
  | RemoveStakeAction
  | UpdateStakeAction
  | AddNodeAction
  | RemoveNodeAction
  | UpdateNodeAction
  | AddFundAction
  | RemoveFundAction
  | UpdateFundAction
  | UpdateKeyAction
  | UpdateServiceAction
  | UpdateDataAction
