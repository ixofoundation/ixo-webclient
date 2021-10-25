import { Schema as FilterSchema } from './EntitiesExplorer/components/EntitiesFilter/schema/types'
import { Schema as HeaderSchema } from './EntitiesExplorer/components/EntitiesHero/schema/types'
import { Schema as ControlPanelSchema } from 'common/components/ControlPanel/types'
import { AgentRole } from 'modules/Account/types'

export const PDS_URL = process.env.REACT_APP_PDS_URL

export interface Agent {
  status: string
  kyc: boolean
  did: string
  role: AgentRole
}

export enum EntityType {
  Project = 'Project',
  Cell = 'Cell',
  Investment = 'Investment',
  Oracle = 'Oracle',
  Template = 'Template',
  Asset = 'Asset',
}

export enum EntityStatus {
  Pending = 'Pending',
  Live = 'Live',
  Stopped = 'Stopped',
  Sealed = 'Sealed',
  Deleted = 'Deleted',
}

export enum EntityStage {
  Proposal = 'Proposal',
  Planning = 'Planning',
  Delivery = 'Delivery',
  Paused = 'Paused',
  Closing = 'Closing',
  Ended = 'Ended',
  Archived = 'Archived',
}

export enum EntityView {
  Visible = 'Visible',
  Encrypted = 'Encrypted',
}

export enum PageView {
  Public = 'Public',
  Private = 'Private',
  Secret = 'Secret',
}

export enum PaymentDenomination {
  IXO = 'IXO',
  eEUR = 'eEUR',
  eCHF = 'eCHF',
  eUSD = 'eUSD',
}

export enum PaymentType {
  FeeForService = 'FeeForService',
  OracleFee = 'OracleFee',
  Subscription = 'Subscription',
  RentalFee = 'RentalFee',
  OutcomePayment = 'OutcomePayment',
  InterestRepayment = 'InterestRepayment',
  LoanRepayment = 'LoanRepayment',
  IncomeDistribution = 'IncomeDistribution',
  DisputeSettlement = 'DisputeSettlement',
}

export enum StakeType {
  SecurityGuarantee = 'SecurityGuarantee',
  PerformanceGuarantee = 'PerformanceGuarantee',
  LoanGuarantee = 'LoanGuarantee',
  ClaimGuarantee = 'ClaimGuarantee',
  DisputeGuarantee = 'DisputeGuarantee',
  VotingProposalDeposit = 'VotingProposalDeposit',
  MembershipDeposit = 'MembershipDeposit',
  ServicesDeposit = 'ServicesDeposit',
  InsuranceGuarantee = 'InsuranceGuarantee',
}

export enum SlashingCondition {
  FailedService = 'FailedService',
  FailedSecurity = 'FailedSecurity',
  LoanDefault = 'LoanDefault',
  FailedProposal = 'FailedProposal',
  FailedDispute = 'FailedDispute',
  InsuredEvent = 'InsuredEvent',
  FailedMembership = 'FailedMembership',
}

export enum KeyType {
  Ed25519VerificationKey2018 = 'Ed25519VerificationKey2018',
  JwsVerificationKey2020 = 'JwsVerificationKey2020',
  Secp256k1VerificationKey2018 = 'Secp256k1VerificationKey2018',
}

export enum KeyPurpose {
  Authentication = 'Authentication',
  Encryption = 'Encryption',
  Verification = 'Verification',
  Identification = 'Identification',
}

export enum ServiceType {
  DIDAgent = 'DIDAgent',
  CosmosWeb3 = 'CosmosWeb3',
  EthereumWeb3 = 'EthereumWeb3',
  Web2 = 'Web2',
}

export enum DataResourceType {
  SchemaOverlay = 'SchemaOverlay',
  MobileIdentityWallet = 'MobileIdentityWallet',
  PersonalDataPod = 'PersonalDataPod',
  CellNodeDB = 'CellNodeDB',
  EnterpriseDB = 'EnterpriseDB',
  InterplanetaryFileStore = 'InterplanetaryFileStore',
}

export enum NodeType {
  RelayerNode = 'RelayerNode',
  CellNode = 'CellNode',
  IBCNode = 'IBCNode',
}

export enum FundSource {
  Alphabond = 'Alphabond',
  WalletAddress = 'WalletAddress',
  BankAccount = 'BankAccount',
  PaymentContract = 'PaymentContract',
  NFTAsset = 'NFTAsset',
}

export enum TermsOfUseType {
  PayPerUse = 'PayPerUse',
  OnceOffFee = 'OnceOffFee',
  FreeOpenSource = 'FreeOpenSource',
  Proprietary = 'Proprietary',
}

export enum ProjectStatus {
  Created = 'CREATED',
  Pending = 'PENDING',
  Funded = 'FUNDED',
  Started = 'STARTED',
  Stopped = 'STOPPED',
  PaidOut = 'PAIDOUT'
}

export enum NetworkType {
  Main = 'Main',
  Pandora = 'Pandora',
}

export type EntityTypeStrategyMap = {
  [TKey in EntityType]: {
    title: string
    plural: string
    themeColor: string
    headerSchema: HeaderSchema
    filterSchema: FilterSchema
    controlPanelSchema: ControlPanelSchema
    createNewTitle: string
    urlPart: string
  }
}

export type EntityStatusStrategyMap = {
  [TKey in EntityStatus]: {
    title: string
  }
}

export type EntityStageStrategyMap = {
  [TKey in EntityStage]: {
    title: string
  }
}

export type EntityViewStrategyMap = {
  [TKey in EntityView]: {
    title: string
  }
}

export type PageViewStrategyMap = {
  [TKey in PageView]: {
    title: string
  }
}

export type PaymentTypeStrategyMap = {
  [TKey in PaymentType]: {
    title: string
  }
}

export type PaymentDenominationStrategyMap = {
  [TKey in PaymentDenomination]: {
    title: string
  }
}

export type StakeTypeStrategyMap = {
  [TKey in StakeType]: {
    title: string
  }
}

export type SlashingConditionStrategyMap = {
  [TKey in SlashingCondition]: {
    title: string
  }
}

export type FundSourceStrategyMap = {
  [TKey in FundSource]: {
    title: string
  }
}

export type NodeTypeStrategyMap = {
  [TKey in NodeType]: {
    title: string
  }
}

export type KeyTypeStrategyMap = {
  [TKey in KeyType]: {
    title: string
  }
}

export type KeyPurposeStrategyMap = {
  [TKey in KeyPurpose]: {
    title: string
  }
}

export type ServiceTypeStrategyMap = {
  [TKey in ServiceType]: {
    title: string
  }
}

export type DataResourceTypeStrategyMap = {
  [TKey in DataResourceType]: {
    title: string
  }
}

export type TermsOfUseTypeStrategyMap = {
  [TKey in TermsOfUseType]: {
    title: string
    icon: any
  }
}
